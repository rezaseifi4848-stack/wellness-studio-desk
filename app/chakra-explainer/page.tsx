import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { chakras } from "@/src/data/chakras";

export default function ChakraExplainerPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="چاکراها برای محتوا و کلاس"
        title="🌈 توضیح ساده، کاربردی و غیرپزشکی چاکراها"
        description="این صفحه برای ساخت مثال، ریلز و متن کلاس است؛ هیچ ادعای درمانی یا تشخیصی ندارد."
      >
        <div className="grid gap-6">
          {chakras.map((chakra) => (
            <SectionCard key={chakra.faName} title={chakra.faName} tone="cream">
              <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)] md:grid-cols-2">
                <p><b>نام انگلیسی/سانسکریت:</b> {chakra.enName}</p>
                <p><b>رنگ:</b> {chakra.color}</p>
                <p><b>ناحیه بدن:</b> {chakra.bodyArea}</p>
                <p><b>موضوع احساسی:</b> {chakra.emotionalTheme}</p>
                <p className="md:col-span-2"><b>توضیح ساده:</b> {chakra.simpleExplanation}</p>
                <p><b>تمرین پیشنهادی:</b> {chakra.practice}</p>
                <p><b>جمله تأکیدی ملایم:</b> {chakra.affirmation}</p>
                <p className="md:col-span-2"><b>ایده ریلز مرتبط:</b> {chakra.reelIdea}</p>
              </div>
            </SectionCard>
          ))}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
