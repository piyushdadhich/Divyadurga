import React, { useMemo, useState } from "react";

/**
 * DDJ Revamp Demo Page
 * - Fresh layout
 * - Donation CTA on homepage
 * - Contact section fixed (no grid background, better spacing, actions)
 *
 * NOTE: Brand colors are set in BRAND below.
 * If you have exact hex codes from the current site, replace them here.
 */

const BRAND = {
  // Warm saffron + deep maroon (temple-friendly palette)
  primary: "#8B1E2D", // maroon
  primary2: "#D97706", // saffron
  gold: "#F2C14E",
  ink: "#0B1220",
  muted: "#5B6472",
  card: "#FFFFFF",
  bg: "#FFF7ED", // warm off-white
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
      style={{ borderColor: "rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.7)" }}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primary2})`,
      color: "white",
      boxShadow: "0 10px 30px rgba(139,30,45,0.25)",
    },
    secondary: {
      background: "white",
      color: BRAND.ink,
      border: "1px solid rgba(0,0,0,0.10)",
    },
    ghost: {
      background: "transparent",
      color: BRAND.ink,
    },
  };

  return (
    <button className={cn(base, className)} style={styles[variant]} {...props} />
  );
}

function LinkButton({
  children,
  href,
  variant = "secondary",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const common = "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all";

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primary2})`,
      color: "white",
      boxShadow: "0 10px 30px rgba(139,30,45,0.25)",
    },
    secondary: {
      background: "white",
      color: BRAND.ink,
      border: "1px solid rgba(0,0,0,0.10)",
    },
    ghost: {
      background: "transparent",
      color: BRAND.ink,
    },
  };

  return (
    <a href={href} className={cn(common, className)} style={styles[variant]}>
      {children}
    </a>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("rounded-3xl border bg-white shadow-sm", className)}
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="mb-3 flex items-center justify-center">
          <Pill>
            <span className="h-2 w-2 rounded-full" style={{ background: BRAND.primary2 }} />
            <span style={{ color: BRAND.muted }}>{eyebrow}</span>
          </Pill>
        </div>
      ) : null}
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: BRAND.ink }}>
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed" style={{ color: BRAND.muted }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border bg-white p-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <div className="text-2xl font-black" style={{ color: BRAND.ink }}>
        {value}
      </div>
      <div className="mt-1 text-xs" style={{ color: BRAND.muted }}>
        {label}
      </div>
    </div>
  );
}

type EventItem = {
  title: string;
  date: string;
  location: string;
  note: string;
};

const EVENTS: EventItem[] = [
  {
    title: "Sundarkand & Pravachan",
    date: "Nov 24, 2025",
    location: "Saskatchewan Mandir",
    note: "A devotional gathering with recitation and discourse.",
  },
  {
    title: "Sundarkand & Pravachan",
    date: "Nov 10, 2025",
    location: "Saskatchewan Mandir",
    note: "Weekly satsang atmosphere—join in person.",
  },
  {
    title: "Happy Sharad Navratri 2025",
    date: "Sep 22 – Sep 30, 2025",
    location: "Community celebration",
    note: "Festival prayers and community participation.",
  },
];

type ProgramItem = {
  title: string;
  desc: string;
  cta: string;
};

const PROGRAMS: ProgramItem[] = [
  {
    title: "Weekly Worship & Satsang",
    desc: "Open throughout the week—come for worship, learning, and community connection.",
    cta: "View schedule",
  },
  {
    title: "Volunteer Opportunities",
    desc: "Bring a skill or simply a helping hand—there’s a place for you in ongoing projects.",
    cta: "Become a volunteer",
  },
  {
    title: "Pandit Services",
    desc: "Volunteer priests are available for pujas and religious services by appointment.",
    cta: "Request a booking",
  },
];

const DONATION_AMOUNTS = [25, 50, 101, 251];

function Divider() {
  return <div className="my-10 h-px w-full" style={{ background: "rgba(0,0,0,0.08)" }} />;
}

