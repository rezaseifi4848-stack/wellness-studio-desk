import { AppShell } from "@/components/AppShell";
import { SmartContentEnginePanel } from "@/components/SmartContentEngine";
import { PageSection } from "@/components/PageSection";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { SectionCard } from "@/components/ui/SectionCard";

const actions = [
  {
    key: "speakingPractice" as const,
    title: "مربی بیان و مثال‌سازی",
    body: "۵ تمرین برای گفتن جلوی دوربین، ساخت مثال روزمره و جمله نجات وقتی صحبت گیر می‌کند.",
    accent: "🎤",
  },
];

const speakingExercises = [
  {
    title: "متن معرفی خود",
    sentence: "سلام قشنگا، من سعیده‌ام و اینجا قراره با هم یوگا، مدیتیشن و چند دقیقه مکث روزانه رو ساده‌تر تمرین کنیم.",
    how: "با لبخند کوچولو، صدای گرم و نگاه مستقیم به دوربین.",
    pause: "بعد از «من سعیده‌ام» و بعد از «ساده‌تر تمرین کنیم» مکث کن.",
    forget: "بگو: بذار ساده‌تر بگم، اینجا قراره با هم آروم شروع کنیم.",
  },
  {
    title: "تمرین نگاه به دوربین",
    sentence: "اگه الان روبه‌روی من نشستی، فقط می‌خوام بدونی برای شروع لازم نیست کامل باشی.",
    how: "انگار با یک هنرجوی عزیز و کمی نگران حرف می‌زنی.",
    pause: "بعد از «روبه‌روی من نشستی» یک مکث نرم بگذار.",
    forget: "به لنز نگاه کن، نفس بکش و بگو: از همین جمله ادامه می‌دم.",
  },
  {
    title: "تمرین مکث",
    sentence: "یه نفس آروم بکش... عجله‌ای نیست... فقط همین لحظه رو حس کن.",
    how: "جمله‌ها را کوتاه بگو و سکوت را پر نکن.",
    pause: "بعد از هر سه نقطه ۳ ثانیه مکث کن.",
    forget: "برگرد به «یه نفس آروم بکش»؛ همین کافی است.",
  },
  {
    title: "تمرین مثال زدن",
    sentence: "بدن‌آگاهی یعنی مثلاً وسط روز بفهمی شونه‌هات سفت شدن، فکت خسته‌ست یا نفست کوتاه شده.",
    how: "سه مثال را با انگشت‌ها آرام بشمار، نه رسمی.",
    pause: "بین هر مثال نیم‌ثانیه مکث کن.",
    forget: "بگو: یه مثال ساده‌تر بزنم، مثل شونه‌هایی که بعد از لپ‌تاپ خسته می‌شن.",
  },
  {
    title: "تمرین فروش نرم",
    sentence: "اگه دوست داری یوگا رو نرم و از پایه شروع کنی، می‌تونی پیام بدی تا راهنمایی‌ات کنم؛ هیچ عجله‌ای نیست.",
    how: "دعوت را مثل کمک کردن بگو، نه تبلیغ کردن.",
    pause: "بعد از «از پایه شروع کنی» مکث کن.",
    forget: "بگو: فقط اگر این فضا به دلت نزدیکه، پیام بده.",
  },
  {
    title: "تمرین خواندن مدیتیشن",
    sentence: "چشم‌ها اگه راحتن نرم بشن... شونه‌ها رو یه کوچولو رها کن... دوباره برگرد به نفس.",
    how: "صدای پایین، سرعت کم، کلمه‌های کشیده اما طبیعی.",
    pause: "بعد از هر دعوت اصلی ۴ ثانیه مکث کن.",
    forget: "بگو: دوباره از نفس شروع می‌کنیم، عجله‌ای نیست.",
  },
  {
    title: "جمله‌های نجات",
    sentence: "بذار ساده‌تر بگم... از همین‌جا ادامه می‌دم... یه مثال روزمره بزنم... دوباره برگردیم به نفس.",
    how: "این‌ها را قبل از ضبط حفظ نکن؛ فقط چند بار با صدای طبیعی تکرار کن.",
    pause: "بعد از هر جمله نجات یک نفس کوتاه بگیر.",
    forget: "یکی از همین جمله‌ها را بگو و ادامه بده.",
  },
  {
    title: "تمرین ۳ دقیقه‌ای قبل از ضبط",
    sentence: "یک دقیقه نفس، یک دقیقه Hook، یک دقیقه متن کوتاه. بعد ضبط اصلی را شروع کن.",
    how: "موبایل را روشن کن اما ضبط اصلی نگیر؛ فقط گرم شو.",
    pause: "بین هر دقیقه ۱۰ ثانیه مکث و آب بخور.",
    forget: "اگر ذهنت قفل شد، فقط Hook را دوباره بگو.",
  },
];

function formatExercise(item: (typeof speakingExercises)[number]) {
  return `عنوان: ${item.title}\nجمله دقیق برای گفتن: ${item.sentence}\nچطور بگه: ${item.how}\nکجا مکث کنه: ${item.pause}\nاگر کلمات یادش رفت: ${item.forget}`;
}

export default function SpeakingCoachPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Speaking & Example Coach"
        title="مربی بیان و مثال‌سازی"
        description="برای اینکه سعیده جلوی دوربین ساده، گرم و مطمئن حرف بزنه و هر آموزش را با مثال روزمره قابل لمس کنه."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {speakingExercises.map((item) => (
            <SectionCard key={item.title} title={item.title} tone="cream">
              <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)]">
                <p><b>جمله دقیق برای گفتن:</b> {item.sentence}</p>
                <p><b>چطور بگه:</b> {item.how}</p>
                <p><b>کجا مکث کنه:</b> {item.pause}</p>
                <p><b>اگر کلمات یادش رفت:</b> {item.forget}</p>
                <CopyButton text={formatExercise(item)} />
              </div>
            </SectionCard>
          ))}
        </div>
        <SmartContentEnginePanel actions={actions} initialEngine="speakingPractice" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
