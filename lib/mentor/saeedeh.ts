import { collectMentorResearch, getSaeedehProviderStatus } from "@/lib/mentor/saeedehProviders";
import {
  buildMentorSafetyNote,
  safetySummary,
  sanitizeMentorText,
  type ResearchMode,
  type SensitivityLevel,
} from "@/lib/mentor/saeedehSafety";

export type SaeedehMentorInput = {
  task: string;
  platform: string;
  goal: string;
  audience: string;
  topic: string;
  mood: string;
  duration: string;
  manualSource?: string;
  cta?: string;
  safetyLimit?: string;
  researchMode: ResearchMode;
  providerMode?: string;
  sensitivity: SensitivityLevel;
  allowExternalForSensitive?: boolean;
};

type MentorAnswer = {
  liveStatus: {
    brandMemoryStatus: string;
    researchMode: ResearchMode;
    providers: ReturnType<typeof getSaeedehProviderStatus>;
    providerUsedInLastAnswer: string;
    confidenceLabel: string;
    safetyGuardActive: boolean;
  };
  diagnosis: {
    need: string;
    importantQuestions: string[];
    warnings: string[];
  };
  output: {
    mainOutput: Record<string, unknown>;
    shortVersion: string;
    fullVersion: Record<string, unknown>;
    coverPosterIdea?: Record<string, unknown>;
    safetyNote: string;
    cta: string;
    nextAction: string;
    researchStatusAndLimits: {
      mode: ResearchMode;
      providerUsed: string;
      sources: string[];
      summary: string[];
      limitations: string;
    };
  };
};

type MentorResearch = Awaited<ReturnType<typeof collectMentorResearch>>;

function missingQuestions(input: SaeedehMentorInput) {
  const questions: string[] = [];
  if (!input.topic.trim()) questions.push("موضوع دقیق محتوا چیه قشنگم؟");
  if (!input.duration.trim()) questions.push("مدت ویدیو، مدیتیشن یا کلاس چقدر باشه؟");
  if (!input.cta?.trim()) questions.push("آخرش مخاطب چه کار کوچیکی انجام بده؟ ذخیره، پیام، ثبت‌نام یا فقط مکث؟");
  return questions;
}

function context(input: SaeedehMentorInput) {
  const topic = input.topic.trim() || input.task || "آرام‌سازی و بدن‌آگاهی برای مخاطب مبتدی";
  return {
    topic,
    mood: input.mood.trim() || "آرام، زنانه، صمیمی و قابل اعتماد",
    duration: input.duration.trim() || "۶۰ ثانیه",
    cta: input.cta?.trim() || "اگر این تمرین به دلت نشست، ذخیره‌اش کن و برای یک دوست بفرست.",
  };
}

function posterIdea(input: SaeedehMentorInput) {
  const ctx = context(input);
  const title = ctx.topic.length > 44 ? "یه مکث کوتاه با سعیده" : ctx.topic;
  return {
    title,
    subtitle: "یک یادآوری نرم برای چند دقیقه مکث",
    visualConcept: "پس‌زمینه warm white، برگ سبز سیج، دایره طلایی نرم، فضای خالی زیاد و حس لوکس مینیمال.",
    layout: "تیتر وسط، زیرتیتر کوتاه پایین، لوگوی یوگا با سعیده در پایین راست.",
    palette: "Warm White #F8F6F1، Sage #A8B8A0، Soft Gold #D7C09A، Lavender خیلی کم.",
    coverCopy: ctx.topic.includes("خواب") ? "قبل خواب، فقط یه نفس" : "یه برگشت کوچولو به بدن",
    laterImagePrompt: "Minimal feminine Persian wellness poster, sage leaf, soft gold circle, warm white background, premium calm typography.",
  };
}

