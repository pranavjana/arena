import { getChallengeByRound } from "@/lib/data/challenges";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ round: string }> }
) {
  const { round } = await params;
  const roundNum = parseInt(round, 10);

  if (isNaN(roundNum) || roundNum < 1 || roundNum > 5) {
    return Response.json(
      { error: "Invalid round. Must be 1-5." },
      { status: 400 }
    );
  }

  const challenge = getChallengeByRound(roundNum);
  if (!challenge) {
    return Response.json({ error: "Challenge not found" }, { status: 404 });
  }

  return Response.json(challenge);
}
