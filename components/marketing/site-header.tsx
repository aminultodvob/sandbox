"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/tracks", label: "Tracks" },
  { href: "/apply", label: "Apply for Access" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:rgba(248,242,230,0.9)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
            <Image src="/single-icon.png" alt="Sandbox Bangladesh" width={38} height={38} />
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-[var(--foreground)]">
                Sandbox Bangladesh
              </p>
              <p className="truncate text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Build → Launch → Scale → Sustain
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--muted-strong)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild size="lg">
              <Link href="/apply">Request Admission</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex rounded-full border border-[var(--border)] bg-white p-3 text-[var(--foreground)] lg:hidden"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-site-nav"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {isOpen ? (
          <div
            id="mobile-site-nav"
            className="mt-4 rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-[0_18px_40px_rgba(16,41,31,0.08)] lg:hidden"
          >
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-2)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <Button asChild size="lg" className="w-full">
                <Link href="/apply" onClick={() => setIsOpen(false)}>
                  Request Admission
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
