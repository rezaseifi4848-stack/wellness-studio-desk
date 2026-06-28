"use client";

import { useState } from "react";
import { buildDailyCommandPackage } from "@/src/lib/dailyOrchestrator";

const packageData = buildDailyCommandPackage();

function formatAll() {
  return [
    packageData.message,
    "",
    "جملات تاکیدی:",
    ...packageData.affirmations.map((item, index) => `${index + 1}. ${item}`),
    "",
    `پوستر: ${packageData.poster.mainText}`,
    `کپشن: ${packageData.reel.caption}`,
    `متن مدیتیشن: ${packageData.meditation.threeMinute}`,
    `پست بله: ${packageData.bale.channelPostText}`,
    `تمرین بیان: ${packageData.speaking}`,
  ].join("\n");
}

function CopyAction({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className="calm-focus rounded-full bg-[#6d755f] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#59624e]"
      onClick={copy}
      type="button"
    >
      {copied ? "کپی شد" : label}
    </button>
  );
}

export function DailyCommandPanel() {
  const [level, setLevel] = useState<"سریع" | "کامل" | "پرمیوم">("کامل");

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-3">
        {(["سریع", "کامل", "پرمیوم"] as const).map((item) => (
          <button
            className={`calm-focus rounded-full px-5 py-3 text-sm font-semibold ${
              level === item ? "bg-[#6d755f] text-white" : "bg-[var(--warm-white)] text-[#4d4f42]"
            }`}
            key={item}
            onClick={() => setLevel(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <article className="soft-panel grid gap-5 p-6">
        <h3 className="text-3xl font-semibold leading-[1.7] text-[#4d4f42]">بسته کامل امروز | سطح {level}</h3>
        <p className="text-lg leading-10 text-[var(--ink-soft)]">{packageData.message}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] bg-[var(--warm-white)] p-5">
            <h4 className="font-semibold text-[#4d4f42]">مدیتیشن امروز</h4>
            <p className="mt-2 leading-8 text-[var(--ink-soft)]">{packageData.meditation.threeMinute}</p>
          </div>
          <div className="rounded-[2rem] bg-[var(--warm-white)] p-5">
            <h4 className="font-semibold text-[#4d4f42]">ریلز امروز</h4>
            <p className="mt-2 leading-8 text-[var(--ink-soft)]">{packageData.reel.script}</p>
          </div>
          <div className="rounded-[2rem] bg-[var(--warm-white)] p-5">
            <h4 className="font-semibold text-[#4d4f42]">پوستر امروز</h4>
            <p className="mt-2 leading-8 text-[var(--ink-soft)]">{packageData.poster.mainText}</p>
          </div>
          <div className="rounded-[2rem] bg-[var(--warm-white)] p-5">
            <h4 className="font-semibold text-[#4d4f42]">پست بله</h4>
            <p className="mt-2 leading-8 text-[var(--ink-soft)]">{packageData.bale.shortVersion}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <CopyAction label="کپی همه" text={formatAll()} />
          <CopyAction label="کپی پوستر" text={packageData.poster.mainText} />
          <CopyAction label="کپی کپشن" text={packageData.reel.caption} />
          <CopyAction label="کپی برای بله" text={packageData.bale.channelPostText} />
          <CopyAction label="کپی متن مدیتیشن" text={packageData.meditation.threeMinute} />
          <CopyAction label="کپی تمرین بیان" text={packageData.speaking} />
        </div>
      </article>
    </div>
  );
}
