export const appRoutes = [
  { href: "/", label: "استودیوی آرامش و یوگا", shortLabel: "خانه" },
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

export type AppRoute = (typeof appRoutes)[number];
