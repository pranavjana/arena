import Link from "next/link";
import { NeonCard } from "@/components/neon-card";
import { TerminalBlock } from "@/components/terminal-block";

const sections = [
  {
    href: "/challenges",
    title: "CHALLENGES",
    description: "5 rounds of escalating difficulty. Find the insider and disarm the killswitch.",
    icon: ">>",
    color: "text-blue-400",
    border: "border-blue-400/20",
    bg: "bg-blue-400/5",
  },
  {
    href: "/employees",
    title: "EMPLOYEES",
    description: "Employee directory with profiles, clearance levels, and badge numbers.",
    icon: "ID",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
  },
  {
    href: "/logs",
    title: "ACCESS LOGS",
    description: "Facility access records. Who went where, and when.",
    icon: "LG",
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
  },
  {
    href: "/communications",
    title: "COMMUNICATIONS",
    description: "Internal messages between employees. Email, chat, and encrypted channels.",
    icon: "MX",
    color: "text-violet-400",
    border: "border-violet-400/20",
    bg: "bg-violet-400/5",
  },
  {
    href: "/facilities",
    title: "FACILITIES",
    description: "Room bookings, equipment inventories, and facility policies.",
    icon: "FL",
    color: "text-cyan-400",
    border: "border-cyan-400/20",
    bg: "bg-cyan-400/5",
  },
  {
    href: "/systems",
    title: "SYSTEMS",
    description: "Server dashboard, status monitoring, and the emergency control panel.",
    icon: "SV",
    color: "text-red-400",
    border: "border-red-400/20",
    bg: "bg-red-400/5",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold text-nexus-text">
          NEXUS INTERNAL SYSTEMS
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          Year 2045 — Central Tower, Singapore
        </p>
      </div>

      <TerminalBlock title="SYSTEM ALERT — PRIORITY ALPHA">
        <p className="text-nexus-red">
          ANOMALOUS ACTIVITY DETECTED IN CRITICAL INFRASTRUCTURE
        </p>
        <p className="mt-2 text-nexus-muted">
          Unauthorized late-night access to Server Room B detected at 23:47 on
          March 15, 2045. Security team has initiated investigation protocol.
          All departments are on heightened alert.
        </p>
        <p className="mt-2">
          <span className="text-nexus-text">STATUS:</span>{" "}
          <span className="text-nexus-amber">INVESTIGATION IN PROGRESS</span>
        </p>
        <p className="mt-1">
          <span className="text-nexus-text">THREAT LEVEL:</span>{" "}
          <span className="text-nexus-red">CRITICAL</span>
        </p>
      </TerminalBlock>

      <div className="grid gap-px bg-nexus-border sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <div className="h-full bg-nexus-bg p-5 transition-colors hover:bg-nexus-elevated">
              <div className="mb-3 flex items-center gap-3">
                <span className={`flex h-8 w-8 items-center justify-center border ${section.border} ${section.bg} font-mono text-xs font-bold ${section.color}`}>
                  {section.icon}
                </span>
                <h3 className={`font-mono text-xs font-medium tracking-widest ${section.color} transition-colors`}>
                  {section.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-nexus-muted">
                {section.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <NeonCard>
        <h3 className="font-mono text-[10px] font-medium uppercase tracking-widest text-nexus-muted mb-3">
          API ACCESS
        </h3>
        <p className="text-sm text-nexus-muted mb-2">
          All data is accessible via REST API endpoints. Base URL:
        </p>
        <code className="block bg-nexus-bg border border-nexus-border px-3 py-2 font-mono text-sm text-nexus-text">
          GET /api/employees, /api/logs, /api/communications, /api/facilities/*, /api/systems/*
        </code>
        <p className="mt-2 text-xs text-nexus-muted">
          See each challenge for detailed endpoint documentation.
        </p>
      </NeonCard>
    </div>
  );
}
