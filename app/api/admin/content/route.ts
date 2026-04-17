import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminContentData, updateAdminContent } from "@/lib/dashboard";

const contentSchema = z.object({
  hero: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string(),
      primaryCta: z.string(),
      secondaryCta: z.string(),
    })
    .optional(),
  trackPricing: z
    .array(
      z.object({
        trackSlug: z.string(),
        trackName: z.string(),
        pricingBdt: z.number(),
        highlight: z.string(),
      }),
    )
    .optional(),
  contact: z
    .object({
      email: z.string(),
      phone: z.string(),
      location: z.string(),
    })
    .optional(),
  faqs: z
    .array(
      z.object({
        id: z.string(),
        question: z.string(),
        answer: z.string(),
        category: z.string(),
      }),
    )
    .optional(),
  testimonials: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        role: z.string(),
        company: z.string(),
        quote: z.string(),
      }),
    )
    .optional(),
});

export async function GET() {
  return NextResponse.json({ content: await getAdminContentData() });
}

export async function PATCH(request: Request) {
  const parsed = contentSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }

  return NextResponse.json({ content: await updateAdminContent(parsed.data) });
}
