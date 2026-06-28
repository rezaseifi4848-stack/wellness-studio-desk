import { getTodayAffirmations } from "@/src/lib/affirmationEngine";
import { getBaleSuggestions } from "@/src/lib/baleChannelEngine";
import { getDailyMeditation } from "@/src/lib/meditationFirstEngine";
import { posterCopyEngine } from "@/src/lib/posterCopyEngine";
import { getTopEngagementSuggestions } from "@/src/lib/engagementEngine";

export function buildDailyCommandPackage() {
  const meditation = getDailyMeditation();
  const poster = posterCopyEngine({ day: 1 })[0];
  const bale = getBaleSuggestions(1)[0];
  const engagement = getTopEngagementSuggestions();

  return {
    message: "صبح بخیر سعیده جان 🌿 امروز همه چیز آماده‌ست؛ فقط با یک نفس، یک پوستر و یک محتوای کوچک شروع کن.",
    affirmations: getTodayAffirmations(),
    poster,
    reel: {
      ideas: ["شروع یوگا لازم نیست کامل باشد", "سه نفس برای ذهن شلوغ", "بدن‌آگاهی وسط روز", "مدیتیشن یک دقیقه‌ای", "چرا مکث مهم است"],
      hooks: ["سلام قشنگم، اگر فکر می‌کنی برای شروع باید کامل باشی...", "ذهن شلوغه؟ بیا سه نفس با هم بکشیم.", "بدنت امروز چی می‌گه؟"],
      script: "سلام قشنگم، امروز فقط از یک نفس شروع می‌کنیم. شونه‌ها رو نرم کن، کف پاها رو حس کن و به خودت بگو: من با بدن امروز خودم شروع می‌کنم.",
      shotList: "نگاه به دوربین، دست روی قلب، کشش شونه، لبخند پایانی.",
      caption: "برای شروع لازم نیست کامل باشی؛ همین چند دقیقه مکث کافی‌ست.",
      story: "نظرسنجی: امروز شروع می‌کنی؟ آره / فقط یک نفس",
      cta: "اگر دوست داشتی، این ریلز رو ذخیره کن.",
      hashtags: "#یوگا_با_سعیده #مدیتیشن #آرامش",
      speakingPractice: "Hook را سه بار بگو، بعد ضبط کن.",
    },
    meditation,
    breathwork: {
      title: "تنفس سه‌مرحله‌ای آرام",
      explanation: "دم طبیعی، مکث کوتاه، بازدم نرم؛ بدون فشار.",
      safety: "اگر درد، سرگیجه یا شرایط خاص داری، تمرین را متوقف کن و با متخصص مشورت کن.",
      guidance: "دم... مکث کوچولو... بازدم نرم... عجله‌ای نیست.",
      posterSentence: "با هر بازدم، کمی نرم‌تر برمی‌گردم.",
    },
    speaking: "سلام قشنگم، امروز فقط یک جمله ساده می‌گم و از همان ادامه می‌دم.",
    captions: {
      short: "یک نفس آرام برای شروع امروز.",
      deep: "گاهی برگشتن به خود از یک مکث کوتاه شروع می‌شود.",
      emotional: "قشنگم، لازم نیست امروز کامل باشی.",
      educational: "بدن‌آگاهی یعنی دیدن حس بدن، بدون قضاوت.",
      bale: bale.channelPostText,
    },
    story: "اسلاید ۱: صبح سعیده. اسلاید ۲: امروز یک نفس. اسلاید ۳: تو هم همراهی؟",
    bale,
    engagement,
    mission: {
      action: "یک پوستر منتشر کن.",
      content: "یک ریلز ۳۰ ثانیه‌ای ضبط کن.",
      speaking: "Hook را جلوی آینه تمرین کن.",
      audience: "زیر ۵ پست مرتبط کامنت گرم بگذار.",
    },
    checklist: ["پوستر", "استوری", "ریلز", "مدیتیشن صوتی", "پست کانال", "کامنت‌ها", "پاسخ‌ها", "یادداشت نتیجه امروز"],
  };
}
