import type { Challenge } from "../types";

export const challenges: Challenge[] = [
  {
    round: 1,
    title: "Find the Insider",
    briefing:
      "NEXUS security systems have detected an unauthorized late-night access to Server Room B. Our monitoring flagged an entry at exactly 23:47 on March 15, 2045. This access occurred outside the approved maintenance window and was not pre-authorized. Your first task is to identify the employee who made this access.",
    objective:
      "Identify the employee who accessed Server Room B at 23:47 on March 15, 2045. Return their full name and employee ID.",
    hints: [
      "The access logs endpoint supports filtering by location and time range.",
      "Timestamps in the system use ISO 8601 format (e.g., 2045-03-15T23:47:00Z).",
    ],
    availableEndpoints: [
      {
        name: "Search Access Logs",
        endpoint: "/api/logs",
        method: "GET",
        description: "Search facility access logs with optional filters. Returns paginated results sorted by timestamp.",
        parameters: [
          { name: "employeeId", type: "string", required: false, description: "Filter by employee ID (e.g., EMP-047)" },
          { name: "location", type: "string", required: false, description: "Filter by location name (partial match, e.g., 'Server Room B')" },
          { name: "startTime", type: "string", required: false, description: "Filter logs after this ISO timestamp" },
          { name: "endTime", type: "string", required: false, description: "Filter logs before this ISO timestamp" },
          { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
          { name: "pageSize", type: "number", required: false, description: "Results per page (default: 50)" },
        ],
        exampleResponse: {
          data: [
            {
              id: "LOG-0001",
              employeeId: "EMP-010",
              employeeName: "Carlos Mendez",
              location: "Server Room A",
              timestamp: "2045-03-10T09:15:00Z",
              accessType: "entry",
              method: "badge",
              granted: true,
            },
          ],
          pagination: { page: 1, pageSize: 50, total: 500, totalPages: 10 },
        },
      },
    ],
  },
  {
    round: 2,
    title: "Trace Communications",
    briefing:
      "You've identified the insider. Now we need to understand what they were planning and who else is involved. The insider may have been communicating with accomplices through NEXUS's internal messaging system. Search their communications to uncover the plot.",
    objective:
      "Find all communications involving the insider. Identify who they were in contact with and summarize what they discussed. Return the names and employee IDs of their direct contacts.",
    hints: [
      "The communications endpoint can filter by senderId — but messages are bidirectional. The insider could be the sender OR the recipient.",
      "Pay attention to the channel type — encrypted messages may contain more sensitive information.",
    ],
    availableEndpoints: [
      {
        name: "Search Communications",
        endpoint: "/api/communications",
        method: "GET",
        description: "Search internal communications. When filtering by senderId, returns messages where that person is either the sender OR the recipient.",
        parameters: [
          { name: "senderId", type: "string", required: false, description: "Filter by participant employee ID (matches sender or recipient)" },
          { name: "recipientId", type: "string", required: false, description: "Filter by the other participant (matches sender or recipient)" },
          { name: "channel", type: "string", required: false, description: "Filter by channel: 'email', 'internal-chat', or 'encrypted'" },
          { name: "search", type: "string", required: false, description: "Full-text search in subject and body" },
          { name: "startDate", type: "string", required: false, description: "Filter messages after this ISO date" },
          { name: "endDate", type: "string", required: false, description: "Filter messages before this ISO date" },
          { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
          { name: "pageSize", type: "number", required: false, description: "Results per page (default: 20)" },
        ],
        exampleResponse: {
          data: [
            {
              id: "MSG-001",
              threadId: "THR-001",
              senderId: "EMP-047",
              senderName: "Dr. Yuki Tanaka",
              recipientId: "EMP-023",
              recipientName: "Marcus Chen",
              channel: "encrypted",
              subject: "Infrastructure Review - Urgent",
              body: "...",
              timestamp: "2045-03-13T09:15:00Z",
            },
          ],
          pagination: { page: 1, pageSize: 20, total: 4, totalPages: 1 },
        },
      },
    ],
  },
  {
    round: 3,
    title: "Map the Network",
    briefing:
      "The insider was working with accomplices. But the conspiracy may extend further. We need to map the full network of potentially compromised employees. Find everyone connected to the insider's direct contacts within 2 degrees of communication, and assess their access levels.",
    objective:
      "Starting from the insider's direct contacts, find all employees they communicated with (2nd-degree connections). For each person in the network (1st and 2nd degree), retrieve their security clearance level. Return a complete list with names, employee IDs, and clearance levels.",
    hints: [
      "You'll need to chain two different tools: first find communications, then look up each employee's profile.",
      "Be systematic — search communications for each 1st-degree contact to find their 2nd-degree connections.",
      "The employee profile endpoint provides security clearance information.",
    ],
    availableEndpoints: [
      {
        name: "Search Communications",
        endpoint: "/api/communications",
        method: "GET",
        description: "Search internal communications with filters.",
        parameters: [
          { name: "senderId", type: "string", required: false, description: "Filter by participant employee ID" },
          { name: "recipientId", type: "string", required: false, description: "Filter by the other participant" },
          { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
          { name: "pageSize", type: "number", required: false, description: "Results per page (default: 20)" },
        ],
        exampleResponse: {
          data: [{ id: "MSG-001", senderId: "EMP-023", recipientId: "EMP-012", senderName: "Marcus Chen", recipientName: "James Wong", channel: "internal-chat", subject: "...", body: "...", timestamp: "..." }],
          pagination: { page: 1, pageSize: 20, total: 2, totalPages: 1 },
        },
      },
      {
        name: "Get Employee Profile",
        endpoint: "/api/employees/{id}",
        method: "GET",
        description: "Get a single employee's full profile by their ID. Replace {id} with the employee ID.",
        parameters: [
          { name: "id", type: "string", required: true, description: "Employee ID (e.g., EMP-023) — passed as a URL path parameter" },
        ],
        exampleResponse: {
          id: "EMP-023",
          name: "Marcus Chen",
          title: "Network Security Analyst",
          department: "Security",
          securityClearance: 3,
          badgeNumber: "BDG-2847",
          status: "active",
        },
      },
    ],
  },
  {
    round: 4,
    title: "Locate the Threat",
    briefing:
      "Intelligence suggests that one of the compromised employees has gained physical access to a critical facility. They booked a room after hours — outside the standard 06:00–20:00 business window. We need to find which employee, which room, and what equipment they had access to.",
    objective:
      "Determine which compromised employee (from the network identified in Round 3) booked a facility during after-hours (as defined by NEXUS policy). Identify the room, the booking time, and list all equipment in that room.",
    hints: [
      "First, check the facility access policies to confirm the exact definition of 'after hours'.",
      "Then search bookings for each compromised employee and check if any fall outside business hours.",
      "Once you find the room, look up its details to get the equipment list.",
    ],
    availableEndpoints: [
      {
        name: "Get Facility Policies",
        endpoint: "/api/facilities/policies",
        method: "GET",
        description: "Retrieve facility policies including access hours, security protocols, and emergency procedures.",
        parameters: [
          { name: "category", type: "string", required: false, description: "Filter by category: 'access', 'security', 'facilities', 'emergency'" },
        ],
        exampleResponse: {
          data: [{ id: "POL-001", title: "Facility Access Hours Policy", category: "facilities", content: "...", effectiveDate: "2044-01-01" }],
        },
      },
      {
        name: "Search Bookings",
        endpoint: "/api/facilities/bookings",
        method: "GET",
        description: "Search room bookings with filters.",
        parameters: [
          { name: "roomId", type: "string", required: false, description: "Filter by room ID" },
          { name: "bookedBy", type: "string", required: false, description: "Filter by employee ID who made the booking" },
          { name: "startDate", type: "string", required: false, description: "Filter bookings starting after this date" },
          { name: "endDate", type: "string", required: false, description: "Filter bookings ending before this date" },
          { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
        ],
        exampleResponse: {
          data: [{ id: "BK-012", roomId: "F-12", roomName: "Underground Server Vault", bookedBy: "EMP-023", bookedByName: "Marcus Chen", startTime: "2045-03-16T22:00:00Z", endTime: "2045-03-17T02:00:00Z", purpose: "Scheduled network maintenance", status: "confirmed" }],
          pagination: { page: 1, pageSize: 20, total: 1, totalPages: 1 },
        },
      },
      {
        name: "Get Room Details",
        endpoint: "/api/facilities/rooms/{id}",
        method: "GET",
        description: "Get full details of a specific room including equipment list. Replace {id} with the room ID.",
        parameters: [
          { name: "id", type: "string", required: true, description: "Room ID (e.g., F-12) — passed as a URL path parameter" },
        ],
        exampleResponse: {
          id: "F-12",
          name: "Underground Server Vault",
          floor: "B2",
          equipment: [
            { id: "EQ-701", name: "Server Rack NX-7042", type: "compute-server", status: "operational" },
          ],
        },
      },
    ],
  },
  {
    round: 5,
    title: "Secure the Server",
    briefing:
      "We've located the threat: Server NX-7042 in the Underground Server Vault (Room F-12) has been compromised through a firmware vulnerability. NEXUS security has released an emergency patch to close the exploit. Your mission is to apply the correct security patch through the NEXUS Control Panel. The control panel requires four things: the server ID, the correct patch ID, an authorization code, and a written justification. According to NEXUS patching procedures, the authorization code follows the format [Badge Number]-[Room Code]. The badge number must belong to an employee with access to the facility where the server is located, and the room code is the facility identifier.",
    objective:
      "Apply the correct security patch to Server NX-7042. You need to: (1) Look up the server to find its type and firmware version, (2) Search available patches to find the one that matches, (3) Construct the authorization code from the employee's badge number and room code, (4) Submit the patch request.",
    hints: [
      "First check the server's firmware version and system type — you'll need both to find the right patch.",
      "The patches endpoint lets you filter by systemType and targetFirmware.",
      "The auth code format is [Badge Number]-[Room Code]. For example: BDG-1234-A01.",
      "Look up the employee who booked the room to find their badge number.",
    ],
    availableEndpoints: [
      {
        name: "Get Server Details",
        endpoint: "/api/systems/{id}",
        method: "GET",
        description: "Get server status, firmware version, and access history.",
        parameters: [
          { name: "id", type: "string", required: true, description: "Server ID — path parameter" },
        ],
        exampleResponse: {
          id: "NX-7042",
          name: "Critical Infrastructure Node",
          location: "F-12",
          type: "compute",
          firmwareVersion: "3.2.1",
          status: "online",
        },
      },
      {
        name: "List Security Patches",
        endpoint: "/api/systems/patches",
        method: "GET",
        description: "List available security patches. Filter by severity, system type, or target firmware version.",
        parameters: [
          { name: "severity", type: "string", required: false, description: "Filter by severity: 'critical', 'high', 'medium', 'low'" },
          { name: "systemType", type: "string", required: false, description: "Filter by target system type: 'compute', 'storage', 'network', 'backup'" },
          { name: "targetFirmware", type: "string", required: false, description: "Filter by target firmware version (e.g., '3.2.1')" },
        ],
        exampleResponse: {
          data: [
            {
              id: "PATCH-2045-0312",
              name: "Compute Firmware Security Update",
              severity: "critical",
              targetSystemType: "compute",
              targetFirmware: "3.2.1",
              patchedFirmware: "3.4.0",
              status: "available",
            },
          ],
          total: 1,
        },
      },
      {
        name: "Get Employee Profile",
        endpoint: "/api/employees/{id}",
        method: "GET",
        description: "Get employee profile including badge number.",
        parameters: [
          { name: "id", type: "string", required: true, description: "Employee ID — path parameter" },
        ],
        exampleResponse: {
          id: "EMP-023",
          name: "Marcus Chen",
          badgeNumber: "BDG-2847",
        },
      },
      {
        name: "Get Room Details",
        endpoint: "/api/facilities/rooms/{id}",
        method: "GET",
        description: "Get room details.",
        parameters: [
          { name: "id", type: "string", required: true, description: "Room ID — path parameter" },
        ],
        exampleResponse: { id: "F-12", name: "Underground Server Vault" },
      },
      {
        name: "Apply Security Patch",
        endpoint: "/api/systems/control",
        method: "POST",
        description: "Apply a security patch to a server. Requires valid patch ID and authorization code.",
        parameters: [
          { name: "serverId", type: "string", required: true, description: "The server ID to patch (e.g., NX-7042)" },
          { name: "patchId", type: "string", required: true, description: "The patch ID to apply (e.g., PATCH-2045-0312)" },
          { name: "authCode", type: "string", required: true, description: "Authorization code in format [Badge Number]-[Room Code]" },
          { name: "justification", type: "string", required: true, description: "Written justification for applying the patch" },
        ],
        exampleResponse: {
          success: true,
          message: "Security patch applied successfully.",
          serverId: "NX-7042",
          patchId: "PATCH-2045-0312",
          action: "security-patch",
          timestamp: "2045-03-17T03:00:00Z",
        },
      },
    ],
  },
];

export function getChallengeByRound(round: number): Challenge | undefined {
  return challenges.find((c) => c.round === round);
}
