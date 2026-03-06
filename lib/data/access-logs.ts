import type { AccessLog } from "../types";
import { employees } from "./employees";

// ── Critical mystery thread entries ──────────────────────
const criticalLogs: AccessLog[] = [
  // The key entry: Tanaka accessing Server Room B at 23:47
  {
    id: "LOG-0247",
    employeeId: "EMP-047",
    employeeName: "Dr. Yuki Tanaka",
    location: "Server Room B",
    timestamp: "2045-03-15T23:47:00Z",
    accessType: "entry",
    method: "badge",
    granted: true,
  },
  {
    id: "LOG-0248",
    employeeId: "EMP-047",
    employeeName: "Dr. Yuki Tanaka",
    location: "Server Room B",
    timestamp: "2045-03-16T00:32:00Z",
    accessType: "exit",
    method: "badge",
    granted: true,
  },
  // Tanaka normal daytime entries
  {
    id: "LOG-0180",
    employeeId: "EMP-047",
    employeeName: "Dr. Yuki Tanaka",
    location: "Main Lobby",
    timestamp: "2045-03-15T08:12:00Z",
    accessType: "entry",
    method: "badge",
    granted: true,
  },
  {
    id: "LOG-0195",
    employeeId: "EMP-047",
    employeeName: "Dr. Yuki Tanaka",
    location: "Server Room A",
    timestamp: "2045-03-15T10:30:00Z",
    accessType: "entry",
    method: "biometric",
    granted: true,
  },
  // Marcus Chen entries
  {
    id: "LOG-0260",
    employeeId: "EMP-023",
    employeeName: "Marcus Chen",
    location: "Security Operations Center",
    timestamp: "2045-03-16T09:05:00Z",
    accessType: "entry",
    method: "badge",
    granted: true,
  },
  {
    id: "LOG-0285",
    employeeId: "EMP-023",
    employeeName: "Marcus Chen",
    location: "Underground Server Vault",
    timestamp: "2045-03-16T22:15:00Z",
    accessType: "entry",
    method: "badge",
    granted: true,
  },
  {
    id: "LOG-0290",
    employeeId: "EMP-023",
    employeeName: "Marcus Chen",
    location: "Underground Server Vault",
    timestamp: "2045-03-17T01:48:00Z",
    accessType: "exit",
    method: "badge",
    granted: true,
  },
  // Priya Sharma entries
  {
    id: "LOG-0210",
    employeeId: "EMP-091",
    employeeName: "Priya Sharma",
    location: "Main Lobby",
    timestamp: "2045-03-15T08:45:00Z",
    accessType: "entry",
    method: "badge",
    granted: true,
  },
  {
    id: "LOG-0225",
    employeeId: "EMP-091",
    employeeName: "Priya Sharma",
    location: "Server Room B",
    timestamp: "2045-03-15T14:20:00Z",
    accessType: "entry",
    method: "biometric",
    granted: true,
  },
];

// ── Generate filler logs ─────────────────────────────────
const locations = [
  "Main Lobby", "Server Room A", "Server Room B", "Boardroom Alpha",
  "Meeting Room Gamma", "Meeting Room Delta", "Quantum Computing Lab",
  "AI Research Lab", "Hardware Testing Lab", "Executive Suite",
  "Security Operations Center", "Archive Storage", "Equipment Depot",
  "Cafeteria", "Parking Garage", "Research Wing Entrance",
];

const fillerEmployees = employees.filter(
  (e) => !["EMP-047", "EMP-023", "EMP-091"].includes(e.id)
);

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateFillerLogs(): AccessLog[] {
  const logs: AccessLog[] = [];
  const rand = seededRandom(42);
  let logId = 300;

  // Generate logs for March 1-17, 2045
  for (let day = 1; day <= 17; day++) {
    const dateStr = `2045-03-${String(day).padStart(2, "0")}`;

    // 25-35 entries per day
    const entriesPerDay = Math.floor(rand() * 10) + 25;

    for (let i = 0; i < entriesPerDay; i++) {
      const emp = fillerEmployees[Math.floor(rand() * fillerEmployees.length)];
      const loc = locations[Math.floor(rand() * locations.length)];
      const hour = Math.floor(rand() * 14) + 7; // 7am to 9pm mostly
      const minute = Math.floor(rand() * 60);
      const accessType = rand() > 0.5 ? "entry" : "exit";
      const method = rand() > 0.7 ? "biometric" : rand() > 0.3 ? "badge" : "keycode";
      const granted = rand() > 0.03; // 3% denied

      logs.push({
        id: `LOG-${String(logId++).padStart(4, "0")}`,
        employeeId: emp.id,
        employeeName: emp.name,
        location: loc,
        timestamp: `${dateStr}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`,
        accessType: accessType as "entry" | "exit",
        method: method as "badge" | "biometric" | "keycode",
        granted,
      });
    }
  }

  return logs;
}

const fillerLogs = generateFillerLogs();

// Combine and sort by timestamp
export const accessLogs: AccessLog[] = [...criticalLogs, ...fillerLogs].sort(
  (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
);

export function searchLogs(filters: {
  employeeId?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
}): AccessLog[] {
  return accessLogs.filter((log) => {
    if (filters.employeeId && log.employeeId !== filters.employeeId) return false;
    if (filters.location && !log.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.startTime && new Date(log.timestamp) < new Date(filters.startTime)) return false;
    if (filters.endTime && new Date(log.timestamp) > new Date(filters.endTime)) return false;
    return true;
  });
}
