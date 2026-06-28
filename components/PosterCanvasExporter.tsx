"use client";

type PosterCanvasExporterProps = {
  targetId: string;
};

export function PosterCanvasExporter({ targetId }: PosterCanvasExporterProps) {
  async function downloadPng() {
    const node = document.getElementById(targetId);
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(rect.width * 2);
    canvas.height = Math.round(rect.height * 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const style = getComputedStyle(node);
    ctx.scale(2, 2);
    ctx.fillStyle = style.backgroundColor || "#111111";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = style.color || "#D7C09A";
    ctx.textAlign = "center";
    ctx.font = "20px serif";
    ctx.fillText(node.innerText.slice(0, 80), rect.width / 2, rect.height / 2);

    const link = document.createElement("a");
    link.download = "yoga-ba-saeedeh-poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <button className="studio-button bg-[#111111] px-4 py-2 text-xs font-semibold text-[#D7C09A]" onClick={downloadPng} type="button">
      دانلود PNG
    </button>
  );
}
