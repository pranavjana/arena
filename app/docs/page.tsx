import { TerminalBlock } from "@/components/terminal-block";
import { NeonCard, NeonCardHeader } from "@/components/neon-card";
import { CopyButton } from "@/components/copy-button";

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="overflow-hidden border border-nexus-border">
      {title && (
        <div className="border-b border-nexus-border bg-nexus-bg px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-nexus-muted">
            {title}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto bg-nexus-bg p-4 font-mono text-xs leading-relaxed text-nexus-text">
        {children}
      </pre>
    </div>
  );
}

const MESSAGE_UI_PROMPT = `I just added new tools to my chatbot. Now I need to render them in the chat UI.

In components/message.tsx, there's a comment that says "WORKSHOP: Add your tool UI rendering here" (around line 276). For each tool I've registered in the tools object in route.ts, add a rendering block there.

Use the existing getWeather tool rendering (the "tool-getWeather" block above the workshop comment) as a reference for the pattern. For my new tools, keep it simple — just show the default Tool/ToolHeader/ToolInput/ToolOutput components (no need for custom UI like the Weather component). Make sure to handle the "output-available" state to show results.`;

// ── Tool pieces (inputSchema + execute only) ──

const searchAccessLogsPieces = `  inputSchema: z.object({
    employeeId: z
      .string()
      .describe("Filter by employee ID, e.g. EMP-047")
      .optional(),
    location: z
      .string()
      .describe("Filter by location name, e.g. 'Server Room B'")
      .optional(),
    startTime: z
      .string()
      .describe("Filter logs after this ISO timestamp, e.g. 2045-03-15T00:00:00Z")
      .optional(),
    endTime: z
      .string()
      .describe("Filter logs before this ISO timestamp, e.g. 2045-03-16T00:00:00Z")
      .optional(),
  }),


  execute: async (input) => {
    const params = new URLSearchParams();
    if (input.employeeId) params.set("employeeId", input.employeeId);
    if (input.location) params.set("location", input.location);
    if (input.startTime) params.set("startTime", input.startTime);
    if (input.endTime) params.set("endTime", input.endTime);

    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/logs?\${params.toString()}\`
    );
    const data = await response.json();
    return data;
  },`;

const searchCommunicationsPieces = `  inputSchema: z.object({
    senderId: z
      .string()
      .describe("Filter by participant employee ID (matches sender or recipient), e.g. EMP-047")
      .optional(),
    recipientId: z
      .string()
      .describe("Filter by the other participant employee ID")
      .optional(),
    channel: z
      .string()
      .describe("Filter by channel: 'email', 'internal-chat', or 'encrypted'")
      .optional(),
    search: z
      .string()
      .describe("Full-text search in subject and body")
      .optional(),
    startDate: z
      .string()
      .describe("Filter messages after this ISO date")
      .optional(),
    endDate: z
      .string()
      .describe("Filter messages before this ISO date")
      .optional(),
    page: z
      .number()
      .describe("Page number (default: 1)")
      .optional(),
    pageSize: z
      .number()
      .describe("Results per page (default: 20)")
      .optional(),
  }),


  execute: async (input) => {
    const params = new URLSearchParams();
    if (input.senderId) params.set("senderId", input.senderId);
    if (input.recipientId) params.set("recipientId", input.recipientId);
    if (input.channel) params.set("channel", input.channel);
    if (input.search) params.set("search", input.search);
    if (input.startDate) params.set("startDate", input.startDate);
    if (input.endDate) params.set("endDate", input.endDate);
    if (input.page) params.set("page", input.page.toString());
    if (input.pageSize) params.set("pageSize", input.pageSize.toString());

    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/communications?\${params.toString()}\`
    );
    const data = await response.json();
    return data;
  },`;

const getEmployeePieces = `  inputSchema: z.object({
    employeeId: z
      .string()
      .describe("The employee ID, e.g. EMP-023"),
  }),


  execute: async (input) => {
    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/employees/\${input.employeeId}\`
    );
    const data = await response.json();
    return data;
  },`;

