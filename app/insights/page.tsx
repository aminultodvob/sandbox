import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Card, CardContent } from "@/components/ui/card";

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Insights"
          title="A content architecture for founder perspectives, ecosystem updates, and market thinking."
          description="This optional section is structured for future editorial growth and premium brand authority."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {["Journal feature", "Founder update", "Market insight"].map((item) => (
            <Card key={item}>
              <CardContent className="space-y-3">
                <h2 className="text-3xl font-semibold text-[var(--foreground)]">{item}</h2>
                <p className="text-sm leading-7 text-[var(--muted-strong)]">
                  Placeholder architecture ready for CMS-backed content or editorial publishing.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
