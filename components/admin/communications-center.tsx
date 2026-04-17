"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Template = {
  id: string;
  slug: string;
  name: string;
  subject: string;
  previewText: string;
  body: string;
  enabled: boolean;
};

type RecentEmail = {
  id: string;
  subject: string;
  recipientEmail: string;
  applicantName?: string;
  sentAt?: string;
};

export function CommunicationsCenter({
  templates,
  recentEmails,
}: {
  templates: Template[];
  recentEmails: RecentEmail[];
}) {
  const [selected, setSelected] = useState(templates[0]);
  const [isPending, startTransition] = useTransition();

  function saveTemplate() {
    startTransition(async () => {
      await fetch("/api/admin/communications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "template", ...selected }),
      });
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">Template manager</h2>
          <select
            className="field-select"
            value={selected.id}
            onChange={(event) =>
              setSelected(templates.find((item) => item.id === event.target.value) ?? templates[0])
            }
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <input
            className="field-select"
            value={selected.subject}
            onChange={(event) => setSelected({ ...selected, subject: event.target.value })}
          />
          <input
            className="field-select"
            value={selected.previewText}
            onChange={(event) => setSelected({ ...selected, previewText: event.target.value })}
          />
          <Textarea
            value={selected.body}
            onChange={(event) => setSelected({ ...selected, body: event.target.value })}
          />
          <label className="flex items-center gap-3 text-sm text-[var(--muted-strong)]">
            <input
              type="checkbox"
              checked={selected.enabled}
              onChange={(event) => setSelected({ ...selected, enabled: event.target.checked })}
            />
            Template enabled
          </label>
          <Button onClick={saveTemplate} disabled={isPending}>
            Save template
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">Recent delivery log</h2>
          {recentEmails.length ? (
            recentEmails.map((item) => (
              <div key={item.id} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
                <p className="font-semibold text-[var(--foreground)]">{item.subject}</p>
                <p className="text-sm text-[var(--muted-strong)]">
                  {item.applicantName ? `${item.applicantName} · ` : ""}
                  {item.recipientEmail}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.sentAt ? new Date(item.sentAt).toLocaleString() : "Sent recently"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[var(--muted-strong)]">No recent email activity yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
