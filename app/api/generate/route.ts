import { NextRequest, NextResponse } from "next/server";
import { generateLiveContent } from "@/src/lib/liveAiEngine";
import type { LiveGenerateRequest } from "@/src/lib/premiumPromptBuilder";

const modules = [
  "morning-studio",
  "poster-studio",
  "bale-channel",
  "meditation-command-center",
  "now-engine",
  "engagement-engine",
  "affirmation-challenge",
  "reels",
  "captions",
  "comments",
  "soft-sales",
  "speaking-coach",
];

function normalize(body: Record<string, unknown>): LiveGenerateRequest {
  const moduleName = typeof body.module === "string" && modules.includes(body.module) ? body.module : "morning-studio";

  return {
    module: moduleName,
    channel: typeof body.channel === "string" ? body.channel : "@yoga_saeedeh",
    outputType: typeof body.outputType === "string" ? body.outputType : "daily-package",
    persona: typeof body.persona === "string" ? body.persona : "سعیده؛ مربی گرم، طبیعی و حرفه‌ای یوگا و مدیتیشن",
    topic: typeof body.topic === "string" ? body.topic : undefined,
    platform: typeof body.platform === "string" ? body.platform : "both",
    contentGoal: typeof body.contentGoal === "string" ? body.contentGoal : "رشد برند و تولید محتوای آماده انتشار",
    level: typeof body.level === "string" ? body.level : "premium",
    freshness: typeof body.freshness === "string" ? body.freshness : "today",
    meditationFocus: typeof body.meditationFocus === "string" ? body.meditationFocus : undefined,
    posterStyle: typeof body.posterStyle === "string" ? body.posterStyle : undefined,
    userSeedText: typeof body.userSeedText === "string" ? body.userSeedText : undefined,
    improveAction: typeof body.improveAction === "string" ? body.improveAction : undefined,
  };
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const result = await generateLiveContent(normalize(body));
  return NextResponse.json(result);
}

export async function GET() {
  const result = await generateLiveContent({ module: "morning-studio", channel: "@yoga_saeedeh" });
  return NextResponse.json(result);
}
