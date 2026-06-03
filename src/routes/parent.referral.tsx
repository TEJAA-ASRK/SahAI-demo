import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";
import { children, referralTimeline, referralServices, riskColor, riskLabel } from "@/lib/mockData";

export const Route = createFileRoute("/parent/referral")({
  component: Referral,
});

function Referral() {
  const child = children[0];

  return (
    <>
      <SectionTitle
        eyebrow="Risk Engine"
        title="Combined Risk Result"
        desc="Milestones + Vision AI + Speech AI"
      />

      <Card className="mb-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="rounded-xl bg-warning/10 p-5 text-center">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Overall</div>
              <div className="mt-1 font-heading text-3xl font-bold text-[oklch(0.45_0.13_70)]">
                Monitor
              </div>
              <div className="mt-1 text-sm">Yellow risk — re-screen in 6 weeks</div>
            </div>
          </div>
          <div className="space-y-3 md:col-span-2">
            {[
              ["Milestone score", child.milestoneScore, "orange"],
              ["Vision AI", child.visionScore, "warning"],
              ["Speech AI", child.speechScore, "warning"],
            ].map(([k, v, t]: [string, number, string]) => (
              <div key={k}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{k}</span>
                  <span className="font-semibold">{v}/100</span>
                </div>
                <ProgressBar value={v} tone={t} />
              </div>
            ))}
            <div className="rounded-lg border border-border bg-muted/60 p-3 text-sm">
              <div className="font-semibold">Explainable insights</div>
              <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                {child.insights.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle
        title="Smart Referral Engine"
        desc="Best-fit options based on location, age, risk and availability."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {referralServices.map((s) => (
          <Card key={s.name}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-heading text-lg font-bold text-navy">{s.name}</h4>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {s.type} · {s.distance}
                </div>
              </div>
              <Badge tone="navy">{s.scheme}</Badge>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Details</Button>
              <Button variant="orange">Book Appointment</Button>
            </div>
          </Card>
        ))}
      </div>

      <SectionTitle
        title="Referral Status Timeline"
        desc="Track progress from screening to follow-up."
      />
      <Card>
        <ol className="relative space-y-6 border-l-2 border-border pl-6">
          {referralTimeline.map((t, i) => (
            <li key={t.stage} className="relative">
              <span
                className={`absolute -left-[34px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  t.done ? "bg-success text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {t.done ? "✓" : i + 1}
              </span>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{t.stage}</div>
                <div className="text-xs text-muted-foreground">{t.date}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex justify-end">
          <Button as={Link} to="/parent/passport" variant="primary">
            Open Child Passport →
          </Button>
        </div>
      </Card>
    </>
  );
}
