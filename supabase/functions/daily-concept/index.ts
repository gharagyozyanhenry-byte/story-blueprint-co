import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Concept {
  formula: string;
  title: string;
  explanation: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const today = new Date().toISOString().slice(0, 10);

    // Check cache first
    const { data: cached } = await supabase
      .from("daily_concepts")
      .select("formula, title, explanation, concept_date")
      .eq("concept_date", today)
      .maybeSingle();

    if (cached) {
      return new Response(JSON.stringify(cached), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate via Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You generate one elegant 'concept of the day' for a high-school / early-college math tutoring website. Pick a varied topic each day (algebra, geometry, trig, calculus, probability, number theory, etc.). Respond ONLY with valid JSON, no markdown.",
          },
          {
            role: "user",
            content:
              "Generate today's math concept. Return JSON: { \"formula\": string (use plain unicode math like ∫ xeˣ dx, a² + b² = c², sin²θ + cos²θ = 1 — keep short, 1 line), \"title\": string (3-6 words, e.g. 'Integration by Parts'), \"explanation\": string (2-3 sentences, warm and clear, explaining the idea so a student feels invited in) }",
          },
        ],
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("AI gateway error", aiRes.status, errText);
      throw new Error(`AI request failed: ${aiRes.status}`);
    }

    const aiJson = await aiRes.json();
    const content: string = aiJson.choices?.[0]?.message?.content ?? "";
    // Strip code fences if model added them
    const cleaned = content.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
    const concept: Concept = JSON.parse(cleaned);

    // Persist (ignore conflict if another invocation raced us)
    const { data: inserted, error: insertError } = await supabase
      .from("daily_concepts")
      .upsert(
        { concept_date: today, ...concept },
        { onConflict: "concept_date" },
      )
      .select("formula, title, explanation, concept_date")
      .single();

    if (insertError) {
      console.error("Insert error", insertError);
      // Still return the generated concept so the user sees something
      return new Response(
        JSON.stringify({ ...concept, concept_date: today }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(inserted), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("daily-concept error", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
        // Fallback so UI never breaks
        formula: "∫ xeˣ dx",
        title: "Integration by Parts",
        explanation:
          "Integration by parts: ∫u dv = uv − ∫v du. Let u = x and dv = eˣ dx — a powerful technique that transforms complex integrals into manageable steps.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
