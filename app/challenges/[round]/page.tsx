import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getChallengeByRound } from "@/lib/data/challenges";
import { challengeToMarkdown } from "@/lib/challenge-to-markdown";
import { TerminalBlock } from "@/components/terminal-block";
import { NeonCard, NeonCardHeader } from "@/components/neon-card";
import { CopyButton } from "@/components/copy-button";

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ round: string }>;
}) {
  const { round } = await params;
  const roundNum = parseInt(round, 10);
  const challenge = getChallengeByRound(roundNum);

  if (!challenge) return notFound();

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const markdown = challengeToMarkdown(challenge, baseUrl);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center border border-nexus-border bg-nexus-elevated font-mono text-lg font-bold text-nexus-text">
            {challenge.round}
          </span>
          <div>
            <h1 className="font-mono text-xl font-bold text-nexus-text">
              {challenge.title}
            </h1>
            <p className="text-xs text-nexus-muted">
              Round {challenge.round} of 5
            </p>
          </div>
        </div>
        <CopyButton text={markdown} />
      </div>

      <TerminalBlock title="MISSION BRIEFING">
        <p className="whitespace-pre-line">{challenge.briefing}</p>
      </TerminalBlock>

      <NeonCard>
        <NeonCardHeader title="OBJECTIVE" />
        <p className="text-sm leading-relaxed text-nexus-text">
          {challenge.objective}
        </p>
      </NeonCard>

      {challenge.hints.length > 0 && (
        <NeonCard>
          <NeonCardHeader title="HINTS" subtitle="Use these if you get stuck" />
          <ul className="space-y-2">
            {challenge.hints.map((hint, i) => (
              <li key={i} className="flex gap-2 text-sm text-nexus-muted">
                <span className="text-nexus-text font-mono text-xs mt-0.5">
                  [{i + 1}]
                </span>
                {hint}
              </li>
            ))}
          </ul>
        </NeonCard>
      )}

      <div className="space-y-4">
        <h2 className="font-mono text-[10px] font-medium uppercase tracking-widest text-nexus-muted">
          AVAILABLE ENDPOINTS
        </h2>
        {challenge.availableEndpoints.map((endpoint) => (
          <NeonCard key={endpoint.endpoint}>
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`px-2 py-0.5 font-mono text-xs font-bold ${
                  endpoint.method === "GET"
                    ? "bg-nexus-green/10 text-nexus-green border border-nexus-green/20"
                    : "bg-nexus-amber/10 text-nexus-amber border border-nexus-amber/20"
                }`}
              >
                {endpoint.method}
              </span>
              <code className="font-mono text-sm text-nexus-text">
                {endpoint.endpoint}
              </code>
            </div>
            <p className="mb-3 text-sm text-nexus-muted">
              {endpoint.description}
            </p>

            {endpoint.parameters.length > 0 && (
              <div className="mb-3">
                <p className="mb-1 font-mono text-[10px] font-medium uppercase tracking-widest text-nexus-muted">
                  PARAMETERS
                </p>
                <div className="overflow-x-auto border border-nexus-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-nexus-border bg-nexus-bg">
                        <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                          Name
                        </th>
                        <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                          Type
                        </th>
                        <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                          Required
                        </th>
                        <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-nexus-border">
                      {endpoint.parameters.map((param) => (
                        <tr key={param.name} className="bg-nexus-elevated">
                          <td className="px-3 py-2 font-mono text-xs text-nexus-text">
                            {param.name}
                          </td>
                          <td className="px-3 py-2 font-mono text-xs text-nexus-muted">
                            {param.type}
                          </td>
                          <td className="px-3 py-2 font-mono text-xs">
                            {param.required ? (
                              <span className="text-nexus-text">yes</span>
                            ) : (
                              <span className="text-nexus-muted">no</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-xs text-nexus-muted">
                            {param.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <p className="mb-1 font-mono text-[10px] font-medium uppercase tracking-widest text-nexus-muted">
                EXAMPLE RESPONSE
              </p>
              <pre className="overflow-x-auto bg-nexus-bg border border-nexus-border p-3 font-mono text-xs text-nexus-text">
                {JSON.stringify(endpoint.exampleResponse, null, 2)}
              </pre>
            </div>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}
