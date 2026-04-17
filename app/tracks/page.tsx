import Link from "next/link";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { TrackCard } from "@/components/marketing/track-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackContent } from "@/lib/site-content";
import { formatBdt } from "@/lib/utils";

export default function TracksPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tracks"
          title="Three structured pathways built around founder stage, readiness, and ambition."
          description="Compare each track based on who it is for, the type of transformation it supports, and the level of opportunity access it can unlock."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {trackContent.map((track) => (
            <TrackCard key={track.slug} {...track} />
          ))}
        </div>
        <Card>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left">
              <thead>
                <tr className="border-b border-[var(--border)] text-sm text-[var(--muted)]">
                  <th className="pb-4">Track</th>
                  <th className="pb-4">Ideal for</th>
                  <th className="pb-4">Pricing</th>
                  <th className="pb-4">Positioning</th>
                </tr>
              </thead>
              <tbody>
                {trackContent.map((track) => (
                  <tr key={track.slug} className="border-b border-[var(--border)] align-top">
                    <td className="py-5 text-lg font-semibold text-[var(--foreground)]">{track.name}</td>
                    <td className="py-5 text-sm leading-7 text-[var(--muted-strong)]">{track.idealParticipant}</td>
                    <td className="py-5 text-sm font-semibold text-[var(--accent)]">{formatBdt(track.pricingBdt)}</td>
                    <td className="py-5 text-sm leading-7 text-[var(--muted-strong)]">
                      <Link href={`/tracks/${track.slug}`} className="font-semibold text-[var(--primary)]">
                        View detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <div className="flex justify-center">
          <Button asChild size="xl">
            <Link href="/apply">Apply for Access</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
