import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { getMeditationPrograms, formatMeditationProgram } from "@/src/lib/meditationFirstEngine";

export default function MeditationCommandCenterPage() {
  const programs = getMeditationPrograms();

  return (
    <AppShell>
      <PageSection
        eyebrow="Meditation First"
        title="مرکز مدیتیشن سعیده"
        description="مدیتیشن قلب پروژه است؛ هر برنامه با توضیح، نسخه‌های زمانی، مکث، صدا، موسیقی، بله و کپشن آماده شده."
      >
        <div className="grid gap-6">
          {programs.map((program) => (
            <SectionCard key={program.title} title={program.title} tone="lavender">
              <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)] md:grid-cols-2">
                <p><b>توضیح مبتدی:</b> {program.beginnerExplanation}</p>
                <p><b>توضیح حرفه‌ای:</b> {program.professionalExplanation}</p>
                <p><b>نسخه ۱ دقیقه‌ای:</b> {program.oneMinute}</p>
                <p><b>نسخه ۳ دقیقه‌ای:</b> {program.threeMinute}</p>
                <p><b>نسخه ۵ دقیقه‌ای:</b> {program.fiveMinute}</p>
                <p><b>نسخه ۱۰ دقیقه‌ای:</b> {program.tenMinute}</p>
                <p><b>Pause map:</b> {program.pauseMap}</p>
                <p><b>Voice map:</b> {program.voiceMap}</p>
                <p><b>پست بله:</b> {program.balePost}</p>
                <p><b>ادعا نکن:</b> {program.whatNotToClaim}</p>
                <div className="md:col-span-2">
                  <CopyButton text={formatMeditationProgram(program.title, program.fullGuidedScript)} />
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
