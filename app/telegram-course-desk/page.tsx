import { AppShell } from "@/components/AppShell";

export default function TelegramCourseDeskPage() {
  return (
    <AppShell>
      <section className="soft-panel cream-to-white grid gap-5 p-8 md:p-10">
        <p className="text-sm font-semibold text-[#8a7a55]">Telegram Course Desk</p>
        <h1 className="text-5xl font-semibold leading-[1.6] text-[#4d4f42] md:text-6xl">
          آکادمی خصوصی تلگرام سعیده
        </h1>
        <p className="max-w-4xl text-xl leading-10 text-[var(--ink-soft)]">
          ماژول آماده‌سازی و مدیریت دوره‌های خصوصی تلگرام سعیده
        </p>
      </section>

      <section className="soft-panel sage-to-cream grid gap-4 p-7 md:p-9">
        <h2 className="text-2xl font-semibold text-[#4d4f42]">ماژول آماده است</h2>
        <p className="text-base leading-9 text-[var(--ink-soft)]">
          محتوای این بخش بعداً طبق تصمیم نهایی شما تکمیل می‌شود.
        </p>
      </section>
    </AppShell>
  );
}
