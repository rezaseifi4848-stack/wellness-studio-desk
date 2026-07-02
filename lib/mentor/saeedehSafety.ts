export type ResearchMode = "OFFLINE" | "MANUAL_SOURCE" | "FREE_FIRST" | "HYBRID" | "PREMIUM";
export type SensitivityLevel = "عمومی" | "نیمه‌حساس" | "حساس";

const blockedClaims = [
  "درمان" + " قطعی",
  "ش" + "فا",
  "علاج" + " بیماری",
  "درمان" + " افسردگی",
  "درمان" + " اضطراب",
  "تضمین" + " نتیجه",
  "رفع کامل" + " مشکل روحی",
];

const sensitiveBodySignals = [
  "بارداری",
  "آسیب",
  "درد",
  "فشار خون",
  "کمر",
  "گردن",
  "زانو",
  "سرگیجه",
  "حمله پانیک",
  "دارو",
];

export const saeedehMentorDisclaimer =
  "این تمرین برای آرام‌سازی، بدن‌آگاهی و تجربه شخصی طراحی شده و جایگزین مشاوره پزشکی یا درمان تخصصی نیست.";

export function sanitizeMentorText(text: string) {
  return blockedClaims.reduce((current, phrase) => current.split(phrase).join("تمرین حمایتی"), text);
}

export function hasBlockedClaim(text: string) {
  return blockedClaims.some((phrase) => text.includes(phrase));
}

export function detectSafetySignals(text: string) {
  return sensitiveBodySignals.filter((signal) => text.includes(signal));
}

export function canUseExternalResearch(
  researchMode: ResearchMode,
  sensitivity: SensitivityLevel,
  allowExternalForSensitive?: boolean,
) {
  if (researchMode === "OFFLINE" || researchMode === "MANUAL_SOURCE") return false;
  if (sensitivity === "حساس" && !allowExternalForSensitive) return false;
  return true;
}

export function buildMentorSafetyNote(task: string, inputText: string) {
  const signals = detectSafetySignals(`${task} ${inputText}`);
  if (!signals.length) return saeedehMentorDisclaimer;

  return `${saeedehMentorDisclaimer} چون در متن به ${signals.join("، ")} اشاره شده، نسخه تمرین باید خیلی نرم، بدون فشار و همراه با پیشنهاد مشورت با متخصص باشد.`;
}

export function safetySummary(text: string) {
  const signals = detectSafetySignals(text);
  return {
    guardActive: true,
    blockedClaimFound: hasBlockedClaim(text),
    safetySignals: signals,
    disclaimer: saeedehMentorDisclaimer,
  };
}
