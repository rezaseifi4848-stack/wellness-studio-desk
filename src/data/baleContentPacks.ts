export type BaleContentPack = {
  title: string;
  channelPostText: string;
  shortVersion: string;
  longVersion: string;
  posterCopy: string;
  commentPrompt: string;
  replySuggestions: string[];
  cta: string;
  hashtags?: string;
};

const baleTypes = [
  "پوستر روز",
  "متن روزانه کانال",
  "چالش روزانه",
  "مدیتیشن صوتی روز",
  "پیام کوتاه صبحگاهی",
  "پیام شبانه",
  "پرسش تعاملی",
  "نظرخواهی",
  "دعوت به تمرین",
  "معرفی ریلز امروز",
  "دعوت نرم به کلاس",
  "جواب کامنت‌ها",
  "متن پین‌شده کانال",
  "معرفی کانال",
  "تقویم هفتگی کانال",
];

export const baleContentPacks: BaleContentPack[] = baleTypes.map((title, index) => ({
  title,
  channelPostText: `🌿 ${title}\n\nقشنگم، امروز فقط چند دقیقه مکث کنیم. نفس رو ببین، بدن رو حس کن و با خودت نرم‌تر حرف بزن.\n\nکانال: @yoga_saeedeh`,
  shortVersion: `امروز یک نفس آرام و یک مکث کوتاه با @yoga_saeedeh`,
  longVersion:
    "گاهی تمام چیزی که لازم داریم یک شروع ساده است؛ چند دقیقه آرام‌سازی ذهن و بدن، یک جمله مهربون و یک تمرین شخصی کوتاه. این محتوا جایگزین درمان یا مشاوره تخصصی نیست.",
  posterCopy: index % 2 === 0 ? "من با آرامش به خودم برمی‌گردم" : "امروز فقط یک نفس کافی‌ست",
  commentPrompt: "تو امروز بیشتر به آرامش نیاز داری یا انرژی؟",
  replySuggestions: ["قشنگم از همین یک نفس شروع کن.", "عجله‌ای نیست؛ بدن امروزت کافیه.", "اگر دوست داشتی حس امروزت رو بنویس."],
  cta: "اگر این پیام به دلت نشست، برای یک دوست هم بفرست.",
  hashtags: "#یوگا_با_سعیده #مدیتیشن #آرامش",
}));
