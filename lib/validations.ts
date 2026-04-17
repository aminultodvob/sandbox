import { z } from "zod";

export const applicationSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required."),
    email: z.email("Enter a valid email address."),
    phone: z.string().min(7, "Phone number is required."),
    city: z.string().min(2, "City or location is required."),
    businessName: z.string().min(2, "Business name is required."),
    businessStage: z.enum([
      "IDEA",
      "VALIDATION",
      "EARLY_REVENUE",
      "GROWTH",
      "ESTABLISHED",
    ]),
    selectedTrack: z.enum([
      "early-stage-incubation",
      "growth-stage-accelerator",
      "elite-founder-cohort",
    ]),
    industry: z.string().min(2, "Industry is required."),
    businessType: z.enum([
      "SERVICE",
      "PRODUCT",
      "MANUFACTURING",
      "COMMERCE",
      "TECHNOLOGY",
      "HYBRID",
    ]),
    yearsOperating: z.string().min(1, "Please indicate how long you have been operating."),
    currentInvestment: z.enum([
      "BELOW_100K",
      "BETWEEN_100K_500K",
      "BETWEEN_500K_1M",
      "BETWEEN_1M_5M",
      "ABOVE_5M",
    ]),
    monthlyRevenueRange: z
      .enum([
        "PRE_REVENUE",
        "BELOW_50K",
        "BETWEEN_50K_200K",
        "BETWEEN_200K_500K",
        "BETWEEN_500K_1M",
        "ABOVE_1M",
      ])
      .optional()
      .or(z.literal("")),
    teamSize: z.string().min(1, "Team size is required."),
    websiteOrSocial: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
    businessSummary: z.string().min(40, "Please provide a more complete business summary."),
    whySandbox: z.string().min(30, "Please share why Sandbox is the right fit."),
    currentChallenges: z.string().min(20, "Please describe your current challenges."),
    referralSource: z.string().min(2, "Please tell us how you heard about Sandbox."),
    consentAccepted: z.boolean().refine(Boolean, "You must confirm the consent statement."),
    priorInvestmentAmount: z.string().optional(),
    meetsEliteThreshold: z.boolean().optional(),
    interestedInChinaImmersion: z.boolean().optional(),
    currentBusinessScale: z.string().optional(),
    sourcingExpansionInterest: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.selectedTrack === "elite-founder-cohort") {
      if (!data.priorInvestmentAmount?.trim()) {
        ctx.addIssue({
          path: ["priorInvestmentAmount"],
          code: "custom",
          message: "Please share how much you have already invested.",
        });
      }

      if (typeof data.meetsEliteThreshold !== "boolean") {
        ctx.addIssue({
          path: ["meetsEliteThreshold"],
          code: "custom",
          message: "Please confirm whether you meet the threshold.",
        });
      }

      if (!data.currentBusinessScale?.trim()) {
        ctx.addIssue({
          path: ["currentBusinessScale"],
          code: "custom",
          message: "Please describe your current business scale.",
        });
      }

      if (!data.sourcingExpansionInterest?.trim()) {
        ctx.addIssue({
          path: ["sourcingExpansionInterest"],
          code: "custom",
          message: "Please outline your sourcing or expansion interest.",
        });
      }
    }
  });

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.email("Enter a valid email address."),
  phone: z.string().optional(),
  organization: z.string().optional(),
  message: z.string().min(20, "Please add a fuller message."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
