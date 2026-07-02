export const appRoutes = [
  { href: "/", label: "استودیوی آرامش و یوگا", shortLabel: "خانه" },
  { href: "/morning-studio", label: "صبح سعیده", shortLabel: "صبح سعیده" },
  { href: "/ai-brain-settings", label: "تنظیمات مغز سعیده", shortLabel: "مغز سعیده" },
  { href: "/mentor/saeedeh", label: "استاد زنده سعیده", shortLabel: "استاد زنده" },
  { href: "/now-engine", label: "الان چی کار کنم؟", shortLabel: "الان چی کار کنم؟" },
  { href: "/morning-studio", label: "بسته کامل امروز", shortLabel: "بسته کامل امروز" },
  { href: "/poster-studio", label: "استودیو پوستر سعیده", shortLabel: "استودیو پوستر" },
  { href: "/bale-channel", label: "موتور کانال بله سعیده", shortLabel: "موتور کانال بله" },
  { href: "/meditation-command-center", label: "مرکز مدیتیشن سعیده", shortLabel: "مرکز مدیتیشن" },
  { href: "/meditation-teaching", label: "آکادمی مدیتیشن", shortLabel: "آکادمی مدیتیشن" },
  { href: "/affirmation-challenge", label: "چالش جملات تاکیدی", shortLabel: "جملات تاکیدی" },
  { href: "/affirmation-challenge", label: "چالش‌ها", shortLabel: "چالش‌ها" },
  {
    href: "/audience-attraction",
    label: "موتور جذب مخاطب",
    shortLabel: "جذب مخاطب",
  },
  {
    href: "/soft-sales",
    label: "موتور فروش نرم",
    shortLabel: "فروش نرم",
  },
  {
    href: "/meditation-teaching",
    label: "موتور آموزش مدیتیشن",
    shortLabel: "آموزش مدیتیشن",
  },
  {
    href: "/speaking-coach",
    label: "مربی بیان و مثال‌سازی",
    shortLabel: "مربی بیان",
  },
  {
    href: "/reels-script-generator",
    label: "متن‌ساز ریلز",
    shortLabel: "ریلز",
  },
  {
    href: "/meditation-script-library",
    label: "کتابخانه متن مدیتیشن",
    shortLabel: "متن مدیتیشن",
  },
  {
    href: "/class-opening-scripts",
    label: "شروع کلاس‌ها",
    shortLabel: "شروع کلاس",
  },
  {
    href: "/chakra-explainer",
    label: "توضیح ساده چاکراها",
    shortLabel: "چاکراها",
  },
  {
    href: "/voice-music-guidance",
    label: "راهنمای صدا و موسیقی",
    shortLabel: "صدا و موسیقی",
  },
  {
    href: "/seven-day-plan",
    label: "برنامه ۷ روزه شروع پیج",
    shortLabel: "برنامه ۷ روزه",
  },
  { href: "/content-studio", label: "استودیوی تولید محتوا", shortLabel: "محتوا" },
  { href: "/example-bank", label: "بانک مثال‌ها", shortLabel: "مثال‌ها" },
  { href: "/script-builder", label: "متن‌ساز آموزش و کلاس", shortLabel: "متن‌ساز" },
  {
    href: "/daily-speaking-practice",
    label: "تمرین روزانه بیان",
    shortLabel: "تمرین روزانه",
  },
  {
    href: "/meditation-library",
    label: "کتابخانه مدیتیشن",
    shortLabel: "مدیتیشن",
  },
  { href: "/class-planner", label: "پلن‌ساز کلاس", shortLabel: "کلاس" },
  { href: "/useful-links", label: "لینک‌های کاربردی", shortLabel: "لینک‌ها" },
  {
    href: "/trend-hub",
    label: "مرکز به‌روزرسانی محتوا و ترندها",
    shortLabel: "ترندها",
  },
  { href: "/admin", label: "مدیریت محتوا", shortLabel: "مدیریت" },
] as const;

export const routeGroups = [
  {
    title: "گروه روزانه",
    routes: [
      { href: "/morning-studio", shortLabel: "صبح سعیده" },
      { href: "/ai-brain-settings", shortLabel: "مغز سعیده" },
      { href: "/mentor/saeedeh", shortLabel: "استاد زنده" },
      { href: "/now-engine", shortLabel: "الان چی کار کنم؟" },
      { href: "/morning-studio", shortLabel: "بسته کامل امروز" },
      { href: "/poster-studio", shortLabel: "استودیو پوستر" },
      { href: "/bale-channel", shortLabel: "موتور کانال بله" },
    ],
  },
  {
    title: "گروه مدیتیشن",
    routes: [
      { href: "/meditation-command-center", shortLabel: "مرکز مدیتیشن سعیده" },
      { href: "/meditation-teaching", shortLabel: "آکادمی مدیتیشن" },
      { href: "/affirmation-challenge", shortLabel: "جملات تاکیدی" },
      { href: "/affirmation-challenge", shortLabel: "چالش‌ها" },
    ],
  },
  {
    title: "گروه رشد",
    routes: [
      { href: "/audience-attraction", shortLabel: "جذب مخاطب" },
      { href: "/content-studio", shortLabel: "سری‌ساز محتوا" },
      { href: "/soft-sales", shortLabel: "فروش نرم" },
      { href: "/seven-day-plan", shortLabel: "ردیابی رشد" },
      { href: "/seven-day-plan", shortLabel: "نقشه ۹۰ روزه" },
    ],
  },
  {
    title: "گروه اجرا",
    routes: [
      { href: "/speaking-coach", shortLabel: "مربی بیان" },
      { href: "/reels-script-generator", shortLabel: "ریلز" },
      { href: "/content-studio", shortLabel: "استوری و کپشن" },
      { href: "/engagement-engine", shortLabel: "کامنت و تعامل" },
    ],
  },
] as const;

export type AppRoute = (typeof appRoutes)[number];
