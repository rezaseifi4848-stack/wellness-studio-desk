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

function missingQuestions(input: SaeedehMentorInput) {
  const questions: string[] = [];
  if (!input.topic.trim()) questions.push("موضوع دقیق محتوا چیه قشنگم؟");
  if (!input.duration.trim()) questions.push("مدت ویدیو، مدیتیشن یا کلاس چقدر باشه؟");
  if (!input.cta?.trim()) questions.push("دوست داری آخرش مخاطب چه کار کوچیکی انجام بده؟");
  return questions;
}

function baseContext(input: SaeedehMentorInput) {
  return {
    topic: input.topic || "آرام‌سازی و بدن‌آگاهی برای مخاطب مبتدی",
    mood: input.mood || "آرام، زنانه، صمیمی و قابل اعتماد",
    duration: input.duration || "۶۰ ثانیه",
    cta: input.cta || "اگر این تمرین به دلت نشست، ذخیره‌اش کن و برای یک دوست بفرست.",
  };
}

function buildReel(input: SaeedehMentorInput) {
  const ctx = baseContext(input);
  return {
    hook: `اگه امشب ذهنت شلوغه، فقط ${ctx.duration} با من بمون... عجله‌ای نیست.`,
    sceneByScene: [
      "ثانیه ۰ تا ۳: نمای نزدیک صورت سعیده، نور کم و صدای خیلی نرم.",
      "ثانیه ۴ تا ۱۵: دست روی قلب، دعوت به یک دم و بازدم آروم.",
      "ثانیه ۱۶ تا ۳۵: توضیح ساده با یک مثال روزمره.",
      "ثانیه ۳۶ تا پایان: جمع‌بندی، جمله مهربون و CTA نرم.",
    ],
    spokenText: `سلام قشنگم. امشب قرار نیست ذهنت رو مجبور کنی ساکت بشه. فقط یه لحظه با هم برگردیم به بدن. یک نفس آروم بکشین... بازدم رو یه کوچولو طولانی‌تر کنین. ببینین شونه‌ها کجا خسته‌ن، فک کجا گرفته، قلب کجا احتیاج به مهربونی داره. همین چند دقیقه مکث، تمرین مراقبت روزانه از خوده.`,
    onScreenText: ["ذهنت شلوغه؟", "فقط یه نفس با سعیده", "کم‌کم برگرد به بدنت", "ذخیره کن برای قبل خواب"],
    caption: `گاهی لازم نیست همه‌چیز رو حل کنیم؛ فقط چند دقیقه مکث می‌تونه بدن رو کمی نرم‌تر کنه.\n\n${ctx.cta}\n\n#یوگا_با_سعیده #مدیتیشن #آرامش #بدن_آگاهی`,
    coverTitle: "یه مکث کوتاه قبل خواب",
    storyFollowUp: "امشب قبل خواب امتحانش می‌کنی؟ گزینه‌ها: آره قشنگم / فردا صبح",
    moodMusicDirection: "پیانو ambient خیلی نرم، نور گرم، تصویر ساده کنار پنجره.",
    cta: ctx.cta,
  };
}

function buildCaption(input: SaeedehMentorInput) {
  const ctx = baseContext(input);
  return {
    emotionalHook: "قشنگم، اگه امروز خیلی دویدی، این پیام برای توئه...",
    shortCaption: `یه لحظه مکث کن. نفس رو حس کن. بدن لازم نیست کامل باشه؛ فقط نیاز داره شنیده بشه. ${ctx.cta}`,
    longCaption: `گاهی شلوغی روز کاری می‌کنه از بدنمون دور بشیم. نه از روی بی‌توجهی؛ فقط چون زیاد فشار آوردیم.\n\nامروز فقط یه تمرین کوچولو داریم: یک دست روی قلب، یک دست روی شکم، سه نفس آروم. با هر بازدم، یه کم از فشار روز رو زمین بذار.\n\nاین تمرین برای آرام‌سازی، بدن‌آگاهی و تجربه شخصی طراحی شده و جایگزین مشاوره پزشکی یا درمان تخصصی نیست.\n\n${ctx.cta}`,
    cta: ctx.cta,
    hashtags: "#یوگا_با_سعیده #آرامش #مدیتیشن #یوگا #مراقبت_از_خود",
    baleVersion: "🌿 پیام امشب سعیده\n\nیه لحظه با خودت مهربون‌تر باش. فقط سه نفس آروم و یک مکث کوتاه.",
    storyQuestion: "امروز بیشتر به چی نیاز داشتی؟ آرامش / انرژی / سکوت",
  };
}

