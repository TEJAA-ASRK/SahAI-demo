import { createFileRoute } from "@tanstack/react-router";
import { Card, Badge, SectionTitle } from "@/components/ui-prim";

export const Route = createFileRoute("/asha/insights")({
  component: Insights,
});

const months = [
  { m: "Jan", screened: 22, ref: 4 },
  { m: "Feb", screened: 28, ref: 5 },
  { m: "Mar", screened: 35, ref: 7 },
  { m: "Apr", screened: 41, ref: 6 },
  { m: "May", screened: 58, ref: 9 },
];
const max = Math.max(...months.map((m) => m.screened));

function Insights() {
  return (
    <>
      <SectionTitle
        eyebrow="Block Sitapur"
        title="Village Insights"
        desc="Aggregate screening & risk distribution across your villages."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-navy">
              Children screened (monthly)
            </h3>
            <Badge tone="navy">184 total</Badge>
          </div>
          <div className="flex h-56 items-end gap-4 pt-4">
            {months.map((m) => (
              <div key={m.m} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full items-end gap-1">
                  <div
                    className="flex-1 rounded-t-md bg-navy"
                    style={{ height: `${(m.screened / max) * 180}px` }}
                  />
                  <div
                    className="flex-1 rounded-t-md bg-orange"
                    style={{ height: `${(m.ref / max) * 180}px` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{m.m}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-navy" /> Screened
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-orange" /> Referred
            </span>
          </div>
        </Card>

        <Card>
          <h3 className="font-heading text-lg font-bold text-navy">Risk Distribution</h3>
          <Donut
            segments={[
              { pct: 64, color: "var(--success)" },
              { pct: 26, color: "var(--warning)" },
              { pct: 10, color: "var(--destructive)" },
            ]}
          />
          <ul className="mt-3 space-y-1 text-sm">
            <li className="flex justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                Low
              </span>
              <span className="font-semibold">64%</span>
            </li>
            <li className="flex justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-warning" />
                Monitor
              </span>
              <span className="font-semibold">26%</span>
            </li>
            <li className="flex justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                Refer
              </span>
              <span className="font-semibold">10%</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="mt-4">
        <h3 className="font-heading text-lg font-bold text-navy">Referral completion by village</h3>
        <div className="mt-3 space-y-3">
          {[
            ["Rampur", 88],
            ["Sitapur Town", 76],
            ["Mahmudabad", 64],
            ["Biswan", 92],
          ].map(([v, p]: [string, number]) => (
            <div key={v}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{v}</span>
                <span className="font-semibold">{p}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-success" style={{ width: `${p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Donut({ segments }: { segments: { pct: number; color: string }[] }) {
  const r = 50,
    c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 140 140" className="mx-auto mt-3 h-40 w-40 -rotate-90">
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--muted)" strokeWidth="18" />
      {segments.map((s, i) => {
        const len = (s.pct / 100) * c;
        const el = (
          <circle
            key={i}
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}
