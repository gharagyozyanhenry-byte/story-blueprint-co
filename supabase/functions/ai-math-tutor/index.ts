// AI Math Tutor edge function — streams step-by-step explanations via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an expert math tutor — patient, encouraging, and clear. When a student asks you a math problem:

1. **Identify the problem type** in one short sentence (e.g. "This is a quadratic equation.").
2. **Explain the concept or strategy** needed in 1-2 plain-language sentences.
3. **Solve it step by step** — show every meaningful step on its own line, with a brief explanation of WHY for each step.
4. **State the final answer** clearly, boxed or labeled "**Answer:**".
5. **Add a short tip** at the end ("Common mistake to avoid:" or "Try this next:").

Formatting rules:
- Wrap ALL math expressions in LaTeX delimiters: inline math with $...$, display math with $$...$$.
- Use markdown for structure: **bold** for key terms, numbered lists for steps.
- Keep language simple and friendly — explain like a real tutor, not a textbook.
- If the question is NOT a math problem, gently say you only help with math and invite them to ask one.
- If the problem is ambiguous, ask one clarifying question before solving.

Example:
**Problem type:** Linear equation
**Strategy:** Isolate $x$ by undoing operations on both sides.

**Step 1:** Subtract 3 from both sides — to move the constant away from $x$.
$$2x + 3 - 3 = 7 - 3$$
$$2x = 4$$

**Step 2:** Divide both sides by 2 — to get $x$ alone.
$$x = 2$$

**Answer:** $x = 2$

**Tip:** Always perform the same operation on both sides to keep the equation balanced.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests right now. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please contact the site owner." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-math-tutor error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
