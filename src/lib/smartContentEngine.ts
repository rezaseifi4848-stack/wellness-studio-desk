import {
  internalTrendNotice,
  smartContentPackages,
  type SuggestionEngineKey,
  type SuggestionPackage,
} from "@/src/data/modernWellnessStyles";

export type SmartContentRequest = {
  engine: SuggestionEngineKey;
  topic?: string;
  tone?: string;
};

export type SmartContentResponse = {
  notice?: string;
  suggestions: SuggestionPackage[];
};

export function SmartContentEngine(request: SmartContentRequest): SmartContentResponse {
  const suggestions = smartContentPackages[request.engine] ?? smartContentPackages.dailyReels;

  return {
    notice: internalTrendNotice,
    suggestions,
  };
}

export function getSmartContentSuggestions(engine: SuggestionEngineKey) {
  return SmartContentEngine({ engine }).suggestions;
}

export function formatSuggestionPackage(item: SuggestionPackage) {
  return [
    `عنوان: ${item.title}`,
    `دسته: ${item.category}`,
    "",
    `Hook سه‌ثانیه‌ای: ${item.hook ?? item.shortVersion}`,
    `متن آماده گفتن: ${item.readyText}`,
    `نسخه کوتاه: ${item.shortVersion}`,
    "",
    "نسخه کامل:",
    item.fullVersion,
    "",
    "۳ مثال روزمره:",
    `۱. ${item.everydayExamples[0]}`,
    `۲. ${item.everydayExamples[1]}`,
    `۳. ${item.everydayExamples[2]}`,
    "",
    `جمله نجات: ${item.rescueLine}`,
    `تمرین بیان: ${item.speakingPractice}`,
    item.caption ? `کپشن: ${item.caption}` : undefined,
    item.story ? `استوری مکمل: ${item.story}` : undefined,
    item.storySequence ? `استوری ۳ اسلایدی:\n۱. ${item.storySequence[0]}\n۲. ${item.storySequence[1]}\n۳. ${item.storySequence[2]}` : undefined,
    item.softCta ? `CTA نرم: ${item.softCta}` : undefined,
    `پیشنهاد تصویر/ویدیو: ${item.visualSuggestion}`,
    `Shot list: ${item.shotList ?? item.visualSuggestion}`,
    `هشتگ‌ها: ${item.hashtags ?? "#یوگا_با_سعیده #یوگا #مدیتیشن #آرامش #مراقبت_از_خود"}`,
    item.musicSuggestion ? `پیشنهاد موسیقی/فضاسازی: ${item.musicSuggestion}` : undefined,
    item.audiencePainPoint ? `دغدغه مخاطب: ${item.audiencePainPoint}` : undefined,
    item.trustSentence ? `جمله اعتمادساز: ${item.trustSentence}` : undefined,
    item.classInvitation ? `دعوت به کلاس: ${item.classInvitation}` : undefined,
    item.salesTechnique ? `تکنیک فروش نرم: ${item.salesTechnique}` : undefined,
    item.objectionHandling ? `پاسخ به تردید مخاطب: ${item.objectionHandling}` : undefined,
    item.teachingScript ? `متن آموزشی: ${item.teachingScript}` : undefined,
    item.meditationScript ? `متن مدیتیشن: ${item.meditationScript}` : undefined,
    item.pauseMarks ? `مکث‌ها: ${item.pauseMarks}` : undefined,
    item.voiceGuide ? `راهنمای صدا: ${item.voiceGuide}` : undefined,
    item.safeDisclaimer ? `جمله ایمنی: ${item.safeDisclaimer}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}
