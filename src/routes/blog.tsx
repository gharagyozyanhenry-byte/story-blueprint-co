import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Math Blog — News, Breakthroughs & Resources | MathMind Tutoring" },
      {
        name: "description",
        content:
          "Curated math news, breakthroughs, and resources for students who love mathematics — auto-updated twice a week from Quanta, ScienceDaily, Phys.org and more.",
      },
      { name: "keywords", content: "math news, math blog, mathematics breakthroughs, math for students, math articles, Quanta math, math resources" },
      { property: "og:title", content: "Math Blog — News & Resources | MathMind" },
      {
        property: "og:description",
        content: "What's happening in the math universe — breakthroughs, beautiful ideas, and resources for math enthusiasts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
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
  image: string;
};

const IMG = {
  breakthrough: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=70",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70",
  number: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=70",
  geometry: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=70",
  awards: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=70",
  tiling: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?auto=format&fit=crop&w=1200&q=70",
  interview: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=70",
  open: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=70",
  young: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=70",
  visual: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=70",
};

const seedPosts: Post[] = [
  { title: "After 125 Years, Hilbert's Sixth Problem Sees a Major Breakthrough", source: "Quanta Magazine", date: "2025", category: "Breakthrough", excerpt: "Three mathematicians have made dramatic progress on Hilbert's sixth problem, deriving the equations of fluid motion rigorously from Newton's laws of particles.", url: "https://www.quantamagazine.org/", image: IMG.breakthrough },
  { title: "AI Models Are Starting to Help Mathematicians Discover New Theorems", source: "Nature", date: "2024", category: "AI & Math", excerpt: "DeepMind's AlphaProof and AlphaGeometry 2 reached silver-medal performance at the International Mathematical Olympiad — a milestone for machine reasoning.", url: "https://www.nature.com/articles/d41586-024-02441-2", image: IMG.ai },
  { title: "The Largest Known Prime Has Over 41 Million Digits", source: "GIMPS / Mersenne.org", date: "Oct 2024", category: "Number Theory", excerpt: "Luke Durant discovered M136279841, the 52nd known Mersenne prime — the first found using GPU computation, ending a six-year drought.", url: "https://www.mersenne.org/primes/", image: IMG.number },
  { title: "Mathematicians Finally Solved the Moving Sofa Problem", source: "Quanta Magazine", date: "2024", category: "Geometry", excerpt: "A 60-year-old puzzle about the largest shape that can navigate an L-shaped corridor has a proposed proof — Gerver's constant ≈ 2.2195.", url: "https://www.quantamagazine.org/", image: IMG.geometry },
  { title: "The 2024 Fields Medals: Four Mathematicians Honored", source: "International Mathematical Union", date: "2022 / next 2026", category: "Awards", excerpt: "June Huh, Maryna Viazovska, James Maynard, and Hugo Duminy-Copin received the Fields Medal — including the second woman ever to win.", url: "https://www.mathunion.org/imu-awards/fields-medal", image: IMG.awards },
  { title: "Why Is This Shape So Hard to Find? Aperiodic Monotile 'The Hat'", source: "Numberphile (YouTube)", date: "2023", category: "Tiling", excerpt: "A retired printing-systems engineer discovered the first single-tile shape that tiles the plane only non-periodically — solving a 60-year-old open question.", url: "https://www.youtube.com/@numberphile", image: IMG.tiling },
  { title: "Terence Tao on How AI Will Change Mathematics", source: "Scientific American", date: "2024", category: "Interview", excerpt: "Fields medalist Terence Tao explains how proof assistants like Lean and large language models are quietly transforming how mathematicians work.", url: "https://www.scientificamerican.com/", image: IMG.interview },
  { title: "The Riemann Hypothesis: A New Bound on the Zeros", source: "AMS Notices", date: "2024", category: "Open Problems", excerpt: "Larry Guth and James Maynard improved a key estimate that has stood since 1940 — a small but real step toward the most famous unsolved problem in math.", url: "https://www.ams.org/journals/notices", image: IMG.open },
  { title: "How a Teenager Solved a Stubborn Combinatorics Puzzle", source: "Quanta Magazine", date: "2024", category: "Young Mathematicians", excerpt: "Daniel Larsen — still a teenager — proved a long-conjectured result about Carmichael numbers, showing that originality matters more than seniority.", url: "https://www.quantamagazine.org/", image: IMG.young },
  { title: "The Beauty of Euler's Identity: e^(iπ) + 1 = 0", source: "3Blue1Brown", date: "Evergreen", category: "Visual Math", excerpt: "Grant Sanderson's animated explanation of why the most famous equation in math is really a story about rotation in the complex plane.", url: "https://www.3blue1brown.com/", image: IMG.visual },
];

