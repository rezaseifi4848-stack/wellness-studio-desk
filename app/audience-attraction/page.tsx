import { AppShell } from "@/components/AppShell";
import { SmartContentEnginePanel } from "@/components/SmartContentEngine";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

const actions = [
  {
    key: "audienceAttraction" as const,
    title: "موتور جذب مخاطب",
    body: "۵ بسته آماده برای hook، مثال روزمره، کپشن، استوری و CTA نرم.",
    accent: "✨",
  },
];

export default function AudienceAttractionPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Audience Attraction Engine"
        title="موتور جذب مخاطب"
        description="برای ساخت محتوایی که مخاطب حس کنه سعیده مستقیم، مهربون و واقعی با خودش حرف می‌زنه."
      >
        <SmartContentEnginePanel actions={actions} initialEngine="audienceAttraction" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
