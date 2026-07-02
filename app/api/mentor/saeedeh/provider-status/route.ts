import { NextResponse } from "next/server";
import { getSaeedehProviderStatus } from "@/lib/mentor/saeedehProviders";

export async function GET() {
  return NextResponse.json(getSaeedehProviderStatus());
}
