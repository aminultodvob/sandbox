import { NextResponse } from "next/server";
import { z } from "zod";
import { assignAdminCohort, getAdminParticipantsData } from "@/lib/dashboard";

const schema = z.object({
  applicationId: z.string(),
  cohortId: z.string(),
});

export async function GET() {
  return NextResponse.json(await getAdminParticipantsData());
}

export async function PATCH(request: Request) {
  const parsed = schema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid participant payload." }, { status: 400 });
  }

  const application = await assignAdminCohort(
    parsed.data.applicationId,
    parsed.data.cohortId,
  );

  if (!application) {
    return NextResponse.json({ error: "Participant not found." }, { status: 404 });
  }

  return NextResponse.json({ application });
}
