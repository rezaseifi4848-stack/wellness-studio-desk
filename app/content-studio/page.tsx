import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { content } from "@/lib/content";
import { ContentStudioClient } from "./ContentStudioClient";

const buckets = [
  {
    id: "today",
    label: "امروز چی بگم؟",
    helper:
      "یه ایده کوتاه و دلنشین برای پست، حرف روزانه یا شروع گفت‌وگو با مخاطبت انتخاب کن.",
    accent: "🌷",
    placeholder: "مثلا: امروز می‌خوام درباره نفس آروم حرف بزنم...",
    items: content.contentIdeas.items,
  },
  {
    id: "story",
    label: "برای استوری چی بذارم؟",
    helper: "قالب‌های ساده و صمیمی برای استوری‌هایی که حس خوبی می‌دن.",
    accent: "💛",
    placeholder: "موضوع استوری یا حس امروزت رو بنویس...",
    items: content.storyTemplates.items,
  },
  {
    id: "reels",
    label: "برای ریلز چی بگم؟",
    helper: "متن‌های کوتاه با شروع جذاب، حرف روشن و دعوت خیلی نرم.",
    accent: "🎥",
    placeholder: "موضوع ریلز رو بنویس...",
    items: content.reelScripts.items,
  },
  {
    id: "opening",
    label: "برای شروع کلاس چی بگم؟",
    helper: "متن‌های شروع کلاس برای اینکه هنرجوها آروم آروم احساس امنیت کنن.",
    accent: "📖",
    placeholder: "نوع کلاس یا حال‌وهوای هنرجوها رو بنویس...",
    items: content.classOpeningScripts.items,
  },
  {
    id: "chakra",
    label: "برای چاکراها مثال بده",
    helper: "مثال‌های ساده و قابل لمس، بدون ادعای درمانی.",
    accent: "🌿",
    placeholder: "اسم چاکرا یا چیزی که می‌خوای توضیح بدی...",
    items: content.chakraExamples.items,
  },
  {
    id: "caption",
    label: "برای مدیتیشن کپشن بده",
    helper: "کپشن‌های کوتاه برای تمرین‌های آروم و راحت.",
    accent: "✨",
    placeholder: "موضوع مدیتیشن، زمانش یا حس تمرین رو بنویس...",
    items: content.meditationCaptions.items,
  },
  {
    id: "polish",
    label: "حرف ساده منو حرفه‌ای کن",
    helper: "جمله خامت رو بده تا یه متن گرم، مربیانه و قابل انتشار بسازیم.",
    accent: "🪷",
    placeholder: "جمله ساده‌ات رو همین‌جا بنویس...",
    items: content.exampleBank.items,
  },
];

export default function ContentStudioPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="کارخانه تولید محتوا"
        title="از یه جمله ساده برسیم به محتوای آماده و گرم"
        description="اینجا می‌تونی برای ایده، استوری، ریلز، شروع کلاس، مثال چاکرا و کپشن مدیتیشن یه متن نرم و طبیعی بسازی."
      >
        <ContentStudioClient buckets={buckets} />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
