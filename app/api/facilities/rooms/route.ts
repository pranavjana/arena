import { rooms } from "@/lib/data/rooms";
import { getSearchParams } from "@/lib/utils";

export async function GET(request: Request) {
  const params = getSearchParams(request);
  const type = params.get("type") || undefined;
  const floor = params.get("floor") || undefined;
  const building = params.get("building") || undefined;

  let filtered = rooms;

  if (type) filtered = filtered.filter((r) => r.type === type);
  if (floor) filtered = filtered.filter((r) => r.floor === floor);
  if (building) filtered = filtered.filter((r) => r.building.toLowerCase().includes(building.toLowerCase()));

  return Response.json({ data: filtered });
}
