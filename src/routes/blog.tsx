import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Math Blog — News, Ideas & Resources | MathMind Tutoring" },
      {
        name: "description",
        content:
          "Curated math news, breakthroughs, and resources for students who love mathematics — from Quanta, Numberphile, AMS, and more.",
      },
      { property: "og:title", content: "Math Blog — News, Ideas & Resources | MathMind" },
      {
        property: "og:description",
        content:
          "What's happening in the math universe — breakthroughs, beautiful ideas, and resources for math enthusiasts.",
      },
    ],
  }),
  component: BlogPage,
});

type Post = {
  title: string;
  source: string;
  date: string;
  category: string;
  excerpt: string;
  url: string;
};

const posts: Post[] = [
  {
    title: "After 125 Years, Hilbert's Sixth Problem Sees a Major Breakthrough",
    source: "Quanta Magazine",
    date: "2025",
    category: "Breakthrough",
    excerpt:
      "Three mathematicians have made dramatic progress on Hilbert's sixth problem, deriving the equations of fluid motion rigorously from Newton's laws of particles.",
    url: "https://www.quantamagazine.org/",
  },
  {
    title: "AI Models Are Starting to Help Mathematicians Discover New Theorems",
    source: "Nature",
    date: "2024",
    category: "AI & Math",
    excerpt:
      "DeepMind's AlphaProof and AlphaGeometry 2 reached silver-medal performance at the International Mathematical Olympiad — a milestone for machine reasoning.",
    url: "https://www.nature.com/articles/d41586-024-02441-2",
  },
  {
    title: "The Largest Known Prime Has Over 41 Million Digits",
    source: "GIMPS / Mersenne.org",
    date: "Oct 2024",
    category: "Number Theory",
    excerpt:
      "Luke Durant discovered M136279841, the 52nd known Mersenne prime — the first found using GPU computation, ending a six-year drought.",
    url: "https://www.mersenne.org/primes/",
  },
  {
    title: "Mathematicians Finally Solved the Moving Sofa Problem",
    source: "Quanta Magazine",
    date: "2024",
    category: "Geometry",
    excerpt:
      "A 60-year-old puzzle about the largest shape that can navigate an L-shaped corridor has a proposed proof — Gerver's constant ≈ 2.2195.",
    url: "https://www.quantamagazine.org/",
  },
  {
    title: "The 2024 Fields Medals: Four Mathematicians Honored",
    source: "International Mathematical Union",
    date: "2022 / next 2026",
    category: "Awards",
    excerpt:
      "June Huh, Maryna Viazovska, James Maynard, and Hugo Duminy-Copin received the Fields Medal — including the second woman ever to win.",
    url: "https://www.mathunion.org/imu-awards/fields-medal",
  },
  {
    title: "Why Is This Shape So Hard to Find? Aperiodic Monotile 'The Hat'",
    source: "Numberphile (YouTube)",
    date: "2023",
    category: "Tiling",
    excerpt:
      "A retired printing-systems engineer discovered the first single-tile shape that tiles the plane only non-periodically — solving a 60-year-old open question.",
    url: "https://www.youtube.com/@numberphile",
  },
  {
    title: "Terence Tao on How AI Will Change Mathematics",
    source: "Scientific American",
    date: "2024",
    category: "Interview",
    excerpt:
      "Fields medalist Terence Tao explains how proof assistants like Lean and large language models are quietly transforming how mathematicians work.",
    url: "https://www.scientificamerican.com/",
  },
  {
    title: "The Riemann Hypothesis: A New Bound on the Zeros",
    source: "AMS Notices",
    date: "2024",
    category: "Open Problems",
    excerpt:
      "Larry Guth and James Maynard improved a key estimate that has stood since 1940 — a small but real step toward the most famous unsolved problem in math.",
    url: "https://www.ams.org/journals/notices",
  },
  {
    title: "How a Teenager Solved a Stubborn Combinatorics Puzzle",
    source: "Quanta Magazine",
    date: "2024",
    category: "Young Mathematicians",
    excerpt:
      "Daniel Larsen — still a teenager — proved a long-conjectured result about Carmichael numbers, showing that originality matters more than seniority.",
    url: "https://www.quantamagazine.org/",
  },
  {
    title: "The Beauty of Euler's Identity: e^(iπ) + 1 = 0",
    source: "3Blue1Brown",
    date: "Evergreen",
    category: "Visual Math",
    excerpt:
      "Grant Sanderson's animated explanation of why the most famous equation in math is really a story about rotation in the complex plane.",
    url: "https://www.3blue1brown.com/",
  },
];

