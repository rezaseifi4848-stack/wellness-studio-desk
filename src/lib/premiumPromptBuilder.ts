import { requiredDisclaimer } from "@/src/lib/safetyChecker";

export type LiveGenerateRequest = {
  module?: string;
  channel?: string;
  outputType?: string;
  persona?: string;
  topic?: string;
  platform?: "Bale" | "Instagram" | "both" | string;
  contentGoal?: string;
  level?: "pro" | "premium" | "elite" | string;
  freshness?: "today" | "this week" | "evergreen" | string;
  meditationFocus?: string;
  posterStyle?: string;
  userSeedText?: string;
  improveAction?: string;
};

export function buildPremiumPrompt(input: LiveGenerateRequest, searchSignals: string[]) {
  const moduleName = input.module || "morning-studio";
  const platform = input.platform || "both";
  const topic = input.topic || "مدیتیشن، بدن‌آگاهی و رشد برند یوگا با سعیده";

  return `
تو موتور محتوای فارسی پرمیوم برای «یوگا با سعیده» هستی.
کانال اصلی: ${input.channel || "@yoga_saeedeh"}
ماژول: ${moduleName}
پلتفرم: ${platform}
هدف محتوا: ${input.contentGoal || "رشد برند، مدیتیشن، تعامل و فروش نرم"}
سطح: ${input.level || "premium"}
تازگی: ${input.freshness || "today"}
موضوع: ${topic}
تمرکز مدیتیشن: ${input.meditationFocus || "آرام‌سازی ذهن و بدن، تمرین شخصی، مکث"}
سبک پوستر: ${input.posterStyle || "مشکی طلایی لوکس و کرم/سبز آرام"}
متن اولیه کاربر: ${input.userSeedText || "ندارد"}
درخواست بهبود: ${input.improveAction || "تولید نسخه نهایی"}

سیگنال‌های جستجو فقط برای الهام، بدون کپی:
${searchSignals.length ? searchSignals.join("\n") : "جستجوی زنده فعال نیست."}

قانون مهم:
خروجی باید اصل، امروزی، فارسی طبیعی، سعیده‌ای، غیرکلیشه‌ای، آماده کپی و آماده ضبط باشد.
از لحن رسمی، ترجمه‌زده، ادعای عجیب معنوی و ادعای پزشکی دوری کن.
هر خروجی باید مخاطب مشخص، تنش احساسی، زاویه تازه، اقدام عملی، فرمت مناسب پلتفرم، متن دقیق و قدم بعدی داشته باشد.
جمله‌های خیلی سطحی فقط اگر با متن عمیق و مشخص گسترش داده شوند مجازند.

برای ماژول morning-studio خروجی JSON بده با:
message, affirmations[20], posterConcepts[10], balePosts[10], captions[10], reelHooks[10],
reelScripts[5], meditationScripts[5], storyIdeas[20], commentReplyIdeas[20], dailyMission

برای poster-studio خروجی JSON بده با posters[10] که هرکدام: dayNumber,title,mainAffirmation,subtitle,footer,style,caption,baleText,storyText,colorTheme

برای meditation-command-center خروجی JSON بده با meditationPrograms[10] که هرکدام:
title,beginnerExplanation,professionalExplanation,exactSpokenGuide,breathMap,pauseMap,voiceMap,musicDirection,posterSentence,balePost,reelVersion,safeDisclaimer

برای bale-channel خروجی JSON بده با balePacks[10] که هرکدام:
postTitle,fullPost,shortPost,posterText,voiceNoteScript,commentPrompt,replySuggestions,cta,pinnedMessageIdea,weeklySequence

برای بقیه ماژول‌ها خروجی JSON بده با options[10] که هرکدام:
title,hook,exactCopy,nextStep,platformFormat,speakingPractice,posterCopy,baleCopy,caption,story,cta

همیشه qualityNotes و safetyLine هم اضافه کن.
safetyLine باید این باشد: ${requiredDisclaimer}
`.trim();
}
