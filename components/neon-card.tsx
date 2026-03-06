import type { ReactNode } from "react";

export function NeonCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`border border-nexus-border bg-nexus-elevated p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function NeonCardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-nexus-muted">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-nexus-muted/60">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
