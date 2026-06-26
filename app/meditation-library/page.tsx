import { SimplePage } from "@/components/SimplePage";
import { content } from "@/lib/content";

export default function MeditationLibraryPage() {
  return (
    <SimplePage
      eyebrow="کتابخانه مدیتیشن"
      title="تمرین‌های مدیتیشن و کپشن‌های همراه"
      description="یه کتابخونه کوچیک برای ساخت جلسه‌های کوتاه، کپشن‌های آروم و متن‌های معرفی تمرین."
      collections={[content.meditationLibrary, content.meditationCaptions]}
    />
  );
}
