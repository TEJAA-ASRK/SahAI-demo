import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";
import { children, riskColor, riskLabel } from "@/lib/mockData";

export const Route = createFileRoute("/clinician/review/$id")({
  component: Review,
});

function Review() {
  const { id } = useParams({ from: "/clinician/review/$id" });
  const child = children.find((c) => c.id === id) ?? children[0];
  const [decision, setDecision] = useState<string | null>(null);

  return (
    <>
      <SectionTitle
        eyebrow="Child Review"
        title={child.name}
        desc={`${child.id} · ${child.gender} · ${child.ageMonths} months · ${child.village}`}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="font-heading text-lg font-bold text-navy">Profile</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <Row k="Parent" v={child.parent} />
            <Row k="Last screening" v={child.lastScreening} />
            <Row
              k="Overall risk"
              v={<Badge tone={riskColor(child.risk)}>{riskLabel(child.risk)}</Badge>}
            />
          </dl>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-heading text-lg font-bold text-navy">AI Assessment Summary</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              ["Milestones", child.milestoneScore, "orange"],
              ["Vision AI", child.visionScore, "warning"],
              ["Speech AI", child.speechScore, "warning"],
            ].map(([k, v, t]: [string, number, string]) => (
              <div key={k} className="rounded-lg bg-muted/60 p-3">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="mt-1 font-heading text-xl font-bold">{v}/100</div>
                <div className="mt-1">
                  <ProgressBar value={v} tone={t} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3 text-sm">
            <div className="font-semibold">Explainable insights</div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground">
              {child.insights.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <SectionTitle
        title="Clinical Recommendation"
        desc="Choose the next step in the care pathway."
      />
      <div className="grid gap-3 md:grid-cols-3">
        {[
          {
            k: "Monitor",
            desc: "Re-screen in 6 weeks, share home activities.",
            tone: "warning" as const,
          },
          {
            k: "Therapy Referral",
            desc: "Refer to therapy NGO for early intervention.",
            tone: "orange" as const,
          },
          {
            k: "Specialist Evaluation",
            desc: "Pediatric neurology / developmental specialist.",
            tone: "destructive" as const,
          },
        ].map((opt) => (
          <button
            key={opt.k}
            onClick={() => setDecision(opt.k)}
            className={`card-soft p-5 text-left transition-shadow hover:shadow-md ${decision === opt.k ? "ring-2 ring-orange" : ""}`}
          >
            <Badge tone={opt.tone}>{opt.k}</Badge>
            <p className="mt-2 text-sm text-muted-foreground">{opt.desc}</p>
          </button>
        ))}
      </div>

      {decision && (
        <Card className="mt-4 border-success/40 bg-success/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-success">Decision recorded</div>
              <div className="font-heading text-lg font-bold">
                {decision} — for {child.name}
              </div>
            </div>
            <div className="flex gap-2">
              <Button as={Link} to="/clinician" variant="outline">
                Back to Queue
              </Button>
              <Button variant="primary">Generate Care Plan</Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-1.5 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
