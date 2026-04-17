import { NextResponse } from "next/server";
import { z } from "zod";
import { canUseLocalStore } from "@/lib/admin-store";
import { hasCoreTables, isDatabaseConfigured } from "@/lib/db";
import {
  getAdminCommunicationsData,
  sendAdminApplicationEmail,
  updateAdminTemplate,
} from "@/lib/dashboard";

const sendSchema = z.object({
  mode: z.literal("send"),
  applicationId: z.string().optional(),
  recipientEmail: z.email(),
  subject: z.string().min(3),
  body: z.string().optional(),
  templateSlug: z.string().optional(),
});

const templateSchema = z.object({
  mode: z.literal("template"),
  id: z.string(),
  subject: z.string().min(3),
  previewText: z.string().min(3),
  body: z.string().min(3),
  enabled: z.boolean(),
});

export async function GET() {
  return NextResponse.json(await getAdminCommunicationsData());
}

export async function POST(request: Request) {
  if (!canUseLocalStore() && (!isDatabaseConfigured() || !(await hasCoreTables()))) {
    return NextResponse.json(
      { error: "Admin mutations require a configured production database." },
      { status: 503 },
    );
  }

  const payload = await request.json();

  const sendParsed = sendSchema.safeParse(payload);
  if (sendParsed.success) {
    const log = await sendAdminApplicationEmail(sendParsed.data);
    return NextResponse.json({ log });
  }

  const templateParsed = templateSchema.safeParse(payload);
  if (templateParsed.success) {
    const template = await updateAdminTemplate(templateParsed.data);
    return NextResponse.json({ template });
  }

  return NextResponse.json({ error: "Invalid communication payload." }, { status: 400 });
}
