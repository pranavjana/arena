import Link from "next/link";
import { systems } from "@/lib/data/systems";
import { NeonCard } from "@/components/neon-card";
import { StatusBadge } from "@/components/status-badge";

export default function SystemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xl font-bold text-nexus-text">
            SYSTEMS DASHBOARD
          </h1>
          <p className="mt-1 text-sm text-nexus-muted">
            {systems.length} servers monitored
          </p>
        </div>
        <Link
          href="/systems/control"
          className="border border-nexus-red/20 px-3 py-1.5 font-mono text-xs text-nexus-red hover:bg-nexus-red/5 transition-colors"
        >
          CONTROL PANEL
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {systems.map((server) => (
          <Link
            key={server.id}
            href={`/systems/${server.id}`}
            className="group"
          >
            <NeonCard
              className={`h-full transition-colors group-hover:border-nexus-muted ${
                server.status === "critical" ? "border-nexus-red/30" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-nexus-text">
                  {server.id}
                </span>
                <StatusBadge status={server.status} pulse />
              </div>
              <h3 className="text-sm font-medium text-nexus-text">
                {server.name}
              </h3>
              <div className="mt-2 space-y-1 text-xs text-nexus-muted font-mono">
                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="text-nexus-text">{server.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span className="text-nexus-text">{server.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>IP</span>
                  <span className="text-nexus-text">{server.ipAddress}</span>
                </div>
              </div>
            </NeonCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