function reelOutput(input: SaeedehMentorInput) {
  const ctx = context(input);
  const sleep = `${input.task} ${ctx.topic}`.includes("خواب");
  return {
    hook3sec: sleep
      ? `اگه قبل خواب ذهنت ولت نمی‌کنه، فقط ${ctx.duration} با من بمون...`
      : `اگه امروز از بدنت دور شدی، بیا ${ctx.duration} آروم برگردیم...`,
    sceneByScene: [
      "۰ تا ۳ ثانیه: نگاه مستقیم، لبخند نرم، hook کوتاه.",
      "۴ تا ۱۵ ثانیه: دست روی قلب یا شکم؛ یک نفس آروم با مخاطب.",
      `۱۶ تا ۴۰ ثانیه: موضوع را با مثال واقعی توضیح بده: ${ctx.topic}.`,
      "۴۱ تا پایان: جمع‌بندی، جمله نجات و CTA نرم.",
    ],
    spokenText: `سلام قشنگم. ${sleep ? "قبل خواب لازم نیست با ذهنت بجنگی." : "لازم نیست یک‌دفعه همه‌چیز آروم بشه."} فقط یه لحظه با هم مکث کنیم. یک نفس آروم بکشین... بازدم رو یه کوچولو طولانی‌تر کنین. حالا ببینین بدن کجا خسته‌ست، کجا یه کم توجه می‌خواد. از همین‌جا، بدون عجله، برگردیم به ${ctx.topic}.`,
    simpleCameraVersion: "قشنگم، فقط یه نفس. نه کامل، نه سخت؛ همین چند ثانیه مکث هم کافیه.",
    everydayExamples: [
      "وقتی قبل خواب گوشی دستته و ذهنت ول نمی‌کنه",
      "وقتی بعد کار شونه‌هات سفته",
      "وقتی می‌خوای شروع کنی ولی حوصله تمرین طولانی نداری",
    ],
    rescueLine: "اگر وسط حرف گیر کردی بگو: بذار ساده‌تر بگم؛ بدنمون فقط می‌خواد چند ثانیه شنیده بشه.",
    speakingPractice: "سه بار ضبط کن: یک بار خیلی آروم، یک بار طبیعی، یک بار با لبخند خیلی کوچولو.",
    onScreenText: ["ذهنت شلوغه؟", "یه نفس با سعیده", "آروم برگرد به بدنت", "ذخیره برای وقتی خسته‌ای"],
    caption: `گاهی قرار نیست حال‌مون را زورکی عوض کنیم. فقط چند دقیقه مکث، یک نفس آروم و یک برگشت کوچولو به بدن.\n\nموضوع امشب: ${ctx.topic}\n\n${ctx.cta}\n\n#یوگا_با_سعیده #مدیتیشن #آرامش #بدن_آگاهی`,
    coverTitle: sleep ? "قبل خواب، فقط یه نفس" : "یه برگشت کوچولو به بدن",
    storyFollowUp: "امشب کدوم رو بیشتر نیاز داری؟ آرامش / خواب راحت‌تر / فقط سکوت",
    moodMusicDirection: "نور گرم، قاب نزدیک، موسیقی ambient خیلی کم، صدای سعیده جلوتر از موزیک.",
    cta: ctx.cta,
  };
}

function captionOutput(input: SaeedehMentorInput) {
  const ctx = context(input);
  return {
    emotionalHook: `قشنگم، اگر امروز برای «${ctx.topic}» دنبال یک شروع نرم بودی، از همین‌جا بیا...`,
    shortCaption: `یه لحظه مکث کن. نفس رو حس کن. بدن لازم نیست کامل باشه؛ فقط نیاز داره شنیده بشه. ${ctx.cta}`,
    longCaption: `گاهی دقیقاً همان روزهایی که وقت نداریم، بدن بیشتر از همیشه یک مکث کوچک می‌خواهد.\n\nامروز قرار نیست تمرین سختی داشته باشیم. فقط موضوع را ساده می‌کنیم: ${ctx.topic}\n\nیک دست روی قلب، یک دست روی شکم. سه نفس آروم. با هر بازدم، یه کم از فشار روز رو زمین بذار.\n\nاین تمرین برای آرام‌سازی، بدن‌آگاهی و تجربه شخصی طراحی شده و جایگزین مشاوره پزشکی یا درمان تخصصی نیست.\n\n${ctx.cta}`,
    storyQuestion: "امروز بیشتر به چی نیاز داشتی؟ آرامش / انرژی / سکوت",
    baleVersion: `🌿 پیام سعیده\n\n${ctx.topic}\n\nیه لحظه با خودت مهربون‌تر باش. فقط سه نفس آروم و یک مکث کوتاه.`,
    hashtags: "#یوگا_با_سعیده #آرامش #مدیتیشن #یوگا #مراقبت_از_خود",
    cta: ctx.cta,
  };
}

