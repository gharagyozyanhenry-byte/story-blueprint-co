import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Curated free Unsplash math images, picked deterministically by category
const IMAGE_POOL: Record<string, string[]> = {
  default: [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=70",
  ],
  geometry: [
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?auto=format&fit=crop&w=1200&q=70",
  ],
  ai: [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=70",
  ],
  number: [
    "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1635372722656-389f87a941b7?auto=format&fit=crop&w=1200&q=70",
  ],
  physics: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=70",
  ],
  classroom: [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=70",
  ],
};

const FEEDS = [
  { url: "https://www.quantamagazine.org/feed/", source: "Quanta Magazine" },
  { url: "https://www.sciencedaily.com/rss/computers_math/mathematics.xml", source: "ScienceDaily" },
  { url: "https://phys.org/rss-feed/physics-news/mathematics/", source: "Phys.org" },
];

function pickImage(category: string, seed: string): string {
  const key = category.toLowerCase();
  let pool = IMAGE_POOL.default;
  if (key.includes("geomet") || key.includes("tiling")) pool = IMAGE_POOL.geometry;
  else if (key.includes("ai") || key.includes("comput")) pool = IMAGE_POOL.ai;
  else if (key.includes("number") || key.includes("prime")) pool = IMAGE_POOL.number;
  else if (key.includes("physic")) pool = IMAGE_POOL.physics;
  else if (key.includes("student") || key.includes("educat")) pool = IMAGE_POOL.classroom;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

function stripHtml(s: string): string {
  return s
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? stripHtml(m[1]) : "";
}

type RssItem = { title: string; url: string; description: string; pubDate: string };

function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];
  for (const b of blocks) {
    const title = pick(b, "title");
    let url = pick(b, "link");
    if (!url) {
      const m = b.match(/<link[^>]*href="([^"]+)"/i);
      if (m) url = m[1];
    }
    const description = pick(b, "description") || pick(b, "summary") || pick(b, "content");
    const pubDate = pick(b, "pubDate") || pick(b, "published") || pick(b, "updated");
    if (title && url) items.push({ title, url, description, pubDate });
  }
  return items;
}

function categorize(title: string, desc: string): string {
  const t = (title + " " + desc).toLowerCase();
  if (/\b(ai|machine learning|neural|llm|deepmind|alphaproof)\b/.test(t)) return "AI & Math";
  if (/\b(prime|number theory|mersenne|riemann)\b/.test(t)) return "Number Theory";
  if (/\b(geometry|topology|tiling|sofa|monotile)\b/.test(t)) return "Geometry";
  if (/\b(physics|quantum|relativity)\b/.test(t)) return "Math & Physics";
  if (/\b(student|education|olympiad|teach)\b/.test(t)) return "Education";
  if (/\b(prove|proof|theorem|conjecture)\b/.test(t)) return "Breakthrough";
  return "Mathematics";
}

async function summarize(title: string, raw: string): Promise<string> {
  const apiKey = process.env.LOVABLE_API_KEY;
  const fallback = raw.length > 240 ? raw.slice(0, 237) + "…" : raw;
  if (!apiKey || !raw) return fallback;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You write 2-sentence student-friendly summaries of math news. Plain English, ~40 words, no hype, no emojis.",
          },
          { role: "user", content: `Title: ${title}\n\nArticle: ${raw.slice(0, 1500)}` },
        ],
      }),
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    return text || fallback;
  } catch {
    return fallback;
  }
}

export const Route = createFileRoute("/api/public/ingest-blog")({
  server: {
    handlers: {
      POST: async () => {
        const collected: RssItem[] = [];
        for (const feed of FEEDS) {
          try {
            const r = await fetch(feed.url, { headers: { "User-Agent": "MathMindBot/1.0" } });
            if (!r.ok) continue;
            const xml = await r.text();
            const items = parseRss(xml).slice(0, 4).map((i) => ({ ...i, source: feed.source }));
            for (const it of items) collected.push(it as RssItem & { source: string });
          } catch (e) {
            console.error("Feed failed", feed.url, e);
          }
        }

        // Dedupe vs DB
        const urls = collected.map((c) => c.url);
        const { data: existing } = await supabaseAdmin
          .from("blog_posts")
          .select("url")
          .in("url", urls);
        const have = new Set((existing ?? []).map((e) => e.url));
        const fresh = collected.filter((c) => !have.has(c.url)).slice(0, 6);

        let inserted = 0;
        for (const item of fresh) {
          const category = categorize(item.title, item.description);
          const excerpt = await summarize(item.title, item.description);
          const image_url = pickImage(category, item.url);
          const source = (item as RssItem & { source?: string }).source ?? "Web";
          const published_at = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
          const { error } = await supabaseAdmin.from("blog_posts").insert({
            title: item.title,
            source,
            url: item.url,
            category,
            excerpt,
            image_url,
            published_at,
          });
          if (!error) inserted++;
          else console.error("Insert error", error);
        }

        return Response.json({ ok: true, fetched: collected.length, inserted });
      },
    },
  },
});
