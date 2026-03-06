const variants = {
  online: "border-nexus-green/20 text-nexus-green",
  offline: "border-nexus-red/20 text-nexus-red",
  maintenance: "border-nexus-amber/20 text-nexus-amber",
  critical: "border-nexus-red/20 text-nexus-red",
  active: "border-nexus-green/20 text-nexus-green",
  "on-leave": "border-nexus-amber/20 text-nexus-amber",
  terminated: "border-nexus-red/20 text-nexus-red",
  confirmed: "border-nexus-text/20 text-nexus-text",
  cancelled: "border-nexus-red/20 text-nexus-red",
  completed: "border-nexus-muted/20 text-nexus-muted",
  operational: "border-nexus-green/20 text-nexus-green",
  granted: "border-nexus-green/20 text-nexus-green",
  denied: "border-nexus-red/20 text-nexus-red",
  encrypted: "border-nexus-purple/20 text-nexus-purple",
  email: "border-nexus-muted/20 text-nexus-muted",
  "internal-chat": "border-nexus-muted/20 text-nexus-muted",
} as const;

type Variant = keyof typeof variants;

export function StatusBadge({
  status,
  pulse = false,
}: {
  status: string;
  pulse?: boolean;
}) {
  const variant = variants[status as Variant] || variants.active;

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase ${variant}`}
    >
      {pulse && (
        <span
          className={`h-1 w-1 animate-pulse-glow ${
            status === "online" || status === "active" || status === "granted" || status === "operational"
              ? "bg-nexus-green"
              : status === "offline" || status === "critical" || status === "denied" || status === "terminated"
                ? "bg-nexus-red"
                : "bg-nexus-amber"
          }`}
        />
      )}
      {status}
    </span>
  );
}
