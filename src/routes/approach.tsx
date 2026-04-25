import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Approach — MathMind Tutoring" },
      {
        name: "description",
        content:
          "Four steps to mastery: diagnose, personalize, practice, succeed. A structured tutoring process built on real understanding.",
      },
      { property: "og:title", content: "Approach — MathMind Tutoring" },
      { property: "og:description", content: "Four steps to mastery — a structured tutoring process." },
    ],
  }),
  component: Approach,
});

const steps = [
  {
    n: "1",
    title: "Diagnose",
    body: "A free consultation to identify exactly where the gaps are and what's holding you back.",
  },
  {
    n: "2",
    title: "Personalize",
    body: "Build a custom learning plan around your pace, goals, curriculum, and upcoming exams.",
  },
  {
    n: "3",
    title: "Practice",
    body: "Structured sessions focused on genuine understanding — not tricks and shortcuts that fade.",
  },
  {
    n: "4",
    title: "Succeed",
    body: "Walk into tests confident, ready, and equipped with skills that last well beyond the class.",
  },
];

function Approach() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>The Process</SectionLabel>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          Four steps to <span className="italic-display">mastery</span>
        </h1>
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative">
            <div className="font-display text-7xl text-gold/30">{s.n}</div>
            <h3 className="mt-4 font-display text-2xl text-foreground">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            {i < steps.length - 1 && (
              <div className="absolute top-12 right-0 hidden h-px w-1/3 bg-gradient-to-r from-gold/40 to-transparent lg:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
