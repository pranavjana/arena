import { notFound } from "next/navigation";
import Link from "next/link";
import { findEmployeeById } from "@/lib/data/employees";
import { NeonCard, NeonCardHeader } from "@/components/neon-card";
import { StatusBadge } from "@/components/status-badge";

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = findEmployeeById(id);

  if (!employee) return notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/employees"
          className="font-mono text-xs text-nexus-muted hover:text-nexus-text"
        >
          &larr; Employee Directory
        </Link>
        <h1 className="mt-2 font-mono text-xl font-bold text-nexus-text">
          {employee.name}
        </h1>
        <p className="mt-0.5 text-sm text-nexus-muted">{employee.title}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <NeonCard>
          <NeonCardHeader title="PROFILE" />
          <dl className="space-y-3 text-sm">
            {[
              ["Employee ID", employee.id],
              ["Department", employee.department],
              ["Email", employee.email],
              ["Phone", employee.phone],
              ["Hire Date", employee.hireDate],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-nexus-muted">{label}</dt>
                <dd className="font-mono text-xs text-nexus-text">{value}</dd>
              </div>
            ))}
            <div className="flex justify-between">
              <dt className="text-nexus-muted">Status</dt>
              <dd>
                <StatusBadge status={employee.status} pulse />
              </dd>
            </div>
          </dl>
        </NeonCard>

        <NeonCard>
          <NeonCardHeader title="SECURITY" />
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-nexus-muted">Security Clearance</dt>
              <dd
                className={`font-mono text-sm font-bold ${
                  employee.securityClearance >= 4
                    ? "text-nexus-amber"
                    : employee.securityClearance >= 3
                      ? "text-nexus-text"
                      : "text-nexus-muted"
                }`}
              >
                Level {employee.securityClearance}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-nexus-muted">Badge Number</dt>
              <dd className="font-mono text-sm font-bold text-nexus-text">
                {employee.badgeNumber}
              </dd>
            </div>
            {employee.supervisorId && (
              <div className="flex justify-between">
                <dt className="text-nexus-muted">Supervisor</dt>
                <dd>
                  <Link
                    href={`/employees/${employee.supervisorId}`}
                    className="font-mono text-xs text-nexus-text hover:underline"
                  >
                    {employee.supervisorId}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </NeonCard>
      </div>

      <NeonCard>
        <NeonCardHeader title="SKILLS" />
        <div className="flex flex-wrap gap-2">
          {employee.skills.map((skill) => (
            <span
              key={skill}
              className="border border-nexus-border bg-nexus-bg px-2.5 py-1 font-mono text-xs text-nexus-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
