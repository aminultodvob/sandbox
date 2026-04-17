"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-white shadow-[0_12px_30px_rgba(14,75,56,0.22)] hover:-translate-y-0.5 hover:bg-[var(--primary-strong)]",
        secondary:
          "border border-[var(--border)] bg-[var(--surface-2)] text-[var(--foreground)] hover:bg-[var(--surface-3)]",
        outline:
          "border border-[var(--border-strong)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-2)]",
        ghost: "text-[var(--foreground)] hover:bg-[var(--surface-2)]",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
        xl: "h-14 px-7 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
