"use client";

import type { ComponentPropsWithoutRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)]",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[var(--foreground)]",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-[var(--muted-strong)] transition-transform data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn("px-5 pb-5 text-sm leading-7 text-[var(--muted-strong)]", className)}
      {...props}
    />
  );
}
