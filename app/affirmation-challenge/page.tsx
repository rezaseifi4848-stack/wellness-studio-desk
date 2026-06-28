import { AppShell } from "@/components/AppShell";
import { LiveEngineClient } from "@/components/LiveEngineClient";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function AffirmationChallengePage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Live Affirmation Challenge"
        title="چالش جملات تاکیدی سعیده"
        description="چالش‌ها باید تازه، قابل انتشار، پوسترپذیر و مناسب بله باشند؛ خروجی از API ساخته می‌شود."
      >
        <LiveEngineClient module="affirmation-challenge" title="چالش جملات تاکیدی زنده بساز" outputType="affirmation-challenge" topic="چالش ۳۰ روزه آرامش، شکرگزاری و مدیتیشن برای @yoga_saeedeh" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
