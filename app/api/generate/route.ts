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

function providerStatus() {
  const searchActive = Boolean(
    process.env.TAVILY_API_KEY ||
      process.env.BRAVE_SEARCH_API_KEY ||
      process.env.SERPAPI_KEY,
  );

  return {
    aiActive: Boolean(process.env.OPENAI_API_KEY),
    searchActive,
    message: searchActive
      ? "جستجوی زنده فعال است"
      : "جستجوی زنده فعال نیست؛ پیشنهادها از بانک حرفه‌ای داخلی ساخته شده‌اند.",
  };
}

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
      status: providerStatus(),
      ...localResult,
    });
  }

  return NextResponse.json({
    source: "openai-ready-local-fallback",
    status: providerStatus(),
    notice: "OPENAI_API_KEY تنظیم شده است؛ این endpoint برای پایداری فعلاً خروجی بانک حرفه‌ای داخلی را برمی‌گرداند و آماده اتصال تولید پویا است.",
    suggestions: localResult.suggestions,
  });
}

export async function GET() {
  const localResult = SmartContentEngine({ engine: "dailyReels" });

  return NextResponse.json({
    source: "local-smart-content-engine",
    status: providerStatus(),
    ...localResult,
  });
}
