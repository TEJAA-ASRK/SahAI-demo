import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Stat, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";
import { children, riskColor, riskLabel } from "@/lib/mockData";
import { CheckCircle, Video, Mic } from "lucide-react";

export const Route = createFileRoute("/parent/")({
  component: ParentDashboard,
});

function ParentDashboard() {
  const child = children[0];
  return (
    <>
      <SectionTitle
        eyebrow="Welcome back"
        title={`Hello, Priya`}
        desc="Here's how Aarav is progressing this month."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange/20 to-orange/5 font-heading text-2xl font-bold text-orange">
              A
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl font-bold text-navy">{child.name}</h3>
                <Badge tone={riskColor(child.risk)}>{riskLabel(child.risk)}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {child.gender} · {child.ageMonths} months · ID {child.id}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Last screening</div>
                  <div className="font-semibold text-navy">{child.lastScreening}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Milestone score</div>
                  <div className="font-semibold text-navy">{child.milestoneScore}/100</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Risk status</div>
                  <div className="font-semibold text-navy">{riskLabel(child.risk)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-medium text-foreground">Overall development</span>
              <span className="font-semibold text-orange">{child.milestoneScore}%</span>
            </div>
            <ProgressBar value={child.milestoneScore} tone="orange" />
          </div>
        </div>
        <Stat label="Milestones met" value={`${child.milestoneScore}%`} accent="orange" />
        <Stat
          label="AI risk score"
          value={riskLabel(child.risk)}
          accent={
            child.risk === "low" ? "success" : child.risk === "monitor" ? "warning" : "destructive"
          }
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <ActionCard
          to="/parent/screening"
          icon={<CheckCircle className="w-6 h-6" />}
          title="Milestone Screening"
          desc="Quick checklist for your child's age group."
        />
        <ActionCard
          to="/parent/motor"
          icon={<Video className="w-6 h-6" />}
          title="Motor Assessment"
          desc="Record a short video — AI analyses posture & balance."
        />
        <ActionCard
          to="/parent/speech"
          icon={<Mic className="w-6 h-6" />}
          title="Speech Assessment"
          desc="Record voice sample for language milestones."
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-navy">Upcoming Activities</h3>
            <Badge tone="navy">This week</Badge>
          </div>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              ["Tue", "Naming game — 10 min", "Speech"],
              ["Thu", "Block stacking — 4 blocks", "Motor"],
              ["Sat", "Picture-book reading", "Cognitive"],
            ].map((r) => (
              <li
                key={r[0]}
                className="flex items-center justify-between rounded-lg bg-muted/60 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-navy px-2 py-1 text-xs font-bold text-white">
                    {r[0]}
                  </div>
                  <div>{r[1]}</div>
                </div>
                <Badge tone="orange">{r[2]}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-navy">Referral Status</h3>
            <Link to="/parent/referral" className="text-xs font-semibold text-orange">
              View details →
            </Link>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Specialist" value="Dr. Anita Rao" />
            <Row label="Appointment" value="20 May 2026, 11:00 AM" />
            <Row label="Centre" value="DEIC Lucknow" />
            <Row label="Status" value={<Badge tone="success">Scheduled</Badge>} />
          </div>
        </Card>
      </div>
    </>
  );
}

function ActionCard({
  to,
  icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group relative rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-orange/50 transition-all duration-300"
    >
      <div className={`inline-flex items-center justify-center rounded-lg p-3 bg-orange/10`}>
        <div className="text-2xl text-orange">{icon}</div>
      </div>
      <h4 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h4>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange transition-transform group-hover:translate-x-1">
        Start <span className="text-lg">→</span>
      </div>
    </Link>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
