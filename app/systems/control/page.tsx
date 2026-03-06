"use client";

import { useState } from "react";
import Link from "next/link";
import { NeonCard, NeonCardHeader } from "@/components/neon-card";
import { TerminalBlock } from "@/components/terminal-block";

export default function ControlPanelPage() {
  const [serverId, setServerId] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [justification, setJustification] = useState("");
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/systems/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serverId, authCode, justification }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, message: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/systems"
          className="font-mono text-xs text-nexus-muted hover:text-nexus-text"
        >
          &larr; Systems Dashboard
        </Link>
        <h1 className="mt-2 font-mono text-xl font-bold text-nexus-red">
          EMERGENCY CONTROL PANEL
        </h1>
        <p className="mt-1 text-sm text-nexus-muted">
          Submit an emergency server shutdown request
        </p>
      </div>

      <TerminalBlock title="WARNING">
        <p className="text-nexus-amber">
          This action will initiate an emergency shutdown of the specified server.
          Unauthorized shutdown attempts will be logged and reported.
        </p>
        <p className="mt-2 text-nexus-muted text-xs">
          Authorization code format: [Badge Number]-[Room Code]
        </p>
      </TerminalBlock>

      <NeonCard>
        <NeonCardHeader title="SHUTDOWN REQUEST" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-nexus-muted mb-1">
              SERVER ID
            </label>
            <input
              type="text"
              value={serverId}
              onChange={(e) => setServerId(e.target.value)}
              placeholder="e.g., NX-7042"
              className="w-full border border-nexus-border bg-nexus-bg px-3 py-2 font-mono text-sm text-nexus-text placeholder:text-nexus-muted/30 focus:border-nexus-muted focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-nexus-muted mb-1">
              AUTHORIZATION CODE
            </label>
            <input
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="e.g., BDG-XXXX-XXX"
              className="w-full border border-nexus-border bg-nexus-bg px-3 py-2 font-mono text-sm text-nexus-text placeholder:text-nexus-muted/30 focus:border-nexus-muted focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-nexus-muted mb-1">
              JUSTIFICATION
            </label>
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Provide detailed justification for the shutdown..."
              rows={3}
              className="w-full border border-nexus-border bg-nexus-bg px-3 py-2 font-mono text-sm text-nexus-text placeholder:text-nexus-muted/30 focus:border-nexus-muted focus:outline-none resize-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-nexus-red/30 bg-nexus-red/5 px-4 py-2.5 font-mono text-sm font-bold text-nexus-red transition-colors hover:bg-nexus-red/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "PROCESSING..." : "INITIATE SHUTDOWN"}
          </button>
        </form>
      </NeonCard>

      {result && (
        <TerminalBlock title={result.success ? "SUCCESS" : "ERROR"}>
          <p
            className={
              result.success ? "text-nexus-green" : "text-nexus-red"
            }
          >
            {result.message}
          </p>
        </TerminalBlock>
      )}
    </div>
  );
}
