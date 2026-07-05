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

type StatusPillProps = {
  label: string;
  active?: boolean;
};

const workflowCards = [
  {
    title: "۱. تشخیص نیاز امشب",
    text: "موضوع، حال مخاطب و سطح حساسیت محتوا مشخص می‌شود.",
  },
  {
    title: "۲. تولید ریلز و کپشن",
    text: "هوک، سناریو، متن گفتاری، کپشن و CTA ساخته می‌شود.",
  },
  {
    title: "۳. مدیتیشن و بله",
    text: "نسخه صوتی، متن کانال بله و پیام آرام شب آماده می‌شود.",
  },
  {
    title: "۴. کاور و استوری",
    text: "ایده کاور، استوری قبل و بعد انتشار با لحن سعیده تولید می‌شود.",
  },
  {
    title: "۵. مسیر فروش نرم",
    text: "دایرکت، فایل رایگان، چالش ۷ روزه و محصول بعدی پیشنهاد می‌شود.",
  },
];

const quickTopics = [
  "مدیتیشن آرامش قبل از خواب برای خانم‌هایی که ذهن شلوغ دارند",
  "تمرین تنفس ۶۰ ثانیه‌ای برای رها کردن فشار روز",
  "یوگای نرم صبحگاهی برای شروع آرام روز",
  "چاکرای قلب و مهربانی با خود برای مخاطب مبتدی",
];

function statusText(active?: boolean) {
  return active ? "فعال" : "غیرفعال";
}

function StatusPill({ label, active }: StatusPillProps) {
  return (
    <span className={`rounded-full border px-4 py-2 text-xs font-semibold ${active ? "border-[#d7c09a]/60 bg-[#eef2e8] text-[#4d5a44]" : "border-white/55 bg-white/55 text-[#8a7a55]"}`}>
      {label}: {statusText(active)}
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
      className="studio-button border border-[#d7c09a]/50 bg-white/80 px-4 py-2 text-xs font-bold text-[#6d6149]"
      onClick={copy}
      type="button"
    >
      {copied ? "کپی شد" : label}
    </button>
  );
}

function OutputCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-[1.5rem] border border-[#e6ddc9]/70 bg-white/80 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-black text-[#4d4f42]">{title}</h3>
        <CopyButton value={text} />
      </div>
      <p className="whitespace-pre-line text-sm leading-8 text-[#6e6a5e]">{text}</p>
    </article>
  );
}

function safeRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function safeString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

async function postMentor(payload: Record<string, unknown>): Promise<MentorResult> {
  const response = await fetch("/api/mentor/saeedeh/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Mentor API failed");
  }

  return response.json();
}

function buildGeneratedPackage(topic: string, reelResult: MentorResult, meditationResult: MentorResult): GeneratedPackage {
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
    reel,
    spokenScript,
    caption: longCaption,
    storyBefore: [
      "امشب یک تمرین خیلی نرم قبل خواب می‌ذارم برای ذهن‌های شلوغ.",
      "فقط ۴۵ ثانیه است؛ برای اینکه قبل خواب کمی به بدنت برگردی.",
      "استیکر سؤال: شب‌ها بیشتر با چی درگیری؟ ذهن شلوغ / نگرانی فردا / خستگی بدن / بی‌خوابی",
    ],
    storyAfter: [
      "ریلز امشب منتشر شد؛ برای شب‌هایی که ذهنت زیادی حرف می‌زنه.",
      "قبل خواب فقط یک بار باهاش نفس بکش. لازم نیست عالی انجامش بدی؛ فقط همراهش باش.",
      "اگه انجامش دادی، توی دایرکت بنویس: خواب آرام",
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
      nextOffer: "چالش ۷ شب آرام‌تر با سعیده؛ مسیر سبک از محتوای رایگان تا فروش نرم.",
    },
    safetyNote: reelResult.output?.safetyNote || meditationResult.output?.safetyNote || "این محتوا آموزشی و آرام‌سازی شخصی است و جایگزین درمان، مشاوره پزشکی یا روان‌درمانی نیست.",
    raw: {
      reelResult,
      meditationResult,
    },
  };
}

