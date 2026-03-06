import { notFound } from "next/navigation";
import Link from "next/link";
import { findRoomById } from "@/lib/data/rooms";
import { NeonCard, NeonCardHeader } from "@/components/neon-card";
import { StatusBadge } from "@/components/status-badge";
import { DataTable, DataRow, DataCell } from "@/components/data-table";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = findRoomById(id);

  if (!room) return notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/facilities"
          className="font-mono text-xs text-nexus-muted hover:text-nexus-text"
        >
          &larr; Facilities
        </Link>
        <h1 className="mt-2 font-mono text-xl font-bold text-nexus-text">
          {room.name}
        </h1>
        <p className="mt-0.5 text-sm text-nexus-muted">Room {room.id}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <NeonCard>
          <NeonCardHeader title="ROOM INFO" />
          <dl className="space-y-3 text-sm">
            {[
              ["Room ID", room.id],
              ["Floor", room.floor],
              ["Building", room.building],
              ["Capacity", String(room.capacity)],
              ["Type", room.type],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-nexus-muted">{label}</dt>
                <dd className="font-mono text-xs text-nexus-text">{value}</dd>
              </div>
            ))}
            <div className="flex justify-between">
              <dt className="text-nexus-muted">Required Clearance</dt>
              <dd className={`font-mono text-xs font-bold ${room.requiredClearance >= 4 ? "text-nexus-amber" : "text-nexus-text"}`}>
                Level {room.requiredClearance}
              </dd>
            </div>
          </dl>
        </NeonCard>
      </div>

      <NeonCard>
        <NeonCardHeader title="EQUIPMENT" subtitle={`${room.equipment.length} items`} />
        <DataTable headers={["ID", "Name", "Type", "Serial", "Status"]}>
          {room.equipment.map((eq) => (
            <DataRow key={eq.id}>
              <DataCell mono>{eq.id}</DataCell>
              <DataCell>{eq.name}</DataCell>
              <DataCell mono>{eq.type}</DataCell>
              <DataCell mono className="text-nexus-muted">{eq.serialNumber}</DataCell>
              <DataCell>
                <StatusBadge status={eq.status} pulse />
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      </NeonCard>
    </div>
  );
}
