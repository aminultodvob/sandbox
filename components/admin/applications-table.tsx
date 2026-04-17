"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";

type Row = {
  id: string;
  referenceNumber: string;
  status: string;
  trackName: string;
  submittedAt: string;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    city: string;
  };
  noteCount: number;
};

export function ApplicationsTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const tracks = useMemo(
    () => ["ALL", ...Array.from(new Set(rows.map((row) => row.trackName)))],
    [rows],
  );

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          row.referenceNumber,
          row.applicant.fullName,
          row.applicant.email,
          row.applicant.businessName,
          row.applicant.city,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesTrack = track === "ALL" || row.trackName === track;
      const matchesStatus = status === "ALL" || row.status === status;
      return matchesQuery && matchesTrack && matchesStatus;
    });
  }, [query, rows, status, track]);

  return (
    <>
      <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <input
          className="field-select"
          placeholder="Search founder, email, business"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className="field-select" value={track} onChange={(event) => setTrack(event.target.value)}>
          {tracks.map((item) => (
            <option key={item} value={item}>
              {item === "ALL" ? "All tracks" : item}
            </option>
          ))}
        </select>
        <select className="field-select" value={status} onChange={(event) => setStatus(event.target.value)}>
          {["ALL", "RECEIVED", "UNDER_REVIEW", "SHORTLISTED", "ACCEPTED", "WAITLISTED", "DECLINED"].map((item) => (
            <option key={item} value={item}>
              {item === "ALL" ? "All statuses" : item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <Button asChild variant="secondary" className="justify-between">
          <Link href="/api/admin/applications/export">
            Export CSV
            <Download className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:hidden">
        {filteredRows.map((item) => (
          <Link
            key={item.id}
            href={`/admin/applications/${item.id}`}
            className="rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-[0_10px_30px_rgba(16,41,31,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {item.applicant.fullName}
                </p>
                <p className="text-sm text-[var(--muted-strong)]">
                  {item.applicant.businessName}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-4 grid gap-2 text-sm text-[var(--muted-strong)]">
              <p>{item.trackName}</p>
              <p>{item.applicant.email}</p>
              <p>
                {item.referenceNumber} / {new Date(item.submittedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[980px] text-left">
          <thead>
            <tr className="border-b border-[var(--border)] text-sm text-[var(--muted)]">
              <th className="pb-4">Reference</th>
              <th className="pb-4">Founder</th>
              <th className="pb-4">Business</th>
              <th className="pb-4">Track</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((item) => (
              <tr key={item.id} className="border-b border-[var(--border)] align-top">
                <td className="py-5 text-sm font-semibold text-[var(--foreground)]">
                  <Link href={`/admin/applications/${item.id}`}>{item.referenceNumber}</Link>
                </td>
                <td className="py-5 text-sm leading-7 text-[var(--muted-strong)]">
                  <p>{item.applicant.fullName}</p>
                  <p>{item.applicant.email}</p>
                </td>
                <td className="py-5 text-sm leading-7 text-[var(--muted-strong)]">
                  <p>{item.applicant.businessName}</p>
                  <p>{item.applicant.city}</p>
                </td>
                <td className="py-5 text-sm text-[var(--muted-strong)]">{item.trackName}</td>
                <td className="py-5 text-sm">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-5 text-sm text-[var(--muted-strong)]">
                  {new Date(item.submittedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
