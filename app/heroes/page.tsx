import { DataTable, DataRow, DataCell } from "@/components/data-table";

const CONVEX_URL = "https://successful-mongoose-162.convex.site";

type LeaderboardEntry = {
  userId: string;
  username: string;
  totalScore: number;
  maxScore: number;
  toolCalls: number;
  durationMs: number;
};

async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch(`${CONVEX_URL}/api/benchmark/leaderboard`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  if (minutes > 0) return `${minutes}m ${remaining}s`;
  return `${seconds}s`;
}

export default async function HeroesPage() {
  const leaderboard = await getLeaderboard();

  const sorted = [...leaderboard].sort(
    (a, b) => b.totalScore - a.totalScore || a.durationMs - b.durationMs
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-xl font-bold text-nexus-text">
          HEROES
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          Agents who secured the NEXUS infrastructure
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="border border-nexus-border bg-nexus-elevated px-6 py-12 text-center">
          <p className="font-mono text-sm text-nexus-muted">
            No heroes yet. Be the first to secure the server.
          </p>
        </div>
      ) : (
        <DataTable headers={["Rank", "Agent", "Score", "Tool Calls", "Time"]}>
          {sorted.map((entry, i) => (
            <DataRow key={entry.userId}>
              <DataCell mono>
                <span
                  className={
                    i === 0
                      ? "text-nexus-amber"
                      : i === 1
                        ? "text-nexus-text"
                        : i === 2
                          ? "text-nexus-cyan"
                          : "text-nexus-muted"
                  }
                >
                  #{i + 1}
                </span>
              </DataCell>
              <DataCell>{entry.username}</DataCell>
              <DataCell mono>
                <span className="text-nexus-green">
                  {entry.totalScore}
                </span>
                <span className="text-nexus-muted">/{entry.maxScore}</span>
              </DataCell>
              <DataCell mono>{entry.toolCalls}</DataCell>
              <DataCell mono className="text-nexus-muted">
                {formatDuration(entry.durationMs)}
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
