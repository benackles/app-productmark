"use server"

interface ReaderModeResult {
  success: boolean
  content?: {
    title: string
    byline: string | null
    excerpt: string
    content: string
    textContent: string
    length: number
    siteName: string | null
  }
  error?: string
}

// Extract text from HTML without parsing
function stripHTML(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Clean HTML for safe display
function cleanHTML(html: string): string {
  let cleaned = html

  // Remove all script tags
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, "")

  // Remove noscript
  cleaned = cleaned.replace(/<noscript[\s\S]*?<\/noscript>/gi, "")

  // Remove style tags
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, "")

  // Remove iframes
  cleaned = cleaned.replace(/<iframe[\s\S]*?<\/iframe>/gi, "")

  // Remove event handlers
  cleaned = cleaned.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, "")
  cleaned = cleaned.replace(/\s+on\w+\s*=\s*[^\s/>]*/gi, "")

  // Remove javascript: protocol
  cleaned = cleaned.replace(/javascript:/gi, "")

  // Remove problematic characters
  cleaned = cleaned.replace(/\$/g, "&#36;")

  return cleaned
}

// Extract metadata from HTML
function extractMetadata(html: string, url: string) {
  // Title
  const titleMatch =
    html.match(/<title[^>]*>([^<]+)<\/title>/i) ||
    html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i)
  const title = titleMatch ? titleMatch[1].trim() : new URL(url).hostname

  // Author
  const authorMatch =
    html.match(/<meta\s+name=["']author["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+property=["']article:author["']\s+content=["']([^"']+)["']/i)
  const byline = authorMatch ? authorMatch[1].trim() : null

  // Site name
  const siteMatch = html.match(/<meta\s+property=["']og:site_name["']\s+content=["']([^"']+)["']/i)
  const siteName = siteMatch ? siteMatch[1].trim() : new URL(url).hostname

  // Description
  const descMatch =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i)
  const excerpt = descMatch ? descMatch[1].trim() : ""

  return { title, byline, siteName, excerpt }
}

// Extract main content from HTML
function extractContent(html: string): string {
  // Try different content selectors in order of preference
  const selectors = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class=["'][^"']*post[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id=["']content["'][^>]*>([\s\S]*?)<\/div>/i,
    /<body[^>]*>([\s\S]*?)<\/body>/i,
  ]

  for (const selector of selectors) {
    const match = html.match(selector)
    if (match && match[1]) {
      const content = match[1]
      // Check if it has enough text content
      const textContent = stripHTML(content)
      if (textContent.length > 200) {
        return content
      }
    }
  }

  // Fallback to body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : html
}

// Remove navigation, header, footer elements
function removeNoise(html: string): string {
  let cleaned = html

  // Remove common noise elements
  cleaned = cleaned.replace(/<nav[\s\S]*?<\/nav>/gi, "")
  cleaned = cleaned.replace(/<header[\s\S]*?<\/header>/gi, "")
  cleaned = cleaned.replace(/<footer[\s\S]*?<\/footer>/gi, "")
  cleaned = cleaned.replace(/<aside[\s\S]*?<\/aside>/gi, "")
  cleaned = cleaned.replace(
    /<div[^>]*class=["'][^"']*(?:nav|menu|sidebar|footer|header)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi,
    "",
  )

  // Remove comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "")

  return cleaned
}

export async function getReaderMode(url: string): Promise<ReaderModeResult> {
  try {
    // Validate URL
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return {
        success: false,
        error: "Invalid URL format",
      }
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return {
        success: false,
        error: "Only HTTP and HTTPS URLs are supported",
      }
    }

    // Fetch with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    let response: Response
    try {
      response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ReaderBot/1.0)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: controller.signal,
        redirect: "follow",
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      const errorName = fetchError instanceof Error ? fetchError.name : ""
      return {
        success: false,
        error: errorName === "AbortError" ? "Request timed out" : "Unable to fetch the page",
      }
    }

    clearTimeout(timeoutId)

    // Check content type first
    const contentType = response.headers.get("content-type") || ""
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      return {
        success: false,
        error: "This URL doesn't point to a web page",
      }
    }

    // Get HTML even if status is not 200 (like 404 pages can still have content)
    let html: string
    try {
      html = await response.text()
    } catch {
      return {
        success: false,
        error: "Failed to read page content",
      }
    }

    // If status is not OK and we didn't get meaningful HTML, return error
    if (!response.ok && html.length < 500) {
      return {
        success: false,
        error: `Unable to access page (HTTP ${response.status})`,
      }
    }

    // Extract metadata first (before cleaning)
    const { title, byline, siteName, excerpt } = extractMetadata(html, url)

    // Extract main content
    let content = extractContent(html)

    // Remove noise
    content = removeNoise(content)

    // Clean the HTML
    content = cleanHTML(content)

    // Get text content
    const textContent = stripHTML(content)

    // Validate we have enough content
    if (textContent.length < 100) {
      return {
        success: false,
        error: "Could not extract meaningful content from this page",
      }
    }

    // Wrap content in a container
    const wrappedContent = `
      <div class="reader-content-wrapper">
        ${content}
      </div>
    `

    return {
      success: true,
      content: {
        title,
        byline,
        siteName,
        excerpt: excerpt || textContent.substring(0, 200) + "...",
        content: wrappedContent,
        textContent: textContent.substring(0, 5000), // Limit text content
        length: textContent.length,
      },
    }
  } catch (error) {
    console.error("Reader mode error:", error)
    return {
      success: false,
      error: "Unable to load this page in reader mode",
    }
  }
}
