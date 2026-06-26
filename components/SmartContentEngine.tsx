"use client";

import { useMemo, useState } from "react";
import {
  formatSuggestionPackage,
  getSmartContentSuggestions,
} from "@/src/lib/smartContentEngine";
import type {
  SuggestionEngineKey,
  SuggestionPackage,
} from "@/src/data/modernWellnessStyles";

type EngineAction = {
  key: SuggestionEngineKey;
  title: string;
  body: string;
  accent: string;
};

type SmartContentEngineProps = {
  actions: EngineAction[];
  initialEngine?: SuggestionEngineKey;
};

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <p>
      <b>{label}:</b> {value}
    </p>
  );
}

function SuggestionCard({ item }: { item: SuggestionPackage }) {
  const [copied, setCopied] = useState(false);
  const copyText = formatSuggestionPackage(item);
  const storySequence = item.storySequence ?? [
    item.story ?? "اسلاید ۱: یک جمله کوتاه از متن آماده گفتن را بگذار.",
    "اسلاید ۲: از مخاطب یک سوال ساده و انسانی بپرس.",
    item.softCta ?? "اسلاید ۳: با یک دعوت نرم به ذخیره یا پیام دادن تمام کن.",
  ];
  const hashtags = item.hashtags ?? "#یوگا_با_سعیده #یوگا #مدیتیشن #آرامش #مراقبت_از_خود";
  const shotList = item.shotList ?? item.visualSuggestion;

  async function copy() {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <article className="soft-panel grid gap-4 p-6">
      <div>
        <p className="text-sm font-semibold text-[#8a7a55]">{item.category}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-10 text-[#4d4f42]">{item.title}</h3>
      </div>

      <div className="grid gap-3 text-base leading-9 text-[var(--ink-soft)]">
        <DetailRow label="متن آماده گفتن" value={item.readyText} />
        <DetailRow label="Hook سه‌ثانیه‌ای" value={item.hook ?? item.shortVersion} />
        <DetailRow label="نسخه کوتاه" value={item.shortVersion} />
        <DetailRow label="نسخه کامل" value={item.fullVersion} />
        <div>
          <b>۳ مثال روزمره:</b>
          <ul className="mt-2 grid gap-2">
            {item.everydayExamples.map((example) => (
              <li className="rounded-3xl bg-[rgba(248,246,241,0.78)] px-4 py-3" key={example}>
                {example}
              </li>
            ))}
          </ul>
        </div>
        <DetailRow label="جمله نجات اگر سعیده وسط صحبت گیر کرد" value={item.rescueLine} />
        <DetailRow label="تمرین بیان" value={item.speakingPractice} />
        <DetailRow label="کپشن" value={item.caption} />
        <DetailRow label="استوری مکمل" value={item.story} />
        <div>
          <b>استوری ۳ اسلایدی:</b>
          <ul className="mt-2 grid gap-2">
            {storySequence.map((slide) => (
              <li className="rounded-3xl bg-[rgba(248,246,241,0.78)] px-4 py-3" key={slide}>
                {slide}
              </li>
            ))}
          </ul>
        </div>
        <DetailRow label="CTA نرم" value={item.softCta} />
        <DetailRow label="پیشنهاد تصویر/ویدیو" value={item.visualSuggestion} />
        <DetailRow label="Shot list" value={shotList} />
        <DetailRow label="هشتگ‌ها" value={hashtags} />
        <DetailRow label="پیشنهاد موسیقی/فضاسازی" value={item.musicSuggestion} />
        <DetailRow label="دغدغه مخاطب" value={item.audiencePainPoint} />
        <DetailRow label="جمله اعتمادساز" value={item.trustSentence} />
        <DetailRow label="دعوت به کلاس" value={item.classInvitation} />
        <DetailRow label="تکنیک فروش نرم" value={item.salesTechnique} />
        <DetailRow label="پاسخ به تردید مخاطب" value={item.objectionHandling} />
        <DetailRow label="متن آموزشی" value={item.teachingScript} />
        <DetailRow label="متن مدیتیشن" value={item.meditationScript} />
        <DetailRow label="مکث‌ها" value={item.pauseMarks} />
        <DetailRow label="راهنمای صدا" value={item.voiceGuide} />
        <DetailRow label="جمله ایمنی" value={item.safeDisclaimer} />
      </div>

      <button
        className="studio-button calm-focus w-fit bg-[#6d755f] px-6 py-3 text-sm font-semibold text-white"
        onClick={copy}
        type="button"
      >
        {copied ? "کپی شد" : "کپی متن"}
      </button>
    </article>
  );
}

export function SmartContentEnginePanel({ actions, initialEngine = "dailyReels" }: SmartContentEngineProps) {
  const [activeEngine, setActiveEngine] = useState<SuggestionEngineKey>(initialEngine);
  const suggestions = useMemo(() => getSmartContentSuggestions(activeEngine), [activeEngine]);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <button
            className={`calm-focus rounded-[2rem] p-6 text-right shadow-[0_18px_55px_rgba(97,91,70,0.1)] transition hover:-translate-y-1 ${
              activeEngine === action.key
                ? "bg-[#6d755f] text-white"
                : "bg-[rgba(255,253,248,0.9)] text-[#4d4f42]"
            }`}
            key={action.key}
            onClick={() => setActiveEngine(action.key)}
            type="button"
          >
            <span className="text-3xl">{action.accent}</span>
            <span className="mt-4 block text-xl font-semibold leading-9">{action.title}</span>
            <span className={`mt-3 block text-sm leading-7 ${activeEngine === action.key ? "text-white/85" : "text-[var(--ink-soft)]"}`}>
              {action.body}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-[2.5rem] bg-gradient-to-br from-[rgba(244,238,219,0.95)] to-[rgba(255,253,248,0.95)] p-5 shadow-[0_22px_70px_rgba(97,91,70,0.11)] md:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#8a7a55]">خروجی آماده استفاده</p>
          <h3 className="mt-2 text-3xl font-semibold leading-[1.8] text-[#4d4f42]">
            {suggestions.length} پیشنهاد آماده برای همین انتخاب
          </h3>
        </div>
        <div className="grid gap-6">
          {suggestions.map((item) => (
            <SuggestionCard item={item} key={`${activeEngine}-${item.title}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
