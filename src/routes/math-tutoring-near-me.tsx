import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE_URL, canonical } from "@/lib/seo";

export const Route = createFileRoute("/math-tutoring-near-me")({
  head: () => ({
    meta: [
      { title: "Math Tutors Near Me — Glendale & Greater LA | MathMind" },
      {
        name: "description",
        content:
          "Looking for a math tutor near you? Private in-person tutoring in Glendale and Greater LA, plus online sessions nationwide. Algebra, calculus, SAT/ACT, GED, college math. Rates from $55/hr. Free first consult.",
      },
      {
        name: "keywords",
        content:
          "math tutors near me, math tutor near me, math tutoring near me, private math tutor, affordable math tutor, online math tutor, in-person math tutor, calculus tutor, algebra tutor, SAT math tutor, ACT math tutor, GED math tutor, math tutor for adults, math tutor for high school, college math tutor, math tutor Glendale, math tutor Los Angeles",
      },
      { property: "og:title", content: "Math Tutors Near Me — Glendale & Greater LA | MathMind" },
      {
        property: "og:description",
        content:
          "Private in-person tutoring in Glendale & Greater LA, plus online sessions nationwide. Every level, every exam.",
      },
      { property: "og:url", content: SITE_URL + "/math-tutoring-near-me" },
    ],
    links: canonical("/math-tutoring-near-me"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Math Tutoring",
          provider: {
            "@type": "EducationalOrganization",
            name: "MathMind Tutoring",
            url: SITE_URL,
          },
          areaServed: [
            { "@type": "City", name: "Glendale, CA" },
            { "@type": "City", name: "Los Angeles, CA" },
            { "@type": "City", name: "Hollywood, CA" },
            { "@type": "City", name: "Eagle Rock, CA" },
            { "@type": "City", name: "Silver Lake, CA" },
            { "@type": "Country", name: "United States" },
          ],
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: "55",
            highPrice: "75",
          },
          url: SITE_URL + "/math-tutoring-near-me",
        }),
      },
    ],
  }),
  component: NearMePage,
});

const cities = [
  "Glendale",
  "Los Angeles",
  "Hollywood",
  "Eagle Rock",
  "Silver Lake",
  "Burbank",
  "Pasadena",
  "La Cañada",
  "La Crescenta",
  "Atwater Village",
];

const audiences = [
  {
    title: "For high school students",
    body: "Algebra 1 & 2, Geometry, Trigonometry, Pre-Calculus, AP Calculus AB/BC, AP Statistics — for 9th, 10th, 11th and 12th grade students across LA County.",
  },
  {
    title: "For middle school students",
    body: "5th, 6th, 7th, and 8th grade math — building the number sense and pre-algebra foundation that makes everything after it easier.",
  },
  {
    title: "For college students",
    body: "Calculus I/II/III, Linear Algebra, Differential Equations, Discrete Math, Statistics, and college-level proof writing.",
  },
  {
    title: "For adult learners",
    body: "Returning to school, prepping for the GED, GRE, nursing entrance exams, or just finally learning the math you wish you'd been taught the first time.",
  },
  {
    title: "For exam prep",
    body: "SAT Math, ACT Math, AP exams, GED, GRE Quantitative — timed practice, score-targeted drills, and the strategies that actually move scores.",
  },
  {
    title: "For homeschool & enrichment",
    body: "Curriculum support for homeschool families and enrichment for students who want to go beyond what their school offers — including IB, competition prep, and Olympiad track.",
  },
];

const reasons = [
  {
    title: "Real one-on-one teaching",
    body: "Every session is private. No rotating tutors, no shared whiteboards with three other kids — just focused work with a math educator who knows your student.",
  },
  {
    title: "In-person or online — same teacher",
    body: "Meet in Glendale or anywhere in Greater LA, or work over a shared whiteboard online from anywhere in the U.S. Same instructor either way.",
  },
  {
    title: "Transparent rates",
    body: "$55/hr in monthly packages, $65/hr single sessions, $75/hr exam prep. First 30-minute consult is free with no obligation.",
  },
  {
    title: "Built by an MBA & lifelong educator",
    body: "Founded by Misak Gharagyozyan — math doesn't have to be memorized to be mastered. We teach the why behind every formula.",
  },
];

