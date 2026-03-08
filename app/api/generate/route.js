import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { brandName, industry, objective, productInfo } = body;

    const prompt = `
You are an expert social media strategist and copywriter.

A user wants to generate tweets for the following brand:

- Brand Name: ${brandName || "Not specified"}
- Industry / Category: ${industry || "Not specified"}
- Campaign Objective: ${objective || "Not specified"}
- About the Brand / Products: ${productInfo || "Not specified"}

Your task is to:
1. Analyze and infer the brand's voice, tone, and personality based on the inputs.
2. Generate exactly 10 tweets that match the brand's tone and style.

The 10 tweets should be a mix of:
- 3 Engaging / Conversational tweets
- 2 Promotional tweets
- 2 Witty / Meme-style tweets
- 3 Informative / Value-driven tweets

Return your response in the following JSON format ONLY. No extra text outside the JSON:

{
  "brandVoice": {
    "tone": "e.g. witty, bold, premium, humorous",
    "targetAudience": "e.g. young professionals aged 22-35",
    "contentThemes": "e.g. product features, trends, lifestyle",
    "personality": "e.g. friendly, confident, playful"
  },
  "tweets": [
    { "id": 1, "style": "Conversational", "tweet": "tweet text here" },
    { "id": 2, "style": "Conversational", "tweet": "tweet text here" },
    { "id": 3, "style": "Conversational", "tweet": "tweet text here" },
    { "id": 4, "style": "Promotional", "tweet": "tweet text here" },
    { "id": 5, "style": "Promotional", "tweet": "tweet text here" },
    { "id": 6, "style": "Witty", "tweet": "tweet text here" },
    { "id": 7, "style": "Witty", "tweet": "tweet text here" },
    { "id": 8, "style": "Informative", "tweet": "tweet text here" },
    { "id": 9, "style": "Informative", "tweet": "tweet text here" },
    { "id": 10, "style": "Informative", "tweet": "tweet text here" }
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const rawText = completion.choices[0]?.message?.content || "";

    // Safely parse JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}