export function SaeedehLiveDesk() {
  const [providerStatus, setProviderStatus] = useState<ProviderStatus | null>(null);
  const [topic, setTopic] = useState("مدیتیشن آرامش قبل از خواب برای خانم‌هایی که ذهن شلوغ دارند");
  const [mood, setMood] = useState("زنانه، گرم، آرام، قبل خواب، امن و مهربان");
  const [duration, setDuration] = useState("۳۰ تا ۴۵ ثانیه");
  const [researchMode, setResearchMode] = useState("OFFLINE");
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

  async function generateDailyPackage() {
    setLoading(true);
    setError("");

    try {
      const basePayload = {
        platform: "Instagram, Reel, Story, Bale, Voice meditation",
        goal: "جذب مخاطب، آرام‌سازی، اعتمادسازی و فروش نرم",
        audience: "خانم‌هایی که ذهن شلوغ دارند و دنبال آرامش روزانه هستند",
        topic,
        mood,
        duration,
        cta: "ذخیره کن برای قبل خواب، برای یک دوست بفرست و در دایرکت بنویس خواب آرام.",
        safetyLimit: "بدون ادعای درمان؛ مناسب مخاطب عمومی و مبتدی؛ با احتیاط برای موضوعات حساس جسمی و روانی.",
        researchMode,
        providerMode: "auto",
        sensitivity: "عمومی",
        allowExternalForSensitive: false,
      };

      const reelResult = await postMentor({
        ...basePayload,
        task: "ریلز امشب با کپشن، کاور، استوری، CTA و نسخه بله",
      });

      const meditationResult = await postMentor({
        ...basePayload,
        task: "مدیتیشن خواب و متن صوتی قبل از خواب",
      });

      setDailyPackage(buildGeneratedPackage(topic, reelResult, meditationResult));
    } catch {
      setError("موتور زنده الان پاسخ کامل نداد. احتمالاً API یا سرویس Render نیاز به بررسی دارد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8" dir="rtl">
      <section className="relative overflow-hidden rounded-[2.4rem] border border-[#d7c09a]/45 bg-[#fffdf8]/88 p-7 shadow-[0_36px_110px_rgba(91,80,56,0.13)] backdrop-blur md:p-10">
        <div className="absolute -left-20 top-[-90px] h-72 w-72 rounded-full bg-[#d8d0e8]/45 blur-3xl" />
        <div className="absolute -right-24 bottom-[-110px] h-80 w-80 rounded-full bg-[#a8b8a0]/38 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_270px] lg:items-start">
          <div className="grid gap-7">
            <div>
              <p className="tracking-[0.42em] text-xs font-black uppercase text-[#b89b5f]">SAEEDEH LIVE DESK</p>
              <h1 className="mt-5 text-4xl font-black leading-[1.65] text-[#4d4f42] md:text-6xl">
                اتاق فرمان زنده یوگا با سعیده
              </h1>
              <p className="mt-4 max-w-4xl text-lg leading-10 text-[#6e6a5e]">
                موتور روزانه تولید محتوا، مدیتیشن، ریلز، استوری، کانال بله، چالش ۷ روزه و فروش نرم برای برند آرام و زنانه سعیده.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="studio-button bg-[#d7c09a] px-7 py-4 text-sm font-black text-[#403f37]"
                disabled={loading}
                onClick={generateDailyPackage}
                type="button"
              >
                {loading ? "سعیده در حال ساخت بسته کامل..." : "تولید بسته کامل امروز"}
              </button>
              <a className="studio-button border border-[#d7c09a]/55 bg-white/80 px-7 py-4 text-sm font-black text-[#6d6149]" href="/morning-studio">
                صبح سعیده
              </a>
              <a className="studio-button border border-[#d7c09a]/55 bg-white/80 px-7 py-4 text-sm font-black text-[#6d6149]" href="/poster-studio">
                استودیو پوستر
              </a>
            </div>

            <div className="rounded-[2rem] border border-[#e6ddc9]/75 bg-[#f8f6f1]/80 p-4 text-sm leading-8 text-[#6e6a5e]">
              <span className="font-black text-[#8a7a55]">لینک داشبورد:</span> https://yoga-ba-saeedeh.onrender.com/mentor/saeedeh
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#d7c09a]/45 bg-[#f8f6f1]/82 p-6 text-center shadow-sm">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#eef2e8] text-4xl">🌙</div>
            <h2 className="mt-5 text-2xl font-black text-[#4d4f42]">Yoga Ba Saeedeh</h2>
            <p className="mt-2 text-sm font-semibold tracking-[0.25em] text-[#b89b5f]">LIVE WELLNESS INTELLIGENCE</p>
            <p className="mt-5 rounded-[1.4rem] bg-white/75 p-4 text-sm leading-8 text-[#6e6a5e]">
              سؤال کاری سعیده: امروز برای رشد پیج، آرامش مخاطب و درآمد نرم چه چیزی باید منتشر شود؟
            </p>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {workflowCards.map((card) => (
          <article className="rounded-[1.7rem] border border-[#d7c09a]/40 bg-white/75 p-5 shadow-sm" key={card.title}>
            <h3 className="text-base font-black leading-8 text-[#7a6d51]">{card.title}</h3>
            <p className="mt-3 text-sm leading-8 text-[#6e6a5e]">{card.text}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[2rem] border border-[#e6ddc9]/70 bg-white/80 p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.24em] text-[#b89b5f]">COMMAND INPUT</p>
              <h2 className="mt-2 text-2xl font-black text-[#4d4f42]">موضوع بسته امروز</h2>
            </div>
            <button className="studio-button bg-[#6d755f] px-5 py-3 text-sm font-black text-white" disabled={loading} onClick={generateDailyPackage} type="button">
              اجرا کن
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-black text-[#4d4f42] md:col-span-2">
              موضوع
              <input
                className="rounded-[1.25rem] border border-[#e6ddc9] bg-[#fffdf8] px-4 py-3 text-sm leading-8 text-[#4d4f42] outline-none"
                onChange={(event) => setTopic(event.target.value)}
                value={topic}
              />
            </label>
            <label className="grid gap-2 text-sm font-black text-[#4d4f42]">
              حال و هوای محتوا
              <input
                className="rounded-[1.25rem] border border-[#e6ddc9] bg-[#fffdf8] px-4 py-3 text-sm leading-8 text-[#4d4f42] outline-none"
                onChange={(event) => setMood(event.target.value)}
                value={mood}
              />
            </label>
            <label className="grid gap-2 text-sm font-black text-[#4d4f42]">
              مدت ریلز / مدیتیشن
              <input
                className="rounded-[1.25rem] border border-[#e6ddc9] bg-[#fffdf8] px-4 py-3 text-sm leading-8 text-[#4d4f42] outline-none"
                onChange={(event) => setDuration(event.target.value)}
                value={duration}
              />
            </label>
            <label className="grid gap-2 text-sm font-black text-[#4d4f42]">
              Research Mode
              <select
                className="rounded-[1.25rem] border border-[#e6ddc9] bg-[#fffdf8] px-4 py-3 text-sm font-bold text-[#4d4f42] outline-none"
                onChange={(event) => setResearchMode(event.target.value)}
                value={researchMode}
              >
                <option>OFFLINE</option>
                <option>FREE_FIRST</option>
                <option>HYBRID</option>
                <option>PREMIUM</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickTopics.map((item) => (
              <button
                className="rounded-full border border-[#d7c09a]/45 bg-[#f8f6f1] px-4 py-2 text-xs font-bold text-[#6d6149]"
                key={item}
                onClick={() => setTopic(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          {error ? <p className="mt-5 rounded-[1.4rem] bg-[#fff1ed] p-4 text-sm font-bold leading-8 text-[#9b4f3f]">{error}</p> : null}
        </div>

        <aside className="rounded-[2rem] border border-[#e6ddc9]/70 bg-[#f8f6f1]/86 p-6 shadow-sm">
          <p className="text-xs font-black tracking-[0.24em] text-[#b89b5f]">LIVE ENGINE STATUS</p>
          <h2 className="mt-2 text-2xl font-black text-[#4d4f42]">موتورهای فعال</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <StatusPill label="Tavily" active={providerStatus?.tavily?.configured} />
            <StatusPill label="Gemini" active={providerStatus?.gemini?.configured} />
            <StatusPill label="Groq" active={providerStatus?.groq?.configured} />
            <StatusPill label="OpenAI" active={providerStatus?.openai?.configured} />
            <StatusPill label="Live Research" active={providerStatus?.liveResearchAvailable} />
            <StatusPill label="Safety Guard" active />
          </div>
          <div className="mt-6 rounded-[1.4rem] bg-white/75 p-4 text-sm leading-8 text-[#6e6a5e]">
            هیچ کلید API نمایش داده نمی‌شود. اگر وضعیت غیرفعال بود، فقط یعنی env یا provider در سرور نیاز به بررسی دارد.
          </div>
        </aside>
      </section>

      {dailyPackage ? (
        <section className="grid gap-6">
          <div className="rounded-[2rem] border border-[#d7c09a]/45 bg-[#fffdf8]/86 p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black tracking-[0.24em] text-[#b89b5f]">READY TO PUBLISH</p>
                <h2 className="mt-2 text-3xl font-black leading-10 text-[#4d4f42]">بسته کامل امروز آماده است</h2>
              </div>
              <CopyButton label="کپی کل JSON" value={fullJson} />
            </div>
            <p className="mt-4 text-sm leading-8 text-[#6e6a5e]">موضوع: {dailyPackage.topic}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <OutputCard title="سناریوی ریلز" text={JSON.stringify(dailyPackage.reel, null, 2)} />
            <OutputCard title="متن گفتاری سعیده" text={dailyPackage.spokenScript} />
            <OutputCard title="کپشن اینستاگرام" text={dailyPackage.caption} />
            <OutputCard title="استوری قبل از انتشار" text={dailyPackage.storyBefore.join("\n\n")} />
            <OutputCard title="استوری بعد از انتشار" text={dailyPackage.storyAfter.join("\n\n")} />
            <OutputCard title="CTA کامنت و دایرکت" text={`کامنت:\n${dailyPackage.ctas.comment}\n\nدایرکت:\n${dailyPackage.ctas.direct}\n\nذخیره/ارسال:\n${dailyPackage.ctas.saveShare}`} />
            <OutputCard title="ایده کاور" text={JSON.stringify(dailyPackage.coverIdea, null, 2)} />
            <OutputCard title="موزیک پیشنهادی" text={dailyPackage.musicDirection} />
            <OutputCard title="هشتگ‌ها" text={dailyPackage.hashtags} />
            <OutputCard title="نسخه کانال بله" text={dailyPackage.baleVersion} />
            <OutputCard title="متن مدیتیشن صوتی" text={JSON.stringify(dailyPackage.meditation, null, 2)} />
            <OutputCard title="گام درآمدی بعدی" text={`Lead Magnet:\n${dailyPackage.monetizationStep.leadMagnet}\n\nLow Ticket:\n${dailyPackage.monetizationStep.lowTicket}\n\nNext Offer:\n${dailyPackage.monetizationStep.nextOffer}`} />
          </div>

          <div className="rounded-[1.7rem] border border-[#d7c09a]/45 bg-[#f8f6f1] p-5 text-sm leading-8 text-[#6e6a5e]">
            <b className="text-[#7a6d51]">نکته ایمنی:</b> {dailyPackage.safetyNote}
          </div>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-[#d7c09a]/65 bg-white/65 p-8 text-center">
          <h2 className="text-2xl font-black text-[#4d4f42]">هنوز بسته‌ای ساخته نشده</h2>
          <p className="mt-3 text-sm leading-8 text-[#6e6a5e]">
            روی «تولید بسته کامل امروز» بزن تا خروجی آماده انتشار برای ریلز، کپشن، استوری، بله، مدیتیشن و فروش نرم ساخته شود.
          </p>
        </section>
      )}
    </div>
  );
}
