"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";

type GeneratorCardProps = {
  title: string;
  description: string;
  placeholder: string;
  seedText: string;
  buttonLabel?: string;
  accent?: string;
};

export function GeneratorCard({
  title,
  description,
  placeholder,
  seedText,
  buttonLabel = "بساز",
  accent = "✨",
}: GeneratorCardProps) {
  const [input, setInput] = useState("");
  const [generated, setGenerated] = useState(seedText);

  const output = useMemo(() => {
    if (!input.trim()) return generated;

    return `${generated}\n\nیادداشت سعیده جان: ${input.trim()}`;
  }, [generated, input]);

  function handleGenerate() {
    const intro = input.trim()
      ? "با توجه به حرفی که نوشتی، این نسخه رو یه کم گرم‌تر و آماده‌تر کردم:"
      : "یه نسخه آماده و نرم برای امروز:";

    setGenerated(`${intro}\n${seedText}`);
  }

  return (
    <article className="soft-panel grid gap-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl">{accent}</p>
          <h3 className="mt-3 text-xl font-semibold leading-9 text-[#45483b]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
            {description}
          </p>
        </div>
      </div>

      <textarea
        className="calm-focus min-h-28 resize-none rounded-3xl border border-[var(--line)] bg-[var(--warm-white)] p-4 text-sm leading-7 text-[#45483b] shadow-inner shadow-[#b6a98912]"
        onChange={(event) => setInput(event.target.value)}
        placeholder={placeholder}
        value={input}
      />

      <div className="flex flex-wrap gap-3">
        <button
          className="calm-focus rounded-full bg-[#6d755f] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#6d755f22] transition hover:bg-[#5d654f]"
          onClick={handleGenerate}
          type="button"
        >
          {buttonLabel}
        </button>
        <CopyButton text={output} />
      </div>

      <div className="rounded-3xl border border-[var(--line)] bg-[#fffaf0] p-4">
        <p className="mb-2 text-xs font-semibold text-[#6d6149]">خروجی آماده</p>
        <p className="whitespace-pre-line text-sm leading-8 text-[#5f5d52]">
          {output}
        </p>
      </div>
    </article>
  );
}
