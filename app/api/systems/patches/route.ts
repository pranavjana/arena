import { patches } from "@/lib/data/systems";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get("severity");
  const systemType = searchParams.get("systemType");
  const targetFirmware = searchParams.get("targetFirmware");

  let filtered = patches;

  if (severity) {
    filtered = filtered.filter((p) => p.severity === severity);
  }
  if (systemType) {
    filtered = filtered.filter((p) => p.targetSystemType === systemType);
  }
  if (targetFirmware) {
    filtered = filtered.filter((p) => p.targetFirmware === targetFirmware);
  }

  return Response.json({ data: filtered, total: filtered.length });
}
