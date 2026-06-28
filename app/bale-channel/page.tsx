import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { getBaleSuggestions } from "@/src/lib/baleChannelEngine";

export default function BaleChannelPage() {
  const packs = getBaleSuggestions(15);

  return (
    <AppShell>
      <PageSection
        eyebrow="@yoga_saeedeh"
        title="موتور کانال بله سعیده"
        description="امروز برای بله چه بذارم؟ اینجا متن‌های آماده، گرم و قابل انتشار برای کانال بله آماده‌اند."
      >
        <SectionCard title="امروز برای بله چه بذارم؟" tone="sage">
          <div className="grid gap-5">
            {packs.slice(0, 10).map((pack) => (
              <article className="rounded-[2rem] bg-[var(--warm-white)] p-5" key={pack.title}>
                <h3 className="text-xl font-semibold text-[#4d4f42]">{pack.title}</h3>
                <p className="mt-3 whitespace-pre-line text-base leading-8 text-[var(--ink-soft)]">{pack.channelPostText}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]"><b>CTA:</b> {pack.cta}</p>
                <CopyButton text={`${pack.title}\n\n${pack.channelPostText}\n\n${pack.cta}`} />
              </article>
            ))}
          </div>
        </SectionCard>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
