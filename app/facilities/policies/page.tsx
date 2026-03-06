import Link from "next/link";
import { policies } from "@/lib/data/policies";
import { NeonCard, NeonCardHeader } from "@/components/neon-card";
import { StatusBadge } from "@/components/status-badge";

export default function PoliciesPage() {
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
          FACILITY POLICIES
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          {policies.length} active policies
        </p>
      </div>

      <div className="space-y-4">
        {policies.map((policy) => (
          <NeonCard key={policy.id}>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-nexus-muted">{policy.id}</span>
              <StatusBadge status={policy.category} />
            </div>
            <NeonCardHeader
              title={policy.title}
              subtitle={`Effective: ${policy.effectiveDate} | Updated: ${policy.lastUpdated}`}
            />
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-nexus-muted">
              {policy.content}
            </pre>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}
