import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Card, CardContent } from "@/components/ui/card";

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Events and immersion"
          title="A structured place for bootcamps, private sessions, and international exposure."
          description="This route is ready for future event listings and high-value immersion opportunities."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-3xl font-semibold text-[var(--foreground)]">Founder event architecture</h2>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                Showcase selective events, founder meetups, advisory sessions, and partner-led
                opportunities with a premium presentation layer.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-3xl font-semibold text-[var(--foreground)]">Immersion architecture</h2>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                Highlight China Business Immersion details, schedules, and strategic relevance for
                the Elite Founder Cohort.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
