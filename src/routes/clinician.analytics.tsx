import { createFileRoute } from "@tanstack/react-router";
import { Card, Stat, SectionTitle } from "@/components/ui-prim";

export const Route = createFileRoute("/clinician/analytics")({
  component: Analytics,
});

const outcomes = [
  { label: "Improved", pct: 58, color: "var(--success)" },
  { label: "Stable", pct: 28, color: "var(--warning)" },
  { label: "Worsened", pct: 14, color: "var(--destructive)" },
];

function Analytics() {
  return (
    <>
      <SectionTitle
        eyebrow="Outcomes"
        title="Analytics Dashboard"
        desc="Referral conversion, risk mix and intervention outcomes."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Referral conversion" value="72%" accent="success" hint="+8% vs last quarter" />
        <Stat label="Avg. time to first visit" value="9 days" accent="orange" />
        <Stat label="Children in active care" value="142" accent="navy" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-heading text-lg font-bold text-navy">Risk category distribution</h3>
          <div className="mt-4 space-y-3">
            {[
              ["Low", 62, "var(--success)"],
              ["Monitor", 24, "var(--warning)"],
              ["Refer", 14, "var(--destructive)"],
            ].map(([k, v, c]: [string, number, string]) => (
              <div key={k}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{k}</span>
                  <span className="font-semibold">{v}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full" style={{ width: `${v}%`, background: c }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-heading text-lg font-bold text-navy">
            Intervention outcomes (6-month follow-up)
          </h3>
          <div className="mt-4 flex h-40 items-end gap-6">
            {outcomes.map((o) => (
              <div key={o.label} className="flex flex-1 flex-col items-center">
                <div
                  className="w-full rounded-t-md"
                  style={{ height: `${o.pct * 1.5}px`, background: o.color }}
                />
                <div className="mt-2 text-xs font-medium">{o.label}</div>
                <div className="text-xs text-muted-foreground">{o.pct}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