type Resource = { name: string; description: string; url: string; tag: string };

const studentResources: Resource[] = [
  { name: "Art of Problem Solving (AoPS)", description: "The gold standard for competition math — courses, books (AoPS, Beast Academy), and an active community of math students worldwide.", url: "https://artofproblemsolving.com/", tag: "Competition" },
  { name: "Khan Academy — Math", description: "Free, structured lessons from arithmetic through multivariable calculus and linear algebra.", url: "https://www.khanacademy.org/math", tag: "Self-study" },
  { name: "3Blue1Brown", description: "Grant Sanderson's animated essays on linear algebra, calculus, neural nets, and the beauty of math.", url: "https://www.3blue1brown.com/", tag: "Visual" },
  { name: "Numberphile", description: "Friendly video interviews with leading mathematicians on surprising and beautiful results.", url: "https://www.numberphile.com/", tag: "Video" },
  { name: "Brilliant.org", description: "Interactive problem-based courses — great for building real intuition, not just memorizing.", url: "https://brilliant.org/", tag: "Interactive" },
  { name: "Project Euler", description: "300+ math + programming problems that get progressively harder. Perfect for curious problem-solvers.", url: "https://projecteuler.net/", tag: "Problems" },
  { name: "MIT OpenCourseWare — Mathematics", description: "Full lecture notes, problem sets, and video lectures from MIT's undergraduate and graduate math courses.", url: "https://ocw.mit.edu/courses/mathematics/", tag: "University" },
  { name: "Quanta Magazine — Mathematics", description: "Beautifully written reporting on the most important new ideas and results in modern mathematics.", url: "https://www.quantamagazine.org/mathematics/", tag: "News" },
  { name: "AMC / AIME / USAMO (MAA)", description: "The U.S. math olympiad pipeline — the path from your high school classroom to the IMO.", url: "https://maa.org/student-programs/amc/", tag: "Competition" },
  { name: "Lean & Mathlib", description: "A proof assistant where students can write rigorous mathematical proofs that the computer checks for them.", url: "https://leanprover-community.github.io/", tag: "Modern" },
];

function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition hover:border-gold/60"
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-gold">{post.category}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
        <h3 className="font-display mt-3 text-xl leading-snug transition group-hover:text-gold">{post.title}</h3>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Source — {post.source}</div>
      </div>
    </a>
  );
}

function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(seedPosts);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("title, source, url, category, excerpt, image_url, published_at")
        .order("published_at", { ascending: false })
        .limit(12);
      if (cancelled || !data || data.length === 0) return;
      const fromDb: Post[] = data.map((d) => ({
        title: d.title,
        source: d.source,
        url: d.url,
        category: d.category,
        excerpt: d.excerpt,
        image: d.image_url || IMG.breakthrough,
        date: new Date(d.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      }));
      // Merge: live first, then any seed posts whose URL isn't already shown
      const haveUrls = new Set(fromDb.map((p) => p.url));
      const merged = [...fromDb, ...seedPosts.filter((p) => !haveUrls.has(p.url))].slice(0, 14);
      setPosts(merged);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
            Auto-updated twice a week from leading math sources — because math is more alive today than at any point in
            history.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>Recent posts</SectionLabel>
        <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">Curated reading list</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Stories worth your time — from rigorous breakthroughs to elegant explainers.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>For math enthusiasts</SectionLabel>
          <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">Where to go deeper</h2>
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
