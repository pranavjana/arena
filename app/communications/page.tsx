import { communications } from "@/lib/data/communications";
import { NeonCard } from "@/components/neon-card";
import { StatusBadge } from "@/components/status-badge";

export default function CommunicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-xl font-bold text-nexus-text">
          COMMUNICATIONS
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          {communications.length} messages in the system
        </p>
      </div>

      <div className="space-y-3">
        {communications.map((msg) => (
          <NeonCard key={msg.id}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={msg.channel} />
                  <span className="font-mono text-xs text-nexus-muted">
                    {msg.id}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-nexus-text truncate">
                  {msg.subject}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-nexus-muted">
                  <span>
                    <span className="text-nexus-text">{msg.senderName}</span>
                    <span className="mx-1">&rarr;</span>
                    <span className="text-nexus-text">{msg.recipientName}</span>
                  </span>
                  <span className="text-nexus-border">|</span>
                  <span className="font-mono">
                    {msg.timestamp.replace("T", " ").replace("Z", "")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-nexus-muted leading-relaxed line-clamp-3">
                  {msg.body}
                </p>
              </div>
            </div>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}
