import { SimplePage } from "@/components/SimplePage";
import { content } from "@/lib/content";

export default function ExampleBankPage() {
  return (
    <SimplePage
      eyebrow="بانک مثال‌ها"
      title="مثال‌های آماده برای توضیح مفاهیم"
      description="برای وقتی که می‌خوای مفاهیم یوگا، ذهن‌آگاهی، چاکرا یا حضور توی بدن رو ساده و قابل لمس توضیح بدی."
      collections={[content.exampleBank, content.chakraExamples]}
    />
  );
}
