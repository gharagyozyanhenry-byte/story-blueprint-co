import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE_URL, canonical } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Math Tutoring Pricing — Glendale, CA | MathMind" },
      {
        name: "description",
        content:
          "Simple, transparent rates. Single sessions $65/hr, monthly packages $55/hr, exam prep $75/hr. First consultation is free.",
      },
      { property: "og:title", content: "Math Tutoring Pricing | MathMind" },
      {
        property: "og:description",
        content: "Single sessions, monthly packages, and exam prep — first consult always free.",
      },
      { property: "og:url", content: SITE_URL + "/pricing" },
    ],
    links: canonical("/pricing"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much does math tutoring cost?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Single sessions are $65/hour, monthly packages are $55/hour (8 sessions/month), and exam prep is $75/hour. The first consultation is free.",
              },
            },
            {
              "@type": "Question",
              name: "How long is each session?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "All sessions are 60 minutes and can be held in-person in Glendale, CA or online.",
              },
            },
            {
              "@type": "Question",
              name: "Is the first consultation really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — the first 30-minute consultation is completely free with no obligation.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Single Session",
    price: "$65",
    sub: "per hour",
    features: [
      "One-on-one instruction",
      "Customized to your topic",
      "Session notes provided",
      "In-person or online",
    ],
    featured: false,
  },
  {
    name: "Monthly Package",
    price: "$55",
    sub: "per hour · 8 sessions/month",
    features: [
      "Everything in Single",
      "Priority scheduling",
      "Progress tracking & reports",
      "Homework support via email",
    ],
    featured: true,
  },
  {
    name: "Exam Prep",
    price: "$75",
    sub: "per hour",
    features: [
      "AP, SAT, ACT math focus",
      "Timed practice tests",
      "Targeted weak-point drills",
      "Score guarantee strategy",
    ],
    featured: false,
  },
];

function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          Simple, <span className="italic-display">transparent</span> rates
        </h1>
        <p className="mt-6 text-muted-foreground">
          All sessions are 60 minutes. First consultation is free.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border bg-card/40 p-8 ${
              p.featured ? "border-gold shadow-[0_0_60px_-20px_oklch(0.78_0.13_80/0.4)]" : "border-border"
            }`}
          >
            {p.featured && (
              <p className="mb-4 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
                Most popular
              </p>
            )}
            <h3 className="font-display text-2xl">{p.name}</h3>
            <p className="mt-6 font-display text-6xl text-gold">{p.price}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.sub}</p>
            <ul className="mt-8 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`mt-10 inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] transition ${
                p.featured
                  ? "bg-gold text-gold-foreground hover:opacity-90"
                  : "border border-border text-foreground hover:bg-surface"
              }`}
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