function meditationOutput(input: SaeedehMentorInput) {
  const ctx = context(input);
  return {
    title: input.task.includes("چاکرا") ? `مدیتیشن نرم ${ctx.topic}` : `مدیتیشن ${ctx.topic}`,
    intro: "قشنگم، یک جای راحت پیدا کن. لازم نیست هیچ کاری رو کامل انجام بدی؛ فقط همراه صدای من بمون.",
    breathingCues: ["دم طبیعی از بینی", "بازدم یه کوچولو طولانی‌تر", "بدون نگه‌داشتن نفس و بدون فشار"],
    bodyScript: `چشم‌ها اگر راحتن نرم بسته بشن. توجهت رو بیار سمت تماس بدن با زمین. شونه‌ها رو حس کن. فک رو یه کم آزاد کن. حالا موضوع تمرین امروز رو ساده نگه دار: ${ctx.topic}. با هر بازدم، فقط اجازه بده بدن کمی نرم‌تر بشه. اگر فکری اومد، باهاش نجنگ. ببینش و آروم برگرد به نفس.`,
    pauseMarkers: ["بعد از هر دعوت اصلی: ۳ ثانیه مکث", "بعد از اسکن بدن: ۶ ثانیه مکث", "قبل از پایان: ۸ ثانیه سکوت"],
    softClosing: "خب قشنگم... کم‌کم نفس رو عمیق‌تر کن. انگشت‌ها رو یه کوچولو تکون بده و وقتی آماده بودی، با یک لبخند نرم برگرد.",
    threeMinuteVersion: "۱ دقیقه نفس، ۱ دقیقه بدن، ۱ دقیقه جمله مهربون.",
    sevenMinuteVersion: "شروع نرم، اسکن بدن، تنفس آرام، مکث قلب، سکوت کوتاه، جمله پایانی و برگشت مرحله‌ای.",
    recordingGuidance: "با صدای پایین‌تر از گفت‌وگوی معمولی بخون؛ بین جمله‌ها مکث واقعی بذار و موسیقی را حدود ۳۰ تا ۴۰ درصد صدای خودت نگه دار.",
    safetyWording: buildMentorSafetyNote(input.task, `${ctx.topic} ${input.safetyLimit || ""}`),
  };
}

function classOutput(input: SaeedehMentorInput) {
  return {
    intention: "آرام‌سازی عصرگاهی، برگشتن به بدن و ساخت حس امن برای هنرجوی مبتدی.",
    warmUp: ["نشستن راحت و تنفس نرم", "حرکت شانه‌ها", "گربه-گاو نرم", "کشش پهلو نشسته"],
    sequence: ["child pose نرم", "low lunge با زانو روی زمین", "forward fold با زانوهای خم", "warrior ساده و کوتاه", "نشستن و پیچ نرم"],
    cooldown: ["کشش پشت پا با بند یا زانوی خم", "twist خوابیده خیلی نرم", "دست روی شکم و تنفس"],
    meditationEnding: "۳ دقیقه بدن‌آگاهی: نفس، شانه‌ها، قلب، فک و برگشت آرام.",
    beginnerModifications: ["زانوها همیشه می‌تونن خم باشن", "هر حرکت با دیوار یا بلوک ساده‌تر می‌شه", "اگر دردی هست، حرکت متوقف می‌شه"],
    contraindications: "برای بارداری، آسیب، درد زانو/کمر/گردن یا فشار خون، نسخه شخصی باید با نظر متخصص تنظیم شود.",
    homework: "امشب قبل خواب فقط سه نفس آروم و یک جمله مهربون با خودت.",
    nextClassInvite: "اگر این سبک تمرین به بدنت می‌سازه، جلسه بعدی رو نرم‌تر و عمیق‌تر با هم ادامه می‌دیم.",
  };
}

function sevenDayPlan(input: SaeedehMentorInput) {
  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
  const topics = ["شروع یوگا", "تنفس عمیق", "بدن‌آگاهی", "مدیتیشن خواب", "مراقبت از خود", "چاکرای قلب", "دعوت نرم به کلاس"];
  return days.map((day, index) => ({
    day,
    reelTopic: topics[index],
    openingLine: `قشنگم، امروز درباره ${topics[index]} خیلی ساده حرف بزنیم...`,
    captionIdea: `کپشن کوتاه درباره ${input.topic || topics[index]} با یک مثال روزمره و جمله مهربون.`,
    storyIdea: index % 2 === 0 ? "سوال‌باکس: امروز بیشتر چی لازم داری؟" : "نظرسنجی: تمرین شب رو دوست داری یا صبح؟",
    cta: input.cta || "ذخیره کن و برای یک دوست بفرست.",
    softSalesAngle: index > 4 ? "دعوت نرم به کلاس آرام‌سازی هفته بعد" : "اعتمادسازی و معرفی صدای سعیده",
  }));
}

