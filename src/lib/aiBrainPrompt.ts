import { saeedehBrainConfig, type SaeedehBrainMode } from "@/src/data/saeedehBrainConfig";
import { requiredDisclaimer } from "@/src/lib/safetyChecker";

export type AiBrainPromptInput = {
  module?: string;
  channel?: string;
  outputType?: string;
  persona?: string;
  topic?: string;
  platform?: string;
  contentGoal?: string;
  level?: string;
  freshness?: string;
  meditationFocus?: string;
  posterStyle?: string;
  userSeedText?: string;
  improveAction?: string;
  brainMode?: SaeedehBrainMode | string;
  strictPublishReady?: boolean;
};

function getModeInstruction(mode?: string) {
  if (!mode || !(mode in saeedehBrainConfig.brainModes)) {
    return saeedehBrainConfig.brainModes.premium.instruction;
  }

  return saeedehBrainConfig.brainModes[mode as SaeedehBrainMode].instruction;
}

export function buildAiBrainSystemPrompt(input: AiBrainPromptInput = {}) {
  const config = saeedehBrainConfig;
  const strict = input.strictPublishReady ?? true;

  return `
تو مغز هوش مصنوعی برند «${config.brandName}» هستی.
کانال اصلی: ${input.channel || config.channel}
شخصیت برند: ${config.brandVoice.join("، ")}
تمرکزهای اصلی: ${config.mainFocus.join("، ")}
مخاطب اصلی: ${config.audience.join("، ")}

قانون لحن:
فارسی باید محاوره‌ای، گرم، زنانه، طبیعی، قابل خواندن با صدای سعیده و دور از متن خشک یا کلاس درسی باشد.
متن باید حس بدهد سعیده دارد مستقیم با آدم واقعی حرف می‌زند.

قانون کیفیت سخت:
${config.hardQualityRules.map((rule) => `- ${rule}`).join("\n")}

عبارت‌های ضعیف فقط وقتی مجازند که با مثال واقعی، متن عمیق و زاویه تازه کامل شوند:
${config.forbiddenWeakPhrases.map((phrase) => `- ${phrase}`).join("\n")}

ادعای پزشکی ممنوع:
${config.forbiddenMedicalClaims.map((phrase) => `- ${phrase}`).join("\n")}

واژه‌های امن پیشنهادی:
${config.safeWording.map((phrase) => `- ${phrase}`).join("\n")}

دستور حالت انتخاب‌شده:
${getModeInstruction(input.brainMode)}

قانون خروجی:
${strict ? "فقط JSON معتبر برگردان. هیچ توضیح، مقدمه، متن توسعه‌دهنده یا عبارت اضافه قبل و بعد JSON ننویس." : "JSON معتبر برگردان و توضیح اضافه را حذف کن."}
همه بخش‌ها باید آماده کپی، آماده ضبط یا آماده انتشار باشند.
هر متن آموزشی یا فروش نرم باید نسخه ساده‌تر برای گفتن جلوی دوربین، ۳ مثال ساده روزمره، جمله نجات و تمرین بیان داشته باشد.
خط ایمنی ثابت همیشه در safety.disclaimer باشد: ${requiredDisclaimer}
`.trim();
}

export function buildAiBrainUserPrompt(input: AiBrainPromptInput, searchSignals: string[] = []) {
  const moduleName = input.module || "morning-studio";
  const platform = input.platform || "both";
  const topic = input.topic || "مدیتیشن، بدن‌آگاهی و رشد برند یوگا با سعیده";

  return `
ماژول: ${moduleName}
نوع خروجی: ${input.outputType || "daily-package"}
پلتفرم: ${platform}
هدف محتوا: ${input.contentGoal || "رشد برند، مدیتیشن، تعامل و فروش نرم"}
سطح: ${input.level || "premium"}
تازگی: ${input.freshness || "today"}
موضوع: ${topic}
تمرکز مدیتیشن: ${input.meditationFocus || "مدیتیشن به‌عنوان قلب برند"}
سبک پوستر: ${input.posterStyle || "کرم، سبز سیج، طلایی نرم، زنانه و لوکس"}
متن اولیه کاربر: ${input.userSeedText || "ندارد"}
درخواست بهبود: ${input.improveAction || "تولید نسخه نهایی"}

سیگنال‌های جستجو فقط برای الهام، بدون کپی:
${searchSignals.length ? searchSignals.join("\n") : "جستجوی زنده فعال نیست؛ از بانک داخلی و قوانین برند استفاده کن."}

قرارداد JSON دقیق:
{
  "engineStatus": {},
  "qualityScore": {},
  "safety": {},
  "outputs": {
    "poster": {},
    "balePost": {},
    "caption": {},
    "story": {},
    "reel": {},
    "meditation": {},
    "speakingPractice": {},
    "comments": []
  },
  "improveActions": []
}

داخل outputs برای بخش‌های مرتبط این موارد را بگذار:
- متن آماده گفتن
- نسخه کوتاه
- نسخه کامل
- ۳ مثال روزمره
- جمله نجات اگر سعیده وسط صحبت گیر کرد
- تمرین بیان
- کپشن اگر مرتبط است
- استوری مکمل اگر مرتبط است
- CTA نرم اگر مرتبط است
- پیشنهاد تصویر/ویدیو
- پیشنهاد موسیقی/فضاسازی اگر مرتبط است

برای ${moduleName} خروجی را دقیقاً متناسب با همین ماژول قوی‌تر کن.
`.trim();
}

export function buildAiBrainPrompt(input: AiBrainPromptInput, searchSignals: string[] = []) {
  return `${buildAiBrainSystemPrompt(input)}\n\n${buildAiBrainUserPrompt(input, searchSignals)}`;
}
