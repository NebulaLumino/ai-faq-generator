import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
function getClient() { return new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" }); }
export async function POST(req: NextRequest) {
  try {
    const { productName, features, objections, tone } = await req.json();
    const prompt = `You are a knowledge base specialist. Generate a comprehensive FAQ document for ${productName}.

Features:\n${features || "Core features of the product"}
Common Objections/Questions:\n${objections || "Common user questions and concerns"}
Tone: ${tone}

Generate a structured FAQ document with:
1. **Getting Started** - Top 3-5 questions for new users
2. **Features & Capabilities** - Questions about key features
3. **Pricing & Plans** - Common pricing questions
4. **Security & Privacy** - Data handling, compliance
5. **Troubleshooting** - Common issues and solutions
6. **Account & Billing** - Subscription management

For each FAQ:
- Use a clear, direct question (h2)
- Provide a thorough but concise answer
- Include "Related Articles" section at the bottom
- Format with proper markdown hierarchy
- Be ${tone} in tone`;
    const client = getClient();
    const completion = await client.chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.6, max_tokens: 3000 });
    const result = completion.choices[0]?.message?.content || "No output generated.";
    return NextResponse.json({ result });
  } catch (error: any) { return NextResponse.json({ error: error?.message || "Failed" }, { status: 500 }); }
}
