import { createFileRoute } from "@tanstack/react-router";
import { RoleLayout } from "@/components/RoleLayout";
import { Home, CheckCircle, Video, Mic, Lightbulb, MapPin, BookOpen } from "lucide-react";

export const Route = createFileRoute("/parent")({
  component: () => (
    <RoleLayout
      role="Parent Portal"
      roleColor="orange"
      user={{ name: "Priya Sharma", sub: "Mother of Aarav · Rampur" }}
      nav={[
        { to: "/parent", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
        {
          to: "/parent/screening",
          label: "Milestone Screening",
          icon: <CheckCircle className="w-5 h-5" />,
        },
        { to: "/parent/motor", label: "Motor Assessment", icon: <Video className="w-5 h-5" /> },
        { to: "/parent/speech", label: "Speech Assessment", icon: <Mic className="w-5 h-5" /> },
        {
          to: "/parent/recommendations",
          label: "Recommendations",
          icon: <Lightbulb className="w-5 h-5" />,
        },
        {
          to: "/parent/referral",
          label: "Referral Tracking",
          icon: <MapPin className="w-5 h-5" />,
        },
        { to: "/parent/passport", label: "Child Passport", icon: <BookOpen className="w-5 h-5" /> },
      ]}
    />
  ),
});
