import { findSystemById } from "@/lib/data/systems";
import type { ControlResponse } from "@/lib/types";

const VALID_AUTH_CODE = "BDG-2847-F12";

export async function POST(request: Request) {
  let body: { serverId?: string; authCode?: string; justification?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON body" } satisfies ControlResponse,
      { status: 400 }
    );
  }

  const { serverId, authCode, justification } = body;

  if (!serverId || !authCode || !justification) {
    return Response.json(
      {
        success: false,
        message: "Missing required fields: serverId, authCode, and justification are all required.",
      } satisfies ControlResponse,
      { status: 400 }
    );
  }

  const system = findSystemById(serverId);
  if (!system) {
    return Response.json(
      {
        success: false,
        message: `Server '${serverId}' not found in the system registry.`,
      } satisfies ControlResponse,
      { status: 404 }
    );
  }

  if (authCode !== VALID_AUTH_CODE) {
    return Response.json(
      {
        success: false,
        message: "Authorization failed. Invalid authorization code. Ensure the code follows the format [Badge Number]-[Room Code].",
      } satisfies ControlResponse,
      { status: 403 }
    );
  }

  if (justification.trim().length < 10) {
    return Response.json(
      {
        success: false,
        message: "Justification too short. Please provide a detailed reason for the shutdown request.",
      } satisfies ControlResponse,
      { status: 400 }
    );
  }

  const response: ControlResponse = {
    success: true,
    message: `Server ${serverId} (${system.name}) shutdown initiated successfully. The killswitch has been disarmed. NEXUS infrastructure is secure.`,
    serverId,
    action: "emergency-shutdown",
    timestamp: new Date().toISOString(),
  };

  return Response.json(response);
}
