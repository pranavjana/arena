"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="border border-nexus-border bg-nexus-elevated px-3 py-1.5 font-mono text-xs text-nexus-muted transition-colors hover:text-nexus-text hover:border-nexus-muted"
    >
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}
