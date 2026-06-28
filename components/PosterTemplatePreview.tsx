import { CopyButton } from "@/components/ui/CopyButton";
import type { PosterTemplate } from "@/src/data/posterTemplates";
import { formatPoster } from "@/src/lib/posterCopyEngine";

type PosterTemplatePreviewProps = {
  poster: PosterTemplate;
};

export function PosterTemplatePreview({ poster }: PosterTemplatePreviewProps) {
  const isDark = poster.colorPalette.includes("مشکی");

  return (
    <article className="grid gap-5 rounded-[2rem] bg-[rgba(255,253,248,0.9)] p-5 shadow-[0_18px_55px_rgba(97,91,70,0.09)] md:grid-cols-[280px_1fr]">
      <div
        className={`aspect-[4/5] rounded-[1.75rem] p-6 text-center shadow-inner ${
          isDark ? "bg-[#111111] text-[#D7C09A]" : "bg-[#F4EEDB] text-[#4d4f42]"
        }`}
      >
        <p className="text-xs tracking-[0.25em]">{poster.footer}</p>
        <div className="mt-10 text-4xl">☾</div>
        <h3 className="mt-8 text-3xl font-semibold leading-[1.8]">{poster.mainText}</h3>
        <p className={`mt-5 text-sm leading-7 ${isDark ? "text-[#F8F6F1]" : "text-[#6c6c5c]"}`}>
          {poster.subtitle}
        </p>
      </div>
      <div className="grid gap-3 text-base leading-8 text-[var(--ink-soft)]">
        <h3 className="text-2xl font-semibold text-[#4d4f42]">{poster.title}</h3>
        <p><b>کپشن:</b> {poster.caption}</p>
        <p><b>متن بله:</b> {poster.baleText}</p>
        <p><b>استوری:</b> {poster.storyText}</p>
        <p><b>جهت طراحی:</b> {poster.designDirection}</p>
        <p><b>پالت رنگ:</b> {poster.colorPalette}</p>
        <p><b>تایپوگرافی:</b> {poster.typography}</p>
        <CopyButton text={formatPoster(poster)} />
      </div>
    </article>
  );
}
