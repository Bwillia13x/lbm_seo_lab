import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

let openai: OpenAI | null = null;

function getOpenAI() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

// Rate limiting
const RATE_LIMITS = {
  perMinute: 10,
  perDay: 100,
};

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (userLimit.count >= RATE_LIMITS.perMinute) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json(
        { error: "AI service not configured. Please set OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const { messages, model = "gpt-3.5-turbo", maxTokens = 300, temperature = 0.7, scope } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Create farm-specific system prompt based on scope
    let systemPrompt = "You are a helpful assistant for Little Bow Meadows, a beautiful farm-to-table wedding venue and floral farm in High River, Alberta. Provide helpful, accurate information about weddings, farm products, and local services.";

    if (scope === "wedding") {
      systemPrompt = "You are a wedding planning expert at Little Bow Meadows farm-to-table wedding venue. Help couples plan their perfect outdoor prairie wedding with seasonal blooms, local cuisine, and farm-fresh elements.";
    } else if (scope === "marketing") {
      systemPrompt = "You are a marketing expert for Little Bow Meadows wedding venue and floral farm. Help create compelling content about seasonal blooms, wedding packages, and farm-to-table experiences.";
    } else if (scope === "customer-service") {
      systemPrompt = "You are a customer service representative at Little Bow Meadows. Help customers with inquiries about wedding venues, floral arrangements, farm products, and booking information.";
    }

    const messagesWithSystem = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const completion = await openai.chat.completions.create({
      model,
      messages: messagesWithSystem,
      max_tokens: maxTokens,
      temperature,
    });

    const content = completion.choices[0]?.message?.content || "";

    return NextResponse.json({
      content,
      usage: completion.usage,
    });

  } catch (error: any) {
    console.error("AI Chat Error:", error);

    if (error.status === 401) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (error.status === 429) {
      return NextResponse.json({ error: "OpenAI rate limit exceeded" }, { status: 429 });
    }

    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
