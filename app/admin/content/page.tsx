import { AdminShell } from "@/components/admin/admin-shell";
import { ContentManager } from "@/components/admin/content-manager";
import { getAdminContentData } from "@/lib/dashboard";

export default async function ContentPage() {
  const content = await getAdminContentData();

  return (
    <AdminShell
      title="Website content controls"
      description="A focused content layer for hero copy, pricing, FAQs, testimonials, contact info, and track highlight points."
    >
      <ContentManager initialContent={content} />
    </AdminShell>
  );
}
