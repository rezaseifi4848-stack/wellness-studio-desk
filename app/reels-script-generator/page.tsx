import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SectionCard } from "@/components/ui/SectionCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { type ReelsScript, reelsScripts } from "@/src/data/reelsScripts";

function formatReel(reel: ReelsScript) {
  return `عنوان: ${reel.title}\nموضوع: ${reel.topic}\nHook شروع ویدیو: ${reel.hook}\n\nمتن کامل گفتار:\n${reel.speech}\n\nپیشنهاد تصویر:\n${reel.visual}\n\nجمله پایانی:\n${reel.closing}\n\nکپشن آماده:\n${reel.caption}\n\nهشتگ‌ها:\n${reel.hashtags}`;
}

export default function ReelsScriptGeneratorPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="سناریوی ریلز امروز"
        title="🎥 متن‌های آماده ریلز برای برند یوگا با سعیده"
        description="هر کارت یک سناریوی کامل و قابل کپی برای ضبط یا کپشن اینستاگرام دارد."
      >
        <div className="grid gap-6">
          {reelsScripts.map((reel) => (
            <SectionCard key={reel.title} title={reel.title} tone="cream">
              <div className="grid gap-4 text-base leading-8 text-[var(--ink-soft)]">
                <p><b>موضوع:</b> {reel.topic}</p>
                <p><b>Hook شروع ویدیو:</b> {reel.hook}</p>
                <p><b>متن کامل گفتار:</b> {reel.speech}</p>
                <p><b>پیشنهاد تصویر:</b> {reel.visual}</p>
                <p><b>جمله پایانی:</b> {reel.closing}</p>
                <p><b>کپشن آماده:</b> {reel.caption}</p>
                <p><b>هشتگ‌ها:</b> {reel.hashtags}</p>
                <CopyButton text={formatReel(reel)} />
              </div>
            </SectionCard>
          ))}
        </div>
        <SafetyNotice />
      </PageSection>
    </AppShell>
  );
}
