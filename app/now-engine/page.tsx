import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { nowEngine } from "@/src/lib/nowEngine";

export default function NowEnginePage() {
  const result = nowEngine({
    energy: "متوسط",
    time: "۱۵ دقیقه",
    output: "همه",
    audienceMood: "شلوغ ذهن",
    goal: "آرامش",
  });

  return (
    <AppShell>
      <PageSection
        eyebrow="Panic Button"
        title="الان چی کار کنم؟"
        description="وقتی سعیده نمی‌دونه الان چی بسازه، این صفحه یک مسیر فوری و قابل انجام می‌دهد."
      >
        <SectionCard title="پیشنهاد فوری همین الان" tone="gold">
          <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)]">
            <p><b>برنامه ۳ دقیقه‌ای:</b> {result.threeMinutePlan}</p>
            <p><b>محتوای آماده انتشار:</b> {result.exactContent}</p>
            <p><b>پوستر:</b> {result.posterCopy}</p>
            <p><b>کپشن:</b> {result.caption}</p>
            <p><b>استوری:</b> {result.story}</p>
            <p><b>تمرین بیان:</b> {result.speakingPractice}</p>
            <p><b>اگر خسته‌ای:</b> {result.tiredVersion}</p>
            <CopyButton text={Object.values(result).join("\n\n")} />
          </div>
        </SectionCard>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
