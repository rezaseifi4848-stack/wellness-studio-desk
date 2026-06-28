export type AffirmationDay = {
  day: number;
  affirmation: string;
  reflectionQuestion: string;
  breathingPractice: string;
  meditationOneMinute: string;
  posterText: string;
  caption: string;
  story: string;
  balePost: string;
  commentPrompt: string;
  speakingPractice: string;
};

export type AffirmationChallenge = {
  title: string;
  days: AffirmationDay[];
};

const challengeNames = [
  "چالش ۳۰ روزه آرامش",
  "چالش ۳۰ روزه شکرگزاری",
  "چالش ۳۰ روزه بدن‌آگاهی",
  "چالش ۲۱ روزه مدیتیشن قبل خواب",
  "چالش ۷ روزه برگشتن به خود",
  "چالش ۱۴ روزه تنفس آگاهانه",
  "چالش ۷ روزه قلب آرام",
  "چالش ۷ روزه شروع یوگا",
  "چالش ۱۰ روزه سکوت ذهن",
  "چالش ۳۰ روزه من با آرامش...",
];

function buildDays(total: number, seed: string): AffirmationDay[] {
  return Array.from({ length: total }, (_, index) => {
    const day = index + 1;
    const affirmation = `من امروز با ${seed} و یک نفس آرام شروع می‌کنم.`;

    return {
      day,
      affirmation,
      reflectionQuestion: "امروز بدنم بیشتر به چه نوع مهربونی نیاز داره؟",
      breathingPractice: "سه دم آرام، سه بازدم نرم؛ بدون فشار و بدون عجله.",
      meditationOneMinute: "یک دقیقه بشین، کف پاها رو حس کن، نفس رو ببین و کم‌کم برگرد.",
      posterText: affirmation,
      caption: `${affirmation}\n\nروز ${day} چالش؛ چند دقیقه مکث برای مراقبت روزانه از خود.`,
      story: `روز ${day}: ${affirmation}\nاستیکر سوال: امروز چه حسی داری؟`,
      balePost: `🌿 روز ${day}\n${affirmation}\n\nیک دقیقه مکث کن و بعد حس بدنت رو بنویس.\n@yoga_saeedeh`,
      commentPrompt: "اگر امروز با این جمله همراهی، یک 🤍 بگذار.",
      speakingPractice: "جمله تاکیدی را سه بار جلوی آینه بگو؛ بار سوم با مکث و لبخند کوچولو.",
    };
  });
}

export const affirmationChallenges: AffirmationChallenge[] = challengeNames.map((title) => {
  const total = title.includes("۲۱") ? 21 : title.includes("۱۴") ? 14 : title.includes("۱۰") ? 10 : title.includes("۷") ? 7 : 30;
  const seed = title.replace("چالش", "").trim();

  return {
    title,
    days: buildDays(total, seed),
  };
});