function courseOutput(input: SaeedehMentorInput) {
  return {
    productIdea: "دوره ۷ روزه شروع آرام مدیتیشن با سعیده",
    audience: input.audience || "خانم‌هایی که وقت کم دارن و دنبال چند دقیقه مکث روزانه هستن.",
    promise: "کمک به ساختن عادت چند دقیقه مکث، بدن‌آگاهی و مراقبت روزانه از خود؛ بدون وعده پزشکی.",
    sevenDayStructure: sevenDayPlan(input),
    salesPageHeadline: "۷ روز آرام‌تر برگشتن به خودت، با صدای نرم سعیده",
    offerCopy: "اگر دوست داری مدیتیشن را ساده، کوتاه و قابل انجام وارد روزت کنی، این دوره برای شروع مهربون ساخته شده.",
    faq: ["برای مبتدی‌هاست؟ بله.", "روزانه چقدر زمان لازم دارد؟ حدود ۵ تا ۱۰ دقیقه.", "جایگزین درمان است؟ نه، تمرین شخصی و آموزشی است."],
    softCta: "اگر حس می‌کنی وقتشه یه شروع نرم داشته باشی، از همین دوره کوتاه شروع کنیم.",
  };
}

function taskOutput(input: SaeedehMentorInput) {
  const joined = `${input.task} ${input.topic}`;
  if (joined.includes("ریلز")) return { reel: reelOutput(input), caption: captionOutput(input), poster: posterIdea(input) };
  if (joined.includes("کپشن")) return { caption: captionOutput(input), story: captionOutput(input).storyQuestion };
  if (joined.includes("مدیتیشن")) return { meditation: meditationOutput(input), poster: posterIdea(input) };
  if (joined.includes("کلاس")) return { yogaClass: classOutput(input), meditationClosing: meditationOutput(input) };
  if (joined.includes("کاور") || joined.includes("پوستر")) return { poster: posterIdea(input), caption: captionOutput(input) };
  if (joined.includes("دوره") || joined.includes("فروش") || joined.includes("معرفی")) return { course: courseOutput(input), caption: captionOutput(input) };
  if (joined.includes("تقویم") || joined.includes("۷ روزه") || joined.includes("چالش")) return { sevenDayPlan: sevenDayPlan(input), caption: captionOutput(input) };
  return { reel: reelOutput(input), caption: captionOutput(input), meditation: meditationOutput(input) };
}

function copyReadyFullVersion(input: SaeedehMentorInput, output: Record<string, unknown>) {
  return {
    task: input.task,
    platform: input.platform,
    primaryUse: "کپی، ضبط یا آماده‌سازی مستقیم محتوا",
    sections: Object.keys(output),
    recordingAdvice: "اول یک بار آرام بخون، بعد با مکث‌های واقعی ضبط کن. اگر جمله‌ای مصنوعی بود، ساده‌ترش کن و با زبان خودت بگو.",
  };
}

function localAnswer(input: SaeedehMentorInput, research: MentorResearch): MentorAnswer {
  const providers = getSaeedehProviderStatus();
  const ctx = context(input);
  const questions = missingQuestions(input);
  const safety = safetySummary(`${input.task} ${input.topic} ${input.safetyLimit || ""}`);
  const output = taskOutput(input);
  const confidenceLabel = research.available || input.researchMode === "OFFLINE" ? "بالا" : "متوسط";

  return {
    liveStatus: {
      brandMemoryStatus: "فعال: یوگا با سعیده، لحن گرم، مدیتیشن‌محور، غیراغراق‌آمیز",
      researchMode: input.researchMode,
      providers,
      providerUsedInLastAnswer: research.providerUsed,
      confidenceLabel,
      safetyGuardActive: true,
    },
    diagnosis: {
      need: `سعیده برای «${input.task}» خروجی قابل ضبط و انتشار می‌خواهد؛ محور اصلی: ${ctx.topic}.`,
      importantQuestions: questions.length ? questions : ["اطلاعات کافی است؛ خروجی آماده استفاده ساخته شد."],
      warnings: safety.safetySignals.length
        ? [`موضوع حساسیت دارد: ${safety.safetySignals.join("، ")}. خروجی باید نرم‌تر و بدون فشار باشد.`]
        : ["گارد ایمنی فعال است؛ خروجی با زبان غیرپزشکی ساخته شد."],
    },
    output: {
      mainOutput: output,
      shortVersion: `برای «${ctx.topic}» خروجی آماده شد: متن گفتار، نسخه ساده جلوی دوربین، مثال روزمره، CTA و نکته ایمنی.`,
      fullVersion: copyReadyFullVersion(input, output),
      coverPosterIdea: "poster" in output ? undefined : posterIdea(input),
      safetyNote: buildMentorSafetyNote(input.task, `${input.topic} ${input.safetyLimit || ""}`),
      cta: ctx.cta,
      nextAction: "از mainOutput همان بخش لازم را کپی کن؛ اول نسخه کوتاه را ضبط کن، بعد اگر خوب نشست نسخه کامل را بگیر.",
      researchStatusAndLimits: {
        mode: input.researchMode,
        providerUsed: research.providerUsed,
        sources: research.sources,
        summary: research.summaries,
        limitations: research.limitations,
      },
    },
  };
}

