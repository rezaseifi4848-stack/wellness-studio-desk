import { hasUnsafeClaim } from "@/src/lib/safetyChecker";

export type QualityScore = {
  freshness: number;
  originality: number;
  nonGeneric: number;
  meditationDepth: number;
  platformFit: number;
  persianFluency: number;
  speakingUsefulness: number;
  posterUsefulness: number;
  baleUsefulness: number;
  safety: number;
  total: number;
  action: "pass" | "rewrite_recommended";
};

const weakPhrases = [
  "فقط نفس بکش",
  "آرام باش",
  "خودت را دوست داشته باش",
  "امروز شکرگزار باش",
  "به خودت برگرد",
  "لازم نیست کامل باشی",
];

export function scoreOutput(text: string): QualityScore {
  const weakHits = weakPhrases.filter((phrase) => text.includes(phrase)).length;
  const specificity = ["@yoga_saeedeh", "بله", "ریلز", "پوستر", "مدیتیشن", "سعیده"].filter((item) =>
    text.includes(item),
  ).length;
  const safety = hasUnsafeClaim(text) ? 1 : 10;
  const nonGeneric = Math.max(3, 10 - weakHits * 2);
  const base = {
    freshness: Math.min(10, 6 + specificity),
    originality: nonGeneric,
    nonGeneric,
    meditationDepth: text.includes("pause") || text.includes("مکث") ? 9 : 6,
    platformFit: Math.min(10, 5 + specificity),
    persianFluency: 8,
    speakingUsefulness: text.includes("متن آماده گفتن") || text.includes("جلوی دوربین") ? 9 : 7,
    posterUsefulness: text.includes("پوستر") ? 9 : 6,
    baleUsefulness: text.includes("بله") || text.includes("@yoga_saeedeh") ? 9 : 6,
    safety,
  };
  const total = Math.round(
    Object.values(base).reduce((sum, value) => sum + value, 0) / Object.values(base).length,
  );

  return {
    ...base,
    total,
    action: total >= 8 ? "pass" : "rewrite_recommended",
  };
}
