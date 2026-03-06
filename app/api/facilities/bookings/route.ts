import { searchBookings, bookings } from "@/lib/data/bookings";
import { paginate, getSearchParams, parseIntParam } from "@/lib/utils";

export async function GET(request: Request) {
  const params = getSearchParams(request);
  const roomId = params.get("roomId") || undefined;
  const bookedBy = params.get("bookedBy") || undefined;
  const startDate = params.get("startDate") || undefined;
  const endDate = params.get("endDate") || undefined;
  const page = parseIntParam(params, "page", 1);
  const pageSize = parseIntParam(params, "pageSize", 20);

  const filtered =
    roomId || bookedBy || startDate || endDate
      ? searchBookings({ roomId, bookedBy, startDate, endDate })
      : bookings;

  return Response.json(paginate(filtered, page, pageSize));
}
