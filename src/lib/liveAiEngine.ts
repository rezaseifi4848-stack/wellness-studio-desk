import { buildDailyCommandPackage } from "@/src/lib/dailyOrchestrator";
import { getBaleSuggestions } from "@/src/lib/baleChannelEngine";
import { getMeditationPrograms } from "@/src/lib/meditationFirstEngine";
import { posterCopyEngine } from "@/src/lib/posterCopyEngine";
import { buildPremiumPrompt, type LiveGenerateRequest } from "@/src/lib/premiumPromptBuilder";
import { scoreOutput } from "@/src/lib/outputQualityGate";
import { requiredDisclaimer, sanitizeSafety } from "@/src/lib/safetyChecker";
import { getLiveSearchSignals } from "@/src/lib/liveSearchEngine";

export function engineStatus(source: string, searchActive: boolean) {
  const aiActive = Boolean(process.env.OPENAI_API_KEY);
  return {
    aiActive,
    searchActive,
    outputMode: aiActive ? "زنده" : "آفلاین محدود",
    lastGenerated: new Date().toISOString(),
    source,
    warning: aiActive
      ? undefined
      : "موتور زنده فعال نیست. برای خروجی‌های واقعاً به‌روز، باید OPENAI_API_KEY و در صورت نیاز کلید جستجو در Render تنظیم شود.",
  };
}

function localFallback(input: LiveGenerateRequest) {
  const daily = buildDailyCommandPackage();
  const posters = posterCopyEngine({ topic: input.topic, style: input.posterStyle }).map((poster, index) => ({
    dayNumber: index + 1,
    title: poster.title,
    mainAffirmation: poster.mainText,
    subtitle: poster.subtitle,
    footer: poster.footer,
    style: poster.designDirection,
    caption: poster.caption,
    baleText: poster.baleText,
    storyText: poster.storyText,
    colorTheme: poster.colorPalette,
  }));
  const meditations = getMeditationPrograms(10);
  const bale = getBaleSuggestions(10);

  return {
    message: daily.message,
    affirmations: daily.affirmations.concat(daily.affirmations).slice(0, 20),
    posterConcepts: posters,
    balePosts: bale.map((pack) => pack.channelPostText),
    captions: Object.values(daily.captions).concat(bale.map((pack) => pack.shortVersion)).slice(0, 10),
    reelHooks: daily.reel.hooks.concat(daily.reel.ideas).concat(daily.reel.hooks).slice(0, 10),
    reelScripts: Array.from({ length: 5 }, (_, index) => ({
      title: daily.reel.ideas[index] || "ریلز مدیتیشن روز",
      script: daily.reel.script,
      shotList: daily.reel.shotList,
      caption: daily.reel.caption,
      cta: daily.reel.cta,
    })),
    meditationScripts: meditations.slice(0, 5),
    storyIdeas: Array.from({ length: 20 }, (_, index) => `استوری ${index + 1}: ${daily.story}`),
    commentReplyIdeas: daily.engagement.comments.concat(daily.engagement.replies).slice(0, 20),
    dailyMission: daily.mission,
    posters,
    meditationPrograms: meditations,
    balePacks: bale,
    options: bale.map((pack) => ({
      title: pack.title,
      hook: pack.shortVersion,
      exactCopy: pack.channelPostText,
      nextStep: pack.cta,
      platformFormat: "Bale / Instagram",
      speakingPractice: "متن را یک بار آرام بخوان، بعد نسخه کوتاه را جلوی دوربین بگو.",
      posterCopy: pack.posterCopy,
      baleCopy: pack.channelPostText,
      caption: pack.longVersion,
      story: pack.commentPrompt,
      cta: pack.cta,
    })),
    qualityNotes: "حالت آفلاین محدود؛ برای خروجی واقعاً زنده کلیدهای Render را تنظیم کنید.",
    safetyLine: requiredDisclaimer,
  };
}

async function callOpenAi(prompt: string) {
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You produce original premium Persian JSON content for a wellness creator. No unsafe claims." },
        { role: "user", content: prompt },
      ],
      temperature: 0.85,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`);
  const json = await response.json();
  const content = json.choices?.[0]?.message?.content || "{}";
  return JSON.parse(sanitizeSafety(content));
}

export async function generateLiveContent(input: LiveGenerateRequest) {
  const search = await getLiveSearchSignals(input.topic);
  const source = process.env.OPENAI_API_KEY
    ? search.active
      ? "Search + OpenAI"
      : "OpenAI"
    : "Local fallback";
  const status = engineStatus(source, search.active);

  let output: unknown;
  if (process.env.OPENAI_API_KEY) {
    try {
      output = await callOpenAi(buildPremiumPrompt(input, search.signals));
    } catch (error) {
      output = {
        ...localFallback(input),
        liveError: error instanceof Error ? error.message : "OpenAI error",
      };
    }
  } else {
    output = localFallback(input);
  }

  const quality = scoreOutput(JSON.stringify(output));

  return {
    status,
    search,
    quality,
    output,
  };
}
