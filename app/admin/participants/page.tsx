import { AdminShell } from "@/components/admin/admin-shell";
import { ParticipantsManager } from "@/components/admin/participants-manager";
import { getAdminParticipantsData } from "@/lib/dashboard";

export default async function ParticipantsPage() {
  const data = await getAdminParticipantsData();

  return (
    <AdminShell
      title="Participation management"
      description="Track accepted founders, cohort assignment, follow-up status, and participation lifecycle."
    >
      <ParticipantsManager
        initialParticipants={data.participants as never}
        cohorts={data.cohorts}
      />
    </AdminShell>
  );
}