function buildMeditation(input: SaeedehMentorInput) {
  const ctx = baseContext(input);
  return {
    title: input.task.includes("چاکرا") ? "مدیتیشن نرم چاکرای قلب" : "مدیتیشن خواب آرام سعیده",
    intro: "قشنگم، یک جای راحت پیدا کن. لازم نیست هیچ کاری رو کامل انجام بدی؛ فقط همراه صدای من بمون.",
    breathingCues: ["دم طبیعی از بینی", "بازدم یه کوچولو طولانی‌تر", "بدون نگه‌داشتن نفس و بدون فشار"],
    bodyScript: `چشم‌ها اگر راحتن نرم بسته بشن. توجهت رو بیار سمت تماس بدن با زمین. شونه‌ها رو حس کن. فک رو یه کم آزاد کن. با هر بازدم، فقط اجازه بده بدن کمی نرم‌تر بشه. اگر فکری اومد، باهاش نجنگ. ببینش و آروم برگرد به نفس.`,
    pauseMarkers: ["بعد از هر جمله اصلی: ۳ ثانیه مکث", "بعد از اسکن بدن: ۶ ثانیه مکث", "قبل از پایان: ۸ ثانیه سکوت"],
    softClosing: "خب قشنگم... کم‌کم نفس رو عمیق‌تر کن. انگشت‌ها رو یه کوچولو تکون بده و وقتی آماده بودی، با یک لبخند نرم برگرد.",
    threeMinuteVersion: "۱ دقیقه نفس، ۱ دقیقه بدن، ۱ دقیقه جمله مهربون: من امشب اجازه دارم آرام‌تر بشم.",
    sevenMinuteVersion: "شروع نرم، اسکن بدن، تنفس آرام، مکث قلب، سکوت کوتاه، جمله پایانی و برگشت مرحله‌ای.",
    recordingGuidance: "با صدای پایین‌تر از گفت‌وگوی معمولی بخون؛ بین جمله‌ها مکث واقعی بذار و موسیقی را حدود ۳۰ تا ۴۰ درصد صدای خودت نگه دار.",
    safetyWording: buildMentorSafetyNote(input.task, `${ctx.topic} ${input.safetyLimit || ""}`),
  };
}

function buildPoster(input: SaeedehMentorInput) {
  const ctx = baseContext(input);
  return {
    posterTitle: input.topic || "برگرد به آرامشت",
    subtitle: "یک یادآوری نرم برای چند دقیقه مکث",
    visualConcept: "پس‌زمینه warm white، برگ سبز سیج، دایره طلایی نرم و فضای خالی زیاد.",
    layout: "تیتر بزرگ وسط، زیرتیتر کوتاه پایین، لوگوی یوگا با سعیده در پایین راست.",
    colorPalette: "Warm White #F8F6F1، Sage #A8B8A0، Soft Gold #D7C09A، Lavender خیلی کم.",
    typographyDirection: "فونت خوانا، وزن نیمه‌بولد برای تیتر، فاصله خطوط زیاد و حس لوکس مینیمال.",
    instagramCopy: `من امروز فقط چند دقیقه به خودم برمی‌گردم.`,
    reelCoverCopy: "یه مکث کوتاه با سعیده",
    baleVersion: `🌿 پوستر امروز\n\n${ctx.topic}\n\nچند دقیقه مکث برای مراقبت روزانه از خود.`,
    futureImagePrompt: "Minimal feminine Persian wellness poster, lotus leaf, sage green, soft gold circle, warm white background, premium calm typography.",
  };
}

