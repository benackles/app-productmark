"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface GenerateAnalysisInput {
  observation: string
  insightType: "customer" | "competitive" | "market"
  dataSource?: string
  tags: string[]
  competitor?: {
    name: string
    website?: string
  }
}

interface GenerateAnalysisResult {
  success: boolean
  analysis?: {
    evidence: string
    why: string
    implication: string
    action: string
  }
  error?: string
}

const analysisPrompts = {
  customer: {
    evidence:
      "Based on the observation, provide specific evidence that validates this customer insight. Include data points, quotes, usage patterns, or metrics that support the observation.",
    why: "Explain why this customer insight matters. Connect it to customer pain points, business impact, or strategic priorities. Focus on the real-world consequences.",
    implication:
      "Describe the implications for product strategy, positioning, or GTM approach. What does this mean for how we build, market, or sell?",
    action:
      "Recommend 2-3 specific, actionable next steps to address this customer insight. Be concrete and prioritized.",
  },
  competitive: {
    evidence:
      "Provide specific evidence about this competitive move or positioning. Include sources, data, documented changes, or market signals that validate the observation.",
    why: "Explain why this competitive insight matters. Connect it to our market position, differentiation strategy, or competitive risk. What's at stake?",
    implication:
      "Describe the implications for our competitive strategy, positioning, or product priorities. How should this change our approach?",
    action:
      "Recommend 2-3 specific, actionable next steps to respond to this competitive insight. Include both defensive and offensive moves where appropriate.",
  },
  market: {
    evidence:
      "Provide specific evidence about this market trend or dynamic. Include analyst reports, survey data, market metrics, or regulatory changes that support the observation.",
    why: "Explain why this market insight matters. Connect it to market opportunity, timing, or strategic implications. What does this mean for our business?",
    implication:
      "Describe the implications for market strategy, product direction, or GTM approach. How should this influence our strategic decisions?",
    action:
      "Recommend 2-3 specific, actionable next steps to capitalize on this market insight. Focus on timing and positioning.",
  },
}

export async function generateInsightAnalysis(input: GenerateAnalysisInput): Promise<GenerateAnalysisResult> {
  try {
    const { observation, insightType, dataSource, tags, competitor } = input

    const prompts = analysisPrompts[insightType]

    // Build context
    const context = []
    if (dataSource) {
      context.push(`Data Source: ${dataSource}`)
    }
    if (tags.length > 0) {
      context.push(`Tags: ${tags.join(", ")}`)
    }
    if (competitor) {
      context.push(`Competitor: ${competitor.name}${competitor.website ? ` (${competitor.website})` : ""}`)
    }

    const contextString = context.length > 0 ? `\n\nContext:\n${context.join("\n")}` : ""

    // Generate each field
    const [evidenceResult, whyResult, implicationResult, actionResult] = await Promise.all([
      generateText({
        model: openai("gpt-4o-mini"),
        prompt: `You are a product marketing expert analyzing insights.

Observation: "${observation}"${contextString}

${prompts.evidence}

Generate a concise, specific response (2-3 sentences). Be concrete and data-driven.`,
        maxTokens: 200,
      }),
      generateText({
        model: openai("gpt-4o-mini"),
        prompt: `You are a product marketing expert analyzing insights.

Observation: "${observation}"${contextString}

${prompts.why}

Generate a concise, specific response (2-3 sentences). Focus on business impact.`,
        maxTokens: 200,
      }),
      generateText({
        model: openai("gpt-4o-mini"),
        prompt: `You are a product marketing expert analyzing insights.

Observation: "${observation}"${contextString}

${prompts.implication}

Generate a concise, specific response (2-3 sentences). Be strategic and forward-looking.`,
        maxTokens: 200,
      }),
      generateText({
        model: openai("gpt-4o-mini"),
        prompt: `You are a product marketing expert analyzing insights.

Observation: "${observation}"${contextString}

${prompts.action}

Generate a concise, specific response (2-3 sentences). Provide actionable recommendations.`,
        maxTokens: 200,
      }),
    ])

    return {
      success: true,
      analysis: {
        evidence: evidenceResult.text.trim(),
        why: whyResult.text.trim(),
        implication: implicationResult.text.trim(),
        action: actionResult.text.trim(),
      },
    }
  } catch (error) {
    console.error("Error generating insight analysis:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate analysis",
    }
  }
}

export async function regenerateAnalysisField(
  field: "evidence" | "why" | "implication" | "action",
  observation: string,
  insightType: "customer" | "competitive" | "market",
  context: {
    dataSource?: string
    tags: string[]
    competitor?: { name: string; website?: string }
  },
): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    const prompts = analysisPrompts[insightType]

    const contextArray = []
    if (context.dataSource) {
      contextArray.push(`Data Source: ${context.dataSource}`)
    }
    if (context.tags.length > 0) {
      contextArray.push(`Tags: ${context.tags.join(", ")}`)
    }
    if (context.competitor) {
      contextArray.push(
        `Competitor: ${context.competitor.name}${context.competitor.website ? ` (${context.competitor.website})` : ""}`,
      )
    }

    const contextString = contextArray.length > 0 ? `\n\nContext:\n${contextArray.join("\n")}` : ""

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `You are a product marketing expert analyzing insights.

Observation: "${observation}"${contextString}

${prompts[field]}

Generate a concise, specific response (2-3 sentences).`,
      maxTokens: 200,
    })

    return {
      success: true,
      content: text.trim(),
    }
  } catch (error) {
    console.error(`Error regenerating ${field}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : `Failed to regenerate ${field}`,
    }
  }
}
