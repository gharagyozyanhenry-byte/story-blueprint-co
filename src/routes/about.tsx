import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import misakPhoto from "@/assets/misak-gharagyozyan.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MathMind Tutoring" },
      {
        name: "description",
        content:
          "Years of classroom and one-on-one tutoring experience helping Glendale students master math at every level.",
      },
      { property: "og:title", content: "About — MathMind Tutoring" },
      { property: "og:description", content: "A guide who gets it — patient, personalized math instruction." },
    ],
  }),
  component: About,
});

const bullets = [
  "Experienced classroom teacher and private tutor",
  "Patient, personalized instruction tailored to your learning style",
  "Proven track record with middle school through college students",
  "Flexible scheduling — evenings & weekends available",
  "Sessions available in-person (Glendale) or online",
];

function About() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-start gap-16 md:grid-cols-[1fr_1.4fr]">
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden rounded-xl border border-gold/40 bg-gradient-to-br from-surface to-card">
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="font-display text-7xl text-gold/40">∑</span>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your Photo Here</p>
              <p className="text-sm text-muted-foreground">Math Expert</p>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>About</SectionLabel>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            Not just a tutor —<br /> a <span className="italic-display">guide</span> who gets it
          </h1>
          <p className="mt-8 text-lg text-muted-foreground">
            With years of classroom teaching and one-on-one tutoring experience, I've helped dozens
            of students across Glendale master math at every level. I understand exactly where
            students struggle — and more importantly, how to fix it.
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            My approach isn't about memorizing formulas. It's about building real intuition so math
            stops being something you survive and starts being something you understand.
          </p>

          <ul className="mt-10 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="mt-12 inline-flex items-center rounded-md bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-gold-foreground transition hover:opacity-90"
          >
            Start with a free consult
          </Link>
        </div>
      </div>
    </section>
  );
}
