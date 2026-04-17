import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-2xl">
        <CardContent className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Application received</p>
          <h1 className="text-5xl font-semibold text-[var(--foreground)]">
            Your participation request is now in review.
          </h1>
          <p className="text-sm leading-7 text-[var(--muted-strong)]">
            Thank you for applying to Sandbox Bangladesh. Our team will review your submission and
            contact you shortly if additional information or next steps are required.
          </p>
          {reference ? (
            <div className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-5 py-3 text-sm font-semibold text-[var(--foreground)]">
              Reference: {reference}
            </div>
          ) : null}
          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Contact Sandbox</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
