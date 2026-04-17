import { AdminShell } from "@/components/admin/admin-shell";
import { CommunicationsCenter } from "@/components/admin/communications-center";
import { getAdminCommunicationsData } from "@/lib/dashboard";

export default async function CommunicationsPage() {
  const data = await getAdminCommunicationsData();

  return (
    <AdminShell
      title="Communication center"
      description="Manual sends, status-triggered communication, reminder handling, and email template control in one place."
    >
      <CommunicationsCenter templates={data.templates} recentEmails={data.recentEmails} />
    </AdminShell>
  );
}
