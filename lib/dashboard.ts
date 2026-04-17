import { ApplicationStatus } from "@prisma/client";
import {
  addFallbackApplicationEmail,
  addFallbackApplicationNote,
  assignFallbackCohort,
  getAdminStore,
  getFallbackApplication,
  getFallbackApplications,
  updateFallbackApplicationStatus,
  updateFallbackEmailTemplate,
  updateFallbackSettings,
  updateFallbackSiteContent,
  type AdminApplicationStatus,
} from "@/lib/admin-store";
import { db, hasCoreTables, isDatabaseConfigured, isMissingTableError } from "@/lib/db";

function mapFallbackSummary(applications: Awaited<ReturnType<typeof getFallbackApplications>>) {
  const pending = applications.filter((item) =>
    ["RECEIVED", "UNDER_REVIEW"].includes(item.status),
  ).length;
  const shortlisted = applications.filter((item) => item.status === "SHORTLISTED").length;
  const accepted = applications.filter((item) => item.status === "ACCEPTED").length;
  const trackCounts = new Map<string, number>();

  for (const application of applications) {
    trackCounts.set(
      application.trackName,
      (trackCounts.get(application.trackName) ?? 0) + 1,
    );
  }

  return {
    totals: {
      applications: applications.length,
      pending,
      shortlisted,
      accepted,
    },
    trackMix: Array.from(trackCounts.entries()).map(([label, value]) => ({ label, value })),
    recentApplications: applications.slice(0, 5).map((item) => ({
      id: item.id,
      referenceNumber: item.referenceNumber,
      status: item.status,
      trackName: item.trackName,
      submittedAt: item.submittedAt,
      applicant: {
        fullName: item.applicant.fullName,
        email: item.applicant.email,
        phone: item.applicant.phone,
        businessName: item.applicant.businessName,
        city: item.applicant.city,
      },
      noteCount: item.notes.length,
    })),
  };
}

export async function getDashboardSummary() {
  if (!isDatabaseConfigured() || !(await hasCoreTables())) {
    return mapFallbackSummary(await getFallbackApplications());
  }

  try {
    const [applications, pending, shortlisted, accepted, trackCounts, recentApplications] =
      await Promise.all([
        db.application.count(),
        db.application.count({
          where: { status: { in: [ApplicationStatus.RECEIVED, ApplicationStatus.UNDER_REVIEW] } },
        }),
        db.application.count({
          where: { status: ApplicationStatus.SHORTLISTED },
        }),
        db.application.count({
          where: { status: ApplicationStatus.ACCEPTED },
        }),
        db.application.groupBy({
          by: ["trackId"],
          _count: { _all: true },
        }),
        db.application.findMany({
          take: 5,
          orderBy: { submittedAt: "desc" },
          include: { applicant: true, track: true, notes: true },
        }),
      ]);

    const tracks = await db.track.findMany();
    const trackLookup = new Map(tracks.map((track) => [track.id, track.shortName]));

    return {
      totals: { applications, pending, shortlisted, accepted },
      trackMix: trackCounts.map((item) => ({
        label: trackLookup.get(item.trackId) ?? "Track",
        value: item._count._all,
      })),
      recentApplications: recentApplications.map((item) => ({
        id: item.id,
        referenceNumber: item.referenceNumber,
        status: item.status,
        trackName: item.track.name,
        submittedAt: item.submittedAt.toISOString(),
        applicant: {
          fullName: item.applicant.fullName,
          email: item.applicant.email,
          phone: item.applicant.phone,
          businessName: item.applicant.businessName,
          city: item.applicant.city,
        },
        noteCount: item.notes.length,
      })),
    };
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }

    return mapFallbackSummary(await getFallbackApplications());
  }
}

