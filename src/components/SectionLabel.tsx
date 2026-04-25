export function SectionLabel({ children, accent = "gold" }: { children: React.ReactNode; accent?: "gold" | "teal" }) {
  const color = accent === "teal" ? "text-accent" : "text-gold";
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className={`h-px w-10 ${accent === "teal" ? "bg-accent" : "bg-gold"}`} />
      <span className={`text-xs uppercase tracking-[0.25em] ${color}`}>{children}</span>
    </div>
  );
}
