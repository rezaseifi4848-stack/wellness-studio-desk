import { posterTemplates, type PosterTemplate } from "@/src/data/posterTemplates";

export type PosterRequest = {
  day?: number;
  topic?: string;
  tone?: string;
  length?: string;
  style?: string;
  audience?: string;
};

export function posterCopyEngine(request: PosterRequest = {}): PosterTemplate[] {
  const topic = request.topic?.trim();
  const style = request.style?.trim();

  return posterTemplates.slice(0, 10).map((template, index) => ({
    ...template,
    title: topic ? `${template.title} | ${topic}` : template.title,
    footer: `روز ${request.day ?? index + 1} | @yoga_saeedeh`,
    designDirection: style ? `${template.designDirection} سبک انتخابی: ${style}.` : template.designDirection,
  }));
}

export function formatPoster(template: PosterTemplate) {
  return [
    `عنوان پوستر: ${template.title}`,
    `متن اصلی: ${template.mainText}`,
    `زیرنویس: ${template.subtitle}`,
    `فوتر: ${template.footer}`,
    `کپشن: ${template.caption}`,
    `متن بله: ${template.baleText}`,
    `استوری: ${template.storyText}`,
    `جهت طراحی: ${template.designDirection}`,
    `پالت رنگ: ${template.colorPalette}`,
    `تایپوگرافی: ${template.typography}`,
    `پرامپت تصویر: ${template.imagePrompt}`,
  ].join("\n");
}
