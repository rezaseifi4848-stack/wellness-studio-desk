import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { contentPlan7Days } from "@/src/data/contentPlan7Days";
import { getSmartContentSuggestions } from "@/src/lib/smartContentEngine";

export default function SevenDayPlanPage() {
  const weeklyPlans = getSmartContentSuggestions("weeklyPlans");

  return (
    <AppShell>
      <PageSection
        eyebrow="برنامه ۷ روزه"
        title="برنامه ۷ روزه شروع پیج سعیده"
        description="یک مسیر روشن برای اینکه هر روز موضوع، Hook، متن گفتار، کپشن، استوری، تمرین بیان و CTA نرم مشخص باشد."
      >
        <div className="grid gap-6">
          {contentPlan7Days.map((day) => (
            <SectionCard key={day.day} title={day.day} tone="cream">
              <div className="grid gap-3 text-base leading-9 text-[var(--ink-soft)] md:grid-cols-2">
                <p><b>موضوع ریلز:</b> {day.reelTopic}</p>
                <p><b>Hook:</b> {day.startLine}</p>
                <p><b>متن گفتار کوتاه:</b> {day.shortSpeech}</p>
                <p><b>کپشن:</b> {day.caption}</p>
                <p><b>استوری:</b> {day.story}</p>
                <p><b>تمرین بیان:</b> {day.practice}</p>
                <p className="md:col-span-2"><b>CTA نرم:</b> ذخیره کن، جواب استوری رو بده، یا اگر دوست داشتی برای شروع نرم پیام بده.</p>
              </div>
            </SectionCard>
          ))}
        </div>

        <SectionCard
          title="۵ مدل برنامه هفتگی آماده"
          description="برای وقتی که سعیده بخواد هفته را با تمرکز متفاوت بچیند."
          tone="lavender"
        >
          <div className="grid gap-4">
            {weeklyPlans.map((plan) => (
              <article className="soft-panel p-5" key={plan.title}>
                <h3 className="text-xl font-semibold leading-9 text-[#4d4f42]">{plan.title}</h3>
                <p className="mt-2 text-base leading-8 text-[var(--ink-soft)]">{plan.readyText}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
