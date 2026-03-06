import { findEmployeeById } from "@/lib/data/employees";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const employee = findEmployeeById(id);

  if (!employee) {
    return Response.json({ error: "Employee not found" }, { status: 404 });
  }

  return Response.json(employee);
}
