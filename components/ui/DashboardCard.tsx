import Link from "next/link";
import Image from "next/image";

type DashboardCardProps = {
  title: string;
  body: string;
  href: string;
  accent: string;
  illustration?: string;
};

export function DashboardCard({
  title,
  body,
  href,
  accent,
  illustration,
}: DashboardCardProps) {
  return (
    <Link
      className="soft-panel calm-focus group grid min-h-72 gap-8 overflow-hidden p-8 transition hover:-translate-y-1"
      href={href}
    >
      <div className="flex items-start justify-between gap-6">
        <span className="text-4xl">{accent}</span>
        {illustration ? (
          <Image
            className="opacity-85 transition group-hover:scale-105"
            src={illustration}
            alt=""
            width={96}
            height={96}
          />
        ) : null}
      </div>
      <h3 className="text-2xl font-semibold leading-11 text-[#44483b]">
        {title}
      </h3>
      <p className="text-base leading-9 text-[var(--ink-soft)]">{body}</p>
      <span className="w-fit rounded-full bg-[var(--sage-soft)] px-5 py-2 text-sm font-semibold text-[#59634d]">
        با هم بریم
      </span>
    </Link>
  );
}
