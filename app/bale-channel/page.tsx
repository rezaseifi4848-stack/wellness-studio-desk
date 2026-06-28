import { AppShell } from "@/components/AppShell";
import { LiveEngineClient } from "@/components/LiveEngineClient";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function BaleChannelPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="@yoga_saeedeh"
        title="موتور کانال بله سعیده"
        description="امروز برای بله چه بذارم؟ خروجی باید از API ساخته شود: پست، پوستر، voice note، CTA، پین و تقویم هفتگی."
      >
        <LiveEngineClient module="bale-channel" title="۱۰ پیشنهاد آماده برای بله بساز" outputType="bale-pack" platform="Bale" topic="کانال بله @yoga_saeedeh با محور مدیتیشن و پوستر روز" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
