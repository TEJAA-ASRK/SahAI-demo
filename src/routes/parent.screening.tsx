import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";
import { milestoneGroups } from "@/lib/mockData";

export const Route = createFileRoute("/parent/screening")({
  component: Screening,
});

function Screening() {
  const [groupIdx, setGroupIdx] = useState(3); // 2-3 years (Aarav 28mo)
  const group = milestoneGroups[groupIdx];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const completed = group.items.filter((i) => checked[i]).length;
  const pct = Math.round((completed / group.items.length) * 100);

  return (
    <>
      <SectionTitle
        eyebrow="Step 1"
        title="Developmental Milestone Screening"
        desc="Tick the milestones your child can do consistently."
      />

      <Card className="mb-4">
        <div className="flex flex-wrap gap-2">
          {milestoneGroups.map((g, i) => (
            <button
              key={g.age}
              onClick={() => {
                setGroupIdx(i);
                setChecked({});
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                i === groupIdx
                  ? "bg-navy text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {g.age}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-navy">Milestones — {group.age}</h3>
          <Badge tone="orange">
            {completed}/{group.items.length} met
          </Badge>
        </div>
        <ProgressBar value={pct} tone="orange" />

        <ul className="mt-5 space-y-2">
          {group.items.map((item) => (
            <li key={item}>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${checked[item] ? "border-orange bg-orange/5" : "border-border hover:bg-muted/60"}`}
              >
                <input
                  type="checkbox"
                  checked={!!checked[item]}
                  onChange={(e) => setChecked((c) => ({ ...c, [item]: e.target.checked }))}
                  className="h-5 w-5 accent-[color:var(--orange)]"
                />
                <span className="text-sm font-medium">{item}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            Score will combine with Vision & Speech AI to compute risk.
          </div>
          <Button as={Link} to="/parent/motor" variant="orange">
            Continue to Motor Assessment →
          </Button>
        </div>
      </Card>
    </>
  );
}
