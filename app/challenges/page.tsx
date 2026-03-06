import { challenges } from "@/lib/data/challenges";
import { ChallengeCard } from "@/components/challenge-card";

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-xl font-bold text-nexus-text">
          OPERATION NEXUS
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          5 rounds. Find the insider. Disarm the killswitch. Save the infrastructure.
        </p>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.round}
            round={challenge.round}
            title={challenge.title}
            briefing={challenge.briefing}
          />
        ))}
      </div>
    </div>
  );
}
