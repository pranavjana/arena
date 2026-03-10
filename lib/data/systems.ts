import type { SystemServer, SecurityPatch } from "../types";

export const systems: SystemServer[] = [
  // ── Mystery Thread Server ──────────────────────────────
  {
    id: "NX-7042",
    name: "Critical Infrastructure Node",
    location: "F-12",
    type: "compute",
    status: "online",
    ipAddress: "10.0.42.7",
    firmwareVersion: "3.2.1",
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
    firmwareVersion: "3.4.0",
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
    firmwareVersion: "3.4.0",
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
    firmwareVersion: "3.4.0",
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
    firmwareVersion: "2.1.0",
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
    firmwareVersion: "5.0.2",
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
    firmwareVersion: "5.0.2",
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
    firmwareVersion: "1.8.0",
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
    firmwareVersion: "1.8.0",
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
    firmwareVersion: "3.4.0",
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
    firmwareVersion: "3.4.0",
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
    firmwareVersion: "5.0.2",
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
    firmwareVersion: "3.4.0",
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
    firmwareVersion: "2.1.0",
    lastMaintenance: "2045-02-25",
    accessHistory: [
      { employeeId: "EMP-043", employeeName: "Omar Hassan", timestamp: "2045-03-14T08:00:00Z", action: "Index optimization" },
    ],
  },
];

export const patches: SecurityPatch[] = [
  {
    id: "PATCH-2045-0312",
    name: "Compute Firmware Security Update",
    description: "Patches CVE-2045-7891: Remote code execution vulnerability in compute node firmware versions prior to 3.4.0. Closes the exploit vector used to install unauthorized killswitch payloads.",
    severity: "critical",
    targetSystemType: "compute",
    targetFirmware: "3.2.1",
    patchedFirmware: "3.4.0",
    releaseDate: "2045-03-16",
    status: "available",
  },
  {
    id: "PATCH-2045-0287",
    name: "Network Device TLS Hardening",
    description: "Strengthens TLS configuration on network devices. Addresses CVE-2045-6234.",
    severity: "high",
    targetSystemType: "network",
    targetFirmware: "5.0.2",
    patchedFirmware: "5.1.0",
    releaseDate: "2045-03-10",
    status: "available",
  },
  {
    id: "PATCH-2045-0265",
    name: "Storage Controller Update",
    description: "Fixes data integrity issue in storage array controllers under heavy write loads.",
    severity: "medium",
    targetSystemType: "storage",
    targetFirmware: "2.1.0",
    patchedFirmware: "2.1.1",
    releaseDate: "2045-03-05",
    status: "available",
  },
  {
    id: "PATCH-2045-0301",
    name: "Backup Agent Memory Leak Fix",
    description: "Resolves memory leak in backup agent process that could cause service interruption.",
    severity: "low",
    targetSystemType: "backup",
    targetFirmware: "1.8.0",
    patchedFirmware: "1.8.1",
    releaseDate: "2045-03-12",
    status: "available",
  },
];

export function findSystemById(id: string): SystemServer | undefined {
  return systems.find((s) => s.id === id);
}

export function findPatchById(id: string): SecurityPatch | undefined {
  return patches.find((p) => p.id === id);
}
