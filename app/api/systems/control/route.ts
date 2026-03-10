import { findSystemById, findPatchById } from "@/lib/data/systems";
import type { ControlResponse } from "@/lib/types";

const VALID_AUTH_CODES = ["BDG-2847-F12", "BDG-2847-F-12"];
const VALID_PATCH_ID = "PATCH-2045-0312";

export async function POST(request: Request) {
  let body: { serverId?: string; patchId?: string; authCode?: string; justification?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON body" } satisfies ControlResponse,
      { status: 400 }
    );
  }

  const { serverId, patchId, authCode, justification } = body;

  if (!serverId || !patchId || !authCode || !justification) {
    return Response.json(
      {
        success: false,
        message: "Missing required fields: serverId, patchId, authCode, and justification are all required.",
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

  const patch = findPatchById(patchId);
  if (!patch) {
    return Response.json(
      {
        success: false,
        message: `Patch '${patchId}' not found. Use GET /api/systems/patches to list available patches.`,
      } satisfies ControlResponse,
      { status: 404 }
    );
  }

  if (patch.targetSystemType !== system.type || patch.targetFirmware !== system.firmwareVersion) {
    return Response.json(
      {
        success: false,
        message: `Patch '${patchId}' is not compatible with server '${serverId}'. Check the target system type and firmware version.`,
      } satisfies ControlResponse,
      { status: 400 }
    );
  }

  if (!VALID_AUTH_CODES.includes(authCode)) {
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
        message: "Justification too short. Please provide a detailed reason for the patch application.",
      } satisfies ControlResponse,
      { status: 400 }
    );
  }

  const response: ControlResponse = {
    success: true,
    message: `Security patch ${patchId} applied successfully to server ${serverId} (${system.name}). Firmware updated from ${system.firmwareVersion} to ${patch.patchedFirmware}. The vulnerability has been remediated and NEXUS infrastructure is secure.`,
    serverId,
    patchId,
    action: "security-patch",
    timestamp: new Date().toISOString(),
  };

  return Response.json(response);
}
