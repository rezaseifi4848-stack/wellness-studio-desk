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
    : "OFFLINE";
  const sensitivity = sensitivities.includes(body.sensitivity as SensitivityLevel)
    ? (body.sensitivity as SensitivityLevel)
    : "عمومی";

  return {
    task: stringValue(body.task, "ریلز امشب"),
    platform: stringValue(body.platform, "Reel"),
    goal: stringValue(body.goal, "آرام‌سازی"),
    audience: stringValue(body.audience, "مخاطب پیج اینستاگرام"),
    topic: stringValue(body.topic, ""),
    mood: stringValue(body.mood, ""),
    duration: stringValue(body.duration, ""),
    manualSource: stringValue(body.manualSource, ""),
    cta: stringValue(body.cta, ""),
    safetyLimit: stringValue(body.safetyLimit, ""),
    researchMode,
    providerMode: stringValue(body.providerMode, "auto"),
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
    task: "ریلز امشب",
    platform: "Reel",
    goal: "آرام‌سازی",
    audience: "مخاطب پیج اینستاگرام",
    topic: "مدیتیشن خواب برای امشب",
    mood: "نرم، زنانه، آرام",
    duration: "۶۰ ثانیه",
    cta: "ذخیره کن برای قبل خواب",
    researchMode: "OFFLINE",
    providerMode: "auto",
    sensitivity: "عمومی",
  });
  return NextResponse.json(result);
}
