import sahaiLogo from "@/logos/sahai.png";

export function Logo({ className = "" }: { className?: string }) {
  return <img src={sahaiLogo} alt="SahAI" className={`h-10 ${className}`} />;
}
