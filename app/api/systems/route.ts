import { systems } from "@/lib/data/systems";
import { getSearchParams } from "@/lib/utils";

export async function GET(request: Request) {
  const params = getSearchParams(request);
  const status = params.get("status") || undefined;
  const type = params.get("type") || undefined;
  const location = params.get("location") || undefined;

  let filtered = systems;

  if (status) filtered = filtered.filter((s) => s.status === status);
  if (type) filtered = filtered.filter((s) => s.type === type);
  if (location) filtered = filtered.filter((s) => s.location === location);

  // Return without access history in list view for brevity
  const summary = filtered.map(({ accessHistory: _, ...rest }) => rest);

  return Response.json({ data: summary });
}
