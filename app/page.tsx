import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DailyCommandPanel } from "@/components/DailyCommandPanel";
import { SmartContentEnginePanel } from "@/components/SmartContentEngine";
import { TonightDeliveryPanel } from "@/components/TonightDeliveryPanel";
import { SectionCard } from "@/components/ui/SectionCard";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { contentPlan7Days } from "@/src/data/contentPlan7Days";
import { startHereSteps } from "@/src/data/tonightDeliveryPackage";
import type { SuggestionEngineKey } from "@/src/data/modernWellnessStyles";

const mainActions: {
  key: SuggestionEngineKey;
  title: string;
  body: string;
  accent: string;
}[] = [
  {
    key: "dailyReels",
    title: "سناریوی ریلز امروز",
    body: "۵ سناریوی آماده با متن گفتار، مثال، کپشن، استوری و جمله نجات.",
    accent: "🎥",
  },
  {
    key: "captionStory",
    title: "کپشن و استوری امروز",
    body: "۵ بسته کپشن و استوری برای ارتباط گرم و طبیعی با مخاطب.",
    accent: "🌷",
  },
  {
    key: "shortMeditation",
    title: "متن مدیتیشن کوتاه",
    body: "۵ متن آماده خواندن با مکث‌ها، راهنمای صدا و فضاسازی.",
    accent: "🫁",
  },
  {
    key: "classOpening",
    title: "متن شروع کلاس",
    body: "۵ شروع کلاس مهربون، حرفه‌ای و مناسب فضای یوگا با سعیده.",
    accent: "🧘",
  },
  {
    key: "speakingPractice",
    title: "تمرین بیان جلوی دوربین",
    body: "۵ تمرین بیان، مثال‌سازی و جمله نجات برای وقتی صحبت گیر می‌کند.",
    accent: "🎤",
  },
  {
    key: "weeklyPlans",
    title: "برنامه محتوایی هفته",
    body: "۳ برنامه هفتگی کامل برای ریلز، کپشن، استوری و تمرین روزانه.",
    accent: "🗓️",
  },
  {
    key: "audienceAttraction",
    title: "موتور جذب مخاطب",
    body: "۵ بسته برای جذب مخاطب با hook نرم، مثال‌های روزمره و محتوای Instagram-ready.",
    accent: "✨",
  },
  {
    key: "softSales",
    title: "موتور فروش نرم",
    body: "دعوت به کلاس، CTA نرم، پاسخ به تردید مخاطب و تکنیک فروش انسانی.",
    accent: "🤍",
  },
  {
    key: "meditationTeaching",
    title: "موتور آموزش مدیتیشن",
    body: "متن آموزشی، مدیتیشن آماده، مکث‌ها و راهنمای خواندن برای سعیده.",
    accent: "🌙",
  },
];

