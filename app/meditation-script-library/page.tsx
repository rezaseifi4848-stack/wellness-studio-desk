import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { type MeditationScript, meditations } from "@/src/data/meditations";

function formatMeditation(item: MeditationScript) {
  return `عنوان: ${item.title}\nمدت زمان: ${item.duration}\nهدف: ${item.goal}\n\nمتن کامل قابل خواندن:\n${item.text}\n\nراهنمای لحن صدا:\n${item.voice}\n\nپیشنهاد موسیقی آرام:\n${item.music}`;
}

export default function MeditationScriptLibraryPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="بانک متن مدیتیشن"
        title="🧘 متن‌های آماده برای ضبط مدیتیشن"
        description="هر متن برای خواندن با صدای سعیده آماده شده و لحن، موسیقی و هدف تمرین را هم دارد."
      >
        <div className="grid gap-6">
          {meditations.map((item) => (
            <SectionCard key={item.title} title={item.title} tone="lavender">
              <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)]">
                <p><b>مدت زمان:</b> {item.duration}</p>
                <p><b>هدف:</b> {item.goal}</p>
                <p><b>متن کامل قابل خواندن:</b> {item.text}</p>
                <p><b>راهنمای لحن صدا:</b> {item.voice}</p>
                <p><b>پیشنهاد موسیقی آرام:</b> {item.music}</p>
                <CopyButton text={formatMeditation(item)} />
              </div>
            </SectionCard>
          ))}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
