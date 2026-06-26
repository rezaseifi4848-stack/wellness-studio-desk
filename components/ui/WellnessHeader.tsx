import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/content";

export function WellnessHeader() {
  return (
    <header className="soft-panel cream-to-white overflow-hidden">
      <div className="relative grid gap-10 p-7 md:grid-cols-[1fr_320px] md:p-12 lg:p-14">
        <div>
          <p className="mb-5 inline-flex rounded-full bg-[var(--lavender)] px-5 py-2 text-sm font-semibold text-[#625872]">
            استودیوی نرم سعیده برای رشد، بیان و آرامش
          </p>
          <h1 className="text-5xl font-semibold leading-20 text-[#44483b] md:text-6xl">
            {brand.name}
          </h1>
          <p className="mt-6 whitespace-pre-line text-2xl leading-12 text-[#696456]">
            آرامش چیزی نیست که پیدا شود،{"\n"}آرامش چیزی است که به آن بازمی‌گردیم.
          </p>
          <div className="mt-9">
            <p className="text-3xl font-semibold leading-12 text-[#4d4f42]">
              سلام سعیده جان 🌷
            </p>
            <p className="mt-2 text-xl leading-10 text-[var(--ink-soft)]">
              امروز دوست داری روی چه چیزی کار کنیم؟
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { href: "/content-studio", label: "✨ تولید محتوا" },
              { href: "/class-planner", label: "🧘 طراحی کلاس" },
              { href: "/speaking-coach", label: "🎤 تمرین بیان" },
              { href: "/example-bank", label: "🤍 الهام روزانه" },
            ].map((action) => (
              <Link
                className="studio-button calm-focus bg-[#6d755f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5d654f]"
                href={action.href}
                key={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
          <div className="gold-line mt-8 w-64" />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative rounded-[48px] border border-[rgba(215,192,154,0.42)] bg-[rgba(248,246,241,0.72)] p-6 shadow-2xl shadow-[#8d7d5f1a]">
            <Image
              className="absolute -right-10 -top-8 opacity-75"
              src="/illustration-leaf.svg"
              alt=""
              width={110}
              height={110}
            />
            <Image
              src="/logo-yoga-saeedeh.svg"
              alt="لوگوی یوگا با سعیده"
              width={210}
              height={210}
              priority
            />
            <Image
              className="absolute -bottom-10 -left-8 opacity-80"
              src="/illustration-lotus.svg"
              alt=""
              width={120}
              height={120}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
