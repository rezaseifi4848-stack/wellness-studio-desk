import { SimplePage } from "@/components/SimplePage";
import { content } from "@/lib/content";

export default function ClassPlannerPage() {
  return (
    <SimplePage
      eyebrow="پلن‌ساز کلاس"
      title="طرح کلاس برای هنرجوی مبتدی"
      description="پلن‌های ساده با شروع، بدنه و پایان نرم. هر حرکت یا تمرین بهتره با توان هنرجو، مرز بدنش و راهنمایی متخصص هماهنگ باشه."
      collections={[content.classPlans, content.classOpeningScripts]}
    />
  );
}
