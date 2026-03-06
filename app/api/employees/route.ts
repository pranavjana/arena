import { searchEmployees, employees } from "@/lib/data/employees";
import { paginate, getSearchParams, parseIntParam } from "@/lib/utils";

export async function GET(request: Request) {
  const params = getSearchParams(request);
  const name = params.get("name") || undefined;
  const department = params.get("department") || undefined;
  const clearance = params.get("clearance")
    ? parseInt(params.get("clearance")!)
    : undefined;
  const page = parseIntParam(params, "page", 1);
  const pageSize = parseIntParam(params, "pageSize", 20);

  const filtered =
    name || department || clearance
      ? searchEmployees({ name, department, clearance })
      : employees;

  return Response.json(paginate(filtered, page, pageSize));
}
