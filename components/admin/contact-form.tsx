"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(values: ContactInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = await response.json();
      setMessage(payload.message ?? "Inquiry sent.");
      if (response.ok) {
        form.reset();
      }
    });
  }

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label>Full name</Label>
          <Input {...form.register("fullName")} />
          <ErrorText message={form.formState.errors.fullName?.message} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" {...form.register("email")} />
          <ErrorText message={form.formState.errors.email?.message} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input {...form.register("phone")} />
        </div>
        <div>
          <Label>Organization</Label>
          <Input {...form.register("organization")} />
        </div>
      </div>
      <div>
        <Label>Message</Label>
        <Textarea {...form.register("message")} />
        <ErrorText message={form.formState.errors.message?.message} />
      </div>
      {message ? <p className="text-sm text-[var(--muted-strong)]">{message}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-rose-600">{message}</p> : null;
}
