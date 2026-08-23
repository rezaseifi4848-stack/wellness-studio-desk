export const ABJAD_MAP: Record<string, number> = {
  ا: 1, آ: 1, أ: 1, إ: 1,
  ب: 2, پ: 2,
  ج: 3, چ: 3,
  د: 4,
  ه: 5, ة: 5,
  و: 6, ؤ: 6,
  ز: 7, ژ: 7,
  ح: 8,
  ط: 9,
  ی: 10, ي: 10, ى: 10, ئ: 10,
  ک: 20, ك: 20, گ: 20,
  ل: 30,
  م: 40,
  ن: 50,
  س: 60,
  ع: 70,
  ف: 80,
  ص: 90,
  ق: 100,
  ر: 200,
  ش: 300,
  ت: 400,
  ث: 500,
  خ: 600,
  ذ: 700,
  ض: 800,
  ظ: 900,
  غ: 1000,
};

export function normalizePersian(input: string) {
  return input
    .trim()
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/ي/g, "ی")
    .replace(/ى/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ");
}

export function abjad(input: string) {
  const normalized = normalizePersian(input).replace(/\s/g, "");
  return Array.from(normalized).reduce((total, char) => total + (ABJAD_MAP[char] ?? 0), 0);
}

export function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

export type StatusTone = "good" | "neutral" | "bad" | "pending";

export interface RuleResult {
  key: string;
  title: string;
  formula: string;
  total: number;
  divisor: number;
  remainder: number;
  label: string;
  tone: StatusTone;
  note?: string;
}

export function trendResult(person: number, mother: number): RuleResult {
  const total = person + mother;
  const remainder = mod(total, 3);
  const map: Record<number, { label: string; tone: StatusTone }> = {
    0: { label: "ثابت", tone: "neutral" },
    1: { label: "نزولی", tone: "bad" },
    2: { label: "صعودی", tone: "good" },
  };
  return {
    key: "trend",
    title: "روند شخص",
    formula: "(ابجد اسم فرد + ابجد اسم مادر) ÷ ۳",
    total,
    divisor: 3,
    remainder,
    ...map[remainder],
  };
}

export function stepResult(person: number, father: number): RuleResult {
  const total = person + father;
  const remainder = mod(total, 3);
  const map: Record<number, { label: string; tone: StatusTone }> = {
    0: { label: "خوش‌قدم", tone: "good" },
    1: { label: "بدقدم", tone: "bad" },
    2: { label: "خنثی", tone: "neutral" },
  };
  return {
    key: "step",
    title: "قدم",
    formula: "(ابجد اسم فرد + ابجد اسم پدر) ÷ ۳",
    total,
    divisor: 3,
    remainder,
    ...map[remainder],
    note: "نگاشت قدم بر مبنای قواعد فعلی جزوه ثبت شده و در صورت اصلاح استاد نسخه‌بندی می‌شود.",
  };
}

export function coupleResult(female: number, male: number): RuleResult {
  const total = female + male;
  const remainder = mod(total, 5);
  const map: Record<number, { label: string; tone: StatusTone }> = {
    0: { label: "عشق آسمانی", tone: "good" },
    1: { label: "ضعیف", tone: "bad" },
    2: { label: "نیازمند توجه", tone: "neutral" },
    3: { label: "دوست داشتن", tone: "good" },
    4: { label: "جذابیت و علاقه", tone: "good" },
  };
  return {
    key: "couple",
    title: "تفاهم زوجین",
    formula: "(ابجد اسم زن + ابجد اسم مرد) ÷ ۵",
    total,
    divisor: 5,
    remainder,
    ...map[remainder],
    note: "این خروجی تفسیر سنتیِ روش جزوه است و سنجش علمی رابطه محسوب نمی‌شود.",
  };
}

export function healthResult(female: number, male: number): RuleResult {
  const total = female + male + 32;
  const remainder = mod(total, 9);
  const even = remainder % 2 === 0;
  return {
    key: "health",
    title: "سلامت زوجین",
    formula: "(ابجد اسم زن + ابجد اسم مرد + ۳۲) ÷ ۹",
    total,
    divisor: 9,
    remainder,
    label: even ? "زوج / مطلوب در روش جزوه" : "فرد / نیازمند بررسی",
    tone: even ? "good" : "pending",
    note: "صرفاً تفسیر سنتی بر اساس جزوه؛ کاربرد پزشکی یا تشخیصی ندارد.",
  };
}

export function surnameResult(person: number, surname: number): RuleResult {
  const total = person + surname;
  const remainder = mod(total, 3);
  return {
    key: "surname",
    title: "هماهنگی اسم و فامیل",
    formula: "(ابجد اسم + ابجد فامیل) ÷ ۳",
    total,
    divisor: 3,
    remainder,
    label: `باقیمانده ${remainder}`,
    tone: "pending",
    note: "تفسیر نهایی باقیمانده‌های این قانون هنوز نیازمند تأیید سعیده است.",
  };
}
