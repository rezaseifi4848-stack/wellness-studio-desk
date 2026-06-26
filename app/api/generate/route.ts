import { NextRequest, NextResponse } from "next/server";
import { SmartContentEngine } from "@/src/lib/smartContentEngine";
import type { SuggestionEngineKey } from "@/src/data/modernWellnessStyles";

const validEngines: SuggestionEngineKey[] = [
  "dailyReels",
  "captionStory",
  "shortMeditation",
  "classOpening",
  "speakingPractice",
  "weeklyPlans",
  "audienceAttraction",
  "softSales",
  "meditationTeaching",
];

function normalizeEngine(value: unknown): SuggestionEngineKey {
  if (typeof value === "string" && validEngines.includes(value as SuggestionEngineKey)) {
    return value as SuggestionEngineKey;
  }

  return "dailyReels";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const engine = normalizeEngine(body.engine);
  const localResult = SmartContentEngine({
    engine,
    topic: typeof body.topic === "string" ? body.topic : undefined,
    tone: typeof body.tone === "string" ? body.tone : undefined,
  });

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      source: "local-smart-content-engine",
      ...localResult,
    });
  }

  return NextResponse.json({
    source: "local-smart-content-engine",
    notice: "کلید آنلاین تنظیم شده، اما این نسخه فعلاً برای پایداری از موتور داخلی محتوا استفاده می‌کند.",
    suggestions: localResult.suggestions,
  });
}

export async function GET() {
  const localResult = SmartContentEngine({ engine: "dailyReels" });

  return NextResponse.json({
    source: "local-smart-content-engine",
    ...localResult,
  });
}
