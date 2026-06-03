import { createFileRoute } from "@tanstack/react-router";
import { Card, Badge, Button, SectionTitle } from "@/components/ui-prim";

export const Route = createFileRoute("/asha/followup")({
  component: Followup,
});

const rows = [
  {
    id: "C-1042",
    name: "Aarav Sharma",
    appt: "20 May 2026",
    status: "Scheduled",
    tone: "success" as const,
    action: "Confirm",
  },
  {
    id: "C-1044",
    name: "Rohan Verma",
    appt: "05 May 2026",
    status: "Missed",
    tone: "destructive" as const,
    action: "Reschedule",
  },
  {
    id: "C-1051",
    name: "Kavya Reddy",
    appt: "28 May 2026",
    status: "Pending",
    tone: "warning" as const,
    action: "Remind",
  },
  {
    id: "C-1058",
    name: "Aditya Singh",
    appt: "30 May 2026",
    status: "Scheduled",
    tone: "success" as const,
    action: "Confirm",
  },
];

function Followup() {
  return (
    <>
      <SectionTitle
        eyebrow="Field Follow-up"
        title="Referral Follow-up"
        desc="Track appointments, missed visits and reminders."
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Child</th>
                <th>Appointment</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="py-3">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.id}</div>
                  </td>
                  <td>{r.appt}</td>
                  <td>
                    <Badge tone={r.tone}>{r.status}</Badge>
                  </td>
                  <td className="text-right">
                    <Button variant="outline">{r.action}</Button>
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
