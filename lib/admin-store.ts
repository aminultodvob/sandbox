import { promises as fs } from "fs";
import path from "path";
import type { ApplicationInput, ContactInput } from "@/lib/validations";
import { createReferenceNumber } from "@/lib/utils";
import { homeFaqs, siteConfig, testimonials, trackContent } from "@/lib/site-content";

export type AdminApplicationStatus =
  | "RECEIVED"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "ACCEPTED"
  | "WAITLISTED"
  | "DECLINED";

export type StoredApplication = {
  id: string;
  referenceNumber: string;
  status: AdminApplicationStatus;
  priority: number;
  trackSlug: string;
  trackName: string;
  submittedAt: string;
  updatedAt: string;
  currentBusinessScale?: string;
  priorInvestmentAmount?: string;
  meetsEliteThreshold?: boolean;
  interestedInChinaImmersion?: boolean;
  sourcingExpansionInterest?: string;
  lastContactedAt?: string;
  cohortId?: string;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    businessName: string;
    industry: string;
    businessStage: string;
    businessType: string;
    yearsOperating: string;
    currentInvestment: string;
    monthlyRevenueRange?: string;
    teamSize: string;
    websiteOrSocial?: string;
    businessSummary: string;
    whySandbox: string;
    currentChallenges: string;
    referralSource: string;
    consentAccepted: boolean;
  };
  notes: Array<{
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  }>;
  timeline: Array<{
    id: string;
    title: string;
    detail: string;
    timestamp: string;
  }>;
  emails: Array<{
    id: string;
    subject: string;
    recipientEmail: string;
    templateSlug?: string;
    body?: string;
    status: "QUEUED" | "SENT" | "FAILED";
    sentAt: string;
  }>;
};

export type StoredCommunicationTemplate = {
  id: string;
  slug: string;
  name: string;
  subject: string;
  previewText: string;
  body: string;
  enabled: boolean;
};

export type StoredFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type StoredTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

export type StoredCohort = {
  id: string;
  name: string;
  seasonLabel: string;
};

export type StoredAdminUser = {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "MANAGER";
};

export type AdminStore = {
  applications: StoredApplication[];
  contactInquiries: Array<ContactInput & { id: string; createdAt: string; status: string }>;
  emailTemplates: StoredCommunicationTemplate[];
  cohorts: StoredCohort[];
  siteContent: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
    trackPricing: Array<{
      trackSlug: string;
      trackName: string;
      pricingBdt: number;
      highlight: string;
    }>;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
    faqs: StoredFaq[];
    testimonials: StoredTestimonial[];
  };
  settings: {
    branding: {
      companyName: string;
      supportEmail: string;
      supportPhone: string;
      location: string;
    };
    statuses: AdminApplicationStatus[];
    admins: StoredAdminUser[];
  };
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "admin-store.json");

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function createSeedApplication(
  id: string,
  referenceNumber: string,
  status: AdminApplicationStatus,
  trackSlug: string,
  applicant: Pick<
    StoredApplication["applicant"],
    "fullName" | "email" | "phone" | "businessName" | "city"
  > & {
    industry: string;
    businessStage: string;
    businessType: string;
    yearsOperating: string;
    currentInvestment: string;
    teamSize: string;
    businessSummary: string;
    whySandbox: string;
    currentChallenges: string;
    referralSource: string;
  },
  submittedAt: string,
) {
  const track = trackContent.find((item) => item.slug === trackSlug)!;

  return {
    id,
    referenceNumber,
    status,
    priority: status === "SHORTLISTED" ? 2 : 1,
    trackSlug,
    trackName: track.name,
    submittedAt,
    updatedAt: submittedAt,
    applicant: {
      ...applicant,
      monthlyRevenueRange: "BETWEEN_200K_500K",
      websiteOrSocial: "https://example.com",
      consentAccepted: true,
    },
    notes:
      status === "RECEIVED"
        ? []
        : [
            {
              id: makeId("note"),
              authorName: "Admissions Manager",
              content: "Strong founder story with clear commercial direction.",
              createdAt: submittedAt,
            },
          ],
    timeline: [
      {
        id: makeId("timeline"),
        title: "Application received",
        detail: "Founder access application submitted and added to the admissions queue.",
        timestamp: submittedAt,
      },
      {
        id: makeId("timeline"),
        title: "Review initiated",
        detail: "Application screened against track fit and founder readiness.",
        timestamp: submittedAt,
      },
    ],
    emails: [
      {
        id: makeId("email"),
        subject: "Your Sandbox Bangladesh application has been received",
        recipientEmail: applicant.email,
        templateSlug: "application-received",
        status: "SENT",
        sentAt: submittedAt,
      },
    ],
  } satisfies StoredApplication;
}

