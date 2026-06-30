import { saeedehBrainConfig } from "@/src/data/saeedehBrainConfig";
import { buildDailyCommandPackage } from "@/src/lib/dailyOrchestrator";
import { getBaleSuggestions } from "@/src/lib/baleChannelEngine";
import { getMeditationPrograms } from "@/src/lib/meditationFirstEngine";
import { posterCopyEngine } from "@/src/lib/posterCopyEngine";
import { buildPremiumPrompt, type LiveGenerateRequest } from "@/src/lib/premiumPromptBuilder";
import { buildAiBrainSystemPrompt } from "@/src/lib/aiBrainPrompt";
import { scoreOutput } from "@/src/lib/outputQualityGate";
import { requiredDisclaimer, sanitizeSafety, hasUnsafeClaim } from "@/src/lib/safetyChecker";
import { getLiveSearchSignals } from "@/src/lib/liveSearchEngine";

type UnknownRecord = Record<string, unknown>;

export function engineStatus(source: string, searchActive: boolean) {
  const openAiKeyActive = Boolean(process.env.OPENAI_API_KEY);
  const modelFromEnv = process.env.OPENAI_MODEL;
  const warnings = [
    !openAiKeyActive ? "کلید OpenAI در Render تنظیم نشده است." : undefined,
    !modelFromEnv ? "OPENAI_MODEL تنظیم نشده؛ مدل پیش‌فرض استفاده شد." : undefined,
    !searchActive ? "جستجوی زنده فعال نیست؛ خروجی از مغز داخلی برند ساخته می‌شود." : undefined,
  ].filter(Boolean) as string[];

  return {
    openAiKeyActive,
    openAiModel: modelFromEnv || saeedehBrainConfig.defaultModel,
    liveAiEnabled: openAiKeyActive,
    liveSearchEnabled: searchActive,
    outputMode: openAiKeyActive ? "live" : "offline fallback",
    lastGenerated: new Date().toISOString(),
    source,
    warnings,
    aiActive: openAiKeyActive,
    searchActive,
    warning: warnings.join(" "),
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
      speakingPractice: "متن را یک بار آرام بخون، بعد نسخه کوتاه را جلوی دوربین بگو. عجله‌ای نیست.",
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

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as UnknownRecord) : {};
}

function extractExistingOutputs(raw: UnknownRecord) {
  const existing = asRecord(raw.outputs);
  return {
    poster: existing.poster ?? {
      readyText: raw.posterConcepts ?? raw.posters ?? [],
      copyReadySection: "پوسترهای آماده برای بله و اینستاگرام",
    },
    balePost: existing.balePost ?? {
      readyText: raw.balePacks ?? raw.balePosts ?? [],
      copyReadySection: "پست‌های آماده کانال بله",
    },
    caption: existing.caption ?? {
      readyText: raw.captions ?? [],
      shortVersion: "کپشن کوتاه آماده انتشار",
      fullVersion: raw.qualityNotes ?? "",
    },
    story: existing.story ?? {
      readyText: raw.storyIdeas ?? [],
      companionStory: "استوری مکمل با سوال نرم و دعوت به مکث",
    },
    reel: existing.reel ?? {
      readyTextToSay: raw.reelScripts ?? raw.reelHooks ?? [],
      shorterCameraVersion: "قشنگم، یه لحظه با هم مکث کنیم و برگردیم به بدن.",
      everydayExamples: ["بعد از کار", "قبل خواب", "وسط یک روز شلوغ"],
      rescueLine: "اگه وسط حرف گیر کردی، آروم بگو: بذار از یه مثال ساده بگم...",
      speakingPractice: "یک بار نجوا، یک بار با صدای معمولی، یک بار جلوی دوربین بخون.",
      visualSuggestion: "نمای نزدیک دست روی قلب، نور نرم کنار پنجره",
    },
    meditation: existing.meditation ?? {
      readyTextToRead: raw.meditationScripts ?? raw.meditationPrograms ?? [],
      pauseMarks: "بین جمله‌ها ۲ تا ۴ ثانیه مکث کن.",
      musicDirection: "پیانو ambient خیلی نرم یا صدای طبیعت کم‌حجم",
    },
    speakingPractice: existing.speakingPractice ?? {
      readyTextToSay: "سلام قشنگم، امروز فقط چند دقیقه با هم برای آرام‌تر شدن مکث می‌کنیم.",
      shorterCameraVersion: "یه لحظه با هم نفس بکشیم؛ عجله‌ای نیست.",
      everydayExamples: ["وقتی ذهنت شلوغه", "وقتی بدنت خسته‌ست", "وقتی وقت زیادی نداری"],
      rescueLine: "اگه جمله یادت رفت، لبخند بزن و بگو: از همین‌جا دوباره نرم شروع می‌کنم.",
      speakingPractice: "متن را در سه سرعت آرام، معمولی و خیلی نرم ضبط کن.",
    },
    comments: Array.isArray(existing.comments) ? existing.comments : raw.commentReplyIdeas ?? [],
  };
}

