import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[140px] w-full rounded-3xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring-soft)]",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
