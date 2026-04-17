import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("sandbox-admin-2026", 12);

  await prisma.adminUser.upsert({
    where: { email: "admin@sandbox.bd" },
    update: {},
    create: {
      name: "Sandbox Super Admin",
      email: "admin@sandbox.bd",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  const tracks = [
    {
      slug: "early-stage-incubation",
      name: "Early-Stage Incubation",
      shortName: "Incubation",
      tagline: "Build stronger business fundamentals with structured guidance.",
      summary:
        "A focused pathway for founders validating their model, building traction, and preparing for disciplined execution.",
      pricingBdt: 25000,
      idealFor: "Founders at idea-to-validation stage who need structure, clarity, and a strategic launch runway.",
      transformationPromise:
        "Move from fragmented progress to a focused growth plan with sharper positioning, market readiness, and operational confidence.",
      outcomes: [
        "Sharper founder positioning and venture narrative",
        "Validation roadmap with milestone accountability",
        "Commercial readiness and go-to-market direction",
      ],
      features: [
        "Strategic venture review",
        "Founder advisory sessions",
        "Execution roadmap",
        "Investor matchmaking opportunity",
      ],
      support: [
        "Structured check-ins",
        "Network access",
        "Progress review touchpoints",
      ],
      selectionPositioning:
        "Selection-based intake for founders ready to build with intent.",
      highlightPoints: [
        "Best for early traction businesses",
        "Premium founder support",
        "High-signal application review",
      ],
      order: 1,
    },
    {
      slug: "growth-stage-accelerator",
      name: "Growth-Stage Accelerator",
      shortName: "Accelerator",
      tagline: "Scale with strategy, systems, and high-value market support.",
      summary:
        "Built for operating ventures ready to strengthen commercial systems, team execution, and expansion velocity.",
      pricingBdt: 30000,
      idealFor:
        "Founders with early-market traction who need sharper growth systems and decision support.",
      transformationPromise:
        "Upgrade from reactive growth to a disciplined scaling engine backed by strategic support and opportunity access.",
      outcomes: [
        "Growth bottleneck diagnosis",
        "Expansion strategy and operational focus",
        "Stronger investor and partner readiness",
      ],
      features: [
        "Growth strategy sessions",
        "Performance checkpoints",
        "Partner introductions",
        "Investor matchmaking opportunity",
      ],
      support: [
        "Strategic mentoring",
        "Growth planning reviews",
        "Follow-up advisory support",
      ],
      selectionPositioning:
        "Reserved for founders positioned to scale with commitment and clarity.",
      highlightPoints: [
        "Built for traction-stage operators",
        "Systems-led acceleration",
        "Executive-style support",
      ],
      order: 2,
    },
    {
      slug: "elite-founder-cohort",
      name: "Elite Founder Cohort",
      shortName: "Elite Cohort",
      tagline: "A high-trust growth environment for matured entrepreneurs.",
      summary:
        "A selective founder experience designed for serious operators seeking strategic expansion, investor alignment, and global exposure.",
      pricingBdt: 150000,
      idealFor:
        "Matured entrepreneurs who have already invested at least 5 lakh BDT into their business and are preparing for larger moves.",
      transformationPromise:
        "Step into a premium founder platform with advanced strategic review, elite peer context, and access to cross-border opportunity.",
      outcomes: [
        "Executive-level strategic review",
        "Investor positioning and matchmaking opportunity",
        "China business immersion and expansion exposure",
      ],
      features: [
        "Private cohort experience",
        "Selection-led founder review",
        "China business immersion access",
        "Investor matchmaking opportunity",
      ],
      support: [
        "High-touch advisory",
        "Expansion planning",
        "Selective follow-up support",
      ],
      selectionPositioning:
        "Highly selective and designed for entrepreneurs already carrying real operating commitment.",
      highlightPoints: [
        "For serious, matured founders",
        "Minimum investment threshold expectation",
        "Global expansion lens",
      ],
      order: 3,
    },
  ];

  for (const track of tracks) {
    await prisma.track.upsert({
      where: { slug: track.slug },
      update: track,
      create: track,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
