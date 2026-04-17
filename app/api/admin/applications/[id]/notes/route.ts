import { NextResponse } from "next/server";
import { z } from "zod";
import { canUseLocalStore } from "@/lib/admin-store";
import { hasCoreTables, isDatabaseConfigured } from "@/lib/db";
import { addAdminApplicationNote } from "@/lib/dashboard";

const noteSchema = z.object({
  content: z.string().min(3),
  authorName: z.string().optional(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!canUseLocalStore() && (!isDatabaseConfigured() || !(await hasCoreTables()))) {
    return NextResponse.json(
      { error: "Admin mutations require a configured production database." },
      { status: 503 },
    );
  }

  const { id } = await params;
  const parsed = noteSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid note payload." }, { status: 400 });
  }

  const application = await addAdminApplicationNote(
    id,
    parsed.data.content,
    parsed.data.authorName,
  );

  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  return NextResponse.json({ application });
}
