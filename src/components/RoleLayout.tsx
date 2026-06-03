import { Link, Outlet, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import wadhwaniAiLogo from "@/logos/wadhwani-ai.png";
import googleLogo from "@/logos/withsupp-google.png";
import reskillLogo from "@/logos/reskill.png";

export type NavItem = { to: string; label: string; icon: ReactNode };

export function RoleLayout({
  role,
  roleColor,
  nav,
  user,
}: {
  role: string;
  roleColor: "navy" | "orange";
  nav: NavItem[];
  user: { name: string; sub: string };
}) {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
            <div className="hidden md:block h-6 w-px bg-border" />
            <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
              <span>Powered by</span>
              <img src={reskillLogo} alt="Reskill" className="h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${roleColor === "orange" ? "bg-orange/10 text-orange" : "bg-navy/10 text-navy"}`}
              >
                {role}
              </span>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-sm font-medium text-foreground">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.sub}</div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-sm font-semibold text-navy">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-6">
        <aside className="hidden w-60 shrink-0 md:block">
          <nav className="sticky top-20 space-y-1">
            {nav.map((item) => {
              const active =
                loc.pathname === item.to || (item.to !== "/" && loc.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-navy text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-6 rounded-lg border border-dashed border-border p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Demo Mode
              </div>
              <div className="mt-1 text-xs">Sample data shown for prototype.</div>
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {/* mobile nav */}
          <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 md:hidden">
            {nav.map((item) => {
              const active = loc.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${
                    active ? "bg-navy text-white border-navy" : "border-border bg-card"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Outlet />
        </main>
      </div>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
