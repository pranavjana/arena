import type { Policy } from "../types";

export const policies: Policy[] = [
  {
    id: "POL-001",
    title: "Facility Access Hours Policy",
    category: "facilities",
    content: `NEXUS Corporation Facility Access Policy

STANDARD BUSINESS HOURS: 06:00 - 20:00 (6:00 AM to 8:00 PM)

AFTER-HOURS ACCESS: 20:00 - 06:00 (8:00 PM to 6:00 AM)

After-hours access to any NEXUS facility requires:
1. Security clearance level 3 or above
2. Pre-approved booking through the facilities management system
3. Valid justification logged in the booking system
4. Badge-in and badge-out recorded at all access points

All after-hours activities are subject to enhanced monitoring and logging. Unauthorized after-hours access will trigger an automatic security alert.

Weekend access follows the same after-hours protocol regardless of time of day.`,
    effectiveDate: "2044-01-01",
    lastUpdated: "2044-12-15",
  },
  {
    id: "POL-002",
    title: "Security Clearance Levels",
    category: "security",
    content: `NEXUS Corporation Security Clearance Framework

LEVEL 1 - PUBLIC ACCESS
- Common areas, cafeteria, general offices
- No sensitive systems access

LEVEL 2 - STANDARD ACCESS
- Department-specific areas
- Basic system access
- Standard workstations

LEVEL 3 - ELEVATED ACCESS
- Server rooms (A, B)
- Security operations areas
- Database systems
- Network infrastructure

LEVEL 4 - HIGH SECURITY ACCESS
- Restricted facilities
- Critical infrastructure systems
- Research laboratories
- Emergency control systems

LEVEL 5 - EXECUTIVE ACCESS
- All areas
- Override capabilities
- Emergency shutdown authority

Clearance level reviews are conducted quarterly. Any clearance level change requires Director-level approval and a 72-hour waiting period.`,
    effectiveDate: "2043-06-01",
    lastUpdated: "2045-01-10",
  },
  {
    id: "POL-003",
    title: "Emergency Shutdown Procedures",
    category: "emergency",
    content: `NEXUS Corporation Emergency Server Shutdown Protocol

In the event of a security breach or critical system compromise:

1. IDENTIFICATION: Confirm the compromised server ID through the Systems Dashboard
2. AUTHORIZATION: Obtain the authorization code for the shutdown request
   - Authorization codes follow the format: [Badge Number]-[Room Code]
   - The badge number must belong to an employee with access to the facility
   - The room code is the facility identifier where the server is located
3. JUSTIFICATION: Provide a clear written justification for the shutdown
4. EXECUTION: Submit the shutdown request through the Control Panel at /systems/control

NOTE: Unauthorized shutdown attempts will be logged and reported to the Security Director. False shutdown requests are a terminable offense.

For immediate emergencies, contact the Security Operations Center (Floor 7) directly.`,
    effectiveDate: "2044-03-01",
    lastUpdated: "2045-02-28",
  },
  {
    id: "POL-004",
    title: "Access Log Retention Policy",
    category: "access",
    content: `NEXUS Corporation Access Log Retention

All facility access events are logged with the following data:
- Employee ID and name
- Timestamp (ISO 8601 format)
- Location identifier
- Access type (entry/exit)
- Authentication method (badge/biometric/keycode)
- Access granted/denied status

Logs are retained for a minimum of 90 days in the active system. After 90 days, logs are archived to cold storage for 7 years as required by regulatory compliance.

Real-time log access is available to Security (Level 3+) and Infrastructure (Level 3+) personnel through the Access Logs interface.`,
    effectiveDate: "2043-01-01",
    lastUpdated: "2044-06-20",
  },
  {
    id: "POL-005",
    title: "Internal Communications Policy",
    category: "security",
    content: `NEXUS Corporation Internal Communications Guidelines

All internal communications are subject to monitoring and logging. Employees must use approved channels:

1. INTERNAL CHAT - For routine, non-sensitive communications
2. EMAIL - For formal communications and documentation
3. ENCRYPTED - For sensitive or classified information (Level 3+ clearance required)

Prohibited activities:
- Using personal email for work communications
- Sharing credentials or access codes via any channel
- Discussing classified projects on unencrypted channels
- Using code words or obfuscation to bypass monitoring

All communications are retained for 180 days minimum. Encrypted channel communications are retained for 365 days.`,
    effectiveDate: "2043-04-15",
    lastUpdated: "2044-11-01",
  },
  {
    id: "POL-006",
    title: "Visitor Access Policy",
    category: "access",
    content: `NEXUS Corporation Visitor Access Protocol

All visitors must:
1. Register at the main reception (Floor 1, Central Tower)
2. Be accompanied by a NEXUS employee at all times
3. Wear visible visitor badges
4. Restrict movement to Level 1 clearance areas only

Visitor access is limited to standard business hours (06:00-20:00).
No visitor may access server rooms, labs, or restricted areas under any circumstances.

Emergency evacuation: Visitors must follow their escort to the nearest designated assembly point.`,
    effectiveDate: "2042-09-01",
    lastUpdated: "2044-08-12",
  },
];
