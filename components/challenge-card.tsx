import Link from "next/link";

export function ChallengeCard({
  round,
  title,
  briefing,
}: {
  round: number;
  title: string;
  briefing: string;
}) {
  return (
    <Link
      href={`/challenges/${round}`}
      className="group block border border-nexus-border bg-nexus-elevated p-5 transition-colors hover:border-nexus-muted"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center border border-nexus-border bg-nexus-bg font-mono text-sm font-bold text-nexus-text">
          {round}
        </span>
        <h3 className="font-mono text-sm font-medium text-nexus-text">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-nexus-muted line-clamp-2">
        {briefing}
      </p>
    </Link>
  );
}
