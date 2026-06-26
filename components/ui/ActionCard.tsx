type ActionCardProps = {
  title: string;
  description: string;
  accent?: string;
  children?: React.ReactNode;
};

export function ActionCard({
  title,
  description,
  accent = "🌿",
  children,
}: ActionCardProps) {
  return (
    <article className="soft-panel group grid gap-5 p-7 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl">{accent}</p>
          <h3 className="mt-4 text-2xl font-semibold leading-11 text-[#45483b]">
            {title}
          </h3>
          <p className="mt-3 text-base leading-9 text-[var(--ink-soft)]">
            {description}
          </p>
        </div>
        <span className="h-10 w-10 rounded-full border border-[var(--gold)] bg-[var(--gold-soft)] transition group-hover:scale-105" />
      </div>
      {children}
    </article>
  );
}
