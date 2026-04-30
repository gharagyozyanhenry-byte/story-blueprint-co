import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CursorTrail } from "@/components/CursorTrail";

const GA_ID = "G-6EHFBETF20";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-gold">404</h1>
          <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-gold-foreground transition hover:opacity-90"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MathMind — Private Math Tutoring in Glendale, CA" },
      {
        name: "description",
        content:
          "Private math tutoring in Glendale, California. From algebra to calculus — building real understanding, not memorization.",
      },
      { name: "author", content: "MathMind" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "MathMind — Private Math Tutoring in Glendale, CA" },
      { name: "twitter:title", content: "MathMind — Private Math Tutoring in Glendale, CA" },
      { name: "description", content: "Your Website Companion is a full-stack web application for a math education service." },
      { property: "og:description", content: "Your Website Companion is a full-stack web application for a math education service." },
      { name: "twitter:description", content: "Your Website Companion is a full-stack web application for a math education service." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9fc6beb5-695c-4502-97f1-2acd59f6ac88/id-preview-a2326f8c--0e143154-932b-4ec8-90c5-d5a4a165d6dc.lovable.app-1777185217959.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9fc6beb5-695c-4502-97f1-2acd59f6ac88/id-preview-a2326f8c--0e143154-932b-4ec8-90c5-d5a4a165d6dc.lovable.app-1777185217959.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { send_page_view: false });`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const router = useRouter();

  useEffect(() => {
    const unsub = router.subscribe("onResolved", ({ toLocation }) => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: toLocation.pathname + toLocation.searchStr,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    });
    return () => unsub();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <CursorTrail />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
