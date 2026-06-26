import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { voiceMusicGuides } from "@/src/data/voiceMusicGuides";

export default function VoiceMusicGuidancePage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="راهنمای ضبط محتوا"
        title="🎧 صدا، مکث و موسیقی برای مدیتیشن‌های سعیده"
        description="این صفحه برای ضبط واقعی مدیتیشن، ریلزهای آرام و فایل‌های صوتی کوتاه آماده شده."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {voiceMusicGuides.map((section) => (
            <SectionCard key={section.title} title={section.title} tone="gold">
              <p className="text-lg leading-10 text-[var(--ink-soft)]">{section.text}</p>
            </SectionCard>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
