// ─── Employee ────────────────────────────────────────────
export type SecurityClearance = 1 | 2 | 3 | 4 | 5;

export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  securityClearance: SecurityClearance;
  badgeNumber: string;
  hireDate: string;
  status: "active" | "on-leave" | "terminated";
  supervisorId: string | null;
  skills: string[];
};

// ─── Access Log ──────────────────────────────────────────
export type AccessLog = {
  id: string;
  employeeId: string;
  employeeName: string;
  location: string;
  timestamp: string;
  accessType: "entry" | "exit";
  method: "badge" | "biometric" | "keycode";
  granted: boolean;
};

// ─── Communication ───────────────────────────────────────
export type Communication = {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  channel: "email" | "internal-chat" | "encrypted";
  subject: string;
  body: string;
  timestamp: string;
};

// ─── Room & Equipment ────────────────────────────────────
export type Equipment = {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  status: "operational" | "maintenance" | "offline";
};

export type Room = {
  id: string;
  name: string;
  floor: string;
  building: string;
  capacity: number;
  type: "office" | "conference" | "server-room" | "lab" | "storage" | "restricted";
  equipment: Equipment[];
  requiredClearance: SecurityClearance;
};

// ─── Booking ─────────────────────────────────────────────
export type Booking = {
  id: string;
  roomId: string;
  roomName: string;
  bookedBy: string;
  bookedByName: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: "confirmed" | "cancelled" | "completed";
};

// ─── Policy ──────────────────────────────────────────────
export type Policy = {
  id: string;
  title: string;
  category: "access" | "security" | "facilities" | "emergency";
  content: string;
  effectiveDate: string;
  lastUpdated: string;
};

// ─── System/Server ───────────────────────────────────────
export type ServerAccess = {
  employeeId: string;
  employeeName: string;
  timestamp: string;
  action: string;
};

export type SystemServer = {
  id: string;
  name: string;
  location: string;
  type: "compute" | "storage" | "network" | "backup";
  status: "online" | "offline" | "maintenance" | "critical";
  ipAddress: string;
  lastMaintenance: string;
  accessHistory: ServerAccess[];
};

// ─── Control ─────────────────────────────────────────────
export type ControlRequest = {
  serverId: string;
  authCode: string;
  justification: string;
};

export type ControlResponse = {
  success: boolean;
  message: string;
  serverId?: string;
  action?: string;
  timestamp?: string;
};

// ─── Challenge ───────────────────────────────────────────
export type ParameterDoc = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};

export type ToolDoc = {
  name: string;
  endpoint: string;
  method: "GET" | "POST";
  description: string;
  parameters: ParameterDoc[];
  exampleResponse: Record<string, unknown>;
};

export type Challenge = {
  round: number;
  title: string;
  briefing: string;
  objective: string;
  hints: string[];
  availableEndpoints: ToolDoc[];
};

// ─── Pagination ──────────────────────────────────────────
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};
