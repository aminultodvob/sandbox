import { ContactForm } from "@/components/admin/contact-form";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact"
          title="Speak with the Sandbox team."
          description="For admissions, founder fit questions, partnerships, or strategic inquiries, reach out through the channels below."
        />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Direct contact</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted-strong)]">
                  <p>{siteConfig.email}</p>
                  <p>{siteConfig.phone}</p>
                  <p>{siteConfig.location}</p>
                </div>
              </div>
              <div className="rounded-[24px] border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)] p-6 text-sm leading-7 text-[var(--muted-strong)]">
                Map placeholder for Sandbox Technology Park, Agrabad, Chattogram.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
