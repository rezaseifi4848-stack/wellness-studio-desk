import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { PosterTemplatePreview } from "@/components/PosterTemplatePreview";
import { SectionCard } from "@/components/ui/SectionCard";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { posterCopyEngine } from "@/src/lib/posterCopyEngine";
import { posterStyles } from "@/src/data/posterTemplates";

export default function PosterStudioPage() {
  const posters = posterCopyEngine({ day: 1, style: "مشکی طلایی لوکس" });

  return (
    <AppShell>
      <PageSection
        eyebrow="Poster Studio"
        title="استودیو پوستر سعیده"
        description="پوسترهای پرمیوم، قابل کپی و مناسب بله/استوری؛ الهام از فضای مشکی طلایی، اما کاملاً اصل و امن."
      >
        <SectionCard title="تنظیمات سریع پوستر" tone="gold">
          <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)] md:grid-cols-3">
            <p><b>روز چالش:</b> ۱ تا ۳۰</p>
            <p><b>موضوع:</b> آرامش، تنفس، شکرگزاری، بدن‌آگاهی</p>
            <p><b>لحن:</b> زنانه، لطیف، حکیمانه، کوتاه</p>
            <p><b>طول متن:</b> متن اصلی تا ۱۲ کلمه، زیرنویس تا ۱۸ کلمه</p>
            <p><b>سبک طراحی:</b> {posterStyles.join("، ")}</p>
            <p><b>مخاطب:</b> دنبال‌کننده خسته، تازه‌کار، علاقه‌مند به مدیتیشن</p>
          </div>
        </SectionCard>
        <div className="grid gap-6">
          {posters.map((poster) => (
            <PosterTemplatePreview key={poster.title} poster={poster} />
          ))}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
