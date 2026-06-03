import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/asha/register")({
  component: Register,
});

const steps = ["Demographics", "Parent Details", "Screening", "Submit"];

function Register() {
  const [step, setStep] = useState(0);
  const pct = ((step + 1) / steps.length) * 100;

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <SectionTitle
          eyebrow="Community Screening"
          title="Register a child"
          desc="Works offline. Syncs automatically when online."
        />
        <Badge tone="success">● Offline Mode</Badge>
      </div>

      <Card className="mb-4">
        <div className="mb-3 flex justify-between text-xs font-semibold text-muted-foreground">
          {steps.map((s, i) => (
            <span key={s} className={i === step ? "text-navy" : ""}>
              {s}
            </span>
          ))}
        </div>
        <ProgressBar value={pct} tone="orange" />
      </Card>

      <Card>
        {step === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Child name" placeholder="e.g. Aarav Sharma" />
            <Field label="Date of birth" type="date" />
            <Field label="Gender" placeholder="Male / Female / Other" />
            <Field label="Village / Block" placeholder="Rampur, Sitapur" />
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Mother's name" placeholder="Priya Sharma" />
            <Field label="Father's name" placeholder="Ravi Sharma" />
            <Field label="Mobile number" placeholder="98xxxxxxxx" />
            <Field label="Aadhaar (optional)" placeholder="xxxx xxxx xxxx" />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <div className="text-sm font-semibold">Quick milestone screening — 24–36 months</div>
            {[
              "Walks up stairs",
              "Says 2-word phrases",
              "Stacks 4+ blocks",
              "Points to body parts",
            ].map((q) => (
              <label
                key={q}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
              >
                <span>{q}</span>
                <div className="flex gap-2">
                  <Badge tone="success">Yes</Badge>
                  <Badge tone="warning">Sometimes</Badge>
                  <Badge tone="destructive">No</Badge>
                </div>
              </label>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="rounded-xl bg-success/10 p-6 text-center">
            <div className="text-4xl">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
            </div>
            <div className="mt-2 font-heading text-xl font-bold text-navy">Saved locally</div>
            <p className="mt-1 text-sm">
              Record will sync to SahAI Cloud when network is available.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Button as={Link} to="/asha" variant="outline">
                Back to dashboard
              </Button>
              <Button as={Link} to="/clinician/review/C-1042" variant="orange">
                View AI Result →
              </Button>
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))}>
              ← Back
            </Button>
            <Button variant="orange" onClick={() => setStep((s) => s + 1)}>
              {step === 2 ? "Submit" : "Next →"}
            </Button>
          </div>
        )}
      </Card>
    </>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
      />
    </label>
  );
}