function openAiPrompt(input: SaeedehMentorInput, research: MentorResearch) {
  const ctx = context(input);
  return `
تو «استاد زنده سعیده» هستی؛ منتور فارسی برای یوگا با سعیده.
خروجی تازه، غیرتکراری، گرم، زنانه، ساده، حرفه‌ای و آماده استفاده بساز.

ورودی:
- task: ${input.task}
- platform: ${input.platform}
- goal: ${input.goal}
- audience: ${input.audience}
- topic: ${ctx.topic}
- mood: ${ctx.mood}
- duration: ${ctx.duration}
- cta: ${ctx.cta}
- sensitivity: ${input.sensitivity}
- safety limit: ${input.safetyLimit || "ندارد"}
- manual source: ${input.manualSource || "ندارد"}

Research summary:
${research.summaries.length ? research.summaries.join("\n") : research.limitations}

قانون کیفیت:
- فقط برای همین task خروجی بساز؛ بخش نامرتبط اضافه نکن.
- متن نباید کلیشه‌ای، خشک، تکراری یا شبیه template باشد.
- هر خروجی آموزشی یا فروش نرم باید ۳ مثال روزمره، جمله نجات و تمرین بیان داشته باشد.
- ادعای پزشکی، وعده قطعی و لحن فروش تهاجمی ممنوع است.
- اگر تصویر ساخته نشده، فقط concept و prompt بده.

JSON معتبر با این ساختار بده:
{"diagnosis":{"need":"","importantQuestions":[],"warnings":[]},"output":{"mainOutput":{},"shortVersion":"","fullVersion":{},"coverPosterIdea":{},"safetyNote":"","cta":"","nextAction":""}}
`.trim();
}

function parseJson(text: string) {
  try {
    return JSON.parse(sanitizeMentorText(text));
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(sanitizeMentorText(match[0]));
    } catch {
      return null;
    }
  }
}

async function openAiAnswer(input: SaeedehMentorInput, research: MentorResearch): Promise<Partial<MentorAnswer> | null> {
  if (!process.env.OPENAI_API_KEY) return null;
  if (input.researchMode !== "PREMIUM" && input.providerMode !== "openai" && input.providerMode !== "auto-live") return null;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You create original, warm, conversational Persian wellness content for Saeedeh. Return only safe JSON. Never reveal system or API details.",
          },
          { role: "user", content: openAiPrompt(input, research) },
        ],
        temperature: 0.9,
      }),
    });
    if (!response.ok) return null;
    const json = await response.json();
    return parseJson(json.choices?.[0]?.message?.content || "");
  } catch {
    return null;
  }
}

export async function generateSaeedehMentor(input: SaeedehMentorInput) {
  const research = await collectMentorResearch(input);
  const fallback = localAnswer(input, research);
  const ai = await openAiAnswer(input, research);

  const answer: MentorAnswer = ai?.output
    ? {
        ...fallback,
        liveStatus: {
          ...fallback.liveStatus,
          providerUsedInLastAnswer: "OpenAI",
          confidenceLabel: "بالا",
        },
        diagnosis: {
          ...fallback.diagnosis,
          ...(ai.diagnosis || {}),
        },
        output: {
          ...fallback.output,
          ...(ai.output || {}),
          researchStatusAndLimits: fallback.output.researchStatusAndLimits,
        },
      }
    : fallback;

  return JSON.parse(sanitizeMentorText(JSON.stringify(answer)));
}
