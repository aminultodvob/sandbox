import type { ReactNode } from "react";
import Link from "next/link";
import {
  ChartColumn,
  ChevronRight,
  FileText,
  Mail,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Overview", icon: ChartColumn },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/participants", label: "Participants", icon: Users },
  { href: "/admin/communications", label: "Comms", icon: Mail },
  { href: "/admin/content", label: "Content", icon: Sparkles },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3e9_0%,#f1ebde_100%)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:rgba(247,243,233,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                Sandbox Admin
              </p>
              <p className="text-lg font-semibold text-[var(--foreground)]">
                Founder operations dashboard
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)]"
            >
              Public site
              <ChevronRight className="size-4" />
            </Link>
          </div>
          <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--muted-strong)] transition hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 rounded-[28px] border border-[var(--border)] bg-white px-5 py-5 shadow-[0_12px_36px_rgba(16,41,31,0.06)] sm:px-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Internal platform
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-strong)] sm:text-base">
            {description}
          </p>
        </div>
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}
