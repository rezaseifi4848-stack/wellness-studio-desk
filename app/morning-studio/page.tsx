import { AppShell } from "@/components/AppShell";
import { DailyCommandPanel } from "@/components/DailyCommandPanel";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { buildDailyCommandPackage } from "@/src/lib/dailyOrchestrator";

export default function MorningStudioPage() {
  const daily = buildDailyCommandPackage();

  return (
    <AppShell>
      <PageSection
        eyebrow="صبح سعیده"
        title="صبح سعیده"
        description="وقتی سعیده چشم باز می‌کند، اینجا همه چیز برای امروز آماده است."
      >
        <DailyCommandPanel />
        <SectionCard title="جزئیات بسته امروز" tone="gold">
          <div className="grid gap-4 text-base leading-9 text-[var(--ink-soft)] md:grid-cols-2">
            <p><b>پیام روز سعیده:</b> {daily.message}</p>
            <p><b>تمرین تنفس روز:</b> {daily.breathwork.guidance}</p>
            <p><b>تمرین بیان روز:</b> {daily.speaking}</p>
            <p><b>ماموریت امروز:</b> {daily.mission.action} / {daily.mission.content} / {daily.mission.audience}</p>
            <p className="md:col-span-2"><b>چک‌لیست انتشار:</b> {daily.checklist.join("، ")}</p>
          </div>
        </SectionCard>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
