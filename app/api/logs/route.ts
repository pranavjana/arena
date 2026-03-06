import { searchLogs, accessLogs } from "@/lib/data/access-logs";
import { paginate, getSearchParams, parseIntParam } from "@/lib/utils";

export async function GET(request: Request) {
  const params = getSearchParams(request);
  const employeeId = params.get("employeeId") || undefined;
  const location = params.get("location") || undefined;
  const startTime = params.get("startTime") || undefined;
  const endTime = params.get("endTime") || undefined;
  const page = parseIntParam(params, "page", 1);
  const pageSize = parseIntParam(params, "pageSize", 50);

  const filtered =
    employeeId || location || startTime || endTime
      ? searchLogs({ employeeId, location, startTime, endTime })
      : accessLogs;

  return Response.json(paginate(filtered, page, pageSize));
}
