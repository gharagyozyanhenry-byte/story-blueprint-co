import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE_URL, canonical } from "@/lib/seo";

export const Route = createFileRoute("/grants")({
  head: () => ({
    meta: [
      { title: "Math Grants & Scholarships in California — MathMind Tutoring" },
      {
        name: "description",
        content:
          "California math and STEM scholarships, school grants, and funding programs — with hands-on application support from MathMind Tutoring.",
      },
      {
        property: "og:title",
        content: "Math Grants & Scholarships in California — MathMind Tutoring",
      },
      {
        property: "og:description",
        content:
          "Public scholarships, grants, and funding for math students in California, plus help preparing your application.",
      },
      { property: "og:url", content: SITE_URL + "/grants" },
    ],
    links: canonical("/grants"),
  }),
  component: GrantsPage,
});

type Resource = {
  name: string;
  who: string;
  amount: string;
  url: string;
  notes: string;
};

const stateAid: Resource[] = [
  {
    name: "Cal Grant (A, B, C)",
    who: "California high school grads & community college students attending eligible CA colleges",
    amount: "Up to full system tuition + access awards",
    url: "https://www.csac.ca.gov/cal-grants",
    notes:
      "Apply via FAFSA or CADAA + a verified GPA by the March 2 deadline. Cal Grant C supports career/technical training including STEM tracks.",
  },
  {
    name: "Middle Class Scholarship",
    who: "CA undergrads at UC, CSU, or community college baccalaureate programs",
    amount: "Variable — covers gap after other aid",
    url: "https://www.csac.ca.gov/middle-class-scholarship",
    notes: "Same FAFSA/CADAA application as Cal Grant. Income & asset caps apply.",
  },
  {
    name: "Chafee Grant (Foster Youth)",
    who: "Current or former foster youth under age 26",
    amount: "Up to $5,000/year",
    url: "https://www.csac.ca.gov/chafee-grant",
    notes: "Can be used for tutoring, books, and STEM coursework support.",
  },
  {
    name: "Golden State Teacher Grant",
    who: "Students in CA teacher prep programs (math/STEM credential = priority)",
    amount: "Up to $20,000",
    url: "https://www.csac.ca.gov/golden-state-teacher-grant-program",
    notes: "4-year service commitment in a high-need school. Strong fit for future math teachers.",
  },
];

const k12Programs: Resource[] = [
  {
    name: "California Mathematics Council (CMC) Scholarships",
    who: "CA students pursuing math/math-education paths",
    amount: "$500–$2,000",
    url: "https://www.cmc-math.org/scholarships",
    notes: "Multiple awards including the Edward De Roche Scholarship.",
  },
  {
    name: "MESA (Mathematics, Engineering, Science Achievement)",
    who: "K-12 + community college students from underserved backgrounds",
    amount: "Program access + scholarships",
    url: "https://mesa.ucop.edu/",
    notes: "Tutoring, competitions, and college prep across CA campuses.",
  },
  {
    name: "California STEM Network — STEAM Funding Map",
    who: "Schools, teachers, after-school programs",
    amount: "Varies by program",
    url: "https://cdefoundation.org/programs/stem/",
    notes: "Aggregator of public + private STEM funding for CA classrooms.",
  },
  {
    name: "After School Education & Safety (ASES) Program",
    who: "K-9 public schools in California",
    amount: "School-level grants",
    url: "https://www.cde.ca.gov/ls/ba/as/",
    notes: "Funds tutoring & math enrichment after school. Apply through your district.",
  },
];

const scholarships: Resource[] = [
  {
    name: "Society for Women Engineers (SWE) — Los Angeles",
    who: "Women HS seniors & college students in STEM in LA County",
    amount: "$1,000–$5,000",
    url: "https://swe-la.org/scholarships/",
    notes: "Strong fit for Glendale-area applicants pursuing engineering or applied math.",
  },
  {
    name: "Edison STEM Scholarship",
    who: "HS seniors in SoCal Edison service area pursuing STEM",
    amount: "$40,000 (over 4 years)",
    url: "https://www.edison.com/home/community/our-programs/education/edison-scholars.html",
    notes: "Highly competitive — early application & strong essay matter.",
  },
  {
    name: "Hispanic Scholarship Fund (HSF)",
    who: "Students of Hispanic heritage, all majors (STEM prioritized)",
    amount: "$500–$5,000",
    url: "https://www.hsf.net/scholarship",
    notes: "Annual cycle opens January. Glendale has a large eligible community.",
  },
  {
    name: "Armenian Educational Foundation Scholarships",
    who: "Armenian-American students in California (huge presence in Glendale)",
    amount: "$1,000–$5,000",
    url: "https://aefweb.org/scholarships/",
    notes: "Multiple math/engineering-friendly awards.",
  },
  {
    name: "Society of Hispanic Professional Engineers (SHPE) Scholarships",
    who: "Hispanic STEM students (HS through grad)",
    amount: "$1,000–$5,000",
    url: "https://www.shpe.org/students/scholarships",
    notes: "Includes specific awards for math, CS, and engineering.",
  },
  {
    name: "AAUW Glendale Branch Scholarships",
    who: "Women returning to or continuing higher ed in the Glendale area",
    amount: "$1,000–$3,000",
    url: "https://glendale-ca.aauw.net/",
    notes: "Local scholarships — less competition, strong impact.",
  },
];

