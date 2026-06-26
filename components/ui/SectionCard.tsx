type SectionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  tone?: "cream" | "sage" | "lavender" | "gold";
};

const tones = {
  cream: "bg-[rgba(248,246,241,0.86)]",
  sage: "bg-[rgba(223,231,216,0.72)]",
  lavender: "bg-[rgba(216,208,232,0.56)]",
  gold: "bg-[rgba(238,224,197,0.7)]",
};

export function SectionCard({
  title,
  description,
  children,
  tone = "cream",
}: SectionCardProps) {
  return (
    <section className={`soft-panel grid gap-8 p-8 md:p-10 ${tones[tone]}`}>
      <div>
        <h2 className="text-3xl font-semibold leading-13 text-[#44483b]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-lg leading-10 text-[var(--ink-soft)]">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
