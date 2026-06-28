import { AppShell } from "@/components/AppShell";
import { LiveEngineClient } from "@/components/LiveEngineClient";
import { PageSection } from "@/components/PageSection";
import { PosterVisualCard } from "@/components/PosterVisualCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function PosterStudioPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="Live Poster Studio"
        title="استودیو پوستر سعیده"
        description="پوسترها دیگر فقط متن نیستند؛ preview واقعی، دانلود PNG و خروجی API-first دارند."
      >
        <SectionCard title="پیش‌نمایش‌های واقعی پوستر" tone="gold">
          <div className="grid gap-6 md:grid-cols-3">
            <PosterVisualCard id="poster-black-gold" dayNumber={1} title="جمله تاکیدی روز" style="black-gold" />
            <PosterVisualCard id="poster-cream-green" dayNumber={2} title="تنفس آگاهانه" style="cream-green" mainAffirmation="با هر بازدم، کمی نرم‌تر می‌شوم" />
            <PosterVisualCard id="poster-night" dayNumber={3} title="مدیتیشن شب" style="night meditation" mainAffirmation="امشب با آرامش به بدنم گوش می‌دهم" />
          </div>
        </SectionCard>
        <LiveEngineClient module="poster-studio" title="پوستر پرمیوم جدید بساز" outputType="poster-pack" posterStyle="مشکی طلایی لوکس، ماه و نیلوفر، قابل انتشار در بله" />
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