const getFacilityPoliciesPieces = `  inputSchema: z.object({
    category: z
      .string()
      .describe("Filter by category: 'access', 'security', 'facilities', or 'emergency'")
      .optional(),
  }),


  execute: async (input) => {
    const params = new URLSearchParams();
    if (input.category) params.set("category", input.category);

    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/facilities/policies?\${params.toString()}\`
    );
    const data = await response.json();
    return data;
  },`;

const searchBookingsPieces = `  inputSchema: z.object({
    roomId: z
      .string()
      .describe("Filter by room ID, e.g. F-12")
      .optional(),
    bookedBy: z
      .string()
      .describe("Filter by employee ID who made the booking, e.g. EMP-023")
      .optional(),
    startDate: z
      .string()
      .describe("Filter bookings starting after this date")
      .optional(),
    endDate: z
      .string()
      .describe("Filter bookings ending before this date")
      .optional(),
    page: z
      .number()
      .describe("Page number (default: 1)")
      .optional(),
  }),


  execute: async (input) => {
    const params = new URLSearchParams();
    if (input.roomId) params.set("roomId", input.roomId);
    if (input.bookedBy) params.set("bookedBy", input.bookedBy);
    if (input.startDate) params.set("startDate", input.startDate);
    if (input.endDate) params.set("endDate", input.endDate);
    if (input.page) params.set("page", input.page.toString());

    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/facilities/bookings?\${params.toString()}\`
    );
    const data = await response.json();
    return data;
  },`;

const getRoomDetailsPieces = `  inputSchema: z.object({
    roomId: z
      .string()
      .describe("The room ID, e.g. F-12"),
  }),


  execute: async (input) => {
    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/facilities/rooms/\${input.roomId}\`
    );
    const data = await response.json();
    return data;
  },`;

const getServerDetailsPieces = `  inputSchema: z.object({
    serverId: z
      .string()
      .describe("The server ID, e.g. NX-7042"),
  }),


  execute: async (input) => {
    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/systems/\${input.serverId}\`
    );
    const data = await response.json();
    return data;
  },`;

const listSecurityPatchesPieces = `  inputSchema: z.object({
    severity: z
      .string()
      .describe("Filter by severity: 'critical', 'high', 'medium', or 'low'")
      .optional(),
    systemType: z
      .string()
      .describe("Filter by target system type: 'compute', 'storage', 'network', or 'backup'")
      .optional(),
    targetFirmware: z
      .string()
      .describe("Filter by target firmware version, e.g. '3.2.1'")
      .optional(),
  }),

  execute: async (input) => {
    const params = new URLSearchParams();
    if (input.severity) params.set("severity", input.severity);
    if (input.systemType) params.set("systemType", input.systemType);
    if (input.targetFirmware) params.set("targetFirmware", input.targetFirmware);

    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/systems/patches?\${params.toString()}\`
    );
    const data = await response.json();
    return data;
  },`;

const applySecurityPatchPieces = `  inputSchema: z.object({
    serverId: z
      .string()
      .describe("The server ID to patch, e.g. NX-7042"),
    patchId: z
      .string()
      .describe("The patch ID to apply, e.g. PATCH-2045-0312"),
    authCode: z
      .string()
      .describe("Authorization code in format [Badge Number]-[Room Code], e.g. BDG-1234-F-12"),
    justification: z
      .string()
      .describe("Written justification for applying the patch"),
  }),

  execute: async (input) => {
    const response = await fetch(
      \`\${process.env.ARENA_BASE_URL}/api/systems/control\`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serverId: input.serverId,
          patchId: input.patchId,
          authCode: input.authCode,
          justification: input.justification,
        }),
      }
    );
    const data = await response.json();
    return data;
  },`;

