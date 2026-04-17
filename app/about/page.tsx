import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Sandbox"
          title="A founder ecosystem built to help real businesses move with more structure and confidence."
          description="Sandbox Bangladesh exists to support entrepreneurs at different stages of business maturity through premium incubation, acceleration, and selective founder programming."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Mission",
              text: "To help founders build stronger businesses through strategic guidance, curated support, and an ecosystem that rewards seriousness.",
            },
            {
              title: "Vision",
              text: "To become a trusted platform for founder growth in Bangladesh with standards that meet international expectations.",
            },
            {
              title: "Why this exists",
              text: "Because entrepreneurs often need more than inspiration. They need structure, review quality, and access to the right opportunities.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="space-y-3">
                <h2 className="text-3xl font-semibold text-[var(--foreground)]">{item.title}</h2>
                <p className="text-sm leading-7 text-[var(--muted-strong)]">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-4xl font-semibold text-[var(--foreground)]">Ecosystem positioning</h2>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                Sandbox sits at the intersection of incubation platform, founder advisory system,
                and growth ecosystem. It is intentionally positioned away from low-trust course
                marketing and closer to a premium venture support environment.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[var(--surface-2)]">
            <CardContent className="space-y-4">
              <h2 className="text-4xl font-semibold text-[var(--foreground)]">Strategic approach</h2>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                The experience is designed to balance founder warmth with executive-grade clarity:
                selective review, structured milestones, curated support, and opportunity access
                that respects readiness.
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <SectionHeading
              badge="Leadership and mentors"
              title="Placeholder architecture for leadership, mentors, and strategic partners."
              description="The platform includes room for founder-facing credibility blocks that can later be populated with leadership, advisors, and ecosystem partners."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {["Leadership profile", "Mentor profile", "Strategic advisor"].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)] p-6 text-sm text-[var(--muted-strong)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