function createInitialStore(): AdminStore {
  return {
    applications: [
      createSeedApplication(
        "app_demo_1",
        "SBX-321842",
        "UNDER_REVIEW",
        "elite-founder-cohort",
        {
          fullName: "Nafisa Rahman",
          email: "nafisa@example.com",
          phone: "+8801700000001",
          businessName: "Delta Furnish",
          city: "Dhaka",
          industry: "Furniture and sourcing",
          businessStage: "GROWTH",
          businessType: "COMMERCE",
          yearsOperating: "4 years",
          currentInvestment: "BETWEEN_1M_5M",
          teamSize: "18",
          businessSummary: "A growth-stage furniture sourcing business serving corporate and retail buyers.",
          whySandbox: "Seeking structured expansion support and investor matchmaking.",
          currentChallenges: "Supply chain expansion and operating scale discipline.",
          referralSource: "Founder referral",
        },
        "2026-04-14T10:42:00.000Z",
      ),
      createSeedApplication(
        "app_demo_2",
        "SBX-318104",
        "SHORTLISTED",
        "growth-stage-accelerator",
        {
          fullName: "Tanvir Hossain",
          email: "tanvir@example.com",
          phone: "+8801700000002",
          businessName: "AgriFlow",
          city: "Chattogram",
          industry: "Agri-tech",
          businessStage: "EARLY_REVENUE",
          businessType: "TECHNOLOGY",
          yearsOperating: "2 years",
          currentInvestment: "BETWEEN_500K_1M",
          teamSize: "9",
          businessSummary: "An agri-tech venture improving market access for producers and buyers.",
          whySandbox: "Needs growth systems and stronger commercialization support.",
          currentChallenges: "Sales discipline and channel prioritization.",
          referralSource: "LinkedIn",
        },
        "2026-04-13T09:10:00.000Z",
      ),
      createSeedApplication(
        "app_demo_3",
        "SBX-315774",
        "RECEIVED",
        "early-stage-incubation",
        {
          fullName: "Sadia Anjum",
          email: "sadia@example.com",
          phone: "+8801700000003",
          businessName: "MangoLab",
          city: "Khulna",
          industry: "Consumer brand",
          businessStage: "VALIDATION",
          businessType: "PRODUCT",
          yearsOperating: "8 months",
          currentInvestment: "BETWEEN_100K_500K",
          teamSize: "4",
          businessSummary: "A packaged food brand validating demand through direct and retail pilots.",
          whySandbox: "Wants sharper venture positioning and launch structure.",
          currentChallenges: "Brand clarity and distribution readiness.",
          referralSource: "Instagram",
        },
        "2026-04-12T08:00:00.000Z",
      ),
    ],
    contactInquiries: [],
    emailTemplates: [
      {
        id: "tpl_received",
        slug: "application-received",
        name: "Application received",
        subject: "Your Sandbox Bangladesh application has been received",
        previewText: "We have received your participation request.",
        body: "Your application has been received and is now in our review queue.",
        enabled: true,
      },
      {
        id: "tpl_review",
        slug: "under-review",
        name: "Under review",
        subject: "Your application is now under review",
        previewText: "Our admissions team is reviewing your submission.",
        body: "Your participation request is now under review by our admissions team.",
        enabled: true,
      },
      {
        id: "tpl_shortlisted",
        slug: "shortlisted",
        name: "Shortlisted",
        subject: "Your application has been shortlisted",
        previewText: "You have advanced to the next review stage.",
        body: "Your application has been shortlisted. Our team will contact you regarding next steps shortly.",
        enabled: true,
      },
      {
        id: "tpl_accepted",
        slug: "accepted",
        name: "Accepted",
        subject: "Your Sandbox participation request has been accepted",
        previewText: "Welcome to the next stage with Sandbox Bangladesh.",
        body: "We are pleased to confirm that your participation request has been accepted.",
        enabled: true,
      },
    ],
    cohorts: [
      { id: "cohort_1", name: "Founder Cohort Alpha", seasonLabel: "Summer 2026" },
      { id: "cohort_2", name: "Growth Cohort Beta", seasonLabel: "Autumn 2026" },
    ],
    siteContent: {
      hero: {
        eyebrow: "Founder-focused incubation ecosystem",
        title: "Build → Launch → Scale → Sustain",
        description:
          "A premium business incubation ecosystem helping founders move with structure, strategic support, and investor-facing momentum.",
        primaryCta: "Apply for Access",
        secondaryCta: "Explore the Tracks",
      },
      trackPricing: trackContent.map((track) => ({
        trackSlug: track.slug,
        trackName: track.name,
        pricingBdt: track.pricingBdt,
        highlight: track.badge,
      })),
      contact: {
        email: siteConfig.email,
        phone: siteConfig.phone,
        location: siteConfig.location,
      },
      faqs: homeFaqs.map((faq, index) => ({
        id: `faq_${index + 1}`,
        question: faq.question,
        answer: faq.answer,
        category: "general",
      })),
      testimonials: testimonials.map((testimonial, index) => ({
        id: `testimonial_${index + 1}`,
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        quote: testimonial.quote,
      })),
    },
    settings: {
      branding: {
        companyName: siteConfig.name,
        supportEmail: siteConfig.email,
        supportPhone: siteConfig.phone,
        location: siteConfig.location,
      },
      statuses: [
        "RECEIVED",
        "UNDER_REVIEW",
        "SHORTLISTED",
        "ACCEPTED",
        "WAITLISTED",
        "DECLINED",
      ],
      admins: [
        {
          id: "admin_demo",
          name: "Sandbox Super Admin",
          email: "admin@sandbox.bd",
          role: "SUPER_ADMIN",
        },
        {
          id: "manager_demo",
          name: "Admissions Manager",
          email: "manager@sandbox.bd",
          role: "MANAGER",
        },
      ],
    },
  };
}

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(createInitialStore(), null, 2), "utf8");
  }
}

