import { policies } from "@/lib/data/policies";
import { getSearchParams } from "@/lib/utils";

export async function GET(request: Request) {
  const params = getSearchParams(request);
  const category = params.get("category") || undefined;

  let filtered = policies;
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  return Response.json({ data: filtered });
}
