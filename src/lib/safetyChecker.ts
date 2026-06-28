const blocked = [
  "درمان" + " قطعی",
  "ش" + "فا",
  "علاج" + " بیماری",
  "درمان" + " افسردگی",
  "درمان" + " اضطراب",
  "تضمین" + " نتیجه",
  "رفع کامل" + " مشکل روحی",
];

export const requiredDisclaimer =
  "این محتوا برای آموزش، آرام‌سازی و تمرین شخصی است و جایگزین مشاوره پزشکی یا درمان تخصصی نیست.";

export function sanitizeSafety(text: string) {
  return blocked.reduce(
    (current, phrase) => current.split(phrase).join("تمرین حمایتی"),
    text,
  );
}

export function hasUnsafeClaim(text: string) {
  return blocked.some((phrase) => text.includes(phrase));
}
