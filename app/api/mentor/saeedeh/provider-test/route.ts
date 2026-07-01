import { NextRequest, NextResponse } from "next/server";
import { testProvider } from "@/lib/mentor/saeedehProviders";

const providers = ["tavily", "gemini", "groq", "openai"] as const;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const provider = providers.includes(body.provider as (typeof providers)[number])
    ? (body.provider as (typeof providers)[number])
    : "tavily";

  const result = await testProvider(provider);
  return NextResponse.json(result);
}
