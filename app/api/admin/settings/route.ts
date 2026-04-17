import { NextResponse } from "next/server";
import { z } from "zod";
import { canUseLocalStore } from "@/lib/admin-store";
import { hasCoreTables, isDatabaseConfigured } from "@/lib/db";
import { getAdminSettingsData, updateAdminSettings } from "@/lib/dashboard";

const settingsSchema = z.object({
  branding: z
    .object({
      companyName: z.string(),
      supportEmail: z.string(),
      supportPhone: z.string(),
      location: z.string(),
    })
    .optional(),
});

export async function GET() {
  return NextResponse.json({ settings: await getAdminSettingsData() });
}

export async function PATCH(request: Request) {
  if (!canUseLocalStore() && (!isDatabaseConfigured() || !(await hasCoreTables()))) {
    return NextResponse.json(
      { error: "Admin mutations require a configured production database." },
      { status: 503 },
    );
  }

  const parsed = settingsSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
  }

  return NextResponse.json({ settings: await updateAdminSettings(parsed.data) });
}
