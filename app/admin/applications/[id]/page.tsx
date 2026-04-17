import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ApplicationDetailClient } from "@/components/admin/application-detail-client";
import { getApplicationDetail } from "@/lib/dashboard";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplicationDetail(id);

  if (!application) {
    notFound();
  }

  return (
    <AdminShell
      title="Application detail"
      description="Review founder context, notes, communications, and lifecycle progression from one focused workspace."
    >
      <ApplicationDetailClient initialApplication={application as never} />
    </AdminShell>
  );
}
