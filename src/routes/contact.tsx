import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MathMind Tutoring" },
      {
        name: "description",
        content:
          "Book a free 30-minute math tutoring consultation in Glendale, CA. Response within 24 hours.",
      },
      { property: "og:title", content: "Contact — MathMind Tutoring" },
      { property: "og:description", content: "Ready to start? Book a free consult." },
    ],
  }),
  component: Contact,
});

const subjectOptions = [
  "Algebra I or II",
  "Geometry",
  "Pre-Calculus",
  "Trigonometry",
  "Calculus (AP or College)",
  "Statistics",
  "SAT / ACT Math Prep",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject_area: z.string().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Tell me a bit about your goals").max(5000),
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      subject_area: formData.get("subject_area") || "",
      message: formData.get("message"),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }

    setStatus("submitting");
    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject_area: parsed.data.subject_area || null,
      message: parsed.data.message,
    };

    const { error: dbError } = await supabase.from("contact_submissions").insert(payload);
    if (dbError) {
      setStatus("error");
      setError("Something went wrong. Please try again or email directly.");
      return;
    }
    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Get in Touch</SectionLabel>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          Ready to <span className="italic-display">start?</span>
        </h1>
        <p className="mt-6 text-muted-foreground">
          Book a free 30-minute consultation and let's talk about where you want to be.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-12 grid gap-5 rounded-xl border border-border bg-card/40 p-8 md:p-10"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Your Name" name="name" required />
          <Field label="Email Address" name="email" type="email" required />
          <Field label="Phone (optional)" name="phone" type="tel" />
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Subject Area
            </label>
            <select
              name="subject_area"
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
              defaultValue=""
            >
              <option value="">Select a subject…</option>
              {subjectOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Tell me about your goals
          </label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-gold-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message — It's Free"}
        </button>

        {status === "success" && (
          <p className="rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground">
            ✓ Message received! You'll hear back within 24 hours.
          </p>
        )}
      </form>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { icon: "📍", t: "Glendale, CA", s: "In-person & Online" },
          { icon: "📅", t: "Flexible Hours", s: "Evenings & Weekends" },
          { icon: "💬", t: "Response in 24h", s: "First consult free" },
        ].map((c) => (
          <div key={c.t} className="rounded-xl border border-border bg-card/40 p-6 text-center">
            <p className="text-2xl">{c.icon}</p>
            <p className="mt-3 font-display text-lg text-foreground">{c.t}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
      />
    </div>
  );
}
