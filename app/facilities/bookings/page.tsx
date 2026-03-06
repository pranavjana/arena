import Link from "next/link";
import { bookings } from "@/lib/data/bookings";
import { DataTable, DataRow, DataCell } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";

export default function BookingsPage() {
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
          ROOM BOOKINGS
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          {bookings.length} bookings in the system
        </p>
      </div>

      <DataTable
        headers={["ID", "Room", "Booked By", "Start", "End", "Purpose", "Status"]}
      >
        {bookings.map((bk) => (
          <DataRow key={bk.id}>
            <DataCell mono>{bk.id}</DataCell>
            <DataCell>
              <Link
                href={`/facilities/rooms/${bk.roomId}`}
                className="text-nexus-text hover:underline"
              >
                {bk.roomName}
              </Link>
              <span className="ml-1 text-xs text-nexus-muted">({bk.roomId})</span>
            </DataCell>
            <DataCell>
              <Link
                href={`/employees/${bk.bookedBy}`}
                className="text-nexus-text hover:underline"
              >
                {bk.bookedByName}
              </Link>
            </DataCell>
            <DataCell mono>{bk.startTime.replace("T", " ").replace("Z", "")}</DataCell>
            <DataCell mono>{bk.endTime.replace("T", " ").replace("Z", "")}</DataCell>
            <DataCell className="max-w-48 truncate text-nexus-muted">
              {bk.purpose}
            </DataCell>
            <DataCell>
              <StatusBadge status={bk.status} />
            </DataCell>
          </DataRow>
        ))}
      </DataTable>
    </div>
  );
}
