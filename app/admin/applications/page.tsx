import { AdminShell } from "@/components/admin/admin-shell";
import { ApplicationsTable } from "@/components/admin/applications-table";
import { Card, CardContent } from "@/components/ui/card";
import { getApplicationRows } from "@/lib/dashboard";

export default async function ApplicationsPage() {
  const applications = await getApplicationRows();

  return (
    <AdminShell
      title="Applications management"
      description="Search, filter, and review founder applications with status visibility, internal notes, and progression history."
    >
      <Card>
        <CardContent className="overflow-x-auto">
          <ApplicationsTable rows={applications} />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