export async function getAdminStore() {
  await ensureStoreFile();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(raw) as AdminStore;
}

async function saveAdminStore(store: AdminStore) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function createFallbackApplication(input: ApplicationInput, referenceNumber?: string) {
  const store = await getAdminStore();
  const track = trackContent.find((item) => item.slug === input.selectedTrack);
  const timestamp = nowIso();

  const application: StoredApplication = {
    id: makeId("app"),
    referenceNumber: referenceNumber ?? createReferenceNumber(),
    status: "RECEIVED",
    priority: 1,
    trackSlug: input.selectedTrack,
    trackName: track?.name ?? input.selectedTrack,
    submittedAt: timestamp,
    updatedAt: timestamp,
    currentBusinessScale: input.currentBusinessScale,
    priorInvestmentAmount: input.priorInvestmentAmount,
    meetsEliteThreshold: input.meetsEliteThreshold,
    interestedInChinaImmersion: input.interestedInChinaImmersion,
    sourcingExpansionInterest: input.sourcingExpansionInterest,
    applicant: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      city: input.city,
      businessName: input.businessName,
      industry: input.industry,
      businessStage: input.businessStage,
      businessType: input.businessType,
      yearsOperating: input.yearsOperating,
      currentInvestment: input.currentInvestment,
      monthlyRevenueRange: input.monthlyRevenueRange || undefined,
      teamSize: input.teamSize,
      websiteOrSocial: input.websiteOrSocial || undefined,
      businessSummary: input.businessSummary,
      whySandbox: input.whySandbox,
      currentChallenges: input.currentChallenges,
      referralSource: input.referralSource,
      consentAccepted: input.consentAccepted,
    },
    notes: [],
    timeline: [
      {
        id: makeId("timeline"),
        title: "Application received",
        detail: "Founder access application submitted and added to the admissions queue.",
        timestamp,
      },
    ],
    emails: [],
  };

  store.applications.unshift(application);
  await saveAdminStore(store);
  return application;
}

export async function addFallbackContactInquiry(input: ContactInput) {
  const store = await getAdminStore();
  store.contactInquiries.unshift({
    id: makeId("inquiry"),
    createdAt: nowIso(),
    status: "NEW",
    ...input,
  });
  await saveAdminStore(store);
}

