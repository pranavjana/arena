import { notFound } from "next/navigation";
import Link from "next/link";
import { findSystemById } from "@/lib/data/systems";
import { NeonCard, NeonCardHeader } from "@/components/neon-card";
import { StatusBadge } from "@/components/status-badge";
import { DataTable, DataRow, DataCell } from "@/components/data-table";

export default async function SystemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const system = findSystemById(id);

  if (!system) return notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/systems"
          className="font-mono text-xs text-nexus-muted hover:text-nexus-text"
        >
          &larr; Systems Dashboard
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="font-mono text-xl font-bold text-nexus-text">
            {system.id}
          </h1>
          <StatusBadge status={system.status} pulse />
        </div>
        <p className="mt-0.5 text-sm text-nexus-muted">{system.name}</p>
      </div>

      <NeonCard>
        <NeonCardHeader title="SERVER INFO" />
        <dl className="space-y-3 text-sm">
          {[
            ["Server ID", system.id],
            ["Name", system.name],
            ["Location", system.location],
            ["Type", system.type],
            ["IP Address", system.ipAddress],
            ["Last Maintenance", system.lastMaintenance],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <dt className="text-nexus-muted">{label}</dt>
              <dd className="font-mono text-xs text-nexus-text">{value}</dd>
            </div>
          ))}
        </dl>
      </NeonCard>

      <NeonCard>
        <NeonCardHeader
          title="ACCESS HISTORY"
          subtitle={`${system.accessHistory.length} recorded accesses`}
        />
        <DataTable headers={["Timestamp", "Employee", "Action"]}>
          {system.accessHistory.map((access, i) => (
            <DataRow key={i}>
              <DataCell mono>
                {access.timestamp.replace("T", " ").replace("Z", "")}
              </DataCell>
              <DataCell>
                <Link
                  href={`/employees/${access.employeeId}`}
                  className="text-nexus-text hover:underline"
                >
                  {access.employeeName}
                </Link>
                <span className="ml-1 text-xs text-nexus-muted">
                  ({access.employeeId})
                </span>
              </DataCell>
              <DataCell className="text-nexus-muted">{access.action}</DataCell>
            </DataRow>
          ))}
        </DataTable>
      </NeonCard>
    </div>
  );
}
