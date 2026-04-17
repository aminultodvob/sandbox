import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  badge,
  title,
  description,
  variant = "default",
  className,
}: {
  badge?: string;
  title: string;
  description?: string;
  variant?: "default" | "inverted";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      {badge ? <Badge>{badge}</Badge> : null}
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight md:text-5xl",
          variant === "inverted" ? "text-white" : "text-[var(--foreground)]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base leading-8 md:text-lg",
            variant === "inverted" ? "text-white/80" : "text-[var(--muted-strong)]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
