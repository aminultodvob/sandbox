import { NextResponse } from "next/server";
import { ApplicationStatus } from "@prisma/client";
import { canUseLocalStore, createFallbackApplication } from "@/lib/admin-store";
import { db, hasCoreTables, isDatabaseConfigured, isMissingTableError } from "@/lib/db";
import { sendStatusEmail } from "@/lib/email";
import { createReferenceNumber } from "@/lib/utils";
import { applicationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = applicationSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid application payload.",
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const referenceNumber = createReferenceNumber();

  if (isDatabaseConfigured() && (await hasCoreTables())) {
    try {
      const track = await db.track.findUnique({
        where: { slug: data.selectedTrack },
      });

      if (!track) {
        return NextResponse.json({ error: "Selected track not found." }, { status: 404 });
      }

      const applicant = await db.applicant.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          city: data.city,
          businessName: data.businessName,
          industry: data.industry,
          businessStage: data.businessStage,
          businessType: data.businessType,
          yearsOperating: data.yearsOperating,
          currentInvestment: data.currentInvestment,
          monthlyRevenueRange: data.monthlyRevenueRange || undefined,
          teamSize: data.teamSize,
          websiteOrSocial: data.websiteOrSocial || undefined,
          businessSummary: data.businessSummary,
          whySandbox: data.whySandbox,
          currentChallenges: data.currentChallenges,
          referralSource: data.referralSource,
          consentAccepted: data.consentAccepted,
        },
      });

      const application = await db.application.create({
        data: {
          referenceNumber,
          applicantId: applicant.id,
          trackId: track.id,
          status: ApplicationStatus.RECEIVED,
          currentBusinessScale: data.currentBusinessScale,
          priorInvestmentAmount: data.priorInvestmentAmount,
          meetsEliteThreshold: data.meetsEliteThreshold,
          interestedInChinaImmersion: data.interestedInChinaImmersion,
          sourcingExpansionInterest: data.sourcingExpansionInterest,
          intakeSnapshot: data,
        },
      });

      await db.emailLog.create({
        data: {
          applicationId: application.id,
          recipientEmail: applicant.email,
          subject: "Your Sandbox Bangladesh application has been received",
          status: "QUEUED",
        },
      });
    } catch (error) {
      if (!isMissingTableError(error)) {
        console.error("Application persistence failed", error);
        return NextResponse.json(
          {
            error: "We could not save your application right now. Please try again shortly.",
          },
          { status: 500 },
        );
      }

      console.warn(
        "Application submitted without database persistence because Prisma tables are not available yet.",
      );
      await createFallbackApplication(data, referenceNumber);
    }
  } else if (canUseLocalStore()) {
    await createFallbackApplication(data, referenceNumber);
  } else {
    return NextResponse.json(
      {
        error:
          "Application intake is not configured for production yet. Set up the database schema and redeploy.",
      },
      { status: 503 },
    );
  }

  await sendStatusEmail({
    to: data.email,
    subject: "Your Sandbox Bangladesh application has been received",
    applicantName: data.fullName,
    trackName: data.selectedTrack.replaceAll("-", " "),
    statusLabel: "Your application has been received",
    summary:
      "Thank you for your participation request. Our team has received your application and it is now in review.",
  });

  return NextResponse.json({
    ok: true,
    referenceNumber,
  });
}
