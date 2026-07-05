"use client";

import { useEffect, useMemo, useState } from "react";

type ProviderStatus = {
  tavily?: { configured: boolean };
  gemini?: { configured: boolean };
  groq?: { configured: boolean };
  openai?: { configured: boolean };
  liveResearchAvailable?: boolean;
  imageGenerationAvailable?: boolean;
};

type MentorResult = {
  liveStatus?: {
    providerUsedInLastAnswer?: string;
    confidenceLabel?: string;
    safetyGuardActive?: boolean;
  };
  output?: {
    mainOutput?: Record<string, unknown>;
    safetyNote?: string;
    cta?: string;
    nextAction?: string;
    researchStatusAndLimits?: {
      mode?: string;
      providerUsed?: string;
      limitations?: string;
    };
  };
};

type GeneratedPackage = {
  topic: string;
  level: string;
  reel: Record<string, unknown>;
  spokenScript: string;
  caption: string;
  storyBefore: string[];
  storyAfter: string[];
  ctas: {
    comment: string;
    direct: string;
    saveShare: string;
  };
  coverIdea: Record<string, unknown>;
  musicDirection: string;
  hashtags: string;
  baleVersion: string;
  meditation: Record<string, unknown>;
  monetizationStep: {
    leadMagnet: string;
    lowTicket: string;
    nextOffer: string;
  };
  safetyNote: string;
  raw: {
    reelResult: MentorResult;
    meditationResult: MentorResult;
  };
};

const workflowCards = [
  ["۱", "تشخیص", "موضوع، حال مخاطب، سطح حساسیت و نیاز امشب مشخص می‌شود."],
  ["۲", "تولید", "ریلز، کپشن، استوری، بله و متن گفتاری ساخته می‌شود."],
  ["۳", "تبدیل", "محتوای رایگان به دایرکت، کانال و لید گرم تبدیل می‌شود."],
  ["۴", "درآمد", "قدم بعدی فروش نرم: فایل صوتی، چالش یا کلاس پیشنهاد می‌شود."],
];

const quickTopics = [
  "مدیتیشن آرامش قبل از خواب برای خانم‌هایی که ذهن شلوغ دارند",
  "تمرین تنفس ۶۰ ثانیه‌ای برای رها کردن فشار روز",
  "یوگای نرم صبحگاهی برای شروع آرام روز",
  "چاکرای قلب و مهربانی با خود برای مخاطب مبتدی",
  "مدیتیشن کوتاه برای مادرهای خسته و ذهن‌های پرکار",
];

const sidebarLinks = [
  ["صبح سعیده", "/morning-studio"],
  ["استودیو پوستر", "/poster-studio"],
  ["موتور بله", "/bale-channel"],
  ["مرکز مدیتیشن", "/meditation-command-center"],
  ["جذب مخاطب", "/audience-attraction"],
  ["فروش نرم", "/soft-sales"],
];

function safeRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function safeString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function StatusPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span className={`rounded-full border px-3 py-2 text-[11px] font-black ${active ? "border-[#d7c09a]/70 bg-[#d7c09a]/18 text-[#f7e7c2]" : "border-white/10 bg-white/5 text-[#a6ad9e]"}`}>
      {label}: {active ? "فعال" : "غیرفعال"}
    </span>
  );
}

