import { NextResponse } from "next/server";
import {
  internalTrendNotice,
  modernWellnessStyles,
} from "@/src/data/modernWellnessStyles";

export async function GET() {
  const searchProviders = {
    tavily: Boolean(process.env.TAVILY_API_KEY),
    brave: Boolean(process.env.BRAVE_SEARCH_API_KEY),
    serpapi: Boolean(process.env.SERPAPI_KEY),
  };
  const active = Object.values(searchProviders).some(Boolean);

  return NextResponse.json({
    active,
    message: active
      ? "جستجوی زنده فعال است؛ ترندها فقط به‌عنوان سیگنال بررسی می‌شوند و خروجی فارسی به‌صورت اصل ساخته می‌شود."
      : "جستجوی زنده فعال نیست؛ پیشنهادها از بانک حرفه‌ای داخلی ساخته شده‌اند.",
    fallbackMessage: internalTrendNotice,
    providers: searchProviders,
    styles: modernWellnessStyles,
  });
}
