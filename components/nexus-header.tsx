import Link from "next/link";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/challenges", label: "Challenges" },
  { href: "/employees", label: "Employees" },
  { href: "/logs", label: "Access Logs" },
  { href: "/communications", label: "Comms" },
  { href: "/facilities", label: "Facilities" },
  { href: "/systems", label: "Systems" },
];

export function NexusHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-nexus-border bg-nexus-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center border border-nexus-border bg-nexus-elevated">
            <span className="font-mono text-xs font-bold text-nexus-text">N</span>
          </div>
          <div>
            <span className="font-mono text-sm font-bold tracking-widest text-nexus-text">
              NEXUS
            </span>
            <span className="ml-2 font-mono text-xs text-nexus-muted">
              CORP
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 font-mono text-xs text-nexus-muted transition-colors hover:text-nexus-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border border-nexus-red/20 px-2.5 py-1 font-mono text-xs text-nexus-red">
            <span className="h-1.5 w-1.5 bg-nexus-red animate-pulse-glow" />
            ALERT
          </span>
        </div>
      </div>
    </header>
  );
}
