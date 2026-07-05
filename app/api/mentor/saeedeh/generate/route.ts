import { NextRequest, NextResponse } from "next/server";
import { generateSaeedehMentor, type SaeedehMentorInput } from "@/lib/mentor/saeedeh";
import type { ResearchMode, SensitivityLevel } from "@/lib/mentor/saeedehSafety";

const researchModes: ResearchMode[] = ["OFFLINE", "MANUAL_SOURCE", "FREE_FIRST", "HYBRID", "PREMIUM"];
const sensitivities: SensitivityLevel[] = ["عمومی", "نیمه‌حساس", "حساس"];

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function normalize(body: Record<string, unknown>): SaeedehMentorInput {
  const researchMode = researchModes.includes(body.researchMode as ResearchMode)
    ? (body.researchMode as ResearchMode)
    : "FREE_FIRST";
  const sensitivity = sensitivities.includes(body.sensitivity as SensitivityLevel)
    ? (body.sensitivity as SensitivityLevel)
    : "عمومی";

  return {
    task: stringValue(body.task, "Daily pack"),
    platform: stringValue(body.platform, "Reel"),
    goal: stringValue(body.goal, "Calm"),
    audience: stringValue(body.audience, "Audience"),
    topic: stringValue(body.topic, "Daily calm content"),
    mood: stringValue(body.mood, "Warm and calm"),
    duration: stringValue(body.duration, "45 seconds"),
    manualSource: stringValue(body.manualSource, ""),
    cta: stringValue(body.cta, "Save this post."),
    safetyLimit: stringValue(body.safetyLimit, "Educational content."),
    researchMode,
    providerMode: stringValue(body.providerMode, "FREE_FIRST"),
    sensitivity,
    allowExternalForSensitive: body.allowExternalForSensitive === true,
  };
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const result = await generateSaeedehMentor(normalize(body));
  return NextResponse.json(result);
}

export async function GET() {
  const result = await generateSaeedehMentor({
    task: "Daily pack",
    platform: "Reel",
    goal: "Calm",
    audience: "Audience",
    topic: "Daily calm content",
    mood: "Warm and calm",
    duration: "45 seconds",
    cta: "Save this post.",
    researchMode: "FREE_FIRST",
    providerMode: "FREE_FIRST",
    sensitivity: "عمومی",
  });
  return NextResponse.json(result);
}
