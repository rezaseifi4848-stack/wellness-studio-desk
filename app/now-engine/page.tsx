import { AppShell } from "@/components/AppShell";
import { LiveEngineClient } from "@/components/LiveEngineClient";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function NowEnginePage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Live Now Engine"
        title="الان چی کار کنم؟"
        description="دکمه اضطراری سعیده؛ از API می‌پرسد الان با انرژی، زمان و هدف امروز چه محتوایی بسازد."
      >
        <LiveEngineClient module="now-engine" title="برنامه فوری همین الان را بساز" outputType="now-action-plan" topic="سعیده امروز وقت کم دارد و باید یک محتوای مدیتیشن/بله منتشر کند" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
