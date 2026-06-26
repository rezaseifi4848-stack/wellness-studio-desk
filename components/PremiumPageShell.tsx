import Image from "next/image";
import Link from "next/link";
import { WellnessHeader } from "@/components/ui/WellnessHeader";
import { SafetyNotice } from "@/components/ui/SafetyNotice";
import { appRoutes } from "@/lib/routes";
import { brand } from "@/lib/content";

type PremiumPageShellProps = {
  children: React.ReactNode;
};

export function PremiumPageShell({ children }: PremiumPageShellProps) {
  return (
    <div className="premium-gradient min-h-screen text-[var(--foreground)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-5 sm:px-6 lg:py-10">
        <nav className="soft-panel flex flex-col gap-5 p-4 md:flex-row md:items-center md:justify-between">
          <Link className="calm-focus flex items-center gap-4" href="/">
            <Image
              src="/logo-yoga-saeedeh.svg"
              alt="یوگا با سعیده"
              width={58}
              height={58}
              priority
            />
            <div>
              <p className="text-xl font-semibold text-[#4d4f42]">{brand.name}</p>
              <p className="mt-1 text-xs leading-6 text-[var(--ink-soft)]">
                استودیوی آرامش، بیان و محتوا
              </p>
            </div>
          </Link>

          <div className="flex gap-2 overflow-x-auto pb-1 md:max-w-3xl md:flex-wrap md:justify-end md:overflow-visible md:pb-0">
            {appRoutes.slice(0, 11).map((route) => (
              <Link
                className="calm-focus shrink-0 rounded-full px-4 py-2.5 text-sm text-[#615d51] transition hover:bg-[var(--sage-soft)] hover:text-[#3f4935]"
                href={route.href}
                key={route.href}
              >
                {route.shortLabel}
              </Link>
            ))}
          </div>
        </nav>

        <WellnessHeader />

        <section className="soft-panel lavender-to-white grid gap-4 p-7 md:grid-cols-[1fr_160px] md:items-center md:p-9">
          <div>
            <p className="text-sm font-semibold text-[#736883]">الهام کوچولوی امروز</p>
            <blockquote className="mt-3 max-w-3xl text-2xl font-semibold leading-12 text-[#4c493f]">
              «قرار نیست کامل باشی قشنگم... فقط کافیه هر روز یه کوچولو به خودت
              نزدیک‌تر بشی 🌷»
            </blockquote>
          </div>
          <Image
            className="mx-auto opacity-90"
            src="/illustration-moon.svg"
            alt="ماه آرام"
            width={140}
            height={140}
          />
        </section>

        <main className="grid gap-10">{children}</main>
        <SafetyNotice />
      </div>
    </div>
  );
}
