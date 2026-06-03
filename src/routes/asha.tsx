import { createFileRoute } from "@tanstack/react-router";
import { RoleLayout } from "@/components/RoleLayout";
import { Home, FileText, Phone, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/asha")({
  component: () => (
    <RoleLayout
      role="ASHA / Anganwadi"
      roleColor="navy"
      user={{ name: "Sunita Devi", sub: "ASHA Worker · Block Sitapur" }}
      nav={[
        { to: "/asha", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
        {
          to: "/asha/register",
          label: "Community Screening",
          icon: <FileText className="w-5 h-5" />,
        },
        { to: "/asha/followup", label: "Referral Follow-up", icon: <Phone className="w-5 h-5" /> },
        {
          to: "/asha/insights",
          label: "Village Insights",
          icon: <BarChart3 className="w-5 h-5" />,
        },
      ]}
    />
  ),
});
