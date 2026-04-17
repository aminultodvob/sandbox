"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Application = {
  id: string;
  referenceNumber: string;
  status: string;
  trackName?: string;
  track?: { name: string } | null;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    city: string;
    industry?: string;
    businessStage?: string;
    businessType?: string;
    yearsOperating?: string;
    currentInvestment?: string;
    teamSize?: string;
    businessSummary?: string;
    whySandbox?: string;
    currentChallenges?: string;
  };
  timeline?: Array<{
    id: string;
    title: string;
    detail: string;
    timestamp: string;
  }>;
  notes?: Array<{
    id: string;
    authorName?: string;
    content: string;
    createdAt: string;
    author?: { name: string } | null;
  }>;
  emails?: Array<{
    id: string;
    subject: string;
    recipientEmail: string;
    sentAt?: string;
    createdAt?: string;
  }>;
};

export function ApplicationDetailClient({ initialApplication }: { initialApplication: Application }) {
  const router = useRouter();
  const [application, setApplication] = useState(initialApplication);
  const [note, setNote] = useState("");
  const [emailSubject, setEmailSubject] = useState("Sandbox Bangladesh follow-up");
  const [emailBody, setEmailBody] = useState(
    "Thank you for your continued interest in Sandbox Bangladesh. Our team is reviewing your application and will share next steps shortly.",
  );
  const [isPending, startTransition] = useTransition();

  const trackLabel = application.trackName ?? application.track?.name ?? "Sandbox track";

  function updateStatus(status: string) {
    startTransition(async () => {
      const response = await fetch(`/api/admin/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, actorName: "Sandbox Admin" }),
      });
      const payload = await response.json();
      if (response.ok) {
        setApplication(payload.application);
        router.refresh();
      }
    });
  }

  function saveNote() {
    if (!note.trim()) {
      return;
    }

    startTransition(async () => {
      const response = await fetch(`/api/admin/applications/${application.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: note, authorName: "Sandbox Admin" }),
      });
      const payload = await response.json();
      if (response.ok) {
        setApplication(payload.application);
        setNote("");
        router.refresh();
      }
    });
  }

  function sendEmail() {
    startTransition(async () => {
      const response = await fetch("/api/admin/communications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "send",
          applicationId: application.id,
          recipientEmail: application.applicant.email,
          subject: emailSubject,
          body: emailBody,
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardContent className="space-y-5">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  Applicant profile
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                  {application.applicant.fullName}
                </h2>
              </div>
              <StatusBadge status={application.status} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {["UNDER_REVIEW", "SHORTLISTED", "ACCEPTED", "WAITLISTED", "DECLINED"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => updateStatus(status)}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-left text-sm font-semibold text-[var(--foreground)]"
                  disabled={isPending}
                >
                  {status.replaceAll("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Info label="Reference" value={application.referenceNumber} />
            <Info label="Track" value={trackLabel} />
            <Info label="Email" value={application.applicant.email} />
            <Info label="Phone" value={application.applicant.phone} />
            <Info label="Business" value={application.applicant.businessName} />
            <Info label="Location" value={application.applicant.city} />
            <Info label="Industry" value={application.applicant.industry ?? "Not specified"} />
            <Info label="Team size" value={application.applicant.teamSize ?? "Not specified"} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Info label="Business stage" value={application.applicant.businessStage ?? "Not specified"} />
            <Info label="Business type" value={application.applicant.businessType ?? "Not specified"} />
            <Info label="Years operating" value={application.applicant.yearsOperating ?? "Not specified"} />
          </div>

          <div className="space-y-4">
            <LongText label="Business summary" value={application.applicant.businessSummary ?? "Not provided"} />
            <LongText label="Why Sandbox" value={application.applicant.whySandbox ?? "Not provided"} />
            <LongText label="Current challenges" value={application.applicant.currentChallenges ?? "Not provided"} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Timeline</h2>
            {(application.timeline ?? []).map((item) => (
              <div key={item.id} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
                <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
                <p className="mt-1 text-sm leading-7 text-[var(--muted-strong)]">{item.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Internal notes</h2>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Private</p>
            </div>
            <Textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add an internal review note..."
            />
            <Button onClick={saveNote} disabled={isPending}>
              Save note
            </Button>
            <div className="space-y-3">
              {(application.notes ?? []).map((item) => (
                <div key={item.id} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
                  <p className="text-sm leading-7 text-[var(--foreground)]">{item.content}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    {(item.author?.name ?? item.authorName ?? "Sandbox Admin")} / {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Quick communication</h2>
            <input
              className="field-select"
              value={emailSubject}
              onChange={(event) => setEmailSubject(event.target.value)}
            />
            <Textarea value={emailBody} onChange={(event) => setEmailBody(event.target.value)} />
            <Button onClick={sendEmail} disabled={isPending}>
              Send email
              <Send className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{value}</p>
    </div>
  );
}

function LongText({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{value}</p>
    </div>
  );
}
