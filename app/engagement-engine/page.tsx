import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { getEngagementPack } from "@/src/lib/engagementEngine";

export default function EngagementEnginePage() {
  const pack = getEngagementPack();
  const groups = [
    ["۵۰ کامنت گرم", pack.warmComments],
    ["۵۰ پاسخ به کامنت", pack.followerReplies],
    ["۳۰ شروع دایرکت", pack.dmOpeners],
    ["۳۰ پاسخ دایرکت", pack.dmResponses],
    ["۲۰ سوال از کجا شروع کنم؟", pack.startAnswers],
    ["۲۰ پاسخ وقت ندارم", pack.noTimeAnswers],
    ["۲۰ پاسخ بدنم خشکه", pack.stiffBodyAnswers],
    ["۲۰ پاسخ مدیتیشن بلد نیستم", pack.meditationBeginnerAnswers],
  ] as const;

  return (
    <AppShell>
      <PageSection
        eyebrow="Engagement Engine"
        title="موتور کامنت و تعامل"
        description="کامنت، پاسخ، دایرکت، سوال‌باکس و تعامل کانال؛ همه گرم، حرفه‌ای و غیرپزشکی."
      >
        <div className="grid gap-6">
          {groups.map(([title, items]) => (
            <SectionCard key={title} title={title} tone="cream">
              <div className="grid gap-2 text-base leading-8 text-[var(--ink-soft)]">
                {items.slice(0, 10).map((item) => (
                  <p className="rounded-3xl bg-[var(--warm-white)] px-4 py-3" key={item}>{item}</p>
                ))}
                <CopyButton text={items.join("\n")} />
              </div>
            </SectionCard>
          ))}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
