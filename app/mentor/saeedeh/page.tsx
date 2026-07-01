import { AppShell } from "@/components/AppShell";
import { SaeedehMasterMentor } from "@/components/SaeedehMasterMentor";
import { SafetyNotice } from "@/components/ui/SafetyNotice";

export default function SaeedehMentorPage() {
  return (
    <AppShell>
      <section className="soft-panel cream-to-white grid gap-5 p-8 md:p-10">
        <p className="text-sm font-semibold text-[#8a7a55]">Saeedeh Master Mentor Live</p>
        <h1 className="text-5xl font-semibold leading-[1.6] text-[#4d4f42] md:text-6xl">
          استاد زنده سعیده
        </h1>
        <p className="max-w-4xl text-xl leading-10 text-[var(--ink-soft)]">
          منتور یوگا، مدیتیشن، محتوا، برند، ریلز، کاور، کلاس و فروش نرم
        </p>
      </section>
      <SaeedehMasterMentor />
      <SafetyNotice />
    </AppShell>
  );
}
