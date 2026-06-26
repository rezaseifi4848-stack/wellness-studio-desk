"use client";

import { GeneratorCard } from "@/components/ui/GeneratorCard";
import type { ContentItem } from "@/lib/content";

type StudioBucket = {
  id: string;
  label: string;
  helper: string;
  accent: string;
  placeholder: string;
  items: ContentItem[];
};

type ContentStudioClientProps = {
  buckets: StudioBucket[];
};

function textFromItem(item: ContentItem) {
  return (
    item.text ??
    item.prompt ??
    item.script ??
    item.caption ??
    item.example ??
    item.opening ??
    "یک متن آرام، حرفه‌ای و مناسب برند یوگا با سعیده آماده کن."
  );
}

export function ContentStudioClient({ buckets }: ContentStudioClientProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {buckets.map((bucket) => (
        <GeneratorCard
          accent={bucket.accent}
          buttonLabel="بساز"
          description={bucket.helper}
          key={bucket.id}
          placeholder={bucket.placeholder}
          seedText={textFromItem(bucket.items[0])}
          title={bucket.label}
        />
      ))}
    </div>
  );
}