function buildYogaClass(input: SaeedehMentorInput) {
  return {
    classIntention: "آرام‌سازی عصرگاهی، برگشتن به بدن و ساخت حس امن برای هنرجوی مبتدی.",
    warmUp: ["نشستن راحت و تنفس نرم", "چرخش خیلی آرام گردن بدون فشار", "حرکت شانه‌ها", "گربه-گاو نرم"],
    mainSequence: ["child pose نرم", "حرکت کشش پهلو نشسته", "low lunge با گزینه زانو روی زمین", "standing forward fold با زانوهای خم", "warrior خیلی ساده و کوتاه"],
    cooldown: ["کشش پشت پا با بند یا زانوی خم", "twist خوابیده خیلی نرم", "پاها روی زمین و دست روی شکم"],
    meditationEnding: "۳ دقیقه بدن‌آگاهی: نفس، شانه‌ها، قلب، فک و برگشت آرام.",
    beginnerModifications: ["زانوها همیشه می‌تونن خم باشن", "هر حرکت با دیوار یا بلوک ساده‌تر می‌شه", "اگر دردی هست، حرکت متوقف می‌شه"],
    contraindications: "برای بارداری، آسیب، درد زانو/کمر/گردن یا فشار خون، نسخه شخصی باید با نظر متخصص تنظیم شود.",
    safetyNotes: buildMentorSafetyNote(input.task, input.safetyLimit || ""),
    homework: "امشب قبل خواب فقط سه نفس آروم و یک جمله مهربون با خودت.",
    invitationToNextClass: "اگر این سبک تمرین به بدنت می‌سازه، جلسه بعدی رو نرم‌تر و عمیق‌تر با هم ادامه می‌دیم.",
  };
}

function buildCourse(input: SaeedehMentorInput) {
  return {
    productIdea: "دوره ۷ روزه شروع آرام مدیتیشن با سعیده",
    audience: input.audience || "خانم‌هایی که وقت کم دارن و دنبال چند دقیقه مکث روزانه هستن.",
    promise: "کمک به ساختن عادت چند دقیقه مکث، بدن‌آگاهی و مراقبت روزانه از خود؛ بدون وعده پزشکی.",
    sevenDayStructure: [
      "روز ۱: آشنایی با نفس",
      "روز ۲: نرم کردن شانه‌ها",
      "روز ۳: بدن‌آگاهی کوتاه",
      "روز ۴: مکث وسط روز",
      "روز ۵: مهربانی با خود",
      "روز ۶: مدیتیشن خواب",
      "روز ۷: برنامه ادامه مسیر",
    ],
    fourWeekStructure: ["هفته ۱: شروع نرم", "هفته ۲: بدن‌آگاهی", "هفته ۳: صدا و تنفس", "هفته ۴: تمرین مستقل"],
    salesPageHeadline: "۷ روز آرام‌تر برگشتن به خودت، با صدای نرم سعیده",
    offerCopy: "اگر دوست داری مدیتیشن را ساده، کوتاه و قابل انجام وارد روزت کنی، این دوره برای شروع مهربون ساخته شده.",
    faq: ["آیا برای مبتدی‌هاست؟ بله.", "روزانه چقدر زمان لازم دارد؟ حدود ۵ تا ۱۰ دقیقه.", "آیا جایگزین درمان است؟ نه، تمرین شخصی و آموزشی است."],
    softCta: "اگر حس می‌کنی وقتشه یه شروع نرم داشته باشی، از همین دوره کوتاه شروع کنیم.",
  };
}

function buildSevenDayPlan(input: SaeedehMentorInput) {
  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
  return days.map((day, index) => ({
    day,
    reelTopic: ["شروع یوگا", "تنفس عمیق", "بدن‌آگاهی", "مدیتیشن خواب", "مراقبت از خود", "چاکرای قلب", "دعوت نرم به کلاس"][index],
    captionIdea: "یک کپشن کوتاه با مثال روزمره، جمله مهربون و دعوت به ذخیره.",
    storyIdea: "استیکر سوال: امروز بیشتر به آرامش نیاز داری یا انرژی؟",
    cta: input.cta || "ذخیره کن و برای یک دوست بفرست.",
    softSalesAngle: index > 4 ? "دعوت نرم به کلاس آرام‌سازی هفته بعد" : "اعتمادسازی و معرفی صدای سعیده",
  }));
}

