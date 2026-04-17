import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/tracks", label: "Tracks" },
  { href: "/apply", label: "Apply for Access" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:rgba(248,242,230,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/single-icon.png" alt="Sandbox Bangladesh" width={38} height={38} />
          <div>
            <p className="text-lg font-semibold text-[var(--foreground)]">Sandbox Bangladesh</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
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
          className="inline-flex rounded-full border border-[var(--border)] p-3 text-[var(--foreground)] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </button>
      </div>
    </header>
  );
}
