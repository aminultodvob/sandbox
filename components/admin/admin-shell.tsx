"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartColumn,
  ChevronRight,
  FileText,
  Mail,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3e9_0%,#f1ebde_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[0_16px_42px_rgba(16,41,31,0.08)]">
              <div className="flex items-center justify-between gap-3 lg:block">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                    Sandbox Admin
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                    Founder operations
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted-strong)]">
                    Admissions, participants, communications, and content in one place.
                  </p>
                </div>
                <Link
                  href="/"
                  className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-[var(--foreground)] sm:inline-flex lg:mt-5"
                >
                  Public site
                  <ChevronRight className="size-4" />
                </Link>
              </div>

              <nav className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    item.href === "/admin"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                        active
                          ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_10px_26px_rgba(14,75,56,0.18)]"
                          : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted-strong)] hover:border-[var(--border-strong)] hover:bg-white hover:text-[var(--foreground)]",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-[var(--foreground)] sm:hidden"
              >
                Public site
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="rounded-[28px] border border-[var(--border)] bg-white px-5 py-5 shadow-[0_12px_36px_rgba(16,41,31,0.06)] sm:px-6">
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
            <div className="mt-6 space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
