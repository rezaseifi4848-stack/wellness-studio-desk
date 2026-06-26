import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { ScriptBuilderClient } from "./ScriptBuilderClient";

export default function ScriptBuilderPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="متن‌ساز آموزش و کلاس"
        title="متن‌های گرم و مربیانه، درست با صدای سعیده"
        description="برای شروع کلاس، پایان کلاس، ریلکسیشن، خوشامدگویی، تشکر و دعوت به تمرین بعدی متن‌های نرم و طبیعی بساز."
      >
        <ScriptBuilderClient />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
