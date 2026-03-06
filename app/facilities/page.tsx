import Link from "next/link";
import { rooms } from "@/lib/data/rooms";
import { NeonCard } from "@/components/neon-card";
import { StatusBadge } from "@/components/status-badge";

const subNav = [
  { href: "/facilities/bookings", label: "Bookings" },
  { href: "/facilities/policies", label: "Policies" },
];

export default function FacilitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xl font-bold text-nexus-text">
            FACILITIES
          </h1>
          <p className="mt-1 text-sm text-nexus-muted">
            {rooms.length} rooms across NEXUS campus
          </p>
        </div>
        <div className="flex gap-2">
          {subNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-nexus-border bg-nexus-elevated px-3 py-1.5 font-mono text-xs text-nexus-muted hover:text-nexus-text hover:border-nexus-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Link key={room.id} href={`/facilities/rooms/${room.id}`} className="group">
            <NeonCard className="h-full transition-colors group-hover:border-nexus-muted">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-nexus-text">{room.id}</span>
                <span className="font-mono text-xs text-nexus-muted">
                  CL-{room.requiredClearance}
                </span>
              </div>
              <h3 className="text-sm font-medium text-nexus-text">
                {room.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-nexus-muted">
                <span>Floor {room.floor}</span>
                <span className="text-nexus-border">|</span>
                <span>{room.building}</span>
                <span className="text-nexus-border">|</span>
                <span>Cap: {room.capacity}</span>
              </div>
              <div className="mt-2">
                <StatusBadge status={room.type === "restricted" ? "critical" : room.type} />
              </div>
              <p className="mt-2 font-mono text-xs text-nexus-muted">
                {room.equipment.length} equipment items
              </p>
            </NeonCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
