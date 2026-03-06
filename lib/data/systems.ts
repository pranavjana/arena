import type { SystemServer } from "../types";

export const systems: SystemServer[] = [
  // ── Mystery Thread Server ──────────────────────────────
  {
    id: "NX-7042",
    name: "Critical Infrastructure Node",
    location: "F-12",
    type: "compute",
    status: "online",
    ipAddress: "10.0.42.7",
    lastMaintenance: "2045-02-28",
    accessHistory: [
      { employeeId: "EMP-047", employeeName: "Dr. Yuki Tanaka", timestamp: "2045-03-14T14:22:00Z", action: "Configuration update" },
      { employeeId: "EMP-023", employeeName: "Marcus Chen", timestamp: "2045-03-14T16:45:00Z", action: "Network diagnostics" },
      { employeeId: "EMP-047", employeeName: "Dr. Yuki Tanaka", timestamp: "2045-03-15T22:30:00Z", action: "Firmware patch applied" },
      { employeeId: "EMP-023", employeeName: "Marcus Chen", timestamp: "2045-03-16T23:15:00Z", action: "Security audit" },
    ],
  },

  // ── Other Servers ──────────────────────────────────────
  {
    id: "NX-3001",
    name: "Primary Application Server",
    location: "A-01",
    type: "compute",
    status: "online",
    ipAddress: "10.0.1.10",
    lastMaintenance: "2045-03-01",
    accessHistory: [
      { employeeId: "EMP-010", employeeName: "Carlos Mendez", timestamp: "2045-03-10T09:15:00Z", action: "Routine maintenance" },
      { employeeId: "EMP-024", employeeName: "Benjamin Hart", timestamp: "2045-03-12T11:30:00Z", action: "OS patch deployment" },
    ],
  },
  {
    id: "NX-3002",
    name: "Secondary Application Server",
    location: "A-01",
    type: "compute",
    status: "online",
    ipAddress: "10.0.1.11",
    lastMaintenance: "2045-03-01",
    accessHistory: [
      { employeeId: "EMP-010", employeeName: "Carlos Mendez", timestamp: "2045-03-10T09:45:00Z", action: "Routine maintenance" },
    ],
  },
  {
    id: "NX-4010",
    name: "Data Processing Node Alpha",
    location: "B-01",
    type: "compute",
    status: "online",
    ipAddress: "10.0.2.10",
    lastMaintenance: "2045-02-15",
    accessHistory: [
      { employeeId: "EMP-017", employeeName: "Andrei Volkov", timestamp: "2045-03-08T14:00:00Z", action: "Performance tuning" },
      { employeeId: "EMP-091", employeeName: "Priya Sharma", timestamp: "2045-03-11T10:20:00Z", action: "Database migration prep" },
    ],
  },
  {
    id: "NX-4011",
    name: "Storage Array Primary",
    location: "B-01",
    type: "storage",
    status: "online",
    ipAddress: "10.0.2.20",
    lastMaintenance: "2045-02-20",
    accessHistory: [
      { employeeId: "EMP-045", employeeName: "Raj Krishnamurthy", timestamp: "2045-03-05T08:30:00Z", action: "Storage expansion" },
    ],
  },
  {
    id: "NX-5001",
    name: "Core Network Router",
    location: "B-01",
    type: "network",
    status: "online",
    ipAddress: "10.0.0.1",
    lastMaintenance: "2045-03-10",
    accessHistory: [
      { employeeId: "EMP-021", employeeName: "Patrick O'Brien", timestamp: "2045-03-10T07:00:00Z", action: "Firmware update" },
      { employeeId: "EMP-023", employeeName: "Marcus Chen", timestamp: "2045-03-12T15:30:00Z", action: "ACL review" },
    ],
  },
  {
    id: "NX-5002",
    name: "Edge Firewall Cluster",
    location: "O-02",
    type: "network",
    status: "online",
    ipAddress: "10.0.0.2",
    lastMaintenance: "2045-03-05",
    accessHistory: [
      { employeeId: "EMP-023", employeeName: "Marcus Chen", timestamp: "2045-03-09T13:00:00Z", action: "Rule set update" },
      { employeeId: "EMP-015", employeeName: "Daniel Osei", timestamp: "2045-03-13T16:45:00Z", action: "TLS certificate rotation" },
    ],
  },
  {
    id: "NX-6001",
    name: "Backup Server Alpha",
    location: "S-01",
    type: "backup",
    status: "online",
    ipAddress: "10.0.3.10",
    lastMaintenance: "2045-03-08",
    accessHistory: [
      { employeeId: "EMP-039", employeeName: "Brandon Lee", timestamp: "2045-03-08T06:00:00Z", action: "Backup verification" },
    ],
  },
  {
    id: "NX-6002",
    name: "Backup Server Beta",
    location: "S-01",
    type: "backup",
    status: "maintenance",
    ipAddress: "10.0.3.11",
    lastMaintenance: "2045-03-15",
    accessHistory: [
      { employeeId: "EMP-039", employeeName: "Brandon Lee", timestamp: "2045-03-15T10:00:00Z", action: "Drive replacement" },
    ],
  },
  {
    id: "NX-8001",
    name: "Quantum Processing Unit",
    location: "L-01",
    type: "compute",
    status: "online",
    ipAddress: "10.0.5.10",
    lastMaintenance: "2045-02-01",
    accessHistory: [
      { employeeId: "EMP-033", employeeName: "Ingrid Svensson", timestamp: "2045-03-14T09:00:00Z", action: "Qubit calibration" },
      { employeeId: "EMP-009", employeeName: "Nina Okafor", timestamp: "2045-03-14T11:30:00Z", action: "Algorithm benchmark" },
    ],
  },
  {
    id: "NX-8002",
    name: "GPU Training Cluster",
    location: "L-02",
    type: "compute",
    status: "online",
    ipAddress: "10.0.5.20",
    lastMaintenance: "2045-03-12",
    accessHistory: [
      { employeeId: "EMP-018", employeeName: "Grace Adeyemi", timestamp: "2045-03-13T08:00:00Z", action: "Model training initiated" },
    ],
  },
  {
    id: "NX-9001",
    name: "DNS Server Primary",
    location: "A-01",
    type: "network",
    status: "online",
    ipAddress: "10.0.0.53",
    lastMaintenance: "2045-03-03",
    accessHistory: [
      { employeeId: "EMP-021", employeeName: "Patrick O'Brien", timestamp: "2045-03-03T14:30:00Z", action: "Zone file update" },
    ],
  },
  {
    id: "NX-9002",
    name: "Authentication Server",
    location: "O-02",
    type: "compute",
    status: "online",
    ipAddress: "10.0.0.100",
    lastMaintenance: "2045-03-07",
    accessHistory: [
      { employeeId: "EMP-015", employeeName: "Daniel Osei", timestamp: "2045-03-07T10:00:00Z", action: "Certificate renewal" },
      { employeeId: "EMP-025", employeeName: "Aisha Mohammed", timestamp: "2045-03-11T14:00:00Z", action: "Key rotation" },
    ],
  },
  {
    id: "NX-9003",
    name: "Log Aggregation Server",
    location: "O-02",
    type: "storage",
    status: "online",
    ipAddress: "10.0.0.200",
    lastMaintenance: "2045-02-25",
    accessHistory: [
      { employeeId: "EMP-043", employeeName: "Omar Hassan", timestamp: "2045-03-14T08:00:00Z", action: "Index optimization" },
    ],
  },
];

export function findSystemById(id: string): SystemServer | undefined {
  return systems.find((s) => s.id === id);
}
