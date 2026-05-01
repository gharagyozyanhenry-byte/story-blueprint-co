import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE_URL, canonical } from "@/lib/seo";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Math Subjects We Teach — Algebra to Calculus | MathMind" },
      {
        name: "description",
        content:
          "Algebra, geometry, trigonometry, pre-calculus, calculus, statistics and more — every level taught with clarity in Glendale, CA.",
      },
      { property: "og:title", content: "Math Subjects We Teach | MathMind" },
      { property: "og:description", content: "Every level, every topic — math built from the ground up." },
      { property: "og:url", content: SITE_URL + "/subjects" },
    ],
    links: canonical("/subjects"),
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

const gradeLevels = [
  { label: "Elementary", detail: "5th grade math" },
  { label: "Middle school", detail: "6th, 7th & 8th grade" },
  { label: "High school", detail: "9th, 10th, 11th, 12th grade" },
  { label: "College", detail: "Calc I/II/III, Linear Algebra, Discrete, Stats" },
  { label: "Adult learners", detail: "Returning students & career changers" },
  { label: "Homeschool", detail: "Curriculum support, K–12" },
  { label: "IB & AP", detail: "IB Math AA/AI, AP Calc, AP Stats" },
  { label: "Olympiad / AMC", detail: "Competition & enrichment track" },
];

const exams = [
  { name: "SAT Math", body: "All four content areas with timed practice and targeted drills." },
  { name: "ACT Math", body: "Pacing strategy plus the algebra, geometry, and trig the test rewards." },
  { name: "AP Calculus AB & BC", body: "Concept mastery and exam strategy for a 4 or 5." },
  { name: "AP Statistics", body: "Inference, design, and FRQ writing." },
  { name: "GED Math", body: "Adult-friendly review from arithmetic through algebra and geometry." },
  { name: "GRE Quantitative", body: "Quant comparison, problem-solving, and data interpretation." },
  { name: "Nursing entrance (TEAS, HESI)", body: "The math sections demystified for adult learners." },
  { name: "College placement", body: "Avoid remedial math — pass the placement test the first time." },
];

function Subjects() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Subjects</SectionLabel>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          Every level, <span className="italic-display">every topic</span>
        </h1>
        <p className="mt-6 text-muted-foreground">
          From 5th-grade fractions to college calculus, SAT prep to GED review.
        </p>
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

      <div className="mt-24">
        <div className="text-center">
          <SectionLabel>Grade levels &amp; learners</SectionLabel>
          <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
            From 5th grade to <span className="italic-display">graduate prep</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {gradeLevels.map((g) => (
            <div key={g.label} className="rounded-xl border border-border bg-card/40 p-5">
              <p className="font-display text-lg text-gold">{g.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{g.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <div className="text-center">
          <SectionLabel>Exam prep</SectionLabel>
          <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
            Standardized &amp; placement tests
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {exams.map((e) => (
            <div key={e.name} className="rounded-xl border border-border bg-card/40 p-6">
              <h3 className="font-display text-lg">{e.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
