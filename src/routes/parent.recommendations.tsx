import { createFileRoute } from "@tanstack/react-router";
import { Card, Badge, SectionTitle } from "@/components/ui-prim";
import { recommendations } from "@/lib/mockData";

export const Route = createFileRoute("/parent/recommendations")({
  component: Reco,
});

function Reco() {
  return (
    <>
      <SectionTitle
        eyebrow="Personalised plan"
        title="Home Intervention Activities"
        desc="Tailored to Aarav's 28-month profile and current AI results."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map((r) => (
          <Card key={r.title}>
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-navy">{r.title}</h3>
              <Badge tone="orange">{r.category}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>⏱ 10 min/day</span>
              <span>·</span>
              <span>📅 5 days/week</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