const faqs = [
  {
    q: "How much do math tutors near me cost?",
    a: "Our rates are $55/hour in monthly packages, $65/hour for single sessions, and $75/hour for exam prep (SAT, ACT, AP, GED). Most local in-person tutors in the Glendale and Greater LA area charge between $50 and $120/hour, so we sit at the affordable end while staying fully one-on-one.",
  },
  {
    q: "Do you offer in-person tutoring near me?",
    a: "Yes — we tutor in-person in Glendale, CA and travel throughout Greater LA including Los Angeles, Hollywood, Eagle Rock, Silver Lake, Burbank, Pasadena, La Cañada, and La Crescenta. We also offer online sessions for students anywhere in the United States.",
  },
  {
    q: "Do you tutor adults?",
    a: "Yes. A meaningful portion of our students are adults — returning to college, prepping for the GED, GRE, nursing entrance exams, or simply rebuilding math skills for work or personal goals. No judgment, no embarrassment, just clear teaching.",
  },
  {
    q: "What grade levels do you cover?",
    a: "Every grade from 5th through 12th, plus all college-level math (Calculus I, II, III, Linear Algebra, Differential Equations, Discrete Math, Statistics) and adult learners.",
  },
  {
    q: "Do you tutor for the SAT and ACT?",
    a: "Yes. Our exam-prep track focuses on the math sections of the SAT and ACT, plus AP Calculus AB/BC, AP Statistics, GED math, and GRE Quantitative. We use timed practice tests and target the specific question types each student misses.",
  },
  {
    q: "Are online sessions as effective as in-person?",
    a: "For most students, yes. We use a shared digital whiteboard and screen-sharing so the working pad is identical to sitting next to each other. Younger students (5th–7th grade) sometimes do better in-person — we'll recommend whichever fits.",
  },
  {
    q: "How do I find a math tutor near me that I can trust?",
    a: "Read real reviews (ours are on the Reviews page), book a free consult to meet the actual tutor — not a coordinator — and ask how they approach a topic your student is currently stuck on. Any tutor worth hiring will happily teach you something for free in 15 minutes.",
  },
  {
    q: "Is there a free consultation?",
    a: "Yes. The first 30-minute consultation is completely free. We use it to understand where the student is, what's been tried, and what success looks like — no contract, no pressure.",
  },
];

function NearMePage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <SectionLabel>Math Tutors Near You</SectionLabel>
          <h1 className="font-display mt-4 text-5xl tracking-tight md:text-6xl">
            Looking for a <span className="italic-display">math tutor near you?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Private, one-on-one math tutoring in Glendale and Greater Los Angeles — and online
            anywhere in the U.S. From 5th-grade fractions to college calculus, SAT prep to GED
            review. The first 30-minute consultation is free.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-gold-foreground hover:opacity-90"
            >
              Book a free consult
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] hover:bg-surface"
            >
              See rates
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            In-person · Online · Evenings &amp; weekends
          </p>
        </div>
      </section>

      {/* Service area */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>Where we tutor</SectionLabel>
        <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
          Serving Glendale &amp; Greater Los Angeles in person — the U.S. online
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Our home base is Glendale, CA. We travel for in-person sessions throughout the Greater
          LA area, and we serve students nationwide through our online classroom.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {cities.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm text-muted-foreground"
            >
              {c}
            </span>
          ))}
          <span className="rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-sm text-gold">
            + Online (U.S. nationwide)
          </span>
        </div>
      </section>

      {/* Audiences */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>Who we tutor</SectionLabel>
          <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
            Every level, every learner
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-border bg-card/40 p-6 transition hover:border-gold/50"
              >
                <h3 className="font-display text-xl">{a.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>Why families choose MathMind</SectionLabel>
        <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
          What makes a math tutor actually <span className="italic-display">worth it</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card/40 p-6">
              <h3 className="font-display text-xl text-gold">{r.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionLabel>Frequently asked</SectionLabel>
          <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
            Questions parents &amp; students ask
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border bg-card/40 p-6 open:border-gold/50"
              >
                <summary className="cursor-pointer list-none font-display text-lg text-foreground transition group-open:text-gold">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* FAQ schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Ready to find your math tutor?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Book a free 30-minute consultation. We'll meet your student, talk through where they're
          stuck, and decide together whether we're the right fit.
        </p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-gold-foreground hover:opacity-90"
          >
            Book your free consult
          </Link>
        </div>
      </section>
    </div>
  );
}
