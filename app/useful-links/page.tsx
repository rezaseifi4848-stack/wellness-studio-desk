import { SimplePage } from "@/components/SimplePage";
import { content } from "@/lib/content";

export default function UsefulLinksPage() {
  return (
    <SimplePage
      eyebrow="لینک‌های کاربردی"
      title="منابعی برای یادگیری، ایده‌پردازی و مدیریت محتوا"
      description="این لینک‌ها برای مرور دستی و الهام گرفتن هستند. قبل از انتشار، هر ایده باید با ارزش‌ها، مخاطب و ایمنی آموزشی تو تطبیق داده شود."
      collections={[content.usefulLinks, content.trendSources]}
    />
  );
}
