import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — MathMind Tutoring" },
      {
        name: "description",
        content:
          "Algebra, geometry, trigonometry, pre-calculus, calculus, statistics and more — every level taught with clarity.",
      },
      { property: "og:title", content: "Subjects — MathMind Tutoring" },
      { property: "og:description", content: "Every level, every topic — math built from the ground up." },
    ],
  }),
  component: Subjects,
});

const subjects = [
  {
    symbol: "x²",
    title: "Algebra I & II",
    body: "Variables, equations, inequalities, quadratics, polynomials — built from the ground up with clarity.",
    level: "Middle · High School",
  },
  {
    symbol: "△",
    title: "Geometry",
    body: "Proofs, properties, area, volume, and spatial reasoning that builds real mathematical thinking.",
    level: "Middle · High School",
  },
  {
    symbol: "sin",
    title: "Trigonometry",
    body: "Unit circle, identities, waves, and applications that make trig intuitive rather than memorized.",
    level: "High School",
  },
  {
    symbol: "f(x)",
    title: "Pre-Calculus",
    body: "Functions, limits, and the bridge between algebra and calculus — setting students up to succeed.",
    level: "High School",
  },
  {
    symbol: "∫",
    title: "Calculus (AP & College)",
    body: "Limits, derivatives, integrals — the language of change, taught with deep intuition.",
    level: "AP · College",
  },
  {
    symbol: "σ",
    title: "Statistics",
    body: "Probability, distributions, hypothesis testing — clear thinking with data.",
    level: "AP · College",
  },
];

function Subjects() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Subjects</SectionLabel>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          Every level, <span className="italic-display">every topic</span>
        </h1>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <div
            key={s.title}
            className="group rounded-xl border border-border bg-card/40 p-8 transition hover:border-gold/50 hover:bg-card/70"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-md border border-gold/40 font-display text-2xl text-gold">
              {s.symbol}
            </div>
            <h3 className="font-display text-2xl text-foreground">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-accent">{s.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
