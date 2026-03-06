import { searchCommunications, communications } from "@/lib/data/communications";
import { paginate, getSearchParams, parseIntParam } from "@/lib/utils";

export async function GET(request: Request) {
  const params = getSearchParams(request);
  const senderId = params.get("senderId") || undefined;
  const recipientId = params.get("recipientId") || undefined;
  const channel = params.get("channel") || undefined;
  const search = params.get("search") || undefined;
  const startDate = params.get("startDate") || undefined;
  const endDate = params.get("endDate") || undefined;
  const page = parseIntParam(params, "page", 1);
  const pageSize = parseIntParam(params, "pageSize", 20);

  const filtered =
    senderId || recipientId || channel || search || startDate || endDate
      ? searchCommunications({ senderId, recipientId, channel, search, startDate, endDate })
      : communications;

  return Response.json(paginate(filtered, page, pageSize));
}
