import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsManager } from "@/components/admin/settings-manager";
import { getAdminSettingsData } from "@/lib/dashboard";

export default async function SettingsPage() {
  const settings = await getAdminSettingsData();

  return (
    <AdminShell
      title="Platform settings"
      description="Admin user management, branding fields, email config placeholders, application statuses, and permissions."
    >
      <SettingsManager initialSettings={settings} />
    </AdminShell>
  );
}
