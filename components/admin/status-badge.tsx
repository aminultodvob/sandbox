import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  RECEIVED: "bg-slate-100 text-slate-700",
  UNDER_REVIEW: "bg-amber-100 text-amber-800",
  SHORTLISTED: "bg-sky-100 text-sky-800",
  ACCEPTED: "bg-emerald-100 text-emerald-800",
  WAITLISTED: "bg-violet-100 text-violet-800",
  DECLINED: "bg-rose-100 text-rose-800",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tones[status] ?? "bg-slate-100 text-slate-700",
      )}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
