import type { ReactNode } from "react";

export function DataTable({
  headers,
  children,
  className = "",
}: {
  headers: string[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto border border-nexus-border ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-nexus-border bg-nexus-elevated">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-widest text-nexus-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-nexus-border">{children}</tbody>
      </table>
    </div>
  );
}

export function DataRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={`bg-nexus-bg transition-colors hover:bg-nexus-elevated ${className}`}>
      {children}
    </tr>
  );
}

export function DataCell({
  children,
  mono = false,
  className = "",
}: {
  children: ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 ${mono ? "font-mono text-xs" : "text-sm"} text-nexus-text ${className}`}>
      {children}
    </td>
  );
}
