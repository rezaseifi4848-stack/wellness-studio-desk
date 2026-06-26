import { AppShell } from "@/components/AppShell";
import { CollectionGrid, PageSection } from "@/components/PageSection";
import type { ContentCollection } from "@/lib/content";

type SimplePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  collections: ContentCollection[];
};

export function SimplePage({
  eyebrow,
  title,
  description,
  collections,
}: SimplePageProps) {
  return (
    <AppShell>
      <div className="grid gap-8">
        <PageSection eyebrow={eyebrow} title={title} description={description}>
          <div className="grid gap-6">
            {collections.map((collection) => (
              <section className="grid gap-3" key={collection.title}>
                <div>
                  <h3 className="text-xl font-semibold leading-9 text-[#45483b]">
                    {collection.title}
                  </h3>
                  <p className="mt-1 leading-8 text-[#68675c]">
                    {collection.description}
                  </p>
                </div>
                <CollectionGrid collection={collection} />
              </section>
            ))}
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}
