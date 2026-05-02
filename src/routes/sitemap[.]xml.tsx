import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/subjects", priority: "0.9", changefreq: "monthly" },
  { path: "/approach", priority: "0.7", changefreq: "monthly" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly" },
  { path: "/reviews", priority: "0.7", changefreq: "monthly" },
  { path: "/grants", priority: "0.7", changefreq: "monthly" },
  { path: "/tools", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.9", changefreq: "monthly" },
  { path: "/math-tutoring-near-me", priority: "0.95", changefreq: "monthly" },
  { path: "/ai-math-tutor", priority: "0.95", changefreq: "weekly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().split("T")[0];
        const urls = ROUTES.map(
          (r) =>
            `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
