import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { type ClassOpening, classOpenings } from "@/src/data/classOpenings";

function formatOpening(item: ClassOpening) {
  return `عنوان: ${item.title}\nمناسب برای چه کلاسی: ${item.suitableFor}\n\nمتن کامل شروع کلاس:\n${item.fullText}\n\nجمله آرام‌کننده ابتدایی:\n${item.calmingLine}\n\nجمله انتقال به حرکت‌ها:\n${item.transitionLine}`;
}

export default function ClassOpeningScriptsPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="بانک شروع کلاس"
        title="🌿 شروع‌های آماده برای کلاس‌های سعیده"
        description="هر کارت یک شروع کامل و قابل خواندن دارد تا قبل از کلاس لازم نباشه از صفر فکر کنی."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {classOpenings.map((item) => (
            <SectionCard key={item.title} title={item.title} tone="sage">
              <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)]">
                <p><b>مناسب برای چه کلاسی:</b> {item.suitableFor}</p>
                <p><b>متن کامل شروع کلاس:</b> {item.fullText}</p>
                <p><b>جمله آرام‌کننده ابتدایی:</b> {item.calmingLine}</p>
                <p><b>جمله انتقال به حرکت‌ها:</b> {item.transitionLine}</p>
                <CopyButton text={formatOpening(item)} />
              </div>
            </SectionCard>
          ))}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
