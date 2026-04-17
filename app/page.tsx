import Link from "next/link";
import { ArrowRight, Globe2, Handshake, Sparkles, TrendingUp } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { TrackCard } from "@/components/marketing/track-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  differentiators,
  homeFaqs,
  outcomes,
  siteConfig,
  testimonials,
  trackContent,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="grid-glow overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="space-y-8">
              <Badge>Premium incubation ecosystem</Badge>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold leading-none tracking-tight text-[var(--foreground)] md:text-7xl">
                  Build real businesses with structured growth, strategic support, and founder-first
                  momentum.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)]">
                  Sandbox Bangladesh helps founders move from ambition to disciplined execution
                  across incubation, acceleration, and a selective elite cohort designed for serious
                  operators.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="xl">
                  <Link href="/apply">
                    Apply for Access
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="xl">
                  <Link href="/tracks">Explore the Tracks</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {outcomes.map((item) => (
                  <Card key={item.value} className="bg-[color:rgba(255,253,249,0.76)]">
                    <CardContent className="space-y-2">
                      <p className="text-2xl font-semibold text-[var(--foreground)]">{item.value}</p>
                      <p className="text-sm leading-7 text-[var(--muted-strong)]">{item.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <Card className="overflow-hidden bg-[var(--primary)] text-white">
              <CardContent className="space-y-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:rgba(255,255,255,0.72)]">
                    Why founders choose Sandbox
                  </p>
                  <Sparkles className="size-5 text-[var(--surface-2)]" />
                </div>
                <div className="space-y-6">
                  {[
                    "Selection-based participation designed to preserve signal, trust, and founder quality.",
                    "Investor matchmaking opportunity built into every track.",
                    "China Business Immersion exposure for the Elite Founder Cohort.",
                  ].map((item) => (
                    <div key={item} className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                      <p className="text-sm leading-7 text-[color:rgba(255,255,255,0.84)]">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Three-track ecosystem"
            title="A premium pathway for founders at different stages of business maturity."
            description="Each track is intentionally designed around founder context, business readiness, and the type of support required to move forward with confidence."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {trackContent.map((track) => (
              <TrackCard key={track.slug} {...track} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              badge="Why Sandbox"
              title="More than support sessions. A strategic founder environment."
              description="Sandbox is positioned as an incubation ecosystem for entrepreneurs who want meaningful structure, stronger decisions, and higher-trust growth support."
            />
            <div className="grid gap-4">
              {differentiators.map((item, index) => (
                <Card key={item}>
                  <CardContent className="flex gap-5">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-2)] font-semibold text-[var(--accent)]">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-7 text-[var(--muted-strong)]">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Founder outcomes"
            title="Support built around business transformation, not generic motivation."
            description="From strategic clarity and operating focus to investor-facing readiness, Sandbox is designed to create more confident, better-prepared founders."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: TrendingUp, title: "Structured growth", text: "Clearer priorities, milestones, and founder accountability." },
              { icon: Handshake, title: "Investor matchmaking", text: "Readiness-based opportunity across the Sandbox ecosystem." },
              { icon: Globe2, title: "Global exposure", text: "Cross-border thinking and China immersion positioning in the premium track." },
              { icon: Sparkles, title: "Strategic support", text: "Founder-first guidance designed to sharpen decision quality." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardContent className="space-y-5">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-2)] text-[var(--primary)]">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                      <p className="text-sm leading-7 text-[var(--muted-strong)]">{item.text}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="bg-[var(--primary)] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <SectionHeading
              badge="Access workflow"
              title="A calm, credible admission process that respects founder decisions."
              description="The conversion journey is intentionally structured to build confidence, reduce ambiguity, and keep the experience premium from first touch to internal review."
              variant="inverted"
            />
            <div className="space-y-4">
              {[
                "Select the track that best aligns with your business stage.",
                "Complete the founder access application with business context and current challenges.",
                "Our team reviews fit, readiness, and strategic alignment.",
                "Qualified candidates receive next-step communication from Sandbox.",
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="space-y-4">
                <Badge>Investor Matchmaking Opportunity</Badge>
                <h3 className="text-4xl font-semibold text-[var(--foreground)]">
                  Every track includes access to investor-facing opportunity.
                </h3>
                <p className="text-sm leading-7 text-[var(--muted-strong)]">
                  Sandbox supports founder readiness for introductions when business fit, maturity,
                  and opportunity alignment are strong. This is positioned as a meaningful
                  advantage, not a superficial promise.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[var(--surface-2)]">
              <CardContent className="space-y-4">
                <Badge>China Business Immersion</Badge>
                <h3 className="text-4xl font-semibold text-[var(--foreground)]">
                  The Elite Founder Cohort includes a stronger international lens.
                </h3>
                <p className="text-sm leading-7 text-[var(--muted-strong)]">
                  Built for matured entrepreneurs, the elite track includes premium China business
                  immersion / trip exposure for founders exploring sourcing, expansion, or a broader
                  global operating perspective.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Proof architecture"
            title="Designed with room for success stories, founder outcomes, and public trust markers."
            description="The platform includes a polished placeholder system for testimonials today and can grow into a stronger proof engine as the ecosystem scales."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="space-y-5">
                  <p className="text-lg leading-8 text-[var(--foreground)]">“{testimonial.quote}”</p>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                    <p className="text-sm text-[var(--muted-strong)]">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeading
            badge="FAQ"
            title="Clear answers for founders evaluating fit."
            description="The experience is designed to answer important questions quickly without slipping into generic, low-trust marketing language."
          />
          <FaqList items={homeFaqs} />
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-[var(--foreground)] text-white">
            <CardContent className="grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:rgba(255,255,255,0.72)]">
                  Founder access
                </p>
                <h2 className="text-4xl font-semibold tracking-tight">
                  Ready to move with a more strategic growth environment?
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-[color:rgba(255,255,255,0.78)]">
                  Submit your application and our team will review your business context, founder
                  fit, and track alignment.
                </p>
              </div>
              <Button asChild size="xl" variant="secondary">
                <Link href="/apply">Access Application</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Contact"
            title="Connect with Sandbox Bangladesh"
            description={`${siteConfig.email} · ${siteConfig.phone} · ${siteConfig.location}`}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
