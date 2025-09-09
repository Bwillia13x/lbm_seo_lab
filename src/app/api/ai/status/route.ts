import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY;
  const defaultModel = "gpt-3.5-turbo";

  return NextResponse.json({
    hasKey,
    defaultModel,
    limits: {
      perMinute: 10,
      perDay: 100,
    },
    features: [
      "wedding-planning",
      "content-creation",
      "customer-service",
      "marketing-assistance",
      "menu-planning",
      "seasonal-advice"
    ]
  });
}
