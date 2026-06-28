import { AppShell } from "@/components/AppShell";
import { LiveEngineClient } from "@/components/LiveEngineClient";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function EngagementEnginePage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Live Engagement Engine"
        title="موتور کامنت و تعامل"
        description="کامنت، پاسخ، دایرکت، سوال‌باکس و تعامل کانال باید با API و لحن امروز سعیده ساخته شود."
      >
        <LiveEngineClient module="engagement-engine" title="تعامل زنده و غیرکلیشه‌ای بساز" outputType="comments-and-replies" topic="کامنت و پاسخ برای صفحات یوگا، مدیتیشن، بله و اینستاگرام" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
