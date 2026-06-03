import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Stat, Badge, SectionTitle } from "@/components/ui-prim";
import { children, clinicianStats, riskColor, riskLabel } from "@/lib/mockData";

export const Route = createFileRoute("/clinician/")({
  component: ClinicianHome,
});

function ClinicianHome() {
  return (
    <>
      <SectionTitle
        eyebrow="Clinical Dashboard"
        title="Good morning, Dr. Rao"
        desc="AI-prioritised referrals awaiting your review."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="New referrals" value={clinicianStats.newReferrals} accent="orange" />
        <Stat label="High-risk cases" value={clinicianStats.highRisk} accent="destructive" />
        <Stat label="Follow-ups due" value={clinicianStats.followUps} accent="warning" />
        <Stat label="Conversion rate" value={`${clinicianStats.conversion}%`} accent="success" />
      </div>

      <SectionTitle title="Referral Queue" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Child</th>
                <th>Age</th>
                <th>Risk</th>
                <th>AI Insights</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {children.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40">
                  <td className="py-3">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.id} · {c.village}
                    </div>
                  </td>
                  <td>{c.ageMonths}mo</td>
                  <td>
                    <Badge tone={riskColor(c.risk)}>{riskLabel(c.risk)}</Badge>
                  </td>
                  <td className="max-w-xs">
                    <div className="truncate text-xs text-muted-foreground">{c.insights[0]}</div>
                  </td>
                  <td className="text-right">
                    <Link
                      to="/clinician/review/$id"
                      params={{ id: c.id }}
                      className="text-sm font-semibold text-orange"
                    >
                      Review →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
