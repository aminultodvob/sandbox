import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/marketing/faq-list";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackContent } from "@/lib/site-content";
import { formatBdt } from "@/lib/utils";

export function generateStaticParams() {
  return trackContent.map((track) => ({ slug: track.slug }));
}

export default async function TrackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = trackContent.find((item) => item.slug === slug);

  if (!track) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge>{track.badge}</Badge>
            <h1 className="text-5xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
              {track.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)]">
              {track.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="xl">
                <Link href="/apply">Apply for Access</Link>
              </Button>
              <Button asChild variant="secondary" size="xl">
                <Link href="/tracks">Compare Tracks</Link>
              </Button>
            </div>
          </div>
          <Card className="bg-[var(--surface-2)]">
            <CardContent className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Track investment</p>
              <p className="text-5xl font-semibold text-[var(--foreground)]">{formatBdt(track.pricingBdt)}</p>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                Investor matchmaking opportunity is built into this track as part of the wider
                Sandbox ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4">
              <SectionHeading badge="Ideal participant" title={track.idealParticipant} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <SectionHeading badge="Transformation" title={track.transformationPromise} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-3xl font-semibold text-[var(--foreground)]">What founders gain</h2>
              <div className="space-y-3 text-sm leading-7 text-[var(--muted-strong)]">
                {track.outcomes.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-3xl font-semibold text-[var(--foreground)]">Support and follow-up</h2>
              <div className="space-y-3 text-sm leading-7 text-[var(--muted-strong)]">
                {track.support.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-3xl font-semibold text-[var(--foreground)]">Process / structure</h2>
              <div className="space-y-3 text-sm leading-7 text-[var(--muted-strong)]">
                {track.process.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            badge="FAQs"
            title="Practical answers about fit, structure, and expectations."
          />
          <FaqList items={track.faqs} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