function normalizeContract(rawOutput: unknown, status: ReturnType<typeof engineStatus>) {
  const raw = asRecord(rawOutput);
  const text = JSON.stringify(raw);
  const qualityScore = scoreOutput(text);
  const safety = {
    status: hasUnsafeClaim(text) ? "needs_review" : "safe",
    unsafeClaimFound: hasUnsafeClaim(text),
    disclaimer: requiredDisclaimer,
    safeWording: saeedehBrainConfig.safeWording,
  };
  const improveActions = Array.isArray(raw.improveActions)
    ? raw.improveActions
    : [
        "۱۰ برابر حرفه‌ای‌ترش کن",
        "کمتر کلیشه‌ای کن",
        "مخصوص کانال بله کن",
        "نسخه کوتاه جلوی دوربین بده",
        "دعوت نرم‌تر به کلاس اضافه کن",
      ];

  return {
    engineStatus: { ...status, ...(asRecord(raw.engineStatus) as object) },
    qualityScore: { ...qualityScore, ...(asRecord(raw.qualityScore) as object) },
    safety: { ...safety, ...(asRecord(raw.safety) as object) },
    outputs: extractExistingOutputs(raw),
    improveActions,
  };
}

function parseAiContent(content: string) {
  const safe = sanitizeSafety(content);
  try {
    return JSON.parse(safe);
  } catch {
    return {
      outputs: {
        poster: {},
        balePost: {},
        caption: { readyText: safe },
        story: {},
        reel: { readyTextToSay: safe },
        meditation: {},
        speakingPractice: {},
        comments: [],
      },
      improveActions: ["بازنویسی ساختارمند", "کوتاه‌تر کن", "برای بله آماده کن"],
    };
  }
}

async function callOpenAi(input: LiveGenerateRequest, prompt: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || saeedehBrainConfig.defaultModel,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildAiBrainSystemPrompt(input) },
        { role: "user", content: prompt },
      ],
      temperature: 0.82,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`);
  const json = await response.json();
  const content = json.choices?.[0]?.message?.content || "{}";
  return parseAiContent(content);
}

export async function generateLiveContent(input: LiveGenerateRequest) {
  const strictInput = { ...input, strictPublishReady: input.strictPublishReady ?? true };
  const search = await getLiveSearchSignals(strictInput.topic);
  const source = process.env.OPENAI_API_KEY
    ? search.active
      ? "OpenAI + live search"
      : "OpenAI"
    : "Local fallback";
  const status = engineStatus(source, search.active);

  let rawOutput: unknown;
  if (process.env.OPENAI_API_KEY) {
    try {
      rawOutput = await callOpenAi(strictInput, buildPremiumPrompt(strictInput, search.signals));
    } catch (error) {
      rawOutput = {
        ...localFallback(strictInput),
        liveError: error instanceof Error ? error.message : "OpenAI error",
      };
    }
  } else {
    rawOutput = localFallback(strictInput);
  }

  let contract = normalizeContract(rawOutput, status);
  const notes: string[] = [];

  if (contract.qualityScore.total < 8) {
    if (process.env.OPENAI_API_KEY) {
      try {
        const improved = await callOpenAi(
          { ...strictInput, improveAction: "خروجی قبلی ضعیف بود؛ آن را publish-ready، غیرکلیشه‌ای و ساختارمند بازنویسی کن." },
          buildPremiumPrompt(
            { ...strictInput, improveAction: "خروجی قبلی ضعیف بود؛ آن را publish-ready، غیرکلیشه‌ای و ساختارمند بازنویسی کن." },
            search.signals,
          ),
        );
        contract = normalizeContract(improved, status);
        notes.push("خروجی اول ضعیف بود؛ موتور آن را بازنویسی کرد.");
      } catch {
        notes.push("خروجی اول به بازنویسی نیاز داشت، اما بازنویسی زنده در دسترس نبود.");
      }
    } else {
      notes.push("خروجی اول ضعیف بود؛ موتور داخلی آن را با بانک آماده برند کامل‌تر کرد.");
    }
  }

  const finalResult = {
    ...contract,
    engineStatus: {
      ...contract.engineStatus,
      lastGenerated: new Date().toISOString(),
      lastTestGenerationTime: new Date().toISOString(),
    },
    improveActions: notes.length ? [...notes, ...contract.improveActions] : contract.improveActions,
    search,
    brain: {
      brandName: saeedehBrainConfig.brandName,
      channel: saeedehBrainConfig.channel,
      brainMode: strictInput.brainMode || "premium",
      strictPublishReady: strictInput.strictPublishReady,
    },
  };

  return {
    ...finalResult,
    status: finalResult.engineStatus,
    quality: finalResult.qualityScore,
    output: finalResult.outputs,
  };
}