function ResourceCard({ r }: { r: Resource }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border bg-card/40 p-6 transition hover:border-gold/60 hover:bg-card/70"
    >
      <p className="font-display text-lg text-foreground group-hover:text-gold">{r.name}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{r.who}</p>
      <p className="mt-3 text-sm text-foreground">
        <span className="text-muted-foreground">Award: </span>
        {r.amount}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{r.notes}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold">Visit site →</p>
    </a>
  );
}

function GrantsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>Funding Your Path</SectionLabel>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          California Math <span className="italic-display">Grants & Scholarships</span>
        </h1>
        <p className="mt-6 text-muted-foreground">
          Below is a curated list of public scholarships, grants, and programs that fund math
          and STEM students across California — with a focus on the Greater Los Angeles and
          Glendale area.
        </p>
      </div>

      {/* Support callout */}
      <div className="mt-12 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-8 md:p-10">
        <SectionLabel>We can help</SectionLabel>
        <h2 className="mt-3 font-display text-2xl md:text-3xl">
          Application & preparation support — <span className="italic-display">depending on the grant or scholarship type</span>
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Most students leave money on the table because the application is confusing or the
          essay feels intimidating. I work with students 1-on-1 to:
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-foreground md:grid-cols-2">
          <li>• Identify which grants you actually qualify for</li>
          <li>• Prep math placement & competition portfolios</li>
          <li>• Draft and refine personal statements</li>
          <li>• Review FAFSA / CADAA / CSAC submissions</li>
          <li>• Coach for scholarship interviews</li>
          <li>• Build a timeline so nothing is missed</li>
        </ul>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center rounded-md bg-gold px-6 py-3 text-xs uppercase tracking-[0.18em] text-gold-foreground transition hover:opacity-90"
        >
          Book a free consult
        </Link>
      </div>

      {/* State aid */}
      <div className="mt-20">
        <SectionLabel>California State Aid</SectionLabel>
        <h2 className="mt-3 font-display text-3xl">Statewide grants every CA student should check</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {stateAid.map((r) => (
            <ResourceCard key={r.name} r={r} />
          ))}
        </div>
      </div>

      {/* K-12 / Math programs */}
      <div className="mt-20">
        <SectionLabel>K-12 & Math Programs</SectionLabel>
        <h2 className="mt-3 font-display text-3xl">Math-specific grants and program funding</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {k12Programs.map((r) => (
            <ResourceCard key={r.name} r={r} />
          ))}
        </div>
      </div>

      {/* Scholarships */}
      <div className="mt-20">
        <SectionLabel>Scholarships</SectionLabel>
        <h2 className="mt-3 font-display text-3xl">STEM scholarships for SoCal & Glendale students</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {scholarships.map((r) => (
            <ResourceCard key={r.name} r={r} />
          ))}
        </div>
      </div>

      {/* Helpful aggregators */}
      <div className="mt-20 rounded-xl border border-border bg-card/40 p-8">
        <SectionLabel>Search Tools</SectionLabel>
        <h2 className="mt-3 font-display text-2xl">Keep looking — official aggregators</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <a
              href="https://www.csac.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              California Student Aid Commission (CSAC)
            </a>{" "}
            <span className="text-muted-foreground">— official state aid portal</span>
          </li>
          <li>
            <a
              href="https://www.cde.ca.gov/fg/aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              CA Dept. of Education — Funding Opportunities
            </a>{" "}
            <span className="text-muted-foreground">— school & district grants</span>
          </li>
          <li>
            <a
              href="https://studentaid.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              FAFSA — studentaid.gov
            </a>{" "}
            <span className="text-muted-foreground">— required for nearly all aid</span>
          </li>
          <li>
            <a
              href="https://dream.csac.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              CA Dream Act Application (CADAA)
            </a>{" "}
            <span className="text-muted-foreground">— for AB 540 / undocumented students</span>
          </li>
          <li>
            <a
              href="https://bigfuture.collegeboard.org/scholarship-search"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              College Board BigFuture Scholarship Search
            </a>{" "}
            <span className="text-muted-foreground">— filter by state & STEM</span>
          </li>
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          Award amounts and eligibility change yearly. Always confirm details on the official
          site before applying.
        </p>
      </div>
    </section>
  );
}
