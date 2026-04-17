"use client";

import { type ReactNode, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackContent } from "@/lib/site-content";
import { applicationSchema, type ApplicationInput } from "@/lib/validations";

const steps = ["Founder profile", "Business context", "Strategic fit"];

export function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      selectedTrack: "early-stage-incubation",
      consentAccepted: false,
    },
  });

  const selectedTrack = useWatch({
    control: form.control,
    name: "selectedTrack",
  });
  const isElite = selectedTrack === "elite-founder-cohort";

  const stepFields = useMemo(
    () => [
      ["fullName", "email", "phone", "city", "selectedTrack"] as const,
      [
        "businessName",
        "businessStage",
        "industry",
        "businessType",
        "yearsOperating",
        "currentInvestment",
        "monthlyRevenueRange",
        "teamSize",
        "websiteOrSocial",
      ] as const,
      [
        "businessSummary",
        "whySandbox",
        "currentChallenges",
        "referralSource",
        "priorInvestmentAmount",
        "meetsEliteThreshold",
        "interestedInChinaImmersion",
        "currentBusinessScale",
        "sourcingExpansionInterest",
        "consentAccepted",
      ] as const,
    ],
    [],
  );

  async function nextStep() {
    const valid = await form.trigger(stepFields[step]);
    if (valid) {
      setStep((value) => Math.min(value + 1, steps.length - 1));
    }
  }

  function onSubmit(values: ApplicationInput) {
    setServerMessage(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const payload = await readJsonResponse(response);

        if (!response.ok) {
          setServerMessage(payload?.error ?? "Something went wrong.");
          return;
        }

        router.push(`/thank-you?reference=${payload?.referenceNumber ?? ""}`);
      } catch {
        setServerMessage("We could not submit your application right now. Please try again.");
      }
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <Card>
        <CardContent className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            {steps.map((item, index) => (
              <div
                key={item}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  index === step
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted-strong)]"
                }`}
              >
                {index + 1}. {item}
              </div>
            ))}
          </div>

          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {step === 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" error={form.formState.errors.fullName?.message}>
                  <Input {...form.register("fullName")} />
                </Field>
                <Field label="Email" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} />
                </Field>
                <Field label="Phone" error={form.formState.errors.phone?.message}>
                  <Input {...form.register("phone")} />
                </Field>
                <Field label="City / location" error={form.formState.errors.city?.message}>
                  <Input {...form.register("city")} />
                </Field>
                <Field
                  label="Selected track"
                  error={form.formState.errors.selectedTrack?.message}
                  className="md:col-span-2"
                >
                  <select className="field-select" {...form.register("selectedTrack")}>
                    {trackContent.map((track) => (
                      <option key={track.slug} value={track.slug}>
                        {track.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Business name" error={form.formState.errors.businessName?.message}>
                  <Input {...form.register("businessName")} />
                </Field>
                <Field label="Industry" error={form.formState.errors.industry?.message}>
                  <Input {...form.register("industry")} />
                </Field>
                <Field label="Business stage" error={form.formState.errors.businessStage?.message}>
                  <select className="field-select" {...form.register("businessStage")}>
                    <option value="IDEA">Idea</option>
                    <option value="VALIDATION">Validation</option>
                    <option value="EARLY_REVENUE">Early revenue</option>
                    <option value="GROWTH">Growth</option>
                    <option value="ESTABLISHED">Established</option>
                  </select>
                </Field>
                <Field label="Business type" error={form.formState.errors.businessType?.message}>
                  <select className="field-select" {...form.register("businessType")}>
                    <option value="SERVICE">Service</option>
                    <option value="PRODUCT">Product</option>
                    <option value="MANUFACTURING">Manufacturing</option>
                    <option value="COMMERCE">Commerce</option>
                    <option value="TECHNOLOGY">Technology</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </Field>
                <Field label="Years operating" error={form.formState.errors.yearsOperating?.message}>
                  <Input {...form.register("yearsOperating")} />
                </Field>
                <Field
                  label="Current investment range"
                  error={form.formState.errors.currentInvestment?.message}
                >
                  <select className="field-select" {...form.register("currentInvestment")}>
                    <option value="BELOW_100K">Below 1 lakh BDT</option>
                    <option value="BETWEEN_100K_500K">1 lakh - 5 lakh BDT</option>
                    <option value="BETWEEN_500K_1M">5 lakh - 10 lakh BDT</option>
                    <option value="BETWEEN_1M_5M">10 lakh - 50 lakh BDT</option>
                    <option value="ABOVE_5M">Above 50 lakh BDT</option>
                  </select>
                </Field>
                <Field
                  label="Monthly revenue range"
                  error={form.formState.errors.monthlyRevenueRange?.message}
                >
                  <select className="field-select" {...form.register("monthlyRevenueRange")}>
                    <option value="">Prefer not to say</option>
                    <option value="PRE_REVENUE">Pre-revenue</option>
                    <option value="BELOW_50K">Below 50K BDT</option>
                    <option value="BETWEEN_50K_200K">50K - 200K BDT</option>
                    <option value="BETWEEN_200K_500K">200K - 500K BDT</option>
                    <option value="BETWEEN_500K_1M">500K - 1M BDT</option>
                    <option value="ABOVE_1M">Above 1M BDT</option>
                  </select>
                </Field>
                <Field label="Team size" error={form.formState.errors.teamSize?.message}>
                  <Input {...form.register("teamSize")} />
                </Field>
                <Field
                  label="Website or social link"
                  error={form.formState.errors.websiteOrSocial?.message}
                  className="md:col-span-2"
                >
                  <Input placeholder="https://..." {...form.register("websiteOrSocial")} />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-5">
                <Field
                  label="Short business summary"
                  error={form.formState.errors.businessSummary?.message}
                >
                  <Textarea {...form.register("businessSummary")} />
                </Field>
                <Field label="Why do you want to join Sandbox?" error={form.formState.errors.whySandbox?.message}>
                  <Textarea {...form.register("whySandbox")} />
                </Field>
                <Field
                  label="What are your current challenges?"
                  error={form.formState.errors.currentChallenges?.message}
                >
                  <Textarea {...form.register("currentChallenges")} />
                </Field>
                <Field label="How did you hear about us?" error={form.formState.errors.referralSource?.message}>
                  <Input {...form.register("referralSource")} />
                </Field>

                {isElite ? (
                  <div className="grid gap-5 rounded-[28px] border border-[var(--border)] bg-[var(--surface-2)] p-5 md:grid-cols-2">
                    <Field
                      label="How much have you already invested?"
                      error={form.formState.errors.priorInvestmentAmount?.message}
                      className="md:col-span-2"
                    >
                      <Input {...form.register("priorInvestmentAmount")} />
                    </Field>
                    <Field
                      label="Do you meet the minimum 5 lakh threshold?"
                      error={form.formState.errors.meetsEliteThreshold?.message}
                    >
                      <select
                        className="field-select"
                        {...form.register("meetsEliteThreshold", {
                          setValueAs: (value) => value === "true",
                        })}
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </Field>
                    <Field label="Interested in China Business Immersion?">
                      <select
                        className="field-select"
                        {...form.register("interestedInChinaImmersion", {
                          setValueAs: (value) => value === "true",
                        })}
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </Field>
                    <Field
                      label="Current business scale"
                      error={form.formState.errors.currentBusinessScale?.message}
                    >
                      <Input {...form.register("currentBusinessScale")} />
                    </Field>
                    <Field
                      label="Sourcing / expansion interest"
                      error={form.formState.errors.sourcingExpansionInterest?.message}
                    >
                      <Input {...form.register("sourcingExpansionInterest")} />
                    </Field>
                  </div>
                ) : null}

                <label className="flex items-start gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-4 text-sm text-[var(--muted-strong)]">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 accent-[var(--primary)]"
                    {...form.register("consentAccepted")}
                  />
                  <span>
                    I confirm that the information provided is accurate and I consent to Sandbox
                    Bangladesh reviewing this participation request.
                  </span>
                </label>
                {form.formState.errors.consentAccepted?.message ? (
                  <p className="text-sm text-rose-600">{form.formState.errors.consentAccepted.message}</p>
                ) : null}
              </div>
            ) : null}

            {serverMessage ? <p className="text-sm text-rose-600">{serverMessage}</p> : null}

            <div className="flex flex-wrap gap-3">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)}>
                  Back
                </Button>
              ) : null}
              {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-[var(--surface-2)]">
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Review process
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
              A premium intake flow designed for serious founders.
            </h3>
          </div>
          <div className="space-y-4">
            {[
              "Application received and reviewed by admissions",
              "Track fit and founder context assessed",
              "Qualified candidates contacted for next steps",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-7 text-[var(--muted-strong)]">
                <CheckCircle2 className="mt-1 size-4 text-[var(--primary)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">What happens next</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
              You will receive a confirmation email after submission. Our team will review your
              application and contact qualified founders regarding next steps.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as { error?: string; referenceNumber?: string };
  } catch {
    return null;
  }
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
      {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
