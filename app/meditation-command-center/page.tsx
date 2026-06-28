import { AppShell } from "@/components/AppShell";
import { LiveEngineClient } from "@/components/LiveEngineClient";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function MeditationCommandCenterPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Live Meditation Core"
        title="مرکز مدیتیشن سعیده"
        description="مدیتیشن قلب پروژه است؛ این صفحه از AI route برای برنامه‌های مدیتیشن عمیق، قابل خواندن و مناسب بله/ریلز استفاده می‌کند."
      >
        <LiveEngineClient module="meditation-command-center" title="برنامه مدیتیشن زنده بساز" outputType="meditation-program" topic="مدیتیشن روز سعیده برای بله، ریلز و فایل صوتی" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
