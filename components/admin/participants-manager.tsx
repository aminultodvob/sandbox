"use client";

import { useState, useTransition } from "react";
import { Mail, Send } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Participant = {
  id: string;
  referenceNumber: string;
  trackName: string;
  cohortId?: string;
  applicant: {
    fullName: string;
    businessName: string;
    email: string;
  };
  status: string;
};

type Cohort = {
  id: string;
  name: string;
  seasonLabel: string;
};

export function ParticipantsManager({
  initialParticipants,
  cohorts,
}: {
  initialParticipants: Participant[];
  cohorts: Cohort[];
}) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [openComposerId, setOpenComposerId] = useState<string | null>(null);
  const [subject, setSubject] = useState("Sandbox Bangladesh participant follow-up");
  const [body, setBody] = useState(
    "Thank you for continuing with Sandbox Bangladesh. We are sharing a quick follow-up regarding your participation and next steps.",
  );
  const [isPending, startTransition] = useTransition();

  function assign(applicationId: string, cohortId: string) {
    startTransition(async () => {
      const response = await fetch("/api/admin/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, cohortId }),
      });
      const payload = await response.json();
      if (response.ok) {
        setParticipants((current) =>
          current.map((item) =>
            item.id === applicationId ? { ...item, cohortId: payload.application.cohortId } : item,
          ),
        );
      }
    });
  }

  function sendMail(applicationId: string, recipientEmail: string) {
    startTransition(async () => {
      const response = await fetch("/api/admin/communications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "send",
          applicationId,
          recipientEmail,
          subject,
          body,
        }),
      });

      if (response.ok) {
        setOpenComposerId(null);
      }
    });
  }

  return (
    <div className="grid gap-6">
      {participants.length ? (
        participants.map((item) => (
          <Card key={item.id}>
            <CardContent className="space-y-4">
              <div className="grid gap-4 xl:grid-cols-[1fr_minmax(220px,260px)_auto] xl:items-center">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-2xl font-semibold text-[var(--foreground)]">
                      {item.applicant.fullName}
                    </p>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-[var(--muted-strong)]">
                    {item.applicant.businessName} / {item.trackName}
                  </p>
                  <p className="text-sm text-[var(--muted-strong)]">{item.applicant.email}</p>
                </div>
                <select
                  className="field-select min-w-[220px]"
                  value={item.cohortId ?? ""}
                  onChange={(event) => assign(item.id, event.target.value)}
                  disabled={isPending}
                >
                  <option value="">Assign cohort</option>
                  {cohorts.map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name} / {cohort.seasonLabel}
                    </option>
                  ))}
                </select>
                <Button
                  variant="secondary"
                  className="w-full xl:w-auto"
                  onClick={() =>
                    setOpenComposerId((current) => (current === item.id ? null : item.id))
                  }
                >
                  <Mail className="size-4" />
                  Send mail
                </Button>
              </div>

              {openComposerId === item.id ? (
                <div className="grid gap-3 rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
                  <input
                    className="field-select"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Email subject"
                  />
                  <Textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Write your participant email"
                  />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={() => sendMail(item.id, item.applicant.email)}
                      disabled={isPending}
                      className="w-full sm:w-auto"
                    >
                      <Send className="size-4" />
                      Trigger mail
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setOpenComposerId(null)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent>
            <p className="text-sm text-[var(--muted-strong)]">
              No accepted participants yet. Accept founders from the applications workspace to
              populate this section.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
