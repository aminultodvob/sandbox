"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Settings = {
  branding: {
    companyName: string;
    supportEmail: string;
    supportPhone: string;
    location: string;
  };
  statuses: string[];
  admins: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
};

export function SettingsManager({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isPending, startTransition] = useTransition();

  function saveSettings() {
    startTransition(async () => {
      await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branding: settings.branding }),
      });
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">Brand and support settings</h2>
          <input
            className="field-select"
            value={settings.branding.companyName}
            onChange={(event) =>
              setSettings({
                ...settings,
                branding: { ...settings.branding, companyName: event.target.value },
              })
            }
          />
          <input
            className="field-select"
            value={settings.branding.supportEmail}
            onChange={(event) =>
              setSettings({
                ...settings,
                branding: { ...settings.branding, supportEmail: event.target.value },
              })
            }
          />
          <input
            className="field-select"
            value={settings.branding.supportPhone}
            onChange={(event) =>
              setSettings({
                ...settings,
                branding: { ...settings.branding, supportPhone: event.target.value },
              })
            }
          />
          <input
            className="field-select"
            value={settings.branding.location}
            onChange={(event) =>
              setSettings({
                ...settings,
                branding: { ...settings.branding, location: event.target.value },
              })
            }
          />
          <Button onClick={saveSettings} disabled={isPending}>
            Save settings
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">Admin users</h2>
          {settings.admins.map((admin) => (
            <div key={admin.id} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
              <p className="font-semibold text-[var(--foreground)]">{admin.name}</p>
              <p className="text-sm text-[var(--muted-strong)]">
                {admin.email} · {admin.role}
              </p>
            </div>
          ))}
          <div className="rounded-[22px] border border-dashed border-[var(--border-strong)] p-4 text-sm text-[var(--muted-strong)]">
            Role permissions are modeled and the UI is ready for deeper admin user CRUD when needed.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