function CopyButton({ value, label = "کپی" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      className="rounded-full border border-[#d7c09a]/40 bg-[#fffdf8] px-4 py-2 text-xs font-black text-[#6d6149] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      onClick={copy}
      type="button"
    >
      {copied ? "کپی شد" : label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-black text-[#4d4f42]">
      {label}
      {children}
    </label>
  );
}

function OutputCard({ title, badge, text }: { title: string; badge: string; text: string }) {
  return (
    <article className="rounded-[1.7rem] border border-[#e6ddc9]/75 bg-[#fffdf8]/90 p-5 shadow-[0_18px_50px_rgba(91,80,56,0.08)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-[#eef2e8] px-3 py-1 text-[11px] font-black text-[#6d755f]">{badge}</span>
          <h3 className="mt-3 text-lg font-black leading-8 text-[#3f4935]">{title}</h3>
        </div>
        <CopyButton value={text} />
      </div>
      <p className="whitespace-pre-line text-sm leading-8 text-[#615d51]">{text}</p>
    </article>
  );
}

async function postMentor(payload: Record<string, unknown>): Promise<MentorResult> {
  const response = await fetch("/api/mentor/saeedeh/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Mentor API failed");
  return response.json();
}

function buildGeneratedPackage(topic: string, level: string, reelResult: MentorResult, meditationResult: MentorResult): GeneratedPackage {
  const reelMain = safeRecord(reelResult.output?.mainOutput);
  const meditationMain = safeRecord(meditationResult.output?.mainOutput);
  const reel = safeRecord(reelMain.reel);
  const caption = safeRecord(reelMain.caption);
  const poster = safeRecord(reelMain.poster);
  const meditation = safeRecord(meditationMain.meditation);

  const spokenScript = safeString(
    reel.spokenText,
    "سلام قشنگم. اگه امشب ذهنت شلوغه، لازم نیست با افکارت بجنگی. فقط یک دستت رو روی قلب یا شکمت بذار، یک دم آروم بگیر و بازدمت رو کمی طولانی‌تر رها کن. به خودت بگو: من لازم نیست امشب همه‌چیز رو حل کنم؛ من اجازه دارم آرام‌تر بشم."
  );

  const longCaption = safeString(
    caption.longCaption,
    safeString(
      reel.caption,
      `گاهی قبل خواب، بدن خسته است اما ذهن هنوز ادامه می‌دهد. امشب فقط یک مکث کوچک داشته باش: دست روی قلب، دم آرام، بازدم طولانی‌تر و جمله مهربانانه «من اجازه دارم آرام‌تر بشم».\n\nذخیره کن برای شب‌هایی که ذهنت شلوغه.`
    )
  );

  return {
    topic,
    level,
    reel,
    spokenScript,
    caption: longCaption,
    storyBefore: [
      "استوری ۱: امشب یک تمرین خیلی نرم قبل خواب می‌ذارم برای ذهن‌های شلوغ.",
      "استوری ۲: فقط چند ثانیه است؛ برای اینکه قبل خواب کمی به بدنت برگردی.",
      "استوری ۳: شب‌ها بیشتر با چی درگیری؟ ذهن شلوغ / نگرانی فردا / خستگی بدن / بی‌خوابی",
    ],
    storyAfter: [
      "استوری ۱: ریلز امشب منتشر شد؛ برای شب‌هایی که ذهنت زیادی حرف می‌زنه.",
      "استوری ۲: قبل خواب فقط یک بار باهاش نفس بکش. لازم نیست عالی انجامش بدی؛ فقط همراهش باش.",
      "استوری ۳: اگه انجامش دادی، توی دایرکت بنویس: خواب آرام",
    ],
    ctas: {
      comment: "اگر امشب ذهنت شلوغه، توی کامنت فقط بنویس: آرامش",
      direct: "برای دریافت نسخه کوتاه مدیتیشن قبل خواب، توی دایرکت بنویس: خواب آرام",
      saveShare: safeString(reel.cta, "ذخیره کن برای قبل خواب و برای یک دوست بفرست."),
    },
    coverIdea: poster,
    musicDirection: safeString(reel.moodMusicDirection, "پیانو ambient خیلی نرم، پد آرام، صدای طبیعت بسیار کم، بدون ضرب تند، مناسب فضای قبل خواب."),
    hashtags: safeString(caption.hashtags, "#یوگا_با_سعیده #مدیتیشن #مدیتیشن_خواب #آرامش_ذهن #ذهن_شلوغ #قبل_خواب #تنفس_آرام #مراقبت_از_خود #یوگا_برای_خانمها #خواب_آرام"),
    baleVersion: safeString(caption.baleVersion, `🌙 تمرین کوتاه امشب با سعیده\n\nاگر قبل خواب ذهنت شلوغ می‌شود، فقط یک دست را روی قلب یا شکم بگذار. یک دم آرام بگیر و بازدمت را کمی طولانی‌تر رها کن.\n\nبه خودت بگو: من اجازه دارم آرام‌تر بشوم.`),
    meditation,
    monetizationStep: {
      leadMagnet: "دایرکت با کلمه «خواب آرام» برای دریافت تمرین کوتاه‌تر قبل خواب.",
      lowTicket: "فایل صوتی مدیتیشن خواب ۱۰ دقیقه‌ای با قیمت کم برای تست بازار.",
      nextOffer: level === "پرمیوم" ? "چالش ۷ شب آرام‌تر + کلاس گروهی افتتاحیه + فایل صوتی هدیه." : "چالش ۷ شب آرام‌تر با سعیده؛ مسیر سبک از محتوای رایگان تا فروش نرم.",
    },
    safetyNote: reelResult.output?.safetyNote || meditationResult.output?.safetyNote || "این محتوا آموزشی و آرام‌سازی شخصی است و جایگزین درمان، مشاوره پزشکی یا روان‌درمانی نیست.",
    raw: { reelResult, meditationResult },
  };
}

export function SaeedehLiveDesk() {
  const [providerStatus, setProviderStatus] = useState<ProviderStatus | null>(null);
  const [topic, setTopic] = useState("مدیتیشن آرامش قبل از خواب برای خانم‌هایی که ذهن شلوغ دارند");
  const [mood, setMood] = useState("زنانه، گرم، آرام، قبل خواب، امن و مهربان");
  const [duration, setDuration] = useState("۳۰ تا ۴۵ ثانیه");
  const [researchMode, setResearchMode] = useState("OFFLINE");
  const [level, setLevel] = useState("کامل");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dailyPackage, setDailyPackage] = useState<GeneratedPackage | null>(null);

  useEffect(() => {
    fetch("/api/mentor/saeedeh/provider-status")
      .then((response) => response.json())
      .then(setProviderStatus)
      .catch(() => setProviderStatus(null));
  }, []);

  const fullJson = useMemo(() => JSON.stringify(dailyPackage || {}, null, 2), [dailyPackage]);
  const providerUsed = dailyPackage?.raw.reelResult.liveStatus?.providerUsedInLastAnswer || "آماده تست";
  const confidence = dailyPackage?.raw.reelResult.liveStatus?.confidenceLabel || "-";

  async function generateDailyPackage() {
    setLoading(true);
    setError("");

    try {
      const basePayload = {
        platform: "Instagram, Reel, Story, Bale, Voice meditation",
        goal: "جذب مخاطب، آرام‌سازی، اعتمادسازی و فروش نرم",
        audience: "خانم‌هایی که ذهن شلوغ دارند و دنبال آرامش روزانه هستند",
        topic: `${topic} | سطح بسته: ${level}`,
        mood,
        duration,
        cta: "ذخیره کن برای قبل خواب، برای یک دوست بفرست و در دایرکت بنویس خواب آرام.",
        safetyLimit: "بدون ادعای درمان؛ مناسب مخاطب عمومی و مبتدی؛ با احتیاط برای موضوعات حساس جسمی و روانی.",
        researchMode,
        providerMode: "auto",
        sensitivity: "عمومی",
        allowExternalForSensitive: false,
      };

      const reelResult = await postMentor({ ...basePayload, task: "ریلز امشب با کپشن، کاور، استوری، CTA و نسخه بله" });
      const meditationResult = await postMentor({ ...basePayload, task: "مدیتیشن خواب و متن صوتی قبل از خواب" });
      setDailyPackage(buildGeneratedPackage(topic, level, reelResult, meditationResult));
    } catch {
      setError("موتور زنده الان پاسخ کامل نداد. API یا سرویس Render را بررسی کن.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-7" dir="rtl">
      <section className="overflow-hidden rounded-[2.2rem] border border-[#d7c09a]/28 bg-[#101a18] text-[#f8f6f1] shadow-[0_34px_120px_rgba(20,30,24,0.22)]">
        <div className="grid min-h-[520px] lg:grid-cols-[1fr_310px]">
          <div className="relative p-6 md:p-10">
            <div className="absolute -right-20 top-[-110px] h-80 w-80 rounded-full bg-[#a8b8a0]/24 blur-3xl" />
            <div className="absolute -left-24 bottom-[-120px] h-96 w-96 rounded-full bg-[#d7c09a]/18 blur-3xl" />

            <div className="relative z-10 grid gap-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="tracking-[0.46em] text-xs font-black text-[#d7c09a]">SAEEDEH LIVE DESK</p>
                  <h1 className="mt-5 text-4xl font-black leading-[1.65] md:text-6xl">
                    اتاق فرمان زنده یوگا با سعیده
                  </h1>
                  <p className="mt-4 max-w-4xl text-lg leading-10 text-[#dfe7d8]">
                    موتور روزانه محتوا، مدیتیشن، ریلز، استوری، کانال بله، چالش ۷ روزه و فروش نرم؛ برای تبدیل آرامش به سیستم رشد و درآمد.
                  </p>
                </div>
                <div className="rounded-[2rem] border border-[#d7c09a]/30 bg-white/5 p-5 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d7c09a]/18 text-3xl">🌙</div>
                  <p className="mt-3 text-sm font-black text-[#d7c09a]">LIVE WELLNESS INTELLIGENCE</p>
                  <p className="mt-1 text-xs text-[#dfe7d8]">Yoga Ba Saeedeh</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {workflowCards.map(([step, title, text]) => (
                  <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5" key={step}>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d7c09a] text-sm font-black text-[#101a18]">{step}</span>
                    <h3 className="mt-4 text-lg font-black text-[#f7e7c2]">{title}</h3>
                    <p className="mt-3 text-sm leading-8 text-[#c8d0c1]">{text}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-[2rem] border border-[#d7c09a]/25 bg-[#f8f6f1] p-5 text-[#403f37] md:p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black tracking-[0.24em] text-[#b89b5f]">COMMAND INPUT</p>
                    <h2 className="mt-2 text-2xl font-black text-[#3f4935]">امروز برای سعیده چه بسازیم؟</h2>
                  </div>
                  <button className="rounded-full bg-[#d7c09a] px-7 py-4 text-sm font-black text-[#101a18] shadow-lg transition hover:-translate-y-0.5" disabled={loading} onClick={generateDailyPackage} type="button">
                    {loading ? "در حال تولید بسته کامل..." : "تولید بسته کامل امروز"}
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="موضوع محتوا">
                    <input className="rounded-[1.25rem] border border-[#e6ddc9] bg-white px-4 py-3 text-sm leading-8 outline-none" onChange={(event) => setTopic(event.target.value)} value={topic} />
                  </Field>
                  <Field label="حال و هوای محتوا">
                    <input className="rounded-[1.25rem] border border-[#e6ddc9] bg-white px-4 py-3 text-sm leading-8 outline-none" onChange={(event) => setMood(event.target.value)} value={mood} />
                  </Field>
                  <Field label="مدت ریلز / مدیتیشن">
                    <input className="rounded-[1.25rem] border border-[#e6ddc9] bg-white px-4 py-3 text-sm leading-8 outline-none" onChange={(event) => setDuration(event.target.value)} value={duration} />
                  </Field>
                  <Field label="Research Mode">
                    <select className="rounded-[1.25rem] border border-[#e6ddc9] bg-white px-4 py-3 text-sm font-bold outline-none" onChange={(event) => setResearchMode(event.target.value)} value={researchMode}>
                      <option>OFFLINE</option>
                      <option>FREE_FIRST</option>
                      <option>HYBRID</option>
                      <option>PREMIUM</option>
                    </select>
                  </Field>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["سریع", "کامل", "پرمیوم"].map((item) => (
                    <button className={`rounded-full px-5 py-2 text-xs font-black ${level === item ? "bg-[#6d755f] text-white" : "border border-[#d7c09a]/50 bg-white text-[#6d6149]"}`} key={item} onClick={() => setLevel(item)} type="button">
                      {item}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {quickTopics.map((item) => (
                    <button className="rounded-full border border-[#d7c09a]/45 bg-[#fffdf8] px-4 py-2 text-xs font-bold text-[#6d6149]" key={item} onClick={() => setTopic(item)} type="button">
                      {item}
                    </button>
                  ))}
                </div>

                {error ? <p className="mt-5 rounded-[1.4rem] bg-[#fff1ed] p-4 text-sm font-bold leading-8 text-[#9b4f3f]">{error}</p> : null}
              </div>
            </div>
          </div>

          <aside className="border-t border-white/10 bg-[#08110f] p-6 lg:border-r lg:border-t-0">
            <div className="sticky top-6 grid gap-6">
              <div className="rounded-[1.8rem] border border-[#d7c09a]/25 bg-white/[0.055] p-5">
                <p className="text-xs font-black tracking-[0.26em] text-[#d7c09a]">ENGINE STATUS</p>
                <h2 className="mt-2 text-2xl font-black text-white">موتورهای زنده</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  <StatusPill label="Tavily" active={providerStatus?.tavily?.configured} />
                  <StatusPill label="Gemini" active={providerStatus?.gemini?.configured} />
                  <StatusPill label="Groq" active={providerStatus?.groq?.configured} />
                  <StatusPill label="OpenAI" active={providerStatus?.openai?.configured} />
                  <StatusPill label="Research" active={providerStatus?.liveResearchAvailable} />
                  <StatusPill label="Safety" active />
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-5 text-sm leading-8 text-[#c8d0c1]">
                <p><b className="text-[#d7c09a]">Provider:</b> {providerUsed}</p>
                <p><b className="text-[#d7c09a]">Confidence:</b> {confidence}</p>
                <p><b className="text-[#d7c09a]">Level:</b> {level}</p>
                <p><b className="text-[#d7c09a]">Mode:</b> {researchMode}</p>
              </div>

              <nav className="grid gap-2">
                {sidebarLinks.map(([label, href]) => (
                  <a className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-[#dfe7d8] transition hover:border-[#d7c09a]/45 hover:bg-[#d7c09a]/10" href={href} key={href}>
                    {label}
                  </a>
                ))}
              </nav>

              <div className="rounded-[1.8rem] border border-[#d7c09a]/25 bg-[#d7c09a]/10 p-5 text-sm leading-8 text-[#f7e7c2]">
                سؤال اصلی امروز: چه محتوایی منتشر کنیم که هم آرامش بسازد، هم اعتماد، هم مسیر درآمد؟
              </div>
            </div>
          </aside>
        </div>
      </section>

      {dailyPackage ? (
        <section className="grid gap-6 rounded-[2rem] border border-[#e6ddc9]/70 bg-[#f8f6f1]/84 p-5 shadow-[0_30px_90px_rgba(91,80,56,0.12)] md:p-7">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.24em] text-[#b89b5f]">READY TO PUBLISH</p>
              <h2 className="mt-2 text-3xl font-black leading-10 text-[#3f4935]">بسته کامل امروز آماده انتشار است</h2>
              <p className="mt-2 text-sm leading-8 text-[#6e6a5e]">موضوع: {dailyPackage.topic}</p>
            </div>
            <CopyButton label="کپی کل بسته JSON" value={fullJson} />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <OutputCard badge="REEL" title="سناریوی ریلز" text={JSON.stringify(dailyPackage.reel, null, 2)} />
            <OutputCard badge="VOICE" title="متن گفتاری سعیده" text={dailyPackage.spokenScript} />
            <OutputCard badge="CAPTION" title="کپشن اینستاگرام" text={dailyPackage.caption} />
            <OutputCard badge="STORY" title="استوری قبل از انتشار" text={dailyPackage.storyBefore.join("\n\n")} />
            <OutputCard badge="STORY" title="استوری بعد از انتشار" text={dailyPackage.storyAfter.join("\n\n")} />
            <OutputCard badge="CTA" title="کامنت، دایرکت و ذخیره" text={`کامنت:\n${dailyPackage.ctas.comment}\n\nدایرکت:\n${dailyPackage.ctas.direct}\n\nذخیره/ارسال:\n${dailyPackage.ctas.saveShare}`} />
            <OutputCard badge="COVER" title="ایده کاور" text={JSON.stringify(dailyPackage.coverIdea, null, 2)} />
            <OutputCard badge="MUSIC" title="موزیک و فضای صوتی" text={dailyPackage.musicDirection} />
            <OutputCard badge="HASHTAG" title="هشتگ‌ها" text={dailyPackage.hashtags} />
            <OutputCard badge="BALE" title="نسخه کانال بله" text={dailyPackage.baleVersion} />
            <OutputCard badge="MEDITATION" title="متن مدیتیشن صوتی" text={JSON.stringify(dailyPackage.meditation, null, 2)} />
            <OutputCard badge="REVENUE" title="گام درآمدی بعدی" text={`Lead Magnet:\n${dailyPackage.monetizationStep.leadMagnet}\n\nLow Ticket:\n${dailyPackage.monetizationStep.lowTicket}\n\nNext Offer:\n${dailyPackage.monetizationStep.nextOffer}`} />
          </div>

          <div className="rounded-[1.7rem] border border-[#d7c09a]/45 bg-[#fffdf8] p-5 text-sm leading-8 text-[#6e6a5e]">
            <b className="text-[#7a6d51]">گارد ایمنی:</b> {dailyPackage.safetyNote}
          </div>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-[#d7c09a]/65 bg-[#fffdf8]/74 p-8 text-center shadow-[0_22px_70px_rgba(91,80,56,0.08)]">
          <h2 className="text-2xl font-black text-[#3f4935]">هنوز بسته‌ای ساخته نشده</h2>
          <p className="mt-3 text-sm leading-8 text-[#6e6a5e]">
            از دکمه طلایی بالا استفاده کن تا خروجی آماده انتشار برای ریلز، کپشن، استوری، بله، مدیتیشن، کاور، موسیقی و مسیر فروش نرم ساخته شود.
          </p>
        </section>
      )}
    </div>
  );
}