export async function getFallbackApplications() {
  const store = await getAdminStore();
  return store.applications;
}

export async function getFallbackApplication(id: string) {
  const store = await getAdminStore();
  return store.applications.find((item) => item.id === id) ?? null;
}

export async function updateFallbackApplicationStatus(
  id: string,
  status: AdminApplicationStatus,
  actorName = "Sandbox Admin",
  message?: string,
) {
  const store = await getAdminStore();
  const application = store.applications.find((item) => item.id === id);

  if (!application) {
    return null;
  }

  const previousStatus = application.status;
  const timestamp = nowIso();

  application.status = status;
  application.updatedAt = timestamp;
  application.timeline.unshift({
    id: makeId("timeline"),
    title: `Status updated to ${status.replaceAll("_", " ")}`,
    detail:
      message ??
      `${actorName} changed the application from ${previousStatus.replaceAll("_", " ")} to ${status.replaceAll("_", " ")}.`,
    timestamp,
  });

  await saveAdminStore(store);
  return application;
}

export async function addFallbackApplicationNote(
  id: string,
  content: string,
  authorName = "Sandbox Admin",
) {
  const store = await getAdminStore();
  const application = store.applications.find((item) => item.id === id);

  if (!application) {
    return null;
  }

  const timestamp = nowIso();
  application.notes.unshift({
    id: makeId("note"),
    authorName,
    content,
    createdAt: timestamp,
  });
  application.timeline.unshift({
    id: makeId("timeline"),
    title: "Internal note added",
    detail: `${authorName} added an internal admissions note.`,
    timestamp,
  });
  application.updatedAt = timestamp;

  await saveAdminStore(store);
  return application;
}

export async function addFallbackApplicationEmail(params: {
  applicationId?: string;
  recipientEmail: string;
  subject: string;
  body?: string;
  templateSlug?: string;
}) {
  const store = await getAdminStore();
  const timestamp = nowIso();
  const log = {
    id: makeId("email"),
    subject: params.subject,
    recipientEmail: params.recipientEmail,
    templateSlug: params.templateSlug,
    body: params.body,
    status: "SENT" as const,
    sentAt: timestamp,
  };

  if (params.applicationId) {
    const application = store.applications.find((item) => item.id === params.applicationId);
    if (application) {
      application.emails.unshift(log);
      application.lastContactedAt = timestamp;
      application.timeline.unshift({
        id: makeId("timeline"),
        title: "Email sent",
        detail: `A manual communication was sent to ${params.recipientEmail}.`,
        timestamp,
      });
      application.updatedAt = timestamp;
    }
  }

  await saveAdminStore(store);
  return log;
}

export async function assignFallbackCohort(applicationId: string, cohortId: string) {
  const store = await getAdminStore();
  const application = store.applications.find((item) => item.id === applicationId);
  const cohort = store.cohorts.find((item) => item.id === cohortId);

  if (!application || !cohort) {
    return null;
  }

  const timestamp = nowIso();
  application.cohortId = cohortId;
  application.updatedAt = timestamp;
  application.timeline.unshift({
    id: makeId("timeline"),
    title: "Cohort assigned",
    detail: `Assigned to ${cohort.name} (${cohort.seasonLabel}).`,
    timestamp,
  });
  await saveAdminStore(store);
  return application;
}

export async function updateFallbackEmailTemplate(input: {
  id: string;
  subject: string;
  previewText: string;
  body: string;
  enabled: boolean;
}) {
  const store = await getAdminStore();
  const template = store.emailTemplates.find((item) => item.id === input.id);

  if (!template) {
    return null;
  }

  template.subject = input.subject;
  template.previewText = input.previewText;
  template.body = input.body;
  template.enabled = input.enabled;

  await saveAdminStore(store);
  return template;
}

export async function updateFallbackSiteContent(input: Partial<AdminStore["siteContent"]>) {
  const store = await getAdminStore();
  store.siteContent = {
    ...store.siteContent,
    ...input,
  };
  await saveAdminStore(store);
  return store.siteContent;
}

export async function updateFallbackSettings(input: Partial<AdminStore["settings"]>) {
  const store = await getAdminStore();
  store.settings = {
    ...store.settings,
    ...input,
    branding: {
      ...store.settings.branding,
      ...input.branding,
    },
  };
  await saveAdminStore(store);
  return store.settings;
}
