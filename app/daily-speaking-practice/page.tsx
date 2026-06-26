import { SimplePage } from "@/components/SimplePage";
import { content } from "@/lib/content";

export default function DailySpeakingPracticePage() {
  return (
    <SimplePage
      eyebrow="تمرین روزانه بیان"
      title="برنامه کوتاه برای هر روز"
      description="تمرین‌های روزانه برای راحت‌تر حرف زدن، نه برای کامل بودن. کوتاه، مهربون و قابل تکرار."
      collections={[content.dailySpeakingPractice, content.speakingExercises]}
    />
  );
}
