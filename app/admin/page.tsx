import { AdminShell } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/admin/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardSummary } from "@/lib/dashboard";

export default async function AdminOverviewPage() {
  const summary = await getDashboardSummary();

  return (
    <AdminShell
      title="Admissions overview"
      description="A calm, executive-style dashboard for intake monitoring, status mix, reminders, and recent founder activity."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total applications", value: summary.totals.applications },
          { label: "Pending review", value: summary.totals.pending },
          { label: "Shortlisted", value: summary.totals.shortlisted },
          { label: "Accepted", value: summary.totals.accepted },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-2">
              <p className="text-sm text-[var(--muted-strong)]">{item.label}</p>
              <p className="text-4xl font-semibold text-[var(--foreground)]">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Applications by track</h2>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                A quick read on where your current intake volume is concentrated.
              </p>
            </div>
            <div className="space-y-4">
              {summary.trackMix.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-[var(--muted-strong)]">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-[var(--surface-2)]">
                    <div
                      className="h-3 rounded-full bg-[var(--primary)]"
                      style={{ width: `${Math.min(item.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Recent activity</h2>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                The latest founder submissions so your team can triage quickly.
              </p>
            </div>
            <div className="space-y-4">
              {summary.recentApplications.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--foreground)]">{item.applicant.fullName}</p>
                      <p className="text-sm text-[var(--muted-strong)]">{item.trackName}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
