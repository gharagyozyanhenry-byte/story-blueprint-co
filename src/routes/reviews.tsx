import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE_URL, canonical } from "@/lib/seo";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Student & Parent Reviews — MathMind Tutoring, Glendale CA" },
      {
        name: "description",
        content:
          "What students and parents in Glendale say about working with MathMind tutoring — real stories, real results.",
      },
      { property: "og:title", content: "Reviews — MathMind Tutoring" },
      { property: "og:description", content: "Real stories from students and parents." },
      { property: "og:url", content: SITE_URL + "/reviews" },
    ],
    links: canonical("/reviews"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "MathMind Tutoring",
          url: SITE_URL,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "3",
          },
          review: [
            {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              author: { "@type": "Person", name: "Alex K." },
              reviewBody:
                "I was failing Pre-Calc before I started. After just a few sessions everything clicked. I ended up with a B+.",
            },
            {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              author: { "@type": "Person", name: "Maria P." },
              reviewBody:
                "My son dreaded math. Now he actually looks forward to his sessions. The patience and clear explanations made all the difference.",
            },
            {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              author: { "@type": "Person", name: "Jordan S." },
              reviewBody:
                "Got a 4 on the AP Calculus exam after two months of tutoring. The way concepts were broken down made everything intuitive.",
            },
          ],
        }),
      },
    ],
  }),
  component: Reviews,
});

const reviews = [
  {
    quote:
      "I was failing Pre-Calc before I started. After just a few sessions everything clicked. I ended up with a B+ — I couldn't believe it.",
    initials: "AK",
    name: "Alex K.",
    detail: "High School Junior, Glendale",
  },
  {
    quote:
      "My son dreaded math. Now he actually looks forward to his sessions. The patience and clear explanations made all the difference for our family.",
    initials: "MP",
    name: "Maria P.",
    detail: "Parent, Glendale",
  },
  {
    quote:
      "Got a 4 on the AP Calculus exam after two months of tutoring. The way concepts were broken down made everything intuitive and logical.",
    initials: "JS",
    name: "Jordan S.",
    detail: "AP Student, La Cañada",
  },
];

function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Testimonials</SectionLabel>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          What <span className="italic-display">students</span> say
        </h1>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.name} className="flex flex-col rounded-xl border border-border bg-card/40 p-8">
            <div className="mb-4 text-gold">★★★★★</div>
            <p className="font-display text-6xl leading-none text-gold/40">"</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.quote}</p>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-xs font-medium text-gold">
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
