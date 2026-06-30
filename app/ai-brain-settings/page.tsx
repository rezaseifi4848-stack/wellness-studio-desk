import { AppShell } from "@/components/AppShell";
import { AiBrainSettingsClient } from "@/components/AiBrainSettingsClient";
import { PageSection } from "@/components/PageSection";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { saeedehBrainConfig } from "@/src/data/saeedehBrainConfig";

export default function AiBrainSettingsPage() {
  const openAiKeyActive = Boolean(process.env.OPENAI_API_KEY);
  const liveSearchEnabled = Boolean(process.env.TAVILY_API_KEY || process.env.BRAVE_SEARCH_API_KEY || process.env.SERPAPI_KEY);
  const modelFromEnv = process.env.OPENAI_MODEL;
  const warnings = [
    !openAiKeyActive ? "کلید OpenAI در Render تنظیم نشده است." : undefined,
    !modelFromEnv ? "OPENAI_MODEL تنظیم نشده؛ مدل پیش‌فرض استفاده شد." : undefined,
    !liveSearchEnabled ? "جستجوی زنده فعال نیست؛ فعلاً از بانک داخلی برند استفاده می‌شود." : undefined,
  ].filter(Boolean) as string[];

  return (
    <AppShell>
      <PageSection
        eyebrow="AI Brain Control Center"
        title="تنظیمات مغز سعیده"
        description="اینجا مشخص می‌کنیم موتور هوش مصنوعی سعیده چطور فکر کند، چطور بنویسد، چه چیزهایی نسازد و چه خروجی‌هایی تحویل بدهد."
      >
        <AiBrainSettingsClient
          initialStatus={{
            openAiKeyActive,
            openAiModel: modelFromEnv || saeedehBrainConfig.defaultModel,
            liveAiEnabled: openAiKeyActive,
            liveSearchEnabled,
            outputMode: openAiKeyActive ? "live" : "offline fallback",
            source: openAiKeyActive ? "OpenAI" : "Local fallback",
            warnings,
            aiActive: openAiKeyActive,
            searchActive: liveSearchEnabled,
          }}
        />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
