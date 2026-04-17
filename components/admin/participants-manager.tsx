"use client";

import { useState, useTransition } from "react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="grid gap-6">
      {participants.length ? (
        participants.map((item) => (
          <Card key={item.id}>
            <CardContent className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-[var(--foreground)]">{item.applicant.fullName}</p>
                <p className="text-sm text-[var(--muted-strong)]">
                  {item.applicant.businessName} · {item.trackName}
                </p>
                <StatusBadge status={item.status} />
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
                    {cohort.name} · {cohort.seasonLabel}
                  </option>
                ))}
              </select>
              <Button variant="secondary">{item.applicant.email}</Button>
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
