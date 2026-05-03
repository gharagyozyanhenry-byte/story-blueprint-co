import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE_URL, canonical } from "@/lib/seo";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Math Tools & Calculators — Free Online Math Calculators | MathMind" },
      {
        name: "description",
        content:
          "Free online math calculators: scientific, algebra, fractions, percentage, equation solver, derivative, integral, matrix, statistics, and unit converter.",
      },
      { name: "keywords", content: "math calculator, scientific calculator, algebra solver, derivative calculator, integral calculator, matrix calculator, fraction calculator, percentage calculator, statistics calculator, equation solver, unit converter" },
      { property: "og:title", content: "Math Tools & Calculators | MathMind" },
      { property: "og:description", content: "10 free, trusted math calculators in one place — from scientific to calculus and statistics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Math Tools & Calculators | MathMind" },
      { name: "twitter:description", content: "10 free math calculators in one place." },
      { property: "og:url", content: SITE_URL + "/tools" },
    ],
    links: canonical("/tools"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Math Tools & Calculators",
          itemListElement: TOOLS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.name,
            url: t.url,
          })),
        }),
      },
    ],
  }),
  component: ToolsPage,
});

type Tool = {
  name: string;
  description: string;
  url: string;
  tag: string;
  bestFor: string;
};

const TOOLS: Tool[] = [
  {
    name: "Desmos Scientific Calculator",
    description: "Polished scientific calculator with trig, logs, exponents, and parentheses-aware input.",
    url: "https://www.desmos.com/scientific",
    tag: "Scientific",
    bestFor: "Daily homework",
  },
  {
    name: "Desmos Graphing Calculator",
    description: "Plot any function, sliders, regressions, intersections — the standard for graphing.",
    url: "https://www.desmos.com/calculator",
    tag: "Graphing",
    bestFor: "Algebra II → Calculus",
  },
  {
    name: "GeoGebra Geometry",
    description: "Construct points, lines, circles, transformations — perfect for geometry proofs.",
    url: "https://www.geogebra.org/geometry",
    tag: "Geometry",
    bestFor: "Geometry & constructions",
  },
  {
    name: "Symbolab Equation Solver",
    description: "Step-by-step solutions for equations, inequalities, and systems.",
    url: "https://www.symbolab.com/solver",
    tag: "Algebra",
    bestFor: "Showing your work",
  },
  {
    name: "Wolfram|Alpha",
    description: "Computational engine — solves nearly any math problem with explanations and graphs.",
    url: "https://www.wolframalpha.com/",
    tag: "All-purpose",
    bestFor: "When you're stuck",
  },
  {
    name: "Symbolab Derivative Calculator",
    description: "Compute derivatives with full step-by-step working — chain rule, product rule, implicit.",
    url: "https://www.symbolab.com/solver/derivative-calculator",
    tag: "Calculus",
    bestFor: "Calculus I",
  },
  {
    name: "Symbolab Integral Calculator",
    description: "Definite and indefinite integrals with substitution, parts, and partial fractions shown.",
    url: "https://www.symbolab.com/solver/integral-calculator",
    tag: "Calculus",
    bestFor: "Calculus II",
  },
  {
    name: "Matrix Calculator",
    description: "Determinants, inverses, eigenvalues, row reduction — clean output for linear algebra.",
    url: "https://matrixcalc.org/",
    tag: "Linear Algebra",
    bestFor: "Matrices & systems",
  },
  {
    name: "CalculatorSoup Statistics",
    description: "Mean, median, standard deviation, variance, quartiles — paste a list and go.",
    url: "https://www.calculatorsoup.com/calculators/statistics/descriptivestatistics.php",
    tag: "Statistics",
    bestFor: "Stats homework",
  },
  {
    name: "Unit & Fraction Converter",
    description: "Convert units, simplify fractions, and convert between fractions, decimals, and percents.",
    url: "https://www.calculator.net/fraction-calculator.html",
    tag: "Utilities",
    bestFor: "Quick conversions",
  },
];

function ToolsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionLabel>Math Tools</SectionLabel>
          <h1 className="font-display mt-4 text-5xl tracking-tight md:text-6xl">
            10 calculators every <span className="italic-display">math student</span> should know
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A hand-picked toolkit — from a quick scientific calculator to graphing, calculus, linear algebra, and
            statistics. All free, all trusted, all in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>The toolkit</SectionLabel>
        <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">Pick the right tool for the job</h2>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.name}>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border/60 bg-card p-6 transition hover:border-gold/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl transition group-hover:text-gold">{t.name}</h3>
                  <span className="rounded-full border border-border/60 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.tag}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.description}</p>
                <div className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Best for — {t.bestFor}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            Need help using one of these?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We teach students how to use these tools properly — not as a shortcut, but to check their work and explore
            ideas faster. Bring any of them to your next session.
          </p>
        </div>
      </section>
    </div>
  );
}
