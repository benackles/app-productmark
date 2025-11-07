"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface SuggestTagsInput {
  observation: string
  insightType: "Customer" | "Competitive" | "Market"
  existingTags: string[]
}

interface SuggestTagsResult {
  success: boolean
  tags: string[]
  error?: string
}

export async function suggestTags(input: SuggestTagsInput): Promise<SuggestTagsResult> {
  try {
    const { observation, insightType, existingTags } = input

    const prompt = `You are a product marketing expert helping to categorize insights.

Given this ${insightType} insight:
"${observation}"

Existing tags: ${existingTags.length > 0 ? existingTags.join(", ") : "none"}

Suggest 1-4 relevant tags that would help organize and find this insight later. 
Tags should be:
- Short (1-3 words)
- Lowercase
- Hyphenated if multiple words (e.g., "competitive-intelligence")
- Specific and actionable
- Different from existing tags

Common tag categories:
- Customer segments (enterprise, smb, mid-market)
- Features (sso, ai, mobile, offline)
- Business impact (churn, retention, pricing, revenue)
- Market dynamics (market-trends, consolidation, compliance)
- Competitive (competitive-threat, feature-gap, status-quo)
- Jobs-to-be-done (onboarding, time-to-value, user-experience)

Return ONLY a comma-separated list of tags, nothing else.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0.7,
      maxTokens: 100,
    })

    // Parse the response
    const tags = text
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0 && !existingTags.includes(tag))
      .slice(0, 4) // Limit to 4 suggestions

    return {
      success: true,
      tags,
    }
  } catch (error) {
    console.error("Error suggesting tags:", error)
    return {
      success: false,
      tags: [],
      error: error instanceof Error ? error.message : "Failed to suggest tags",
    }
  }
}
