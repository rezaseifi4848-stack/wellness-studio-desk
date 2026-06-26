import type { ContentCollection, ContentItem } from "@/lib/content";

type PageSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

type CollectionGridProps = {
  collection: ContentCollection;
  limit?: number;
};

export function PageSection({
  eyebrow,
  title,
  description,
  children,
}: PageSectionProps) {
  return (
    <section className="grid gap-8">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold text-[var(--olive-deep)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-4xl font-semibold leading-16 text-[#44483b]">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-lg leading-10 text-[#68675c]">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

export function CollectionGrid({ collection, limit }: CollectionGridProps) {
  const items = limit ? collection.items.slice(0, limit) : collection.items;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <ContentCard item={item} key={`${item.title}-${index}`} />
      ))}
    </div>
  );
}

export function ContentCard({ item }: { item: ContentItem }) {
  return (
    <article className="soft-panel p-7">
      <div className="mb-3 flex flex-wrap gap-2">
        {item.tag ? <Badge>{item.tag}</Badge> : null}
        {item.level ? <Badge>{item.level}</Badge> : null}
        {item.duration ? <Badge>{item.duration}</Badge> : null}
        {item.status ? <Badge>{item.status}</Badge> : null}
      </div>
      <h3 className="text-lg font-semibold leading-8 text-[#45483b]">
        {item.title}
      </h3>
      <ItemText item={item} />
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--sage-soft)] px-3 py-1 text-xs font-semibold text-[#566249]">
      {children}
    </span>
  );
}

function ItemText({ item }: { item: ContentItem }) {
  const mainText =
    item.text ??
    item.prompt ??
    item.script ??
    item.caption ??
    item.example ??
    item.opening ??
    item.method ??
    item.reminder ??
    item.source;

  return (
    <div className="mt-3 grid gap-3 text-sm leading-7 text-[#69675c]">
      {mainText ? <p>{mainText}</p> : null}
      {item.focus ? <p className="text-[#59634d]">تمرکز: {item.focus}</p> : null}
      {item.steps ? (
        <ol className="grid list-decimal gap-2 pr-5">
          {item.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
      {item.bullets ? (
        <ul className="grid list-disc gap-2 pr-5">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {item.sections ? (
        <div className="flex flex-wrap gap-2">
          {item.sections.map((section) => (
            <span
              className="rounded-lg border border-[var(--line)] px-2.5 py-1 text-xs"
              key={section}
            >
              {section}
            </span>
          ))}
        </div>
      ) : null}
      {item.url ? (
        <a
          className="calm-focus rounded-lg text-[#59694c] underline-offset-4 hover:underline"
          href={item.url}
          rel="noreferrer"
          target="_blank"
        >
          منبع رو باز کن
        </a>
      ) : null}
    </div>
  );
}