function SmallIcon({ kind }: { kind: "phone" | "email" | "pin" | "clock" }) {
  const common = "h-5 w-5";
  const stroke = BRAND.ink;
  if (kind === "phone")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M5.5 4.5c2.2-1.1 3.3 1.8 4 3.2.3.7.2 1.5-.3 2l-1.2 1.2c1.2 2.6 3.3 4.7 5.9 5.9l1.2-1.2c.5-.5 1.3-.6 2-.3 1.4.7 4.3 1.8 3.2 4-1 2-4 2.3-5.8 1.6-6.2-2.4-11-7.2-13.4-13.4C3.2 8.5 3.5 5.5 5.5 4.5Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (kind === "email")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 7.5h15v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M5 8l7 6 7-6"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (kind === "clock")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
          stroke={stroke}
          strokeWidth="1.6"
        />
        <path d="M12 7v6l4 2" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-4.6 7-11a7 7 0 0 0-14 0c0 6.4 7 11 7 11Z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function ContactCard({
  title,
  lines,
  actions,
}: {
  title: string;
  lines: Array<{ icon: "phone" | "email" | "pin" | "clock"; text: string }>;
  actions: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold" style={{ color: BRAND.ink }}>
            {title}
          </div>
          <div className="mt-3 space-y-2">
            {lines.map((l, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  <SmallIcon kind={l.icon} />
                </div>
                <div className="text-sm" style={{ color: BRAND.muted }}>
                  {l.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden sm:block">{actions}</div>
      </div>
      <div className="mt-4 sm:hidden">{actions}</div>
    </Card>
  );
}

function DonationPanel() {
  const [amount, setAmount] = useState<number>(101);
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold" style={{ color: BRAND.muted }}>
            Donation
          </div>
          <div className="text-xl font-black" style={{ color: BRAND.ink }}>
            Support worship, education, and community
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMonthly(false)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold",
              !isMonthly && "shadow-sm"
            )}
            style={{
              background: !isMonthly ? BRAND.primary2 : "rgba(255,255,255,0.8)",
              color: !isMonthly ? "white" : BRAND.ink,
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            One-time
          </button>
          <button
            onClick={() => setIsMonthly(true)}
            className={cn("rounded-full px-3 py-1 text-xs font-bold", isMonthly && "shadow-sm")}
            style={{
              background: isMonthly ? BRAND.primary : "rgba(255,255,255,0.8)",
              color: isMonthly ? "white" : BRAND.ink,
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DONATION_AMOUNTS.map((a) => (
          <button
            key={a}
            onClick={() => setAmount(a)}
            className={cn("rounded-2xl border px-3 py-3 text-left transition-all")}
            style={{
              borderColor: amount === a ? "rgba(217,119,6,0.55)" : "rgba(0,0,0,0.10)",
              background: amount === a ? "rgba(242,193,78,0.20)" : "white",
            }}
          >
            <div className="text-sm font-extrabold" style={{ color: BRAND.ink }}>
              ${a}
            </div>
            <div className="text-xs" style={{ color: BRAND.muted }}>
              {isMonthly ? "per month" : "one-time"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs" style={{ color: BRAND.muted }}>
          Replace this demo button with your payment gateway (Stripe, PayPal, CanadaHelps, etc.).
        </div>
        <div className="flex gap-2">
          <LinkButton href="#contact" variant="secondary">
            Ask a question
          </LinkButton>
          <LinkButton href="#" variant="primary">
            Donate ${amount}
          </LinkButton>
        </div>
      </div>
    </Card>
  );
}

export default function DDJRevampDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactTab, setContactTab] = useState<"toronto" | "sask">("toronto");

  const heroImage =
    "https://images.unsplash.com/photo-1542553458-79a13aebfda6?auto=format&fit=crop&w=2200&q=80"; // diya/lamps (placeholder)

  const mapPreview =
    "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=2200&q=80"; // map texture (placeholder)

  const contact = useMemo(() => {
    const toronto = {
      title: "Toronto (Registered charity address)",
      phone: "+1 (416) 242-5007",
      email: "info@divyadurgajyoti.org",
      address: "59 Hullrick Drive, Etobicoke, ON, M9W 6W5",
      hours: "Please call to arrange a visit",
      directions: "https://maps.google.com/?q=59+Hullrick+Drive+Etobicoke+ON+M9W+6W5",
    };

    const sask = {
      title: "Saskatchewan Temple",
      phone: "+1 (416) 242-5007",
      email: "info@divyadurgajyoti.org",
      address: "Please contact us for the latest visiting details.",
      hours: "Programs & events posted on the calendar",
      directions: "#",
    };

    return { toronto, sask };
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(1200px 600px at 20% -10%, rgba(242,193,78,0.28), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(217,119,6,0.18), transparent 55%), ${BRAND.bg}`,
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-40 border-b backdrop-blur" style={{ borderColor: "rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.75)" }}>
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primary2})`, color: "white" }}
                aria-hidden="true"
              >
                ॐ
              </div>
              <div className="leading-tight">
                <div className="text-sm font-black" style={{ color: BRAND.ink }}>
                  Divya Durga Jyoti
                </div>
                <div className="text-xs" style={{ color: BRAND.muted }}>
                  Hindu Society
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {[
                ["About", "#about"],
                ["Programs", "#programs"],
                ["Events", "#events"],
                ["For Seniors", "#seniors"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm font-semibold"
                  style={{ color: BRAND.ink }}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LinkButton href="#donate" variant="primary" className="hidden sm:inline-flex">
                Donate
              </LinkButton>
              <button
                className="rounded-2xl border px-3 py-2 text-sm font-semibold md:hidden"
                style={{ borderColor: "rgba(0,0,0,0.10)", background: "white", color: BRAND.ink }}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open menu"
              >
                {menuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div className="border-t py-3 md:hidden" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="grid gap-2">
                {[
                  ["About", "#about"],
                  ["Programs", "#programs"],
                  ["Events", "#events"],
                  ["For Seniors", "#seniors"],
                  ["Contact", "#contact"],
                  ["Donate", "#donate"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="rounded-2xl px-3 py-2 text-sm font-semibold"
                    style={{ color: BRAND.ink, background: "rgba(0,0,0,0.03)" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </div>

      {/* Hero */}
      <div id="top">
        <Container>
          <div className="grid items-center gap-8 py-10 lg:grid-cols-12 lg:py-14">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>
                  <span className="h-2 w-2 rounded-full" style={{ background: BRAND.primary }} />
                  <span style={{ color: BRAND.muted }}>Worship • Education • Community</span>
                </Pill>
                <Pill>
                  <span style={{ color: BRAND.muted }}>Open throughout the week</span>
                </Pill>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl" style={{ color: BRAND.ink }}>
                Welcome to <span style={{ color: BRAND.primary }}>Divya Durga Jyoti</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: BRAND.muted }}>
                Promoting Hindu values through worship, education, and cultural activities—while nurturing a welcoming
                community space for families, seniors, and devotees.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href="#donate" variant="primary">
                  Donate on homepage
                </LinkButton>
                <LinkButton href="#events" variant="secondary">
                  View upcoming events
                </LinkButton>
                <LinkButton href="#contact" variant="ghost" className="px-2">
                  Contact
                </LinkButton>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <Stat label="Community-first" value="Inclusive" />
                <Stat label="Guided learning" value="Weekly" />
                <Stat label="Volunteer-led" value="Strong" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] border bg-white shadow-sm" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div
                  className="h-72 w-full sm:h-96"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(11,18,32,0.25), rgba(11,18,32,0.05)), url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-3xl border bg-white/90 p-4 backdrop-blur" style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-black" style={{ color: BRAND.ink }}>
                          Visiting today?
                        </div>
                        <div className="text-xs" style={{ color: BRAND.muted }}>
                          Please call—our team will help you plan your visit.
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <LinkButton href="#contact" variant="secondary">
                          Get directions
                        </LinkButton>
                        <LinkButton href="#donate" variant="primary">
                          Donate
                        </LinkButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* About */}
      <div id="about" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Our mission"
            title="A sacred space for worship, learning, and community"
            subtitle="DDJ promotes and practices Hindu values while maintaining a community center that nurtures religious, cultural, social, and educational activities."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="text-sm font-extrabold" style={{ color: BRAND.ink }}>
                What we do
              </div>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: BRAND.muted }}>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: BRAND.primary2 }} />
                  Promote and practice the values of Hinduism through worship, education, and cultural activities.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: BRAND.primary2 }} />
                  Inspire spiritual growth and human excellence by living the teachings of Hindu scriptures.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: BRAND.primary2 }} />
                  Respect and recognize all religions and belief systems in their true context.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: BRAND.primary2 }} />
                  Maintain a community center that nurtures religious, cultural, social, and educational activities.
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="text-sm font-extrabold" style={{ color: BRAND.ink }}>
                Join us
              </div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: BRAND.muted }}>
                We welcome you, your family, and loved ones to connect with our organization. Your support and involvement
                help build a community that everyone can be proud of.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <LinkButton href="#events" variant="secondary">
                  Explore events
                </LinkButton>
                <LinkButton href="#programs" variant="primary">
                  Ways to participate
                </LinkButton>
              </div>
            </Card>
          </div>
        </Container>
      </div>

      {/* Programs */}
      <div id="programs" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Programs"
            title="Clear next steps for devotees"
            subtitle="A structured overview of worship, volunteering, and pandit services—so visitors know exactly what to do next."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <Card key={p.title} className="p-6">
                <div className="text-lg font-black" style={{ color: BRAND.ink }}>
                  {p.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BRAND.muted }}>
                  {p.desc}
                </p>
                <div className="mt-5">
                  <LinkButton href="#contact" variant="secondary">
                    {p.cta}
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: BRAND.muted }}>
            Note: Volunteer pandits are board members and do not provide consulting services.
          </p>
        </Container>
      </div>

      {/* Events */}
      <div id="events" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Calendar"
            title="Upcoming events—easy to scan"
            subtitle="A quick, readable layout that helps visitors see what’s next and how to join."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {EVENTS.map((e, idx) => (
              <Card key={`${e.title}-${idx}`} className="p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-bold" style={{ color: BRAND.primary }}>
                    {e.date}
                  </div>
                  <span
                    className="rounded-full px-2 py-1 text-[11px] font-bold"
                    style={{ background: "rgba(242,193,78,0.20)", color: BRAND.ink }}
                  >
                    Event
                  </span>
                </div>
                <div className="mt-3 text-lg font-black" style={{ color: BRAND.ink }}>
                  {e.title}
                </div>
                <div className="mt-2 text-sm" style={{ color: BRAND.muted }}>
                  {e.location}
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: BRAND.muted }}>
                  {e.note}
                </p>
                <div className="mt-5 flex gap-2">
                  <LinkButton href="#contact" variant="secondary">
                    Register
                  </LinkButton>
                  <LinkButton href="#" variant="ghost" className="px-2">
                    Details
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* Seniors */}
      <div id="seniors" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="For Seniors"
            title="Support with dignity, care, and compassion"
            subtitle="A dedicated section highlighting resources, services, and facilities for seniors—reducing isolation and improving access to community support."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card className="p-6">
                <div className="text-sm font-extrabold" style={{ color: BRAND.ink }}>
                  What seniors can expect
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: BRAND.muted }}>
                  Many seniors face health, mobility, and social challenges. DDJ aims to help seniors and their families
                  find support with dignity, care, and compassion.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Friendly community check-ins",
                    "Accessible visiting guidance",
                    "Festival gatherings & social connection",
                    "Resource pointers for seniors in Ontario",
                  ].map((x) => (
                    <div
                      key={x}
                      className="rounded-3xl border bg-white p-4 text-sm"
                      style={{ borderColor: "rgba(0,0,0,0.08)", color: BRAND.muted }}
                    >
                      <div className="font-bold" style={{ color: BRAND.ink }}>
                        {x}
                      </div>
                      <div className="mt-1 text-xs" style={{ color: BRAND.muted }}>
                        (Demo copy—replace with your exact offerings.)
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div className="lg:col-span-5">
              <Card className="overflow-hidden">
                <div
                  className="h-72 w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(139,30,45,0.15), rgba(217,119,6,0.10)), url(https://images.unsplash.com/photo-1520975693411-6f5f4187f03f?auto=format&fit=crop&w=2200&q=80)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="p-6">
                  <div className="text-sm font-extrabold" style={{ color: BRAND.ink }}>
                    Need help planning a visit?
                  </div>
                  <p className="mt-2 text-sm" style={{ color: BRAND.muted }}>
                    Call us and we’ll guide you on timing and accessibility.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <LinkButton href="#contact" variant="primary">
                      Contact
                    </LinkButton>
                    <LinkButton href="#donate" variant="secondary">
                      Support seniors
                    </LinkButton>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>

      {/* Donate */}
      <div id="donate" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Donate"
            title="Make a difference—right from the homepage"
            subtitle="A simple donation panel that works well on mobile, and can be connected to your preferred payment provider later."
          />
          <div className="mt-10">
            <DonationPanel />
          </div>
        </Container>
      </div>

      {/* Contact (FIXED) */}
      <div id="contact" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Contact"
            title="Visit & connect"
            subtitle="Better yet, see us in person—please call and we’ll help plan your visit."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {/* Left: Map preview */}
            <div className="lg:col-span-5">
              <Card className="overflow-hidden">
                <div
                  className="h-64 w-full sm:h-80"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(11,18,32,0.25), rgba(11,18,32,0.05)), url(${mapPreview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setContactTab("toronto")}
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: contactTab === "toronto" ? BRAND.primary : "rgba(255,255,255,0.85)",
                        color: contactTab === "toronto" ? "white" : BRAND.ink,
                        border: "1px solid rgba(0,0,0,0.10)",
                      }}
                    >
                      Toronto
                    </button>
                    <button
                      onClick={() => setContactTab("sask")}
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: contactTab === "sask" ? BRAND.primary2 : "rgba(255,255,255,0.85)",
                        color: contactTab === "sask" ? "white" : BRAND.ink,
                        border: "1px solid rgba(0,0,0,0.10)",
                      }}
                    >
                      Saskatchewan
                    </button>
                  </div>

                  <div className="mt-4 text-xs" style={{ color: BRAND.muted }}>
                    Map preview is a placeholder image for the demo. Replace with an embedded Google Map later.
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {contactTab === "toronto" ? (
                  <ContactCard
                    title={contact.toronto.title}
                    lines={[
                      { icon: "phone", text: contact.toronto.phone },
                      { icon: "email", text: contact.toronto.email },
                      { icon: "pin", text: contact.toronto.address },
                      { icon: "clock", text: contact.toronto.hours },
                    ]}
                    actions={
                      <div className="flex flex-col gap-2">
                        <LinkButton href={`tel:${contact.toronto.phone.replace(/[^+\d]/g, "")}`} variant="secondary">
                          Call
                        </LinkButton>
                        <LinkButton href={contact.toronto.directions} variant="secondary">
                          Directions
                        </LinkButton>
                        <LinkButton href="#donate" variant="primary">
                          Donate
                        </LinkButton>
                      </div>
                    }
                  />
                ) : (
                  <ContactCard
                    title={contact.sask.title}
                    lines={[
                      { icon: "phone", text: contact.sask.phone },
                      { icon: "email", text: contact.sask.email },
                      { icon: "pin", text: contact.sask.address },
                      { icon: "clock", text: contact.sask.hours },
                    ]}
                    actions={
                      <div className="flex flex-col gap-2">
                        <LinkButton href={`tel:${contact.sask.phone.replace(/[^+\d]/g, "")}`} variant="secondary">
                          Call
                        </LinkButton>
                        <LinkButton href="#events" variant="secondary">
                          View events
                        </LinkButton>
                        <LinkButton href="#donate" variant="primary">
                          Donate
                        </LinkButton>
                      </div>
                    }
                  />
                )}

                <Card className="p-6">
                  <div className="text-sm font-extrabold" style={{ color: BRAND.ink }}>
                    Quick message (demo)
                  </div>
                  <p className="mt-2 text-sm" style={{ color: BRAND.muted }}>
                    This form is for the demo UI. You can connect it to email / CRM later.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input
                      className="w-full rounded-2xl border px-4 py-3 text-sm"
                      style={{ borderColor: "rgba(0,0,0,0.12)" }}
                      placeholder="Full name"
                    />
                    <input
                      className="w-full rounded-2xl border px-4 py-3 text-sm"
                      style={{ borderColor: "rgba(0,0,0,0.12)" }}
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <textarea
                    className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm"
                    style={{ borderColor: "rgba(0,0,0,0.12)" }}
                    placeholder="How can we help?"
                    rows={4}
                  />
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs" style={{ color: BRAND.muted }}>
                      By submitting, you agree to be contacted back.
                    </div>
                    <Button onClick={() => alert("Demo: message sent!")}>Send message</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-xs" style={{ color: BRAND.muted }}>
              © {new Date().getFullYear()} Divya Durga Jyoti Hindu Society — Demo homepage layout for client preview.
            </div>
            <div className="flex gap-2">
              <a href="#top" className="text-xs font-bold" style={{ color: BRAND.ink }}>
                Back to top
              </a>
              <span className="text-xs" style={{ color: "rgba(0,0,0,0.25)" }}>
                •
              </span>
              <a href="#donate" className="text-xs font-bold" style={{ color: BRAND.primary }}>
                Donate
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
