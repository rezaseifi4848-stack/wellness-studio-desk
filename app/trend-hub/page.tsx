import { AppShell } from "@/components/AppShell";
import { CollectionGrid, PageSection } from "@/components/PageSection";
import { ActionCard } from "@/components/ui/ActionCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { content } from "@/lib/content";

const trendCards = [
  {
    title: "منابع ترند",
    description: "منبع‌ها برای مرور دستی و الهام گرفتن‌ان، نه دریافت خودکار.",
    accent: "📚",
  },
  {
    title: "هوک‌های جدید",
    description: "شروع‌های کوتاه، آروم و بی‌فشار برای ریلز و استوری.",
    accent: "✨",
  },
  {
    title: "ایده ریلز",
    description: "آموزش‌های کوچولو، پشت صحنه مربی و روایت‌های واقعی.",
    accent: "🎥",
  },
  {
    title: "سبک‌های جدید",
    description: "سبک‌های ساده، مینیمال و قابل اجرا برای مخاطب مبتدی.",
    accent: "🌿",
  },
  {
    title: "آپدیت دستی",
    description: "هر ترند قبل از انتشار باید یه دور با لحن مهربون برند چک بشه.",
    accent: "📝",
  },
];

export default function TrendHubPage() {
  return (
    <AppShell>
      <div className="grid gap-8">
        <PageSection
          eyebrow="مرکز به‌روزرسانی محتوا و ترندها"
          title="ترندها وقتی قشنگن که با آرامش و صداقت سعیده هماهنگ باشن"
          description="اینجا روش‌ها و منبع‌های محلی رو نگه می‌داریم تا آروم آروم مرورشون کنیم."
        >
          <SectionCard title="⚠️ هشدار مهم" tone="gold">
            <p className="leading-8 text-[#625f53]">
              این بخش به صورت خودکار ترندهای روز اینترنت رو نمی‌گیره.
              چیزهایی که می‌بینین از داده‌های ذخیره‌شده محلی میان. در آینده
              می‌تونیم یه ابزار آنلاین اضافه کنیم تا آپدیت واقعی هم داشته باشیم.
            </p>
          </SectionCard>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {trendCards.map((card) => (
              <ActionCard {...card} key={card.title} />
            ))}
          </div>
        </PageSection>

        <PageSection
          title={content.trendSources.title}
          description={content.trendSources.description}
        >
          <CollectionGrid collection={content.trendSources} />
        </PageSection>
        <PageSection
          title={content.contentTrends.title}
          description={content.contentTrends.description}
        >
          <CollectionGrid collection={content.contentTrends} />
        </PageSection>
      </div>
    </AppShell>
  );
}
