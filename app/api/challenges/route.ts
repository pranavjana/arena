import { challenges } from "@/lib/data/challenges";

export async function GET() {
  const summary = challenges.map(({ availableEndpoints: _, hints: __, ...rest }) => rest);
  return Response.json({ data: summary });
}