type Resource = {
  name: string;
  description: string;
  url: string;
  tag: string;
};

const studentResources: Resource[] = [
  {
    name: "Art of Problem Solving (AoPS)",
    description:
      "The gold standard for competition math — courses, books (AoPS, Beast Academy), and an active community of math students worldwide.",
    url: "https://artofproblemsolving.com/",
    tag: "Competition",
  },
  {
    name: "Khan Academy — Math",
    description: "Free, structured lessons from arithmetic through multivariable calculus and linear algebra.",
    url: "https://www.khanacademy.org/math",
    tag: "Self-study",
  },
  {
    name: "3Blue1Brown",
    description: "Grant Sanderson's animated essays on linear algebra, calculus, neural nets, and the beauty of math.",
    url: "https://www.3blue1brown.com/",
    tag: "Visual",
  },
  {
    name: "Numberphile",
    description: "Friendly video interviews with leading mathematicians on surprising and beautiful results.",
    url: "https://www.numberphile.com/",
    tag: "Video",
  },
  {
    name: "Brilliant.org",
    description: "Interactive problem-based courses — great for building real intuition, not just memorizing.",
    url: "https://brilliant.org/",
    tag: "Interactive",
  },
  {
    name: "Project Euler",
    description: "300+ math + programming problems that get progressively harder. Perfect for curious problem-solvers.",
    url: "https://projecteuler.net/",
    tag: "Problems",
  },
  {
    name: "MIT OpenCourseWare — Mathematics",
    description: "Full lecture notes, problem sets, and video lectures from MIT's undergraduate and graduate math courses.",
    url: "https://ocw.mit.edu/courses/mathematics/",
    tag: "University",
  },
  {
    name: "Quanta Magazine — Mathematics",
    description: "Beautifully written reporting on the most important new ideas and results in modern mathematics.",
    url: "https://www.quantamagazine.org/mathematics/",
    tag: "News",
  },
  {
    name: "AMC / AIME / USAMO (MAA)",
    description: "The U.S. math olympiad pipeline — the path from your high school classroom to the IMO.",
    url: "https://maa.org/student-programs/amc/",
    tag: "Competition",
  },
  {
    name: "Lean & Mathlib",
    description: "A proof assistant where students can write rigorous mathematical proofs that the computer checks for them.",
    url: "https://leanprover-community.github.io/",
    tag: "Modern",
  },
];

function BlogPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionLabel>The Math Blog</SectionLabel>
          <h1 className="font-display mt-4 text-5xl tracking-tight md:text-6xl">
            What's happening in the <span className="italic-display">math universe</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A hand-picked feed of breakthroughs, beautiful ideas, and resources we share with our students.
            Updated as the field moves — because math is more alive today than at any point in history.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>Recent posts</SectionLabel>
        <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">Curated reading list</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Ten stories worth your time — from rigorous breakthroughs to elegant explainers.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition hover:border-gold/60"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-gold">{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-display mt-3 text-xl leading-snug transition group-hover:text-gold">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Source — {post.source}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>For math enthusiasts</SectionLabel>
          <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
            Where to go deeper
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            If a student catches the math bug, these are the resources we recommend — from competition prep to
            university-level lectures and modern proof assistants.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {studentResources.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-border/60 bg-card p-6 transition hover:border-gold/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg transition group-hover:text-gold">{r.name}</h3>
                  <span className="rounded-full border border-border/60 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {r.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Found something you want to discuss?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Bring any of these articles to your next session — exploring real mathematics together is one of the best
          ways to fall in love with the subject.
        </p>
      </section>
    </div>
  );
}
