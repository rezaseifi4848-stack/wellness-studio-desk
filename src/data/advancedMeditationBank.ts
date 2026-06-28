import { meditationProgramNames } from "@/src/data/meditationPrograms";

export type AdvancedMeditation = {
  title: string;
  beginnerExplanation: string;
  professionalExplanation: string;
  analogies: [string, string, string];
  fullGuidedScript: string;
  oneMinute: string;
  threeMinute: string;
  fiveMinute: string;
  tenMinute: string;
  pauseMap: string;
  breathMap: string;
  voiceMap: string;
  musicSuggestion: string;
  posterSentence: string;
  caption: string;
  story: string;
  balePost: string;
  safeDisclaimer: string;
  whatNotToClaim: string;
};

export const advancedMeditationBank: AdvancedMeditation[] = meditationProgramNames.map((title) => ({
  title,
  beginnerExplanation: "این تمرین برای چند دقیقه مکث، توجه به نفس و برگشتن نرم به بدن طراحی شده.",
  professionalExplanation:
    "تمرین با تنظیم توجه، مکث‌های کوتاه و زبان بدن‌آگاهانه جلو می‌رود و هیچ ادعای درمانی یا تشخیصی ندارد.",
  analogies: [
    "مثل وقتی پنجره را باز می‌کنی تا هوا کمی تازه شود.",
    "مثل وقتی وسط روز لیوان آب را آرام می‌خوری.",
    "مثل وقتی قبل از جواب دادن، یک نفس کوتاه می‌کشی.",
  ],
  fullGuidedScript:
    "قشنگم، یک جای راحت پیدا کن. چشم‌ها اگر راحتن نرم بشن. نفس رو مجبور نمی‌کنیم؛ فقط می‌بینیمش. با هر دم کمی حضور، با هر بازدم کمی رها کردن. اگر فکرها اومدن، بذار باشن و دوباره برگرد به تماس بدن با زمین. کم‌کم شونه‌ها نرم‌تر می‌شن، فک آزادتر می‌شه و بدن فرصت پیدا می‌کنه خودش رو حس کنه. این تمرین شخصی برای آرام‌سازی ذهن و بدن و چند دقیقه مکثه.",
  oneMinute: "یک دقیقه فقط کف پاها، نفس و شونه‌ها رو حس کن. بعد با یک لبخند کوچولو برگرد.",
  threeMinute: "سه دقیقه: دقیقه اول نفس، دقیقه دوم بدن، دقیقه سوم یک جمله مهربون با خودت.",
  fiveMinute: "پنج دقیقه: نشستن، نفس، اسکن بدن، مکث قلب، برگشت آرام.",
  tenMinute: "ده دقیقه: شروع نرم، اسکن کامل بدن، تنفس آرام، سکوت کوتاه، جمله تأکیدی و برگشت مرحله‌به‌مرحله.",
  pauseMap: "بعد از هر دعوت اصلی ۳ تا ۵ ثانیه مکث؛ قبل از پایان ۸ ثانیه سکوت.",
  breathMap: "دم طبیعی، بازدم کمی طولانی‌تر؛ بدون نگه‌داشتن سخت نفس.",
  voiceMap: "آرام، نزدیک، زنانه و بدون لحن رسمی؛ جمله‌ها کوتاه و قابل شنیدن.",
  musicSuggestion: "Piano ambient یا صدای طبیعت با ولوم ۳۰ تا ۴۰ درصد صدای اصلی.",
  posterSentence: "من با یک نفس آرام به خودم برمی‌گردم.",
  caption: `${title}: چند دقیقه مکث برای تمرین شخصی و مراقبت روزانه از خود.`,
  story: `امروز ${title} داریم. دوست داری نسخه ۱ دقیقه‌ای یا ۳ دقیقه‌ای؟`,
  balePost: `🌿 ${title}\n\nامروز با یک نفس آرام شروع کنیم. این تمرین شخصی و جایگزین درمان یا مشاوره تخصصی نیست.\n@yoga_saeedeh`,
  safeDisclaimer: "این محتوا برای آموزش، آرام‌سازی و تمرین شخصی است و جایگزین مشاوره پزشکی یا درمان تخصصی نیست.",
  whatNotToClaim: "ادعای پزشکی، نتیجه قطعی، تشخیص بیماری یا وعده تغییر کامل حال روحی مطرح نشود.",
}));
