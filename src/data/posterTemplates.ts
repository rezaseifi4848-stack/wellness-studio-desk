export type PosterTemplate = {
  type: string;
  title: string;
  mainText: string;
  subtitle: string;
  footer: string;
  caption: string;
  baleText: string;
  storyText: string;
  designDirection: string;
  colorPalette: string;
  typography: string;
  imagePrompt: string;
};

const posterTypes = [
  "جمله تاکیدی روز",
  "جمله تأملی روز",
  "چرا باید شکرگزاری کنیم؟",
  "تنفس آگاهانه",
  "من با آرامش...",
  "من با قلبی آرام...",
  "برگشتن به خود",
  "مراقبت از خود",
  "مدیتیشن قبل خواب",
  "شروع صبح",
  "روزهای چالش ۳۰ روزه",
  "چاکراها بدون اغراق",
  "سکوت ذهن",
  "بدن‌آگاهی",
  "دعوت به مکث",
];

const mainTexts = [
  "من با آرامش به خودم برمی‌گردم",
  "امروز فقط یک نفس کافی‌ست",
  "بدنم را می‌شنوم، نه قضاوت می‌کنم",
  "آرامش از همین مکث شروع می‌شود",
  "قلبم به اندازه امن امروز باز است",
];

export const posterTemplates: PosterTemplate[] = posterTypes.map((type, index) => {
  const mainText = mainTexts[index % mainTexts.length];

  return {
    type,
    title: `${type} ${index + 1}`,
    mainText,
    subtitle: "چند دقیقه مکث برای مراقبت روزانه از خود.",
    footer: "@yoga_saeedeh | یوگا با سعیده",
    caption: `${mainText}\n\nقشنگم، امروز فقط چند دقیقه برای نفس و بدن وقت بذار. این تمرین شخصی و جایگزین درمان یا مشاوره تخصصی نیست.`,
    baleText: `🌿 ${type}\n\n${mainText}\n\nامروز با یک نفس آروم شروع کنیم. عجله‌ای نیست؛ همین مکث کوتاه هم تمرینه.\n\n@yoga_saeedeh`,
    storyText: `${mainText}\nامروز چند دقیقه به خودت برگرد 🌙`,
    designDirection:
      index % 3 === 0
        ? "پس‌زمینه مشکی مات، قاب طلایی نازک، نماد ماه یا نیلوفر کوچک، فضای خالی زیاد."
        : "پس‌زمینه کرم و سبز آرام، متن مرکزی، برگ یا نور نرم در گوشه تصویر.",
    colorPalette: index % 3 === 0 ? "مشکی #111111، طلایی #D7C09A، سفید گرم #F8F6F1" : "کرم #F4EEDB، sage #A8B8A0، طلایی نرم #D7C09A",
    typography: "تیتر نستعلیق/سریف فارسی خوانا، متن فرعی ساده و خلوت، فاصله خطوط زیاد.",
    imagePrompt: `Elegant Persian meditation poster, ${type}, lotus or moon symbol, premium calm layout, readable gold Persian typography, no medical claims.`,
  };
});

export const posterStyles = [
  "مشکی طلایی لوکس",
  "کرم و سبز آرام",
  "ماه و نیلوفر",
  "مینیمال سفید",
  "شب و مدیتیشن",
  "زنانه و لطیف",
  "حکیمانه و کوتاه",
];
