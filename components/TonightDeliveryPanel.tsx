"use client";

import { useState } from "react";
import { tonightDeliveryCards, type TonightCard } from "@/src/data/tonightDeliveryPackage";

function formatTonightCard(card: TonightCard) {
  return [
    `عنوان: ${card.title}`,
    `Hook سه‌ثانیه‌ای: ${card.hook}`,
    "",
    "متن کامل آماده گفتن جلوی دوربین:",
    card.readyText,
    "",
    `کپشن آماده: ${card.caption}`,
    "",
    "استوری ۳ اسلایدی:",
    `۱. ${card.story[0]}`,
    `۲. ${card.story[1]}`,
    `۳. ${card.story[2]}`,
    "",
    `CTA نرم: ${card.softCta}`,
    `پیشنهاد تصویر/ویدیو: ${card.visual}`,
    `پیشنهاد موسیقی/فضاسازی: ${card.music}`,
    `هشتگ‌ها: ${card.hashtags}`,
    `تمرین بیان قبل از ضبط: ${card.speakingPractice}`,
    `جمله نجات: ${card.rescueLine}`,
  ].join("\n");
}

export function TonightDeliveryPanel() {
  const [activeId, setActiveId] = useState(tonightDeliveryCards[0].id);
  const [copied, setCopied] = useState(false);
  const activeCard = tonightDeliveryCards.find((card) => card.id === activeId) ?? tonightDeliveryCards[0];

  async function copy() {
    await navigator.clipboard.writeText(formatTonightCard(activeCard));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-7">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tonightDeliveryCards.map((card) => (
          <button
            className={`calm-focus rounded-[2rem] p-6 text-right shadow-[0_18px_55px_rgba(97,91,70,0.1)] transition hover:-translate-y-1 ${
              activeCard.id === card.id
                ? "bg-[#6d755f] text-white"
                : "bg-[rgba(255,253,248,0.92)] text-[#4d4f42]"
            }`}
            key={card.id}
            onClick={() => setActiveId(card.id)}
            type="button"
          >
            <span className="block text-xl font-semibold leading-9">{card.title}</span>
            <span className={`mt-3 block text-sm leading-7 ${activeCard.id === card.id ? "text-white/85" : "text-[var(--ink-soft)]"}`}>
              {card.summary}
            </span>
          </button>
        ))}
      </div>

      <article className="soft-panel grid gap-5 p-6 md:p-8">
        <div>
          <p className="text-sm font-semibold text-[#8a7a55]">بسته شروع امشب سعیده</p>
          <h3 className="mt-2 text-3xl font-semibold leading-[1.8] text-[#4d4f42]">{activeCard.title}</h3>
        </div>
        <div className="grid gap-3 text-base leading-9 text-[var(--ink-soft)]">
          <p><b>Hook سه‌ثانیه‌ای:</b> {activeCard.hook}</p>
          <p><b>متن کامل آماده گفتن جلوی دوربین:</b> {activeCard.readyText}</p>
          <p><b>کپشن آماده:</b> {activeCard.caption}</p>
          <div>
            <b>استوری ۳ اسلایدی:</b>
            <ul className="mt-2 grid gap-2">
              {activeCard.story.map((slide) => (
                <li className="rounded-3xl bg-[rgba(248,246,241,0.78)] px-4 py-3" key={slide}>
                  {slide}
                </li>
              ))}
            </ul>
          </div>
          <p><b>CTA نرم:</b> {activeCard.softCta}</p>
          <p><b>پیشنهاد تصویر/ویدیو:</b> {activeCard.visual}</p>
          <p><b>پیشنهاد موسیقی/فضاسازی:</b> {activeCard.music}</p>
          <p><b>هشتگ‌ها:</b> {activeCard.hashtags}</p>
          <p><b>تمرین بیان قبل از ضبط:</b> {activeCard.speakingPractice}</p>
          <p><b>جمله نجات:</b> {activeCard.rescueLine}</p>
        </div>
        <button
          className="studio-button calm-focus w-fit bg-[#6d755f] px-6 py-3 text-sm font-semibold text-white"
          onClick={copy}
          type="button"
        >
          {copied ? "کپی شد" : "کپی متن"}
        </button>
      </article>
    </div>
  );
}
