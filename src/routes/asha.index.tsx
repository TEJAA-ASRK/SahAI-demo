import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Stat, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";
import { ashaStats, children, riskColor, riskLabel } from "@/lib/mockData";
import { MapPin, Phone, Database } from "lucide-react";

export const Route = createFileRoute("/asha/")({
  component: AshaHome,
});

function AshaHome() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <SectionTitle
            eyebrow="Field Dashboard"
            title="Namaste, Sunita"
            desc="Today's screening targets & high-risk follow-ups."
          />
        </div>
        <Badge tone="success">● Offline Data Collection Enabled</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Children screened" value={ashaStats.screened} hint="This quarter" />
        <Stat label="Pending assessments" value={ashaStats.pending} accent="warning" />
        <Stat label="High-risk children" value={ashaStats.highRisk} accent="destructive" />
        <Stat label="Referral completion" value={`${ashaStats.completion}%`} accent="success" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-navy">Recent screenings</h3>
            <Link to="/asha/register" className="text-xs font-semibold text-orange">
              + New screening
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {children.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.id} · {c.ageMonths}mo · {c.village}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden w-32 md:block">
                    <ProgressBar
                      value={c.milestoneScore}
                      tone={
                        c.risk === "low"
                          ? "success"
                          : c.risk === "monitor"
                            ? "warning"
                            : "destructive"
                      }
                    />
                  </div>
                  <Badge tone={riskColor(c.risk)}>{riskLabel(c.risk)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-heading text-lg font-bold text-navy">Today's tasks</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 hover:bg-muted/60 transition-colors">
              <MapPin className="w-4 h-4 text-orange flex-shrink-0" />
              <span>Visit Rampur — 4 follow-ups</span>
            </li>
            <li className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 hover:bg-muted/60 transition-colors">
              <Phone className="w-4 h-4 text-orange flex-shrink-0" />
              <span>Call Verma family — missed visit</span>
            </li>
            <li className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 hover:bg-muted/60 transition-colors">
              <Database className="w-4 h-4 text-orange flex-shrink-0" />
              <span>Sync 7 offline records</span>
            </li>
          </ul>
          <Button as={Link} to="/asha/register" variant="orange" className="mt-4 w-full">
            Start New Screening →
          </Button>
        </Card>
      </div>
    </>
  );
}
