"use server"

export async function extractBrandColor(
  website: string,
): Promise<{ success: boolean; color?: string; error?: string }> {
  try {
    // Normalize URL
    let url = website.trim()
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url
    }

    // Extract domain name for BrandColors.net lookup
    const domain = new URL(url).hostname.replace(/^www\./, "")
    const brandName = domain.split(".")[0] // e.g., "google" from "google.com"

    // Strategy 0: Try BrandColors.net API first
    try {
      const brandColorsResponse = await fetch(`https://brandcolors.net/api/all`)
      if (brandColorsResponse.ok) {
        const brandsData = await brandColorsResponse.json()

        // Search for matching brand (case-insensitive)
        const matchingBrand = Object.keys(brandsData).find((key) => key.toLowerCase() === brandName.toLowerCase())

        if (matchingBrand && brandsData[matchingBrand]) {
          const brandColors = brandsData[matchingBrand]
          // Get the first color from the brand's color array
          const primaryColor = Array.isArray(brandColors) ? brandColors[0] : brandColors

          if (primaryColor && typeof primaryColor === "string" && primaryColor.startsWith("#")) {
            console.log(`Found color ${primaryColor} for ${brandName} from BrandColors.net`)
            return {
              success: true,
              color: normalizeColor(primaryColor) || primaryColor,
            }
          }
        }
      }
    } catch (error) {
      console.log("BrandColors.net lookup failed, falling back to website scraping")
    }

    // Fetch the website HTML
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: controller.signal,
      redirect: "follow",
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return {
        success: false,
        error: `Could not fetch website (${response.status})`,
      }
    }

    const html = await response.text()

    // Try multiple strategies to extract brand color
    const strategies = [
      extractFromThemeColor,
      extractFromFavicon,
      extractFromCSSVariables,
      extractFromInlineStyles,
      extractFromStyleTags,
      extractFromCommonSelectors,
    ]

    for (const strategy of strategies) {
      const color = strategy(html, url)
      if (color) {
        console.log(`Extracted color ${color} using ${strategy.name} for ${url}`)
        return {
          success: true,
          color,
        }
      }
    }

    // Fallback: return most common non-neutral color
    const allColors = extractAllColors(html)
    const brandColor = selectBestBrandColor(allColors)

    if (brandColor) {
      console.log(`Selected best color ${brandColor} from all colors for ${url}`)
      return {
        success: true,
        color: brandColor,
      }
    }

    return {
      success: false,
      error: "Could not detect a suitable brand color",
    }
  } catch (error) {
    console.error("Error extracting brand color:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to extract brand color",
    }
  }
}

// Strategy 1: Extract from theme-color meta tag
function extractFromThemeColor(html: string): string | null {
  const themeColorMatch = html.match(/<meta\s+name=["']theme-color["']\s+content=["']([^"']+)["']/i)
  if (themeColorMatch && themeColorMatch[1]) {
    const color = normalizeColor(themeColorMatch[1])
    if (color && isValidBrandColor(color)) {
      return color
    }
  }
  return null
}

// Strategy 2: Extract from favicon link (sometimes includes brand color in path)
function extractFromFavicon(html: string, baseUrl: string): string | null {
  // This is a placeholder - in a real implementation, you'd fetch and analyze the favicon
  // For now, we'll skip this strategy
  return null
}

// Strategy 3: Extract from CSS custom properties
function extractFromCSSVariables(html: string): string | null {
  const cssVarPatterns = [
    /:root\s*{[^}]*--(?:brand|primary|accent|theme)(?:-color)?:\s*([^;}\s]+)/gi,
    /--(?:brand|primary|accent|theme)(?:-color)?:\s*([^;}\s]+)/gi,
  ]

  for (const pattern of cssVarPatterns) {
    const matches = html.matchAll(pattern)
    for (const match of matches) {
      const color = normalizeColor(match[1])
      if (color && isValidBrandColor(color)) {
        return color
      }
    }
  }
  return null
}

// Strategy 4: Extract from inline styles on key elements
function extractFromInlineStyles(html: string): string | null {
  // Look for inline styles on header, nav, logo elements
  const patterns = [
    /<header[^>]*style=["'][^"']*background(?:-color)?:\s*([^;"']+)/gi,
    /<nav[^>]*style=["'][^"']*background(?:-color)?:\s*([^;"']+)/gi,
    /<div[^>]*class=["'][^"']*(?:logo|brand|header|nav)[^"']*["'][^>]*style=["'][^"']*(?:background-)?color:\s*([^;"']+)/gi,
  ]

  const candidates: string[] = []
  for (const pattern of patterns) {
    const matches = html.matchAll(pattern)
    for (const match of matches) {
      const color = normalizeColor(match[1])
      if (color && isValidBrandColor(color)) {
        candidates.push(color)
      }
    }
  }

  return getMostCommonColor(candidates)
}

// Strategy 5: Extract from style tags
function extractFromStyleTags(html: string): string | null {
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi
  const matches = html.matchAll(styleTagRegex)

  const candidates: string[] = []

  for (const match of matches) {
    const css = match[1]

    // Look for brand-related selectors
    const brandSelectors = [
      /\.(?:header|nav|navbar|menu|brand|logo|primary|accent)[^{]*{[^}]*(?:background-)?color:\s*([^;}\s]+)/gi,
      /#(?:header|nav|navbar|menu|brand|logo)[^{]*{[^}]*(?:background-)?color:\s*([^;}\s]+)/gi,
      /header[^{]*{[^}]*(?:background-)?color:\s*([^;}\s]+)/gi,
      /nav[^{]*{[^}]*(?:background-)?color:\s*([^;}\s]+)/gi,
    ]

    for (const selector of brandSelectors) {
      const colorMatches = css.matchAll(selector)
      for (const colorMatch of colorMatches) {
        const color = normalizeColor(colorMatch[1])
        if (color && isValidBrandColor(color)) {
          candidates.push(color)
        }
      }
    }
  }

  return getMostCommonColor(candidates)
}

// Strategy 6: Extract from common brand element selectors
function extractFromCommonSelectors(html: string): string | null {
  const candidates: string[] = []

  // Extract all class and id attributes that might contain brand colors
  const brandElements = [
    /<(?:header|nav|div)[^>]*class=["'][^"']*(?:header|navbar|nav|menu|brand|logo|primary)[^"']*["'][^>]*>/gi,
  ]

  for (const pattern of brandElements) {
    const matches = html.matchAll(pattern)
    for (const match of matches) {
      const element = match[0]
      // Extract background-color or color from style attribute
      const styleMatch = element.match(/style=["']([^"']+)["']/)
      if (styleMatch) {
        const style = styleMatch[1]
        const colorMatch = style.match(/(?:background-)?color:\s*([^;]+)/)
        if (colorMatch) {
          const color = normalizeColor(colorMatch[1])
          if (color && isValidBrandColor(color)) {
            candidates.push(color)
          }
        }
      }
    }
  }

  return getMostCommonColor(candidates)
}

// Extract all colors from HTML
function extractAllColors(html: string): string[] {
  const colors: string[] = []
  const colorPatterns = [
    /#[0-9a-fA-F]{6}\b/g,
    /#[0-9a-fA-F]{3}\b/g,
    /rgba?$$\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*$$/g,
  ]

  for (const pattern of colorPatterns) {
    const matches = html.matchAll(pattern)
    for (const match of matches) {
      const color = normalizeColor(match[0])
      if (color && isValidBrandColor(color)) {
        colors.push(color)
      }
    }
  }

  return colors
}

// Select the best brand color from a list of colors
function selectBestBrandColor(colors: string[]): string | null {
  if (colors.length === 0) return null

  // Count frequency
  const frequency: { [key: string]: number } = {}
  colors.forEach((color) => {
    frequency[color] = (frequency[color] || 0) + 1
  })

  // Sort by frequency and filter by minimum occurrences
  const sorted = Object.entries(frequency)
    .filter(([_, count]) => count >= 2) // Must appear at least twice
    .sort((a, b) => b[1] - a[1])

  if (sorted.length === 0) {
    // If no color appears twice, return the most saturated color
    return getMostSaturatedColor(colors)
  }

  return sorted[0][0]
}

// Get most common color from array
function getMostCommonColor(colors: string[]): string | null {
  if (colors.length === 0) return null

  const frequency: { [key: string]: number } = {}
  colors.forEach((color) => {
    frequency[color] = (frequency[color] || 0) + 1
  })

  const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1])
  return sorted[0][0]
}

