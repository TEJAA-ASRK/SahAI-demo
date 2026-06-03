import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui-prim";
import { Users, Stethoscope, UserCog } from "lucide-react";
import wadhwaniAiLogo from "@/logos/wadhwani-ai.png";
import googleLogo from "@/logos/withsupp-google.png";
import reskillLogo from "@/logos/reskill.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SahAI — Early Identification & Referral for Children 0–6" },
      {
        name: "description",
        content:
          "AI-powered platform identifying developmental delays in children aged 0–6 and connecting families to timely interventions.",
      },
    ],
  }),
  component: Landing,
});

const roles = [
  {
    to: "/parent",
    title: "Parent / Caregiver",
    desc: "Track milestones, run AI screenings and follow up on referrals for your child.",
    tone: "orange" as const,
    icon: <Users className="w-6 h-6" />,
  },
  {
    to: "/asha",
    title: "ASHA / Anganwadi Worker",
    desc: "Screen children in the community, generate referrals and follow up — even offline.",
    tone: "navy" as const,
    icon: <Stethoscope className="w-6 h-6" />,
  },
  {
    to: "/clinician",
    title: "Clinician",
    desc: "Review AI-assisted referrals, make clinical decisions and track outcomes.",
    tone: "navy" as const,
    icon: <UserCog className="w-6 h-6" />,
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 border-b border-border bg-card/95 backdrop-blur z-40 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="hidden md:block h-6 w-px bg-border" />
            <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Powered by</span>
              <img src={reskillLogo} alt="Reskill" className="h-4" />
            </div>
          </div>
          <a
            href="#roles"
            className="rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted/50 transition-colors"
          >
            Explore Roles
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 top-10 hidden h-64 w-64 rotate-12 accent-stripes opacity-30 md:block" />
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="mb-2">
                <span className="text-xs font-semibold text-orange">Team: Second Thoughts</span>
              </div>
              <Badge tone="orange">Hackathon 2026 · Empower · Educate · Elevate</Badge>
              <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                Early identification. <span className="text-orange">Timely intervention.</span>{" "}
                Every child.
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                SahAI is an AI-powered early identification & referral platform for developmental
                delays in children aged 0–6. From milestone screening to vision & speech AI — and on
                to the right specialist — in one connected pathway.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/parent"
                  className="rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                >
                  Try the Prototype →
                </Link>
                <a
                  href="#roles"
                  className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
                >
                  Learn More
                </a>
              </div>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                {[
                  { v: "184", l: "Children Screened" },
                  { v: "9", l: "High-risk Identified" },
                  { v: "72%", l: "Referral Conversion" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-heading text-2xl font-bold text-navy">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="card-soft p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Care Pathway
                    </div>
                    <div className="font-heading text-lg font-bold text-navy">
                      Screen → AI Assess → Refer → Follow-up
                    </div>
                  </div>
                  <Badge tone="success">Live Demo</Badge>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    ["Milestone Screening", "Age 0–6 checklists in local context"],
                    ["Vision AI", "Pose & motor coordination analysis"],
                    ["Speech AI", "Voice-based language milestone scoring"],
                    ["Risk Engine", "Explainable Low / Monitor / Refer output"],
                    ["Smart Referral", "DEIC, NGO, specialist by location & scheme"],
                  ].map((row, i) => (
                    <div
                      key={row[0]}
                      className="flex items-center gap-3 rounded-lg bg-muted/60 p-3"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{row[0]}</div>
                        <div className="text-xs text-muted-foreground">{row[1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="roles" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10">
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
            Choose your portal
          </h2>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">
            Three connected experiences across the early-intervention pathway. Select your role to
            explore the platform.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group relative rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-orange/50 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center rounded-lg p-3 ${r.tone === "orange" ? "bg-orange/10" : "bg-navy/10"}`}
              >
                <div className={`text-2xl ${r.tone === "orange" ? "text-orange" : "text-navy"}`}>
                  {r.icon}
                </div>
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-navy">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              <div
                className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-transform group-hover:translate-x-1 ${r.tone === "orange" ? "text-orange" : "text-navy"}`}
              >
                Enter portal <span className="text-lg">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-gradient-to-b from-background to-muted/30 py-8 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="text-sm font-medium text-foreground">Made with care for</span>
            <img src={wadhwaniAiLogo} alt="Wadhwani AI" className="h-5" />
            <span className="text-muted-foreground">·</span>
            <img src={googleLogo} alt="with support from Google.org" className="h-5" />
            <span className="text-muted-foreground">·</span>
            <span className="text-sm">Powered by</span>
            <img src={reskillLogo} alt="Reskill" className="h-5" />
          </div>
          <div className="mt-6 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>SahAI Prototype · For Shiksha · Hackathon 2026</p>
            <p className="mt-2">
              AI-powered early identification & referral platform for children 0–6
            </p>
            <p className="mt-3 font-medium text-foreground">Team: Second Thoughts</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