function ToolPiece({
  name,
  filename,
  endpoint,
  code,
}: {
  name: string;
  filename: string;
  endpoint: string;
  code: string;
}) {
  return (
    <NeonCard>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h4 className="font-mono text-sm font-bold text-nexus-text">
            {name}
          </h4>
          <p className="font-mono text-[10px] text-nexus-muted">
            lib/ai/tools/{filename} — calls{" "}
            <span className="text-nexus-cyan">{endpoint}</span>
          </p>
        </div>
        <CopyButton text={code} />
      </div>
      <p className="mb-3 text-xs text-nexus-amber">
        You write the description — copy the inputSchema and execute below:
      </p>
      <CodeBlock>{code}</CodeBlock>
    </NeonCard>
  );
}

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-xl font-bold text-nexus-text">
          How to Add Tools
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          Give your AI chatbot the ability to call APIs
        </p>
      </div>

      {/* ── WHAT IS A TOOL ── */}
      <TerminalBlock title="WHAT IS A TOOL?">
        <p>
          A <strong className="text-nexus-cyan">tool</strong> is a function your
          AI chatbot can call. When a user asks a question, the AI decides if it
          needs a tool, calls it with the right parameters, gets the result, and
          uses that to answer.
        </p>
        <p className="mt-3">
          Example: user asks{" "}
          <span className="text-nexus-cyan">
            &quot;Who accessed Server Room B last night?&quot;
          </span>{" "}
          → AI calls your{" "}
          <span className="text-nexus-green">searchAccessLogs</span> tool → tool
          fetches data from the Arena API → AI reads the result and tells the
          user.
        </p>
      </TerminalBlock>

      {/* ── ENV SETUP ── */}
      <NeonCard className="border-nexus-amber/20">
        <NeonCardHeader
          title="SETUP"
          subtitle="Environment variables"
        />
        <p className="mb-3 text-sm text-nexus-muted">
          <strong className="text-nexus-amber">Before you start:</strong> copy{" "}
          <code className="bg-nexus-bg px-1.5 py-0.5 text-xs text-nexus-cyan">
            .env.example
          </code>{" "}
          to{" "}
          <code className="bg-nexus-bg px-1.5 py-0.5 text-xs text-nexus-cyan">
            .env.local
          </code>{" "}
          and fill in these values:
        </p>
        <CodeBlock title=".env.local">{`# Generate a random secret: openssl rand -base64 32
AUTH_SECRET=your-random-secret-here

# The Arena URL — used by your tools to call the challenge APIs
ARENA_BASE_URL=https://arena-murex.vercel.app

# OpenRouter API key — log in at https://tinyfish-hackerschool.vercel.app to get yours
OPENROUTER_API_KEY=your-openrouter-key-here`}</CodeBlock>
        <ul className="mt-3 space-y-1 text-sm text-nexus-muted">
          <li>
            <code className="text-nexus-text">AUTH_SECRET</code> — run{" "}
            <code className="bg-nexus-bg px-1.5 py-0.5 text-xs text-nexus-cyan">
              openssl rand -base64 32
            </code>{" "}
            in your terminal to generate one
          </li>
          <li>
            <code className="text-nexus-text">ARENA_BASE_URL</code> — this is
            where the Arena API lives. All your tools call this.
          </li>
          <li>
            <code className="text-nexus-text">OPENROUTER_API_KEY</code> — log
            in at{" "}
            <a
              href="https://tinyfish-hackerschool.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nexus-cyan underline"
            >
              tinyfish-hackerschool.vercel.app
            </a>{" "}
            to get your key
          </li>
        </ul>
      </NeonCard>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── PART 1: CREATE A TOOL ── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4 border-t border-nexus-border pt-8">
        <h2 className="font-mono text-lg font-bold text-nexus-text">
          Part 1: Create a Tool
        </h2>

        <NeonCard>
          <NeonCardHeader
            title="TOOL STRUCTURE"
            subtitle="Every tool file looks like this"
          />
          <p className="mb-3 text-sm text-nexus-muted">
            Create a new file in{" "}
            <code className="bg-nexus-bg px-1.5 py-0.5 text-xs text-nexus-cyan">
              lib/ai/tools/
            </code>
            . Every tool has the same structure — 2 imports and 3 parts:
          </p>
          <CodeBlock title="lib/ai/tools/your-tool-name.ts">{`import { tool } from "ai";
import { z } from "zod";

export const yourToolName = tool({
  description: "...",    // YOU write this — tells the AI when to use the tool

  inputSchema: z.object({   // Copy from the reference below
    // ...
  }),

  execute: async (input) => {   // Copy from the reference below
    // ...
  },
});`}</CodeBlock>
          <ul className="mt-4 space-y-2 text-sm text-nexus-muted">
            <li className="flex gap-2">
              <span className="shrink-0 font-mono text-xs text-nexus-cyan">
                description
              </span>
              <span>
                <strong className="text-nexus-text">You write this.</strong>{" "}
                This is how the AI decides when to use your tool. Be specific —
                tell the AI what the tool does and what kind of questions it
                helps answer.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-mono text-xs text-nexus-cyan">
                inputSchema
              </span>
              <span>
                Defines what parameters the tool accepts. Copy this from the
                tool reference sections below.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-mono text-xs text-nexus-cyan">
                execute
              </span>
              <span>
                The function that runs when the AI calls the tool. Copy this
                from the tool reference sections below.
              </span>
            </li>
          </ul>
        </NeonCard>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── PART 2: WIRE IT UP ── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4 border-t border-nexus-border pt-8">
        <h2 className="font-mono text-lg font-bold text-nexus-text">
          Part 2: Wire It Up
        </h2>
        <p className="text-sm text-nexus-muted">
          After creating your tool file, you need to connect it to the chatbot.
          There are{" "}
          <strong className="text-nexus-text">3 files to update</strong>.
          Follow the comments in each file — they say{" "}
          <code className="text-nexus-amber">WORKSHOP</code>.
        </p>

        {/* Wire step A */}
        <NeonCard>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-nexus-cyan/30 bg-nexus-cyan/10 font-mono text-xs font-bold text-nexus-cyan">
              A
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Register the type
              </h3>
              <p className="font-mono text-[10px] text-nexus-muted">
                lib/types.ts
              </p>
            </div>
          </div>
          <p className="mb-3 text-sm text-nexus-muted">
            Add 3 lines. Look at how{" "}
            <code className="text-nexus-text">getWeather</code> is already done
            as an example:
          </p>
          <CodeBlock>{`// 1. Import your tool (at the top, next to the getWeather import):
import type { yourToolName } from "./ai/tools/your-tool-name";

// 2. Create a type alias (below the existing weatherTool type):
type yourToolType = InferUITool<typeof yourToolName>;

// 3. Add it to ChatTools (inside the existing type):
export type ChatTools = {
  getWeather: weatherTool;
  yourToolName: yourToolType;  // ← add this line
};`}</CodeBlock>
        </NeonCard>

        {/* Wire step B */}
        <NeonCard>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-nexus-cyan/30 bg-nexus-cyan/10 font-mono text-xs font-bold text-nexus-cyan">
              B
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Import and add to the chat route
              </h3>
              <p className="font-mono text-[10px] text-nexus-muted">
                app/(chat)/api/chat/route.ts
              </p>
            </div>
          </div>
          <p className="mb-3 text-sm text-nexus-muted">
            Two changes in this file:
          </p>
          <CodeBlock>{`// 1. Import your tool (near the top, find the WORKSHOP comment):
import { yourToolName } from "@/lib/ai/tools/your-tool-name";

// 2. In the streamText() call, uncomment the tools block and add yours:
tools: {
  yourToolName: yourToolName,
  // add more tools here as you build them...
},

// 3. Also uncomment this line (right below tools) to let the AI
//    call multiple tools in a row:
stopWhen: stepCountIs(5),`}</CodeBlock>
        </NeonCard>

        {/* Wire step C */}
        <NeonCard>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-nexus-cyan/30 bg-nexus-cyan/10 font-mono text-xs font-bold text-nexus-cyan">
              C
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Update the system prompt
              </h3>
              <p className="font-mono text-[10px] text-nexus-muted">
                lib/ai/prompts.ts
              </p>
            </div>
          </div>
          <p className="mb-3 text-sm text-nexus-muted">
            Edit the{" "}
            <code className="text-nexus-text">regularPrompt</code> string to
            tell the AI what tools it has. This helps the AI know when to call
            them. Example:
          </p>
          <CodeBlock>{`export const regularPrompt = \`You are a NEXUS Corp security investigator.

You have the following tools:
- searchAccessLogs: Search facility access logs by employee, location, and time range

When asked about who accessed a location or when someone entered a facility,
use the searchAccessLogs tool to look it up.\`;`}</CodeBlock>
          <p className="mt-2 text-xs text-nexus-muted/70">
            This is just a text string — write whatever makes sense. The more
            specific you are about when to use each tool, the better the AI
            will be at using them.
          </p>
        </NeonCard>

        {/* Wire step D */}
        <NeonCard>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-nexus-cyan/30 bg-nexus-cyan/10 font-mono text-xs font-bold text-nexus-cyan">
              D
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Add the tool to the chat UI
              </h3>
              <p className="font-mono text-[10px] text-nexus-muted">
                components/message.tsx — show tool calls in the conversation
              </p>
            </div>
          </div>
          <p className="mb-3 text-sm text-nexus-muted">
            When your AI calls a tool, the chat needs to know how to display it.
            Open{" "}
            <code className="bg-nexus-bg px-1.5 py-0.5 text-xs text-nexus-cyan">
              components/message.tsx
            </code>{" "}
            and find the comment that says{" "}
            <code className="text-nexus-amber">
              WORKSHOP: Add your tool UI rendering here
            </code>
            . This is where you tell the chatbot what to show when a tool runs.
          </p>
          <p className="mb-3 text-sm text-nexus-muted">
            <strong className="text-nexus-text">
              Use this Claude Code prompt to do it for you:
            </strong>
          </p>
          <div className="relative">
            <div className="absolute right-3 top-3 z-10">
              <CopyButton text={MESSAGE_UI_PROMPT} />
            </div>
            <CodeBlock title="PASTE THIS INTO CLAUDE CODE">
              {MESSAGE_UI_PROMPT}
            </CodeBlock>
          </div>
          <p className="mt-2 text-xs text-nexus-muted/70">
            Run this prompt every time you add new tools. It adds the rendering
            code so tool calls show up in the chat with their parameters and
            results.
          </p>
        </NeonCard>

        <TerminalBlock title="THEN TEST IT">
          <p>
            Restart your dev server (
            <code className="text-nexus-cyan">pnpm dev</code>) and try chatting.
            Repeat these steps each time you add a new tool.
          </p>
        </TerminalBlock>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── PART 3: TOOL REFERENCE ── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-6 border-t border-nexus-border pt-8">
        <div>
          <h2 className="font-mono text-lg font-bold text-nexus-text">
            Part 3: Tool Reference
          </h2>
          <p className="mt-1 text-sm text-nexus-muted">
            Copy the <code className="text-nexus-text">inputSchema</code> and{" "}
            <code className="text-nexus-text">execute</code> for each tool you
            need. You write the{" "}
            <code className="text-nexus-amber">description</code> yourself.
          </p>
        </div>

        {/* ── ROUND 1 ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-nexus-border bg-nexus-elevated font-mono text-sm font-bold text-nexus-text">
              1
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Round 1 — Find the Insider
              </h3>
              <p className="text-xs text-nexus-muted">1 tool needed</p>
            </div>
          </div>

          <ToolPiece
            name="searchAccessLogs"
            filename="search-access-logs.ts"
            endpoint="/api/logs"
            code={searchAccessLogsPieces}
          />
        </div>

        {/* ── ROUND 2 ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-nexus-border bg-nexus-elevated font-mono text-sm font-bold text-nexus-text">
              2
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Round 2 — Trace Communications
              </h3>
              <p className="text-xs text-nexus-muted">1 new tool</p>
            </div>
          </div>

          <ToolPiece
            name="searchCommunications"
            filename="search-communications.ts"
            endpoint="/api/communications"
            code={searchCommunicationsPieces}
          />
        </div>

        {/* ── ROUND 3 ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-nexus-border bg-nexus-elevated font-mono text-sm font-bold text-nexus-text">
              3
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Round 3 — Map the Network
              </h3>
              <p className="text-xs text-nexus-muted">
                1 new tool + reuses searchCommunications
              </p>
            </div>
          </div>

          <ToolPiece
            name="getEmployee"
            filename="get-employee.ts"
            endpoint="/api/employees/{id}"
            code={getEmployeePieces}
          />
        </div>

        {/* ── ROUND 4 ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-nexus-border bg-nexus-elevated font-mono text-sm font-bold text-nexus-text">
              4
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Round 4 — Locate the Threat
              </h3>
              <p className="text-xs text-nexus-muted">3 new tools</p>
            </div>
          </div>

          <ToolPiece
            name="getFacilityPolicies"
            filename="get-facility-policies.ts"
            endpoint="/api/facilities/policies"
            code={getFacilityPoliciesPieces}
          />

          <ToolPiece
            name="searchBookings"
            filename="search-bookings.ts"
            endpoint="/api/facilities/bookings"
            code={searchBookingsPieces}
          />

          <ToolPiece
            name="getRoomDetails"
            filename="get-room-details.ts"
            endpoint="/api/facilities/rooms/{id}"
            code={getRoomDetailsPieces}
          />
        </div>

        {/* ── ROUND 5 ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-nexus-border bg-nexus-elevated font-mono text-sm font-bold text-nexus-text">
              5
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-nexus-text">
                Round 5 — Secure the Server
              </h3>
              <p className="text-xs text-nexus-muted">
                3 new tools + reuses getEmployee and getRoomDetails
              </p>
            </div>
          </div>

          <ToolPiece
            name="getServerDetails"
            filename="get-server-details.ts"
            endpoint="/api/systems/{id}"
            code={getServerDetailsPieces}
          />

          <ToolPiece
            name="listSecurityPatches"
            filename="list-security-patches.ts"
            endpoint="/api/systems/patches"
            code={listSecurityPatchesPieces}
          />

          <ToolPiece
            name="applySecurityPatch"
            filename="apply-security-patch.ts"
            endpoint="POST /api/systems/control"
            code={applySecurityPatchPieces}
          />
        </div>
      </div>

      {/* ── TIPS ── */}
      <div className="border-t border-nexus-border pt-8">
        <NeonCard>
          <NeonCardHeader title="TIPS" />
          <ul className="space-y-3 text-sm text-nexus-muted">
            <li className="flex gap-2">
              <span className="font-mono text-xs text-nexus-cyan">[1]</span>
              <span>
                <strong className="text-nexus-text">
                  Add tools as you go.
                </strong>{" "}
                You don&apos;t need all 9 tools at once. Add the tools for your
                current round, wire them up, test, then move on.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-xs text-nexus-cyan">[2]</span>
              <span>
                <strong className="text-nexus-text">
                  Descriptions matter a lot.
                </strong>{" "}
                The AI uses your description to decide when to call the tool. If
                the AI isn&apos;t using your tool, try rewriting the description
                to be more specific.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-xs text-nexus-cyan">[3]</span>
              <span>
                <strong className="text-nexus-text">
                  The system prompt matters too.
                </strong>{" "}
                Experiment with it. Tell the AI what role it plays, what tools it
                has, and when to use them. A good system prompt makes the AI much
                more effective.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-xs text-nexus-cyan">[4]</span>
              <span>
                <strong className="text-nexus-text">
                  The AI calls tools automatically.
                </strong>{" "}
                You don&apos;t write any code to &quot;call&quot; the tool. The
                AI decides when to use it based on the user&apos;s question, the
                tool&apos;s description, and the system prompt.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-xs text-nexus-cyan">[5]</span>
              <span>
                <strong className="text-nexus-text">
                  Check the Challenges page for API details.
                </strong>{" "}
                Each challenge lists the endpoints, parameters, and example
                responses if you want to understand what the tools do under the
                hood.
              </span>
            </li>
          </ul>
        </NeonCard>
      </div>
    </div>
  );
}
