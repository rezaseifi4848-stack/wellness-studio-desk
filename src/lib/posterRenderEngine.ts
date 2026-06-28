export type PosterVisual = {
  dayNumber: number;
  title: string;
  mainAffirmation: string;
  subtitle: string;
  footer: string;
  style: string;
  colorTheme: string;
};

export function normalizePosterVisual(input: Partial<PosterVisual>, index = 0): PosterVisual {
  return {
    dayNumber: input.dayNumber ?? index + 1,
    title: input.title || "پوستر روز سعیده",
    mainAffirmation: input.mainAffirmation || "من با آرامش به خودم برمی‌گردم",
    subtitle: input.subtitle || "چند دقیقه مکث برای مراقبت روزانه از خود.",
    footer: input.footer || "یوگا با سعیده | @yoga_saeedeh",
    style: input.style || "مشکی طلایی لوکس",
    colorTheme: input.colorTheme || "black-gold",
  };
}