function taskOutput(input: SaeedehMentorInput) {
  const joined = `${input.task} ${input.topic}`;
  if (joined.includes("ریلز")) return { reel: buildReel(input), caption: buildCaption(input), poster: buildPoster(input) };
  if (joined.includes("کپشن")) return { caption: buildCaption(input), story: buildCaption(input).storyQuestion };
  if (joined.includes("مدیتیشن")) return { meditation: buildMeditation(input), poster: buildPoster(input) };
  if (joined.includes("کلاس")) return { yogaClass: buildYogaClass(input), meditation: buildMeditation(input) };
  if (joined.includes("کاور") || joined.includes("پوستر")) return { poster: buildPoster(input), caption: buildCaption(input) };
  if (joined.includes("دوره") || joined.includes("فروش") || joined.includes("معرفی")) return { course: buildCourse(input), caption: buildCaption(input) };
  if (joined.includes("تقویم") || joined.includes("۷ روزه") || joined.includes("چالش")) return { sevenDayPlan: buildSevenDayPlan(input), caption: buildCaption(input) };
  return {
    reel: buildReel(input),
    caption: buildCaption(input),
    meditation: buildMeditation(input),
    poster: buildPoster(input),
  };
}

export async function generateSaeedehMentor(input: SaeedehMentorInput) {
  const research = await collectMentorResearch(input);
  const providers = getSaeedehProviderStatus();
  const ctx = baseContext(input);
  const questions = missingQuestions(input);
  const safety = safetySummary(`${input.task} ${input.topic} ${input.safetyLimit || ""}`);
  const output = taskOutput(input);
  const confidenceLabel = research.available || input.researchMode === "OFFLINE" ? "بالا" : "متوسط";

  const answer = {
    liveStatus: {
      brandMemoryStatus: "فعال: یوگا با سعیده، لحن گرم، مدیتیشن‌محور، غیراغراق‌آمیز",
      researchMode: input.researchMode,
      providers,
      providerUsedInLastAnswer: research.providerUsed,
      confidenceLabel,
      safetyGuardActive: true,
    },
    diagnosis: {
      need: `سعیده برای «${input.task}» به خروجی آماده اجرا نیاز دارد؛ نه فقط ایده. محور محتوا: ${ctx.topic}.`,
      importantQuestions: questions.length ? questions : ["اطلاعات کافی است؛ خروجی قابل استفاده ساخته شد."],
      warnings: safety.safetySignals.length
        ? [`موضوع حساسیت دارد: ${safety.safetySignals.join("، ")}. خروجی باید نرم‌تر و بدون فشار باشد.`]
        : ["محدودیت خاصی دیده نشد؛ گارد ایمنی فعال ماند."],
    },
    output: {
      mainOutput: output,
      shortVersion: `قشنگم، برای ${ctx.topic} یک خروجی آماده داریم: شروع نرم، متن قابل گفتن، مثال روزمره، CTA و نکته ایمنی.`,
      fullVersion: {
        task: input.task,
        platform: input.platform,
        goal: input.goal,
        audience: input.audience,
        mood: ctx.mood,
        duration: ctx.duration,
        readySections: output,
      },
      coverPosterIdea: buildPoster(input),
      safetyNote: buildMentorSafetyNote(input.task, `${input.topic} ${input.safetyLimit || ""}`),
      cta: ctx.cta,
      nextAction: "اول نسخه کوتاه را یک بار با صدای آرام بخون، بعد نسخه کامل را ضبط کن و کاور پیشنهادی را برای انتشار آماده کن.",
      researchStatusAndLimits: {
        mode: input.researchMode,
        providerUsed: research.providerUsed,
        sources: research.sources,
        summary: research.summaries,
        limitations: research.limitations,
      },
    },
  };

  return JSON.parse(sanitizeMentorText(JSON.stringify(answer)));
}
