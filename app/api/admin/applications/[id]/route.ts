import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getApplicationDetail,
  updateAdminApplicationStatus,
} from "@/lib/dashboard";

const patchSchema = z.object({
  status: z
    .enum(["RECEIVED", "UNDER_REVIEW", "SHORTLISTED", "ACCEPTED", "WAITLISTED", "DECLINED"])
    .optional(),
  actorName: z.string().optional(),
  message: z.string().optional(),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const application = await getApplicationDetail(id);

  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  return NextResponse.json({ application });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const parsed = patchSchema.safeParse(await request.json());

  if (!parsed.success || !parsed.data.status) {
    return NextResponse.json({ error: "Invalid patch payload." }, { status: 400 });
  }

  const application = await updateAdminApplicationStatus(
    id,
    parsed.data.status,
    parsed.data.actorName,
    parsed.data.message,
  );

  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  return NextResponse.json({ application });
}
