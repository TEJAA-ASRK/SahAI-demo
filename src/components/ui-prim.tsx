import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-soft p-5 ${className}`}>{children}</div>;
}

export function Stat({
  label,
  value,
  hint,
  accent = "navy",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  accent?: "navy" | "orange" | "success" | "warning" | "destructive";
}) {
  const ring = {
    navy: "text-navy",
    orange: "text-orange",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
  }[accent];
  return (
    <Card>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 font-heading text-3xl font-bold ${ring}`}>{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

export function Badge({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "orange" | "success" | "warning" | "destructive" | "muted";
}) {
  const cls = {
    navy: "bg-navy/10 text-navy",
    orange: "bg-orange/10 text-orange",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-[oklch(0.45_0.13_70)]",
    destructive: "bg-destructive/10 text-destructive",
    muted: "bg-muted text-muted-foreground",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  as: As,
  to,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "orange" | "outline";
  className?: string;
  type?: "button" | "submit";
  as?: React.ElementType;
  to?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50";
  const v = {
    primary: "bg-navy text-white hover:opacity-90",
    orange: "bg-orange text-white hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
    outline: "border border-border bg-card hover:bg-muted",
    ghost: "hover:bg-muted",
  }[variant];
  const cls = `${base} ${v} ${className}`;
  if (As)
    return (
      <As to={to} className={cls}>
        {children}
      </As>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-wider text-orange">{eyebrow}</div>
      )}
      <h1 className="font-heading text-2xl font-bold text-navy md:text-3xl">{title}</h1>
      {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "navy",
}: {
  value: number;
  tone?: "navy" | "orange" | "success" | "warning" | "destructive";
}) {
  const bg = {
    navy: "bg-navy",
    orange: "bg-orange",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  }[tone];
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={`h-full rounded-full ${bg}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
