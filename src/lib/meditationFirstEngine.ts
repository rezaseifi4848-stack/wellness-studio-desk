import { advancedMeditationBank } from "@/src/data/advancedMeditationBank";

export function getMeditationPrograms(limit = advancedMeditationBank.length) {
  return advancedMeditationBank.slice(0, limit);
}

export function getDailyMeditation() {
  return advancedMeditationBank[0];
}

export function formatMeditationProgram(title: string, body: string) {
  return `${title}\n\n${body}\n\nاین محتوا برای آموزش، آرام‌سازی و تمرین شخصی است و جایگزین مشاوره پزشکی یا درمان تخصصی نیست.`;
}
