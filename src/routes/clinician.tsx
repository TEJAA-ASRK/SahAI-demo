import { createFileRoute } from "@tanstack/react-router";
import { RoleLayout } from "@/components/RoleLayout";
import { Home, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/clinician")({
  component: () => (
    <RoleLayout
      role="Clinician"
      roleColor="navy"
      user={{ name: "Dr. Anita Rao", sub: "Pediatric Neurology · DEIC Lucknow" }}
      nav={[
        { to: "/clinician", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
        {
          to: "/clinician/analytics",
          label: "Analytics",
          icon: <TrendingUp className="w-5 h-5" />,
        },
      ]}
    />
  ),
});
