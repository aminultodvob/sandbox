import { NextResponse } from "next/server";
import { getApplicationRows } from "@/lib/dashboard";

export async function GET() {
  const applications = await getApplicationRows();
  return NextResponse.json({ applications });
}
