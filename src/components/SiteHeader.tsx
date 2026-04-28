import { Link } from "@tanstack/react-router";
import { useState } from "react";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/subjects", label: "Subjects" },
  { to: "/approach", label: "Approach" },
  { to: "/reviews", label: "Reviews" },
  { to: "/pricing", label: "Pricing" },
  { to: "/grants", label: "Grants" },
  { to: "/blog", label: "Blog" },
  { to: "/tools", label: "Tools" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-2xl tracking-tight">
          <span className="font-display">Math</span>
          <span className="font-display italic-display">Mind</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden items-center rounded-md border border-gold/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-gold-foreground md:inline-flex"
        >
          Book a session
        </Link>

        <button
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-6 py-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-[0.18em] text-muted-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-md border border-gold/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold"
          >
            Book a session
          </Link>
        </nav>
      )}
    </header>
  );
}
