import { ApplicationForm } from "@/components/admin/application-form";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export default function ApplyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Founder access application"
          title="Apply for access to the Sandbox Bangladesh ecosystem."
          description="This intake form is designed to understand your business stage, strategic goals, and current challenges so our team can review fit with care."
        />
        <ApplicationForm />
      </main>
      <SiteFooter />
    </div>
  );
}
