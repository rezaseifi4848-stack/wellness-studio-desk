import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { affirmationChallenges } from "@/src/data/affirmationChallenges";

export default function AffirmationChallengePage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Affirmation Challenge"
        title="چالش جملات تاکیدی سعیده"
        description="چالش‌های آماده برای پوستر، بله، استوری، کپشن و تمرین بیان روزانه."
      >
        <div className="grid gap-6">
          {affirmationChallenges.map((challenge) => {
            const firstDay = challenge.days[0];
            const text = `${challenge.title}\nروز ${firstDay.day}\n${firstDay.affirmation}\n${firstDay.caption}\n${firstDay.balePost}`;
            return (
              <SectionCard key={challenge.title} title={challenge.title} tone="cream">
                <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)]">
                  <p><b>روز اول:</b> {firstDay.affirmation}</p>
                  <p><b>سوال تأمل:</b> {firstDay.reflectionQuestion}</p>
                  <p><b>تمرین تنفس:</b> {firstDay.breathingPractice}</p>
                  <p><b>مدیتیشن ۱ دقیقه‌ای:</b> {firstDay.meditationOneMinute}</p>
                  <p><b>پست بله:</b> {firstDay.balePost}</p>
                  <CopyButton text={text} />
                </div>
              </SectionCard>
            );
          })}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
