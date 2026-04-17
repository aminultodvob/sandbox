import Link from "next/link";
import { siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
            Sandbox Bangladesh
          </p>
          <h3 className="max-w-md text-3xl font-semibold tracking-tight text-[var(--foreground)]">
            A founder-focused ecosystem built for serious business growth.
          </h3>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
            Premium incubation, acceleration, and selective founder support designed to move
            ventures with more structure, stronger opportunity access, and strategic confidence.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-[var(--foreground)]">Navigate</p>
          <div className="space-y-3 text-sm text-[var(--muted-strong)]">
            <Link href="/about" className="block hover:text-[var(--foreground)]">
              About
            </Link>
            <Link href="/tracks" className="block hover:text-[var(--foreground)]">
              Tracks
            </Link>
            <Link href="/apply" className="block hover:text-[var(--foreground)]">
              Apply for Access
            </Link>
            <Link href="/contact" className="block hover:text-[var(--foreground)]">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-[var(--foreground)]">Contact</p>
          <div className="space-y-3 text-sm leading-7 text-[var(--muted-strong)]">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