const operationalModules = [
  {
    title: "استاد زنده سعیده",
    body: "همه‌چیز برای ریلز، کپشن، مدیتیشن، کلاس، کاور، برند و فروش نرم؛ با Research Mode و کنترل ایمنی.",
    href: "/mentor/saeedeh",
  },
  {
    title: "موتور جذب مخاطب",
    body: "برای ساختن ارتباط واقعی با مخاطب؛ hook همدلانه، مثال ساده، کپشن، استوری و CTA نرم.",
    href: "/audience-attraction",
  },
  {
    title: "موتور فروش نرم",
    body: "برای دعوت آرام به کلاس یا مدیتیشن؛ بدون فشار، بدون اغراق، با پاسخ آماده به تردیدهای مخاطب.",
    href: "/soft-sales",
  },
  {
    title: "موتور آموزش مدیتیشن",
    body: "برای آموزش ساده مدیتیشن؛ متن گفتار، مکث‌ها، تمرین صدا و مثال‌های روزمره.",
    href: "/meditation-teaching",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="soft-panel cream-to-white grid gap-6 overflow-hidden p-7 md:grid-cols-[1fr_260px] md:items-center md:p-10">
        <div>
          <p className="text-sm font-semibold text-[#8a7a55]">استودیوی آرامش، بیان و محتوا</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.7] text-[#4d4f42] md:text-6xl">
            یوگا با سعیده 🌿
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-10 text-[var(--ink-soft)]">
            اینجا میز کار روزانه سعیده است؛ برای ساخت ریلز، کپشن، استوری، مدیتیشن، شروع کلاس،
            تمرین بیان، فروش نرم و رشد برند شخصی.
          </p>
        </div>
        <div className="rounded-[2.5rem] bg-[rgba(168,184,160,0.2)] p-6 text-center shadow-[0_22px_70px_rgba(97,91,70,0.08)]">
          <p className="text-5xl">🌷</p>
          <p className="mt-4 text-lg font-semibold leading-9 text-[#4d4f42]">
            امشب می‌تونی اولین محتواها رو آماده، کپی و ضبط کنی.
          </p>
        </div>
      </section>

      <SectionCard
        title="تحویل امشب برای سعیده"
        description="شش خروجی فوری و کامل برای شروع واقعی پیج؛ روی هر کارت بزن و متن آماده را همان‌جا کپی کن."
        tone="gold"
      >
        <TonightDeliveryPanel />
      </SectionCard>

      <SectionCard
        title="صبح سعیده"
        description="بسته کامل امروز برای مدیتیشن، پوستر، ریلز، کپشن، بله، تمرین بیان و تعامل."
        tone="sage"
      >
        <DailyCommandPanel />
        <div className="flex flex-wrap gap-3">
          {[
            ["/morning-studio", "باز کردن صبح سعیده"],
            ["/mentor/saeedeh", "استاد زنده سعیده"],
            ["/poster-studio", "استودیو پوستر"],
            ["/bale-channel", "موتور کانال بله"],
            ["/meditation-command-center", "مرکز مدیتیشن"],
            ["/now-engine", "الان چی کار کنم؟"],
            ["/engagement-engine", "کامنت و تعامل"],
          ].map(([href, label]) => (
            <Link className="studio-button bg-[var(--warm-white)] px-5 py-3 text-sm font-semibold text-[#4d4f42]" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="از اینجا شروع کن سعیده جان"
        description="بدون سردرگمی، فقط همین پنج قدم را به ترتیب برو."
        tone="sage"
      >
        <div className="grid gap-4 md:grid-cols-5">
          {startHereSteps.map((step, index) => (
            <div className="rounded-[2rem] bg-[var(--warm-white)] p-5 text-center shadow-[0_18px_55px_rgba(97,91,70,0.08)]" key={step}>
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold-soft)] text-sm font-semibold text-[#6d6149]">
                {index + 1}
              </span>
              <p className="mt-4 text-sm font-semibold leading-8 text-[#4d4f42]">{step}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="امروز برای سعیده چه بسازیم؟"
        description="روی هر کارت بزن تا همان‌جا خروجی آماده، مثال‌های روزمره، جمله نجات، تمرین بیان و متن قابل کپی ببینی."
        tone="gold"
      >
        <SmartContentEnginePanel actions={mainActions} />
      </SectionCard>

      <SectionCard
        title="میز کار تولید محتوا"
        description="چهار انتخاب سریع برای اینکه خروجی‌ها همیشه کاربردی، ساده و قابل ضبط بمانند."
        tone="cream"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["انتخاب موضوع محتوا", "نفس، بدن‌آگاهی، شروع یوگا، چاکرای قلب، مراقبت روزانه از خود"],
            ["انتخاب لحن", "مهربون، طبیعی، زنانه، ساده، بدون لحن رسمی یا سنگین"],
            ["انتخاب مدت ویدیو", "۳۰ ثانیه برای hook، ۶۰ ثانیه برای آموزش، ۹۰ ثانیه برای مثال کامل"],
            ["انتخاب نوع خروجی", "ریلز، کپشن، استوری، دعوت به کلاس، مدیتیشن صوتی"],
          ].map(([title, text]) => (
            <div className="rounded-[2rem] bg-[var(--warm-white)] p-6 shadow-[0_18px_55px_rgba(97,91,70,0.08)]" key={title}>
              <h3 className="text-lg font-semibold text-[#4d4f42]">{title}</h3>
              <p className="mt-3 text-sm leading-8 text-[var(--ink-soft)]">{text}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-3">
        {operationalModules.map((module) => (
          <SectionCard key={module.title} title={module.title} description={module.body} tone="sage">
            <Link
              className="studio-button calm-focus inline-flex bg-[#6d755f] px-6 py-3 text-sm font-semibold text-white"
              href={module.href}
            >
              باز کردن {module.title}
            </Link>
          </SectionCard>
        ))}
      </div>

      <SectionCard
        title="برنامه ۷ روزه شروع محتوا"
        description="این بخش برنامه پایه روزانه است؛ برای ۳ برنامه کامل‌تر، روی «برنامه محتوایی هفته» در موتور بالا بزن."
        tone="lavender"
      >
        <div className="grid gap-5" id="weekly-content-plan">
          {contentPlan7Days.map((day) => (
            <article className="soft-panel grid gap-3 p-6 md:grid-cols-[120px_1fr]" key={day.day}>
              <h3 className="text-xl font-semibold text-[#4d4f42]">{day.day}</h3>
              <div className="grid gap-2 text-sm leading-7 text-[var(--ink-soft)] md:grid-cols-2">
                <p><b>موضوع ریلز:</b> {day.reelTopic}</p>
                <p><b>جمله شروع ویدیو:</b> {day.startLine}</p>
                <p><b>متن کوتاه گفتار:</b> {day.shortSpeech}</p>
                <p><b>کپشن آماده:</b> {day.caption}</p>
                <p><b>استوری پیشنهادی:</b> {day.story}</p>
                <p><b>تمرین همان روز:</b> {day.practice}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="مسیر رشد سعیده"
        description="تمرکز این مسیر روی بیان، مثال‌سازی، محتوای کوتاه، مدیتیشن صوتی، آماده‌سازی کلاس و فروش نرم است."
        tone="sage"
      >
        <div className="grid gap-4 md:grid-cols-5">
          {[
            "تمرین بیان و اعتمادبه‌نفس جلوی دوربین",
            "ساخت ریلزهای کوتاه و آرام",
            "ضبط مدیتیشن صوتی با مکث‌های درست",
            "آماده‌سازی شروع کلاس یوگا",
            "دعوت نرم به کلاس و ساخت اعتماد",
          ].map((step, index) => (
            <div className="rounded-[2rem] bg-[var(--warm-white)] p-5 text-center" key={step}>
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold-soft)] text-sm font-semibold text-[#6d6149]">{index + 1}</span>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#4d4f42]">{step}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SafetyNotice />
    </AppShell>
  );
}
