"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import type { ContentItem } from "@/lib/content";

type SpeakingCoachClientProps = {
  exercises: ContentItem[];
};

const categories = [
  "تمرین تنفس",
  "تمرین صدا",
  "تمرین اعتمادبه‌نفس",
  "تمرین نگاه به دوربین",
  "تمرین ضبط ویدیو",
];

export function SpeakingCoachClient({ exercises }: SpeakingCoachClientProps) {
  const [index, setIndex] = useState(0);
  const exercise = exercises[index % exercises.length];
  const output = [
    `تمرین امروز قشنگم: ${exercise.title}`,
    exercise.text,
    ...(exercise.steps ?? []),
  ]
    .filter(Boolean)
    .join("\n");

  function nextPractice() {
    setIndex((current) => (current + Math.floor(Math.random() * 4) + 1) % exercises.length);
  }

  return (
    <div className="grid gap-6">
      <div className="soft-panel grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h3 className="text-2xl font-semibold leading-10 text-[#44483b]">
            تمرین امروز
          </h3>
          <p className="mt-2 leading-8 text-[var(--ink-soft)]">
            هر بار روی دکمه بزنی، یه تمرین تازه از فایل‌های محلی میاد بالا.
          </p>
        </div>
        <button
          className="calm-focus rounded-full bg-[#6d755f] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6d755f22] transition hover:bg-[#5d654f]"
          onClick={nextPractice}
          type="button"
        >
          تمرین امروز
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {categories.map((category) => (
          <div className="soft-panel p-4 text-center" key={category}>
            <p className="text-sm font-semibold leading-7 text-[#59634d]">
              {category}
            </p>
          </div>
        ))}
      </div>

      <article className="soft-panel bg-[rgba(248,246,241,0.92)] p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[var(--olive-deep)]">
              {exercise.tag ?? "تمرین بیان"}
            </p>
            <h3 className="mt-2 text-2xl font-semibold leading-10 text-[#44483b]">
              {exercise.title}
            </h3>
          </div>
          <CopyButton text={output} />
        </div>
        <p className="leading-8 text-[var(--ink-soft)]">{exercise.text}</p>
        {exercise.steps ? (
          <ol className="mt-5 grid list-decimal gap-3 pr-5 leading-8 text-[#625f53]">
            {exercise.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        ) : null}
      </article>
    </div>
  );
}
