"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type ContentData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  trackPricing: Array<{
    trackSlug: string;
    trackName: string;
    pricingBdt: number;
    highlight: string;
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
  }>;
};

export function ContentManager({ initialContent }: { initialContent: ContentData }) {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();

  function saveContent() {
    startTransition(async () => {
      await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
    });
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Homepage hero</h2>
            <p className="text-sm leading-7 text-[var(--muted-strong)]">
              Update the first message founders see when they land on the site.
            </p>
          </div>
          <input
            className="field-select"
            value={content.hero.eyebrow}
            onChange={(event) =>
              setContent({ ...content, hero: { ...content.hero, eyebrow: event.target.value } })
            }
          />
          <input
            className="field-select"
            value={content.hero.title}
            onChange={(event) =>
              setContent({ ...content, hero: { ...content.hero, title: event.target.value } })
            }
          />
          <Textarea
            value={content.hero.description}
            onChange={(event) =>
              setContent({ ...content, hero: { ...content.hero, description: event.target.value } })
            }
          />
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Track pricing</h2>
            {content.trackPricing.map((track, index) => (
              <div
                key={track.trackSlug}
                className="space-y-3 rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4"
              >
                <p className="font-semibold text-[var(--foreground)]">{track.trackName}</p>
                <input
                  className="field-select"
                  value={track.pricingBdt}
                  onChange={(event) => {
                    const next = [...content.trackPricing];
                    next[index] = { ...track, pricingBdt: Number(event.target.value) || 0 };
                    setContent({ ...content, trackPricing: next });
                  }}
                />
                <input
                  className="field-select"
                  value={track.highlight}
                  onChange={(event) => {
                    const next = [...content.trackPricing];
                    next[index] = { ...track, highlight: event.target.value };
                    setContent({ ...content, trackPricing: next });
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Contact information</h2>
            <input
              className="field-select"
              value={content.contact.email}
              onChange={(event) =>
                setContent({ ...content, contact: { ...content.contact, email: event.target.value } })
              }
            />
            <input
              className="field-select"
              value={content.contact.phone}
              onChange={(event) =>
                setContent({ ...content, contact: { ...content.contact, phone: event.target.value } })
              }
            />
            <Textarea
              value={content.contact.location}
              onChange={(event) =>
                setContent({ ...content, contact: { ...content.contact, location: event.target.value } })
              }
            />
          </CardContent>
        </Card>
      </div>
      <Button onClick={saveContent} disabled={isPending} className="w-full sm:w-fit">
        Save content
      </Button>
    </div>
  );
}