export async function getApplicationRows() {
  if (!isDatabaseConfigured() || !(await hasCoreTables())) {
    return (await getFallbackApplications()).map((item) => ({
      id: item.id,
      referenceNumber: item.referenceNumber,
      status: item.status,
      trackName: item.trackName,
      submittedAt: item.submittedAt,
      applicant: {
        fullName: item.applicant.fullName,
        email: item.applicant.email,
        phone: item.applicant.phone,
        businessName: item.applicant.businessName,
        city: item.applicant.city,
      },
      noteCount: item.notes.length,
    }));
  }

  try {
    const applications = await db.application.findMany({
      orderBy: { submittedAt: "desc" },
      include: { applicant: true, track: true, notes: true },
    });

    return applications.map((item) => ({
      id: item.id,
      referenceNumber: item.referenceNumber,
      status: item.status,
      trackName: item.track.name,
      submittedAt: item.submittedAt.toISOString(),
      applicant: {
        fullName: item.applicant.fullName,
        email: item.applicant.email,
        phone: item.applicant.phone,
        businessName: item.applicant.businessName,
        city: item.applicant.city,
      },
      noteCount: item.notes.length,
    }));
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }

    return (await getFallbackApplications()).map((item) => ({
      id: item.id,
      referenceNumber: item.referenceNumber,
      status: item.status,
      trackName: item.trackName,
      submittedAt: item.submittedAt,
      applicant: {
        fullName: item.applicant.fullName,
        email: item.applicant.email,
        phone: item.applicant.phone,
        businessName: item.applicant.businessName,
        city: item.applicant.city,
      },
      noteCount: item.notes.length,
    }));
  }
}

export async function getApplicationDetail(id: string) {
  if (!isDatabaseConfigured() || !(await hasCoreTables())) {
    return getFallbackApplication(id);
  }

  try {
    return await db.application.findUnique({
      where: { id },
      include: {
        applicant: true,
        track: true,
        notes: { include: { author: true }, orderBy: { createdAt: "desc" } },
        statusHistory: { include: { changedBy: true }, orderBy: { createdAt: "desc" } },
        emailLogs: { orderBy: { createdAt: "desc" } },
        cohortAssignments: { include: { cohort: true } },
      },
    });
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }

    return getFallbackApplication(id);
  }
}

export async function getAdminCommunicationsData() {
  const store = await getAdminStore();
  return {
    templates: store.emailTemplates,
    recentEmails: store.applications.flatMap((application) =>
      application.emails.map((email) => ({
        ...email,
        applicationId: application.id,
        applicantName: application.applicant.fullName,
      })),
    ),
  };
}

export async function getAdminContentData() {
  const store = await getAdminStore();
  return store.siteContent;
}

export async function getAdminParticipantsData() {
  const store = await getAdminStore();
  return {
    cohorts: store.cohorts,
    participants: store.applications.filter((item) => item.status === "ACCEPTED"),
  };
}

export async function getAdminSettingsData() {
  const store = await getAdminStore();
  return store.settings;
}

export async function updateAdminApplicationStatus(
  id: string,
  status: AdminApplicationStatus,
  actorName?: string,
  message?: string,
) {
  return updateFallbackApplicationStatus(id, status, actorName, message);
}

export async function addAdminApplicationNote(id: string, content: string, authorName?: string) {
  return addFallbackApplicationNote(id, content, authorName);
}

export async function sendAdminApplicationEmail(params: {
  applicationId?: string;
  recipientEmail: string;
  subject: string;
  body?: string;
  templateSlug?: string;
}) {
  return addFallbackApplicationEmail(params);
}

export async function assignAdminCohort(applicationId: string, cohortId: string) {
  return assignFallbackCohort(applicationId, cohortId);
}

export async function updateAdminTemplate(input: {
  id: string;
  subject: string;
  previewText: string;
  body: string;
  enabled: boolean;
}) {
  return updateFallbackEmailTemplate(input);
}

export async function updateAdminContent(input: Parameters<typeof updateFallbackSiteContent>[0]) {
  return updateFallbackSiteContent(input);
}

export async function updateAdminSettings(input: Parameters<typeof updateFallbackSettings>[0]) {
  return updateFallbackSettings(input);
}
