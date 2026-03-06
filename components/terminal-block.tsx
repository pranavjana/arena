import type { ReactNode } from "react";

export function TerminalBlock({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border border-nexus-border bg-nexus-elevated ${className}`}
    >
      {title && (
        <div className="border-b border-nexus-border px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
            {title}
          </span>
        </div>
      )}
      <div className="p-4 font-mono text-sm leading-relaxed text-nexus-text">
        {children}
      </div>
    </div>
  );
}
