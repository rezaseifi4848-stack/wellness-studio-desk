import { AppShell } from "@/components/AppShell";
import { LiveEngineClient } from "@/components/LiveEngineClient";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function MorningStudioPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Live AI Morning Studio"
        title="صبح سعیده"
        description="وقتی سعیده چشم باز می‌کند، موتور زنده باید بسته کامل امروز را بسازد: مدیتیشن، پوستر، بله، ریلز، کپشن، استوری و تعامل."
      >
        <LiveEngineClient module="morning-studio" title="بسته کامل امروز را بساز" topic="صبح امروز سعیده؛ مدیتیشن قلب محتوا باشد" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
