import type { Room } from "../types";

export const rooms: Room[] = [
  // ── Mystery Thread Room ────────────────────────────────
  {
    id: "F-12",
    name: "Underground Server Vault",
    floor: "B2",
    building: "Central Tower",
    capacity: 4,
    type: "restricted",
    requiredClearance: 4,
    equipment: [
      { id: "EQ-701", name: "Server Rack NX-7042", type: "compute-server", serialNumber: "SN-NX7042-A", status: "operational" },
      { id: "EQ-702", name: "Backup Power Unit", type: "ups", serialNumber: "SN-BPU-882", status: "operational" },
      { id: "EQ-703", name: "Network Switch Hub", type: "network", serialNumber: "SN-NSH-441", status: "operational" },
      { id: "EQ-704", name: "Terminal Console", type: "terminal", serialNumber: "SN-TC-229", status: "operational" },
    ],
  },

  // ── Server Rooms ───────────────────────────────────────
  {
    id: "A-01",
    name: "Server Room A",
    floor: "B1",
    building: "Central Tower",
    capacity: 6,
    type: "server-room",
    requiredClearance: 3,
    equipment: [
      { id: "EQ-101", name: "Server Rack NX-3001", type: "compute-server", serialNumber: "SN-NX3001-A", status: "operational" },
      { id: "EQ-102", name: "Server Rack NX-3002", type: "compute-server", serialNumber: "SN-NX3002-A", status: "operational" },
      { id: "EQ-103", name: "Cooling Unit Alpha", type: "hvac", serialNumber: "SN-CU-101", status: "operational" },
    ],
  },
  {
    id: "B-01",
    name: "Server Room B",
    floor: "B1",
    building: "Central Tower",
    capacity: 8,
    type: "server-room",
    requiredClearance: 3,
    equipment: [
      { id: "EQ-201", name: "Server Rack NX-4010", type: "compute-server", serialNumber: "SN-NX4010-A", status: "operational" },
      { id: "EQ-202", name: "Server Rack NX-4011", type: "storage-server", serialNumber: "SN-NX4011-A", status: "operational" },
      { id: "EQ-203", name: "Network Core Switch", type: "network", serialNumber: "SN-NCS-201", status: "operational" },
      { id: "EQ-204", name: "Cooling Unit Beta", type: "hvac", serialNumber: "SN-CU-202", status: "maintenance" },
    ],
  },

  // ── Conference Rooms ───────────────────────────────────
  {
    id: "C-01",
    name: "Boardroom Alpha",
    floor: "10",
    building: "Central Tower",
    capacity: 20,
    type: "conference",
    requiredClearance: 1,
    equipment: [
      { id: "EQ-301", name: "Holographic Display", type: "av", serialNumber: "SN-HD-301", status: "operational" },
      { id: "EQ-302", name: "Conference Phone System", type: "av", serialNumber: "SN-CPS-301", status: "operational" },
    ],
  },
  {
    id: "C-02",
    name: "Meeting Room Gamma",
    floor: "5",
    building: "Central Tower",
    capacity: 8,
    type: "conference",
    requiredClearance: 1,
    equipment: [
      { id: "EQ-311", name: "Smart Whiteboard", type: "av", serialNumber: "SN-SW-311", status: "operational" },
    ],
  },
  {
    id: "C-03",
    name: "Meeting Room Delta",
    floor: "5",
    building: "Central Tower",
    capacity: 6,
    type: "conference",
    requiredClearance: 1,
    equipment: [
      { id: "EQ-321", name: "Video Conference Unit", type: "av", serialNumber: "SN-VCU-321", status: "operational" },
    ],
  },
  {
    id: "C-04",
    name: "Secure Briefing Room",
    floor: "8",
    building: "Central Tower",
    capacity: 12,
    type: "conference",
    requiredClearance: 4,
    equipment: [
      { id: "EQ-331", name: "SCIF Display System", type: "av", serialNumber: "SN-SCIF-331", status: "operational" },
      { id: "EQ-332", name: "Signal Jammer", type: "security", serialNumber: "SN-SJ-332", status: "operational" },
    ],
  },

  // ── Labs ───────────────────────────────────────────────
  {
    id: "L-01",
    name: "Quantum Computing Lab",
    floor: "3",
    building: "Research Wing",
    capacity: 10,
    type: "lab",
    requiredClearance: 4,
    equipment: [
      { id: "EQ-401", name: "Quantum Processor Unit", type: "quantum", serialNumber: "SN-QPU-401", status: "operational" },
      { id: "EQ-402", name: "Cryogenic Cooling System", type: "hvac", serialNumber: "SN-CCS-402", status: "operational" },
    ],
  },
  {
    id: "L-02",
    name: "AI Research Lab",
    floor: "3",
    building: "Research Wing",
    capacity: 15,
    type: "lab",
    requiredClearance: 3,
    equipment: [
      { id: "EQ-411", name: "GPU Cluster Array", type: "compute-server", serialNumber: "SN-GCA-411", status: "operational" },
      { id: "EQ-412", name: "Neural Interface Prototype", type: "experimental", serialNumber: "SN-NIP-412", status: "maintenance" },
    ],
  },
  {
    id: "L-03",
    name: "Hardware Testing Lab",
    floor: "2",
    building: "Research Wing",
    capacity: 8,
    type: "lab",
    requiredClearance: 2,
    equipment: [
      { id: "EQ-421", name: "Oscilloscope Array", type: "testing", serialNumber: "SN-OA-421", status: "operational" },
      { id: "EQ-422", name: "Soldering Station", type: "fabrication", serialNumber: "SN-SS-422", status: "operational" },
    ],
  },

  // ── Offices ────────────────────────────────────────────
  {
    id: "O-01",
    name: "Executive Suite",
    floor: "12",
    building: "Central Tower",
    capacity: 4,
    type: "office",
    requiredClearance: 5,
    equipment: [
      { id: "EQ-501", name: "Secure Terminal", type: "terminal", serialNumber: "SN-ST-501", status: "operational" },
    ],
  },
  {
    id: "O-02",
    name: "Security Operations Center",
    floor: "7",
    building: "Central Tower",
    capacity: 20,
    type: "office",
    requiredClearance: 3,
    equipment: [
      { id: "EQ-511", name: "SOC Monitoring Wall", type: "av", serialNumber: "SN-SMW-511", status: "operational" },
      { id: "EQ-512", name: "Threat Dashboard", type: "terminal", serialNumber: "SN-TD-512", status: "operational" },
    ],
  },

  // ── Storage ────────────────────────────────────────────
  {
    id: "S-01",
    name: "Archive Storage",
    floor: "B1",
    building: "Central Tower",
    capacity: 2,
    type: "storage",
    requiredClearance: 2,
    equipment: [
      { id: "EQ-601", name: "Tape Library System", type: "storage", serialNumber: "SN-TLS-601", status: "operational" },
    ],
  },
  {
    id: "S-02",
    name: "Equipment Depot",
    floor: "1",
    building: "Central Tower",
    capacity: 4,
    type: "storage",
    requiredClearance: 1,
    equipment: [
      { id: "EQ-611", name: "Inventory Scanner", type: "logistics", serialNumber: "SN-IS-611", status: "operational" },
    ],
  },
];

export function findRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}
