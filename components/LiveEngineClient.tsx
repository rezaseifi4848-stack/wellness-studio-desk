"use client";

import { useMemo, useState } from "react";
import { EngineStatusPanel } from "@/components/EngineStatusPanel";

type LiveEngineClientProps = {
  module: string;
  title: string;
  topic?: string;
  outputType?: string;
  platform?: string;
  posterStyle?: string;
};

type GenerateResult = {
  status?: {
    aiActive?: boolean;
    searchActive?: boolean;
    outputMode?: string;
    lastGenerated?: string;
    source?: string;
    warning?: string;
  };
  quality?: { total?: number; action?: string };
  output?: Record<string, unknown>;
};

const improveActions = [
  ["make_10x_better", "۱۰ برابر حرفه‌ای‌ترش کن"],
  ["less_cliche", "کمتر کلیشه‌ای کن"],
  ["for_bale", "مخصوص بله کن"],
  ["for_reels", "مخصوص ریلز کن"],
  ["deeper_meditation", "عمیق‌تر مدیتیشنی کن"],
  ["short_poster", "برای پوستر کوتاه کن"],
  ["emotional_caption", "کپشن احساسی‌تر بده"],
  ["saeedeh_tone", "لحن سعیده‌ای‌تر کن"],
  ["modern_premium", "حرفه‌ای‌تر و امروزی‌تر کن"],
] as const;

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

function CopyButtonLocal({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }
  return (
    <button className="studio-button bg-[#6d755f] px-4 py-2 text-xs font-semibold text-white" onClick={copy} type="button">
      {copied ? "کپی شد" : label}
    </button>
  );
}

export function LiveEngineClient({ module, title, topic, outputType = "daily-package", platform = "both", posterStyle }: LiveEngineClientProps) {
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState(topic || "");
  const fullText = useMemo(() => stringify(result?.output || {}), [result]);

  async function generate(improveAction?: string) {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module,
        channel: "@yoga_saeedeh",
        outputType,
        persona: "سعیده؛ مربی گرم، طبیعی، حرفه‌ای و غیرکلیشه‌ای مدیتیشن و یوگا",
        topic: seed,
        platform,
        contentGoal: "محتوای آماده انتشار، مدیتیشن عمیق، بله، اینستاگرام، تعامل و رشد برند",
        level: "elite",
        freshness: "today",
        meditationFocus: "مدیتیشن به‌عنوان قلب برند",
        posterStyle,
        improveAction,
      }),
    });
    setResult(await response.json());
    setLoading(false);
  }

  return (
    <div className="grid gap-6">
      <EngineStatusPanel status={result?.status} />
      <div className="soft-panel grid gap-4 p-5">
        <h3 className="text-2xl font-semibold text-[#4d4f42]">{title}</h3>
        <textarea
          className="min-h-24 rounded-[1.5rem] border border-[var(--line)] bg-[var(--warm-white)] p-4 text-sm leading-7 text-[#4d4f42] outline-none"
          onChange={(event) => setSeed(event.target.value)}
          placeholder="موضوع، حس امروز، متن خام یا ایده‌ای که می‌خوای موتور زنده بسازه..."
          value={seed}
        />
        <div className="flex flex-wrap gap-3">
          <button className="studio-button bg-[#6d755f] px-5 py-3 text-sm font-semibold text-white" disabled={loading} onClick={() => generate()} type="button">
            {loading ? "در حال ساخت..." : result ? "تولید دوباره با موتور زنده" : "تولید با موتور زنده"}
          </button>
          {improveActions.map(([action, label]) => (
            <button className="studio-button bg-[var(--gold-soft)] px-4 py-2 text-xs font-semibold text-[#5f553f]" disabled={loading} key={action} onClick={() => generate(action)} type="button">
              {label}
            </button>
          ))}
        </div>
      </div>

      <article className="soft-panel grid gap-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold text-[#4d4f42]">خروجی موتور</h3>
          <div className="flex flex-wrap gap-2">
            <CopyButtonLocal label="کپی همه" text={fullText} />
            <CopyButtonLocal label="کپی برای بله" text={fullText} />
            <CopyButtonLocal label="کپی کپشن" text={fullText} />
            <CopyButtonLocal label="کپی پوستر" text={fullText} />
            <CopyButtonLocal label="کپی استوری" text={fullText} />
          </div>
        </div>
        <p className="text-sm leading-7 text-[var(--ink-soft)]">
          امتیاز کیفیت: {result?.quality?.total ?? "-"} / 10
        </p>
        <pre className="max-h-[760px] overflow-auto rounded-[1.5rem] bg-[#111111] p-5 text-left text-xs leading-6 text-[#f8f6f1] [direction:ltr]">
          {loading ? "در حال تولید..." : result ? fullText : "برای ساخت خروجی، روی «تولید با موتور زنده» بزن. اگر کلیدها روی Render تنظیم نشده باشند، خروجی با برچسب «حالت آفلاین محدود» ساخته می‌شود."}
        </pre>
      </article>
    </div>
  );
}
