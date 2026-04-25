import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import heroClassroom from "@/assets/hero-classroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MathMind — Private Math Tutoring in Glendale, CA" },
      {
        name: "description",
        content:
          "Math that finally makes sense. Private tutoring with a dedicated educator — algebra, geometry, trig, pre-calc and beyond. Glendale, California.",
      },
      { property: "og:title", content: "MathMind — Private Math Tutoring in Glendale, CA" },
      {
        property: "og:description",
        content: "Private math tutoring with a dedicated educator who turns frustration into confidence.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "5+", label: "Years of Teaching" },
  { value: "100+", label: "Students Helped" },
  { value: "95%", label: "Grade Improvement" },
  { value: "4+", label: "Subjects Covered" },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.78_0.13_80/0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,oklch(0.78_0.12_180/0.06),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <SectionLabel accent="teal">Glendale, California</SectionLabel>
            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
              Math that <span className="italic-display">finally</span>
              <br />
              makes sense
            </h1>
            <p className="mt-8 max-w-md text-lg text-muted-foreground">
              Private math tutoring with a dedicated educator who turns frustration into confidence —
              from algebra to calculus and beyond.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-gold-foreground transition hover:opacity-90"
              >
                Book a Free Consultation
              </Link>
              <Link
                to="/subjects"
                className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition hover:bg-surface"
              >
                See All Subjects
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-gold/30 bg-card/60 p-8 shadow-[0_0_60px_-20px_oklch(0.78_0.13_80/0.3)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Today's concept</p>
              <p className="mt-6 font-display text-5xl text-gold">
                ∫ xe<sup>x</sup> dx
              </p>
              <div className="my-6 h-px bg-border" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Integration by parts: ∫u dv = uv − ∫v du. Let u = x and dv = eˣ dx — a powerful
                technique that transforms complex integrals into manageable steps.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-y border-border/60 bg-surface/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-display text-4xl text-gold">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA preview blocks */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Every level", body: "Algebra through calculus, taught with patience and clarity.", to: "/subjects" },
            { title: "A clear process", body: "Diagnose, personalize, practice, succeed — four steps to mastery.", to: "/approach" },
            { title: "Transparent pricing", body: "Single sessions, monthly packages, and exam-prep tracks.", to: "/pricing" },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group rounded-xl border border-border bg-card/40 p-8 transition hover:border-gold/50 hover:bg-card/70"
            >
              <h3 className="font-display text-2xl text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
              <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-gold transition group-hover:translate-x-1">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
