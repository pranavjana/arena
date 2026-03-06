import { accessLogs } from "@/lib/data/access-logs";
import { DataTable, DataRow, DataCell } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";

export default function LogsPage() {
  // Show most recent 100 entries
  const recentLogs = accessLogs.slice(-100).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-xl font-bold text-nexus-text">
          ACCESS LOGS
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          {accessLogs.length} total entries — showing most recent 100
        </p>
      </div>

      <DataTable
        headers={[
          "Timestamp",
          "Employee",
          "Location",
          "Type",
          "Method",
          "Status",
        ]}
      >
        {recentLogs.map((log) => (
          <DataRow key={log.id}>
            <DataCell mono>{log.timestamp.replace("T", " ").replace("Z", "")}</DataCell>
            <DataCell>
              <span className="text-nexus-text">{log.employeeName}</span>
              <span className="ml-1 text-xs text-nexus-muted">
                ({log.employeeId})
              </span>
            </DataCell>
            <DataCell>{log.location}</DataCell>
            <DataCell mono>{log.accessType}</DataCell>
            <DataCell mono>{log.method}</DataCell>
            <DataCell>
              <StatusBadge status={log.granted ? "granted" : "denied"} />
            </DataCell>
          </DataRow>
        ))}
      </DataTable>
    </div>
  );
}