// Get most saturated color (likely brand color)
function getMostSaturatedColor(colors: string[]): string | null {
  if (colors.length === 0) return null

  let maxSaturation = 0
  let bestColor: string | null = null

  for (const color of colors) {
    const saturation = getColorSaturation(color)
    if (saturation > maxSaturation) {
      maxSaturation = saturation
      bestColor = color
    }
  }

  return bestColor
}

// Calculate color saturation
function getColorSaturation(hex: string): number {
  const r = Number.parseInt(hex.substr(1, 2), 16) / 255
  const g = Number.parseInt(hex.substr(3, 2), 16) / 255
  const b = Number.parseInt(hex.substr(5, 2), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  if (max === min) return 0

  const l = (max + min) / 2
  const d = max - min

  return l > 0.5 ? d / (2 - max - min) : d / (max + min)
}

function normalizeColor(color: string): string | null {
  color = color.trim().toLowerCase()

  // Handle hex colors
  if (color.startsWith("#")) {
    if (color.length === 4) {
      // Convert #RGB to #RRGGBB
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
    }
    if (color.length === 7) {
      return color
    }
  }

  // Handle rgb/rgba colors - convert to hex
  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) {
    const r = Number.parseInt(rgbMatch[1])
    const g = Number.parseInt(rgbMatch[2])
    const b = Number.parseInt(rgbMatch[3])

    if (r > 255 || g > 255 || b > 255) return null

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  // Handle named colors (basic set)
  const namedColors: { [key: string]: string } = {
    red: "#ff0000",
    blue: "#0000ff",
    green: "#008000",
    yellow: "#ffff00",
    orange: "#ffa500",
    purple: "#800080",
    pink: "#ffc0cb",
    brown: "#a52a2a",
    cyan: "#00ffff",
    magenta: "#ff00ff",
  }

  if (namedColors[color]) {
    return namedColors[color]
  }

  return null
}

function isValidBrandColor(color: string): boolean {
  if (!color || !color.startsWith("#")) return false

  // Exclude common non-brand colors
  const excludedColors = [
    "#000000",
    "#ffffff",
    "#fff",
    "#000",
    "#f0f0f0",
    "#f5f5f5",
    "#fafafa",
    "#eeeeee",
    "#e0e0e0",
    "#cccccc",
    "#c0c0c0",
    "#999999",
    "#808080",
    "#666666",
    "#333333",
    "#1a1a1a",
    "#0d0d0d",
  ]

  if (excludedColors.includes(color.toLowerCase())) {
    return false
  }

  // Check if color is too light (likely background) or too dark
  const hex = color.replace("#", "")
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Calculate perceived brightness (0-255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Exclude colors that are too light (> 240) or too dark (< 20)
  if (brightness > 240 || brightness < 20) return false

  // Calculate saturation - brand colors are usually saturated
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  if (max === 0) return false

  const saturation = delta / max

  // Require minimum saturation (0.2 = 20%)
  return saturation >= 0.2
}
