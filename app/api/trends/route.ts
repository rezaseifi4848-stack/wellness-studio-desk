import { NextResponse } from "next/server";
import { getLiveSearchSignals } from "@/src/lib/liveSearchEngine";
import { modernWellnessStyles } from "@/src/data/modernWellnessStyles";

export async function GET() {
  const search = await getLiveSearchSignals("meditation yoga Persian wellness creator Bale Instagram trends");

  return NextResponse.json({
    active: search.active,
    message: search.message,
    providers: search.providers,
    signals: search.signals,
    styles: modernWellnessStyles,
  });
}
