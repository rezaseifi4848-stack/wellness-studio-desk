import { AppShell } from "@/components/AppShell";
import { SmartContentEnginePanel } from "@/components/SmartContentEngine";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

const actions = [
  {
    key: "softSales" as const,
    title: "موتور فروش نرم",
    body: "دعوت به کلاس، تکنیک فروش انسانی، CTA نرم و پاسخ آماده به تردید مخاطب.",
    accent: "🤍",
  },
];

export default function SoftSalesPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Soft Sales Engine"
        title="موتور فروش نرم"
        description="برای وقتی که سعیده می‌خواد به کلاس، مدیتیشن یا تمرین دعوت کنه؛ آرام، محترمانه و بدون فشار."
      >
        <SmartContentEnginePanel actions={actions} initialEngine="softSales" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
