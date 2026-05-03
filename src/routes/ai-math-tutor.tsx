import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { MathMarkdown } from "@/components/MathMarkdown";
import { SITE_URL, canonical } from "@/lib/seo";

export const Route = createFileRoute("/ai-math-tutor")({
  head: () => ({
    meta: [
      { title: "Free AI Math Tutor — Solve Math Problems Step by Step | MathMind" },
      {
        name: "description",
        content:
          "Free AI math tutor powered by Google Gemini. Type any math problem — algebra, calculus, geometry, statistics — and get a step-by-step explanation like a real tutor would give.",
      },
      {
        name: "keywords",
        content:
          "free ai math tutor, ai math tutor, ai math, tutor ai free, free math tutor ai, ai math solver, free ai tutor math, math ai tutor free, online ai math tutor, ai tutor for math",
      },
      { property: "og:title", content: "Free AI Math Tutor — Step-by-Step Solutions | MathMind" },
      {
        property: "og:description",
        content: "Type any math problem and get a clear, tutor-style step-by-step explanation. Free with a quick signup.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/ai-math-tutor" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free AI Math Tutor | MathMind" },
      { name: "twitter:description", content: "Step-by-step math help, free." },
    ],
    links: canonical("/ai-math-tutor"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Free AI Math Tutor",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Any",
          description:
            "Free AI-powered math tutor that explains problems step by step — algebra, calculus, geometry, statistics, and more.",
          url: SITE_URL + "/ai-math-tutor",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "EducationalOrganization", name: "MathMind Tutoring" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is the AI math tutor really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — the AI math tutor is completely free. You only need to create a free account so we can prevent abuse.",
              },
            },
            {
              "@type": "Question",
              name: "What kind of math can the AI tutor solve?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pre-algebra, algebra, geometry, trigonometry, pre-calculus, calculus (derivatives and integrals), statistics, linear algebra, and SAT/ACT/AP math problems.",
              },
            },
            {
              "@type": "Question",
              name: "Does the AI just give the answer, or does it explain?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It explains step by step — like a real tutor. Each step has a short reason ('why') so you actually learn the method, not just the answer.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use it for homework?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — it's designed to help you understand homework problems. Use it to learn the method, then solve similar problems on your own to lock it in.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AiMathTutorPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const EXAMPLES = [
  "Solve 2x² - 5x - 3 = 0",
  "Find the derivative of x³ ln(x)",
  "What is the integral of sin(x)cos(x) dx?",
  "If a triangle has sides 3, 4, and 5, what is its area?",
  "Simplify (2x² + 4x) / (2x)",
];

function AiMathTutorPage() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthed(!!data.session);
      setAuthChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const prompt = (text ?? input).trim();
    if (!prompt || loading) return;
    setError(null);
    setInput("");

    const userMsg: Msg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        navigate({ to: "/auth" });
        return;
      }

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-math-tutor`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        const errBody = await resp.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${resp.status})`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) upsert(delta);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="bg-background">
        {/* SEO content visible to crawlers + signed-out visitors */}
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-24">
            <SectionLabel>Free AI Math Tutor</SectionLabel>
            <h1 className="font-display mt-4 text-5xl tracking-tight md:text-6xl">
              Your free <span className="italic-display">AI math tutor</span> — step by step
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Type any math problem — algebra, calculus, geometry, statistics — and get a clear,
              tutor-style explanation. Powered by Google&apos;s Gemini AI. Always free with a quick
              account.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/auth"
                className="inline-flex items-center rounded-md bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition hover:opacity-90"
              >
                Create free account
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium transition hover:border-gold"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        <SeoContent />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-8">
          <SectionLabel>Free AI Math Tutor</SectionLabel>
          <h1 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Ask any <span className="italic-display">math problem</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Powered by Google Gemini. Step-by-step explanations like a real tutor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8">
        <div
          ref={scrollRef}
          className="min-h-[40vh] max-h-[60vh] overflow-y-auto rounded-xl border border-border/60 bg-card/50 p-4 md:p-6"
        >
          {messages.length === 0 ? (
            <div className="py-6">
              <p className="text-sm text-muted-foreground">
                Try one of these to get started:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => send(ex)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:border-gold hover:text-foreground"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "rounded-lg bg-secondary/60 p-3 text-sm"
                      : "rounded-lg border border-border/60 bg-background p-4"
                  }
                >
                  {m.role === "user" ? (
                    <>
                      <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        You
                      </div>
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    </>
                  ) : (
                    <>
                      <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-gold">
                        Tutor
                      </div>
                      {m.content ? (
                        <MathMarkdown content={m.content} />
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold" />
                          Thinking…
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="mt-4 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a math problem… e.g. derivative of x^2 sin(x)"
            className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-sm focus:border-gold focus:outline-none"
            maxLength={500}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-md bg-gold px-5 py-3 text-sm font-medium text-gold-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Solving…" : "Solve"}
          </button>
        </form>

        <p className="mt-3 text-xs text-muted-foreground">
          Tip: type math naturally (e.g. <code className="rounded bg-muted px-1">x^2 + 3x - 4</code>) or paste LaTeX.
        </p>

        {messages.length > 0 && (
          <button
            onClick={() => {
              setMessages([]);
              setError(null);
            }}
            className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            Start a new problem
          </button>
        )}
      </section>

      <SeoContent />
    </div>
  );
}

function SeoContent() {
  return (
    <>
      <section className="border-t border-border/60 bg-muted/10">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-display mt-3 text-3xl tracking-tight md:text-4xl">
            A real tutor experience — powered by AI
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "1", t: "Type your problem", d: "Algebra, calculus, geometry, stats — anything from middle school to college." },
              { n: "2", t: "See the steps", d: "The AI explains the strategy, shows every step, and tells you WHY each step works." },
              { n: "3", t: "Learn the method", d: "Get a tip at the end so you can solve similar problems yourself." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-border/60 bg-card p-6">
                <div className="font-display text-3xl text-gold">{s.n}</div>
                <h3 className="mt-3 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionLabel>What it covers</SectionLabel>
        <h2 className="font-display mt-3 text-3xl tracking-tight md:text-4xl">
          Free AI math help — every level, every topic
        </h2>
        <div className="mt-8 grid gap-3 text-sm md:grid-cols-2">
          {[
            "Pre-algebra & arithmetic",
            "Algebra I & II — equations, factoring, functions",
            "Geometry — proofs, area, volume, trig",
            "Trigonometry & pre-calculus",
            "Calculus — limits, derivatives, integrals",
            "Statistics & probability",
            "Linear algebra basics",
            "SAT, ACT, AP, GED math problems",
          ].map((x) => (
            <div key={x} className="flex items-start gap-2 text-muted-foreground">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
              <span>{x}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/10">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display mt-3 text-3xl tracking-tight md:text-4xl">
            Free AI math tutor — common questions
          </h2>
          <div className="mt-10 space-y-6">
            {[
              {
                q: "Is the AI math tutor really free?",
                a: "Yes — completely free. You just create a free account so we can prevent abuse and keep it sustainable.",
              },
              {
                q: "What kind of math can it solve?",
                a: "Pre-algebra, algebra, geometry, trigonometry, pre-calculus, calculus, statistics, linear algebra, and standardized test math (SAT/ACT/AP/GED).",
              },
              {
                q: "Does it just give the answer or explain?",
                a: "It explains step by step — every step has a short reason so you actually learn the method.",
              },
              {
                q: "Can I use it for homework?",
                a: "Yes. Use it to understand the method, then solve similar problems on your own to lock it in.",
              },
              {
                q: "Want a real human tutor?",
                a: "We also offer 1-on-1 private math tutoring in Glendale, CA and online — see our pricing page.",
              },
            ].map((f) => (
              <div key={f.q} className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-display text-lg">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-gold/40 bg-card p-6 text-center">
            <h3 className="font-display text-2xl">Need a real human tutor?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Book a free consult with a private MathMind tutor — in Glendale or online.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex rounded-md border border-gold px-5 py-2.5 text-sm text-gold hover:bg-gold hover:text-gold-foreground"
            >
              Book a free consult
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
