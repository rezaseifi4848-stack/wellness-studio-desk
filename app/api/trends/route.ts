import { NextResponse } from "next/server";
import {
  internalTrendNotice,
  modernWellnessStyles,
} from "@/src/data/modernWellnessStyles";

export async function GET() {
  return NextResponse.json({
    active: false,
    message: internalTrendNotice,
    styles: modernWellnessStyles,
  });
}
