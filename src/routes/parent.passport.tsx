import { createFileRoute } from "@tanstack/react-router";
import { Card, Badge, SectionTitle } from "@/components/ui-prim";
import { children, riskColor, riskLabel } from "@/lib/mockData";

export const Route = createFileRoute("/parent/passport")({
  component: Passport,
});

const events = [
  {
    date: "14 Mar 2026",
    title: "First milestone screening",
    tag: "Screening",
    tone: "navy" as const,
  },
  {
    date: "02 Apr 2026",
    title: "Motor AI — Low Risk (Score 78)",
    tag: "Vision AI",
    tone: "success" as const,
  },
  {
    date: "20 Apr 2026",
    title: "Speech AI — Monitor (Score 60)",
    tag: "Speech AI",
    tone: "warning" as const,
  },
  { date: "12 May 2026", title: "Re-screen — Monitor", tag: "Screening", tone: "warning" as const },
  {
    date: "14 May 2026",
    title: "Referral generated to DEIC Lucknow",
    tag: "Referral",
    tone: "orange" as const,
  },
  {
    date: "20 May 2026",
    title: "Appointment with Dr. Anita Rao",
    tag: "Visit",
    tone: "navy" as const,
  },
];

function Passport() {
  const child = children[0];
  return (
    <>
      <SectionTitle
        eyebrow="Digital Child Passport"
        title={`${child.name} · ${child.id}`}
        desc="Complete care history in one place."
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/10 font-heading text-xl font-bold text-navy">
              A
            </div>
            <div>
              <div className="font-heading text-xl font-bold">{child.name}</div>
              <div className="text-sm text-muted-foreground">
                {child.gender} · {child.ageMonths} months · Parent: {child.parent}
              </div>
            </div>
          </div>
          <Badge tone={riskColor(child.risk)}>{riskLabel(child.risk)}</Badge>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Screenings</div>
          <div className="mt-1 font-heading text-2xl font-bold text-navy">4</div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            AI Assessments
          </div>
          <div className="mt-1 font-heading text-2xl font-bold text-navy">6</div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Referrals</div>
          <div className="mt-1 font-heading text-2xl font-bold text-navy">2</div>
        </Card>
      </div>

      <SectionTitle title="Care Timeline" />
      <Card>
        <ol className="relative space-y-5 border-l-2 border-border pl-6">
          {events.map((e) => (
            <li key={e.date} className="relative">
              <span className="absolute -left-[34px] top-1 h-3 w-3 rounded-full bg-orange" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">{e.date}</div>
                  <div className="font-semibold">{e.title}</div>
                </div>
                <Badge tone={e.tone}>{e.tag}</Badge>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </>
  );
}
