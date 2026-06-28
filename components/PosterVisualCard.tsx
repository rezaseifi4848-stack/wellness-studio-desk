import { PosterCanvasExporter } from "@/components/PosterCanvasExporter";

type PosterVisualCardProps = {
  id: string;
  dayNumber?: number;
  title?: string;
  mainAffirmation?: string;
  subtitle?: string;
  style?: string;
};

export function PosterVisualCard({
  id,
  dayNumber = 1,
  title = "پوستر روز",
  mainAffirmation = "من با آرامش به خودم برمی‌گردم",
  subtitle = "چند دقیقه مکث برای مراقبت روزانه از خود.",
  style = "black-gold",
}: PosterVisualCardProps) {
  const dark = style.includes("black") || style.includes("مشکی") || style.includes("night");

  return (
    <div className="grid gap-3">
      <div
        className={`aspect-[4/5] rounded-[2rem] p-7 text-center shadow-[0_24px_70px_rgba(20,18,14,0.18)] ${
          dark ? "bg-[#111111] text-[#D7C09A]" : "bg-[#F4EEDB] text-[#4d4f42]"
        }`}
        id={id}
      >
        <p className="text-xs font-semibold tracking-[0.2em]">روز {dayNumber}</p>
        <div className="mt-10 text-5xl">☾</div>
        <p className="mt-8 text-sm">{title}</p>
        <h3 className="mt-5 text-3xl font-semibold leading-[1.9]">{mainAffirmation}</h3>
        <p className={`mt-5 text-sm leading-7 ${dark ? "text-[#F8F6F1]" : "text-[#6c6c5c]"}`}>{subtitle}</p>
        <p className="mt-10 text-xs">یوگا با سعیده | @yoga_saeedeh</p>
      </div>
      <PosterCanvasExporter targetId={id} />
    </div>
  );
}
