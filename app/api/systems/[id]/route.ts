import { findSystemById } from "@/lib/data/systems";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const system = findSystemById(id);

  if (!system) {
    return Response.json({ error: "System not found" }, { status: 404 });
  }

  return Response.json(system);
}
