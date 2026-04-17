import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatBdt } from "@/lib/utils";

type TrackCardProps = {
  slug: string;
  name: string;
  badge: string;
  heroDescription: string;
  pricingBdt: number;
  outcomes: readonly string[];
};

export function TrackCard({
  slug,
  name,
  badge,
  heroDescription,
  pricingBdt,
  outcomes,
}: TrackCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-6">
        <div className="space-y-4">
          <Badge>{badge}</Badge>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[var(--foreground)]">{name}</h3>
            <p className="text-sm leading-7 text-[var(--muted-strong)]">{heroDescription}</p>
          </div>
        </div>
        <div className="text-sm font-semibold text-[var(--accent)]">{formatBdt(pricingBdt)}</div>
        <div className="space-y-3 text-sm leading-7 text-[var(--muted-strong)]">
          {outcomes.slice(0, 3).map((item) => (
            <p key={item} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>{item}</span>
            </p>
          ))}
        </div>
        <div className="mt-auto flex gap-3 pt-4">
          <Button asChild>
            <Link href={`/tracks/${slug}`}>View Track</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/apply">
              Apply
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
