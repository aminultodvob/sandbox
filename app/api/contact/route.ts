import { NextResponse } from "next/server";
import { addFallbackContactInquiry } from "@/lib/admin-store";
import { db, hasCoreTables, isDatabaseConfigured, isMissingTableError } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid inquiry payload." },
      { status: 400 },
    );
  }

  if (isDatabaseConfigured() && (await hasCoreTables())) {
    try {
      await db.contactInquiry.create({
        data: parsed.data,
      });
    } catch (error) {
      if (!isMissingTableError(error)) {
        throw error;
      }

      await addFallbackContactInquiry(parsed.data);
    }
  } else {
    await addFallbackContactInquiry(parsed.data);
  }

  return NextResponse.json({
    ok: true,
    message: "Your inquiry has been received. Our team will respond shortly.",
  });
}
