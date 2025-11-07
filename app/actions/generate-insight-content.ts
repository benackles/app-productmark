"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface GenerateInsightContentParams {
  field: "observation" | "evidence" | "why" | "implication" | "action"
  insightType: "customer" | "competitive" | "market"
  source?: string
  tags?: string[]
  existingContent?: {
    observation?: string
    evidence?: string
    why?: string
    implication?: string
    action?: string
  }
}

const fieldPrompts = {
  observation: {
    customer:
      "Generate a concise, punchy observation about a customer behavior, need, or feedback pattern. Focus on what was learned.",
    competitive:
      "Generate a concise observation about a competitor's move, strategy, or market positioning. Be specific and factual.",
    market:
      "Generate a concise observation about an industry trend, market dynamic, or regulatory change. Be forward-looking.",
  },
  evidence: {
    customer:
      "Provide specific evidence that validates the customer observation. Include data points, quotes, or usage patterns.",
    competitive:
      "Provide specific evidence about the competitive observation. Include sources, data, or documented changes.",
    market:
      "Provide specific evidence about the market observation. Include analyst reports, survey data, or market metrics.",
  },
  why: {
    customer:
      "Explain why this customer insight matters. Connect it to customer pain, business impact, or strategic priorities.",
    competitive:
      "Explain why this competitive insight matters. Connect it to market position, differentiation, or strategic risk.",
    market:
      "Explain why this market insight matters. Connect it to market opportunity, timing, or strategic implications.",
  },
  implication: {
    customer: "Describe the implications for product, positioning, or GTM strategy based on this customer insight.",
    competitive:
      "Describe the implications for competitive strategy, positioning, or product priorities based on this insight.",
    market: "Describe the implications for market strategy, product direction, or GTM approach based on this trend.",
  },
  action: {
    customer:
      "Recommend specific, actionable next steps to address this customer insight. Be concrete and prioritized.",
    competitive:
      "Recommend specific, actionable next steps to respond to this competitive insight. Include defensive or offensive moves.",
    market:
      "Recommend specific, actionable next steps to capitalize on this market insight. Focus on timing and positioning.",
  },
}

export async function generateInsightContent({
  field,
  insightType,
  source,
  tags,
  existingContent,
}: GenerateInsightContentParams) {
  try {
    const basePrompt = fieldPrompts[field][insightType]

    // Build context from metadata and existing content
    const context = []

    if (source) {
      context.push(`Source: ${source}`)
    }

    if (tags && tags.length > 0) {
      context.push(`Tags: ${tags.join(", ")}`)
    }

    // Add existing content for context
    if (existingContent) {
      if (existingContent.observation && field !== "observation") {
        context.push(`Observation: ${existingContent.observation}`)
      }
      if (existingContent.evidence && field !== "evidence" && field !== "observation") {
        context.push(`Evidence: ${existingContent.evidence}`)
      }
      if (existingContent.why && !["observation", "evidence", "why"].includes(field)) {
        context.push(`Why it matters: ${existingContent.why}`)
      }
      if (existingContent.implication && field === "action") {
        context.push(`Implication: ${existingContent.implication}`)
      }
    }

    const fullPrompt = `${basePrompt}

Context:
${context.join("\n")}

Generate content for the "${field}" field. Keep it concise, specific, and actionable. Do not include field labels or formatting - just the content itself.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: fullPrompt,
      maxTokens: 300,
    })

    return {
      success: true,
      content: text.trim(),
    }
  } catch (error) {
    console.error("Error generating insight content:", error)
    return {
      success: false,
      error: "Failed to generate content. Please try again.",
    }
  }
}

export async function improveInsightContent({
  field,
  currentContent,
  insightType,
  source,
  tags,
  existingContent,
}: GenerateInsightContentParams & { currentContent: string }) {
  try {
    const context = []

    if (source) {
      context.push(`Source: ${source}`)
    }

    if (tags && tags.length > 0) {
      context.push(`Tags: ${tags.join(", ")}`)
    }

    if (existingContent) {
      Object.entries(existingContent).forEach(([key, value]) => {
        if (value && key !== field) {
          context.push(`${key}: ${value}`)
        }
      })
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `You are helping improve a ${insightType} insight for product marketing.

Context:
${context.join("\n")}

Current content for "${field}" field:
"${currentContent}"

Improve this content to be more:
- Specific and concrete
- Data-driven or evidence-based
- Actionable and clear
- Concise but comprehensive

Return only the improved content, no explanations or formatting.`,
      maxTokens: 300,
    })

    return {
      success: true,
      content: text.trim(),
    }
  } catch (error) {
    console.error("Error improving insight content:", error)
    return {
      success: false,
      error: "Failed to improve content. Please try again.",
    }
  }
}
