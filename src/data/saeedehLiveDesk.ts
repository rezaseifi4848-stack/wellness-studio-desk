export const primaryActions = [
  { title: "Saeedeh Mentor", href: "/mentor/saeedeh", description: "Daily content engine for reels, captions, stories, meditation scripts and Bale posts.", tag: "Live" },
  { title: "Daily Pack", href: "/mentor/saeedeh", description: "Create a ready-to-publish package from one topic.", tag: "Daily" },
  { title: "30 Day Plan", href: "/mentor/saeedeh", description: "Content, trust building, challenge, class and product roadmap.", tag: "Plan" },
  { title: "Meditation Center", href: "/meditation-command-center", description: "Meditation script, pauses, voice guide and recording notes.", tag: "Meditation" }
] as const;

export const toolLinks = [
  { title: "Instagram", href: "https://www.instagram.com", description: "Reels, captions, stories and audience interaction." },
  { title: "Bale Web", href: "https://web.bale.ai", description: "Channel posts and short daily messages." },
  { title: "Canva", href: "https://www.canva.com", description: "Covers, posters and story templates." },
  { title: "CapCut", href: "https://www.capcut.com", description: "Short video editing and subtitles." },
  { title: "Google Drive", href: "https://drive.google.com", description: "File archive and content library." },
  { title: "Google Docs", href: "https://docs.google.com", description: "Scripts, captions and course notes." },
  { title: "Google Sheets", href: "https://sheets.google.com", description: "Calendar and weekly tracking." },
  { title: "Telegram Web", href: "https://web.telegram.org", description: "Work messages and file follow-up." }
] as const;

export const contentEngines = [
  { faTitle: "موتور ریلز", title: "Reel Engine", description: "Hook, short script, spoken text, cover, caption and CTA.", output: "Ready reel" },
  { faTitle: "موتور مدیتیشن", title: "Meditation Engine", description: "Soft script, pauses, voice guide and music mood.", output: "Ready audio script" },
  { faTitle: "موتور بله", title: "Bale Engine", description: "Short channel version and daily note.", output: "Ready Bale post" },
  { faTitle: "موتور استوری", title: "Story Engine", description: "Before and after story, question and poll.", output: "Ready story" },
  { faTitle: "موتور کاور", title: "Cover Engine", description: "Cover idea, visual text, layout and palette.", output: "Ready cover brief" },
  { faTitle: "موتور درآمد", title: "Revenue Engine", description: "Free, low ticket, class, challenge and main offer roadmap.", output: "30 day roadmap" },
  { faTitle: "موتور ترند", title: "Trend Engine", description: "Topics, hashtags and content angles.", output: "Current ideas" },
  { faTitle: "موتور لحن برند", title: "Brand Voice Engine", description: "Warm, feminine, calm and professional tone.", output: "Consistent copy" }
] as const;

export const answerPipeline = [
  { title: "تشخیص", description: "موضوع مربوط به کدام خروجی است؟" },
  { title: "تحقیق زنده", description: "در صورت نیاز ترند و زاویه محتوا بررسی می‌شود." },
  { title: "تبدیل به محتوا", description: "ایده تبدیل به متن آماده اجرا می‌شود." },
  { title: "تبدیل به رشد", description: "محتوا به مسیر اعتماد و محصول وصل می‌شود." },
  { title: "هشدار", description: "ادعاهای حساس و لحن نامناسب کنترل می‌شود." }
] as const;

export const decisionOutputs = ["چه منتشر کنیم؟", "متن آماده چیست؟", "منبع یا ایده چیست؟", "چه نگوییم؟", "بعدش چه کنیم؟"] as const;
