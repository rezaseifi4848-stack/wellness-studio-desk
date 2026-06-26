import { AppShell } from "@/components/AppShell";
import { SmartContentEnginePanel } from "@/components/SmartContentEngine";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

const actions = [
  {
    key: "meditationTeaching" as const,
    title: "موتور آموزش مدیتیشن",
    body: "متن آموزشی، مثال‌های ساده، متن مدیتیشن، مکث‌ها و راهنمای صدا.",
    accent: "🌙",
  },
];

export default function MeditationTeachingPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Meditation Teaching Engine"
        title="موتور آموزش مدیتیشن"
        description="برای آموزش ساده و انسانی مدیتیشن، بدون لحن سنگین و بدون ادعای پزشکی."
      >
        <SmartContentEnginePanel actions={actions} initialEngine="meditationTeaching" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
