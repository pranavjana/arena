import { findRoomById } from "@/lib/data/rooms";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const room = findRoomById(id);

  if (!room) {
    return Response.json({ error: "Room not found" }, { status: 404 });
  }

  return Response.json(room);
}
