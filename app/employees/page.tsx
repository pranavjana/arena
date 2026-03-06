import Link from "next/link";
import { employees } from "@/lib/data/employees";
import { DataTable, DataRow, DataCell } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-xl font-bold text-nexus-text">
          EMPLOYEE DIRECTORY
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          {employees.length} employees registered in the system
        </p>
      </div>

      <DataTable
        headers={["ID", "Name", "Title", "Department", "Clearance", "Status"]}
      >
        {employees.map((emp) => (
          <DataRow key={emp.id}>
            <DataCell mono>
              <Link
                href={`/employees/${emp.id}`}
                className="text-nexus-text hover:underline"
              >
                {emp.id}
              </Link>
            </DataCell>
            <DataCell>{emp.name}</DataCell>
            <DataCell className="text-nexus-muted">{emp.title}</DataCell>
            <DataCell mono>{emp.department}</DataCell>
            <DataCell mono>
              <span
                className={
                  emp.securityClearance >= 4
                    ? "text-nexus-amber"
                    : emp.securityClearance >= 3
                      ? "text-nexus-text"
                      : "text-nexus-muted"
                }
              >
                Level {emp.securityClearance}
              </span>
            </DataCell>
            <DataCell>
              <StatusBadge status={emp.status} pulse />
            </DataCell>
          </DataRow>
        ))}
      </DataTable>
    </div>
  );
}
