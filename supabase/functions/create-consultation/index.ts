const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

interface Payload {
  name: string;
  email: string;
  phone?: string | null;
  subject_area?: string | null;
  message: string;
  preferred_at: string; // ISO datetime
}

function isValidPayload(x: unknown): x is Payload {
  if (!x || typeof x !== "object") return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.name === "string" && p.name.trim().length > 0 && p.name.length <= 120 &&
    typeof p.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) && p.email.length <= 255 &&
    typeof p.message === "string" && p.message.trim().length > 0 && p.message.length <= 5000 &&
    typeof p.preferred_at === "string" && !Number.isNaN(Date.parse(p.preferred_at))
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_CALENDAR_API_KEY = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GOOGLE_CALENDAR_API_KEY) throw new Error("GOOGLE_CALENDAR_API_KEY is not configured");

    const body = await req.json();
    if (!isValidPayload(body)) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const start = new Date(body.preferred_at);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 min

    const event = {
      summary: `Consultation — ${body.name}`,
      description: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        body.phone ? `Phone: ${body.phone}` : null,
        body.subject_area ? `Subject: ${body.subject_area}` : null,
        "",
        "Message:",
        body.message,
      ]
        .filter(Boolean)
        .join("\n"),
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: [{ email: body.email, displayName: body.name }],
      reminders: { useDefault: true },
    };

    const res = await fetch(`${GATEWAY_URL}/calendars/primary/events?sendUpdates=all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_CALENDAR_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Calendar API error", res.status, data);
      throw new Error(`Calendar API failed [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ ok: true, eventId: data.id, htmlLink: data.htmlLink }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("create-consultation error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
