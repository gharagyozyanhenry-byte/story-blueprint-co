import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="text-2xl">
            <span className="font-display">Math</span>
            <span className="italic-display">Mind</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Private math tutoring in Glendale, California — building real understanding from algebra
            through calculus.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/subjects" className="hover:text-foreground">Subjects</Link></li>
            <li><Link to="/approach" className="hover:text-foreground">Approach</Link></li>
            <li><Link to="/reviews" className="hover:text-foreground">Reviews</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/math-tutoring-near-me" className="hover:text-foreground">Math Tutors Near Me</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Get in touch</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Glendale, California</li>
            <li>In-person &amp; online</li>
            <li>Evenings &amp; weekends</li>
            <li>
              <Link to="/contact" className="text-gold hover:underline">Book a free consult →</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MathMind Tutoring. All rights reserved.
      </div>
    </footer>
  );
}
