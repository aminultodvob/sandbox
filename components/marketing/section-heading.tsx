import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  badge,
  title,
  description,
}: {
  badge?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      {badge ? <Badge>{badge}</Badge> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-8 text-[var(--muted-strong)] md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
