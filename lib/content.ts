export const profile = {
  name: "Chinonso Daniels",
  firstName: "Chinonso",
  lastName: "Daniels",
  monogram: "CD",
  role: "Software Engineer",
  focus: "Fullstack & Frontend",
  email: "chinonsodaniels2020@gmail.com",
  location: "Lagos",
  availability: "Available",
  replyHint:
    "Based in Lagos · Open to remote · Typically replies within 24 hours",
  links: {
    github: "https://github.com/Miss-nonso",
    linkedin: "https://linkedin.com/in/nonso-daniels",
    portfolio: "https://pre-portfolio-ten.vercel.app/",
    resume: "#",
  },
  hero: {
    status: "Available · Software Engineer · Fullstack & Frontend",
    headline: "I build enterprise software that behaves like a promise kept.",
    lede: "I'm Chinonso Daniels — a software engineer building production systems across the full stack. From IoT monitoring dashboards to multi-tenant SaaS, I turn Figma files, product requirements, and hardware signals into interfaces people trust with the work that matters.",
    primaryCta: { label: "See selected work", href: "#work" },
    secondaryCta: { label: "Download resume", href: "#" },
    tertiaryCta: {
      label: "chinonsodaniels2020@gmail.com",
      href: "mailto:chinonsodaniels2020@gmail.com",
    },
  },
  trust: [
    "4+ years shipping to production",
    "Fullstack · React / TypeScript / FastAPI",
    "IoT · SaaS · Enterprise",
    "AI-augmented delivery",
    "Figma → production systems",
  ],
};

export const sections = {
  evidence: {
    eyebrow: "01 / Evidence",
    title: "Measured, not claimed.",
    lede: "A portfolio should read less like a gallery and more like evidence.",
  },
  work: {
    eyebrow: "02 / Selected Work",
    title: "Systems shipped, decisions defended.",
    lede: "Four projects. Each one a decision about tradeoffs, not just a screenshot.",
  },
  approach: {
    eyebrow: "03 / Philosophy",
    title: "How I think about the work.",
    lede: "",
  },
  ai: {
    eyebrow: "04 / AI-Augmented Engineering",
    title: "AI as a force multiplier — not a replacement for judgment.",
    lede: "The best engineers I know neither fear AI nor outsource their thinking to it. I use it to move faster while staying entirely accountable for the outcome.",
  },
  architecture: {
    eyebrow: "05 / Architecture",
    title: "Most portfolios stop at the UI.",
    lede: "The interesting decisions live underneath it — how data flows, what renders where, and which tradeoffs were made on purpose.",
  },
  skills: {
    eyebrow: "06 / Craft",
    title: "The tools I reach for — and the ones I refuse to hide behind.",
    lede: "",
  },
  trajectory: {
    eyebrow: "07 / Trajectory",
    title: "A deliberate progression.",
    lede: "",
  },
  contact: {
    eyebrow: "08 / Contact",
    title: "Let's build something worth keeping.",
    lede: "If you're shipping something ambitious — an IoT platform, a multi-tenant product, a data-heavy interface, or a green-field engineering role — I'd love to hear about it.",
  },
};

export type EvidenceStat = {
  value: string;
  numeric?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail: string;
};

export const evidence: EvidenceStat[] = [
  {
    value: "15+",
    numeric: 15,
    suffix: "+",
    label: "Production applications shipped",
    detail: "SaaS, and real-time products",
  },
  {
    value: "40%",
    numeric: 40,
    suffix: "%",
    label: "Faster decision cycles delivered",
    detail: "Nova Financial analytics platform",
  },
  {
    value: "98",
    numeric: 98,
    label: "Median Lighthouse across shipped work",
    detail: "Up from a 60 baseline on migration",
  },
  {
    value: "AA",
    label: "WCAG accessibility as a default",
    detail: "Audited, not aspirational",
  },
  {
    value: "40+",
    numeric: 40,
    suffix: "+",
    label: "Modules unified under one system",
    detail: "Days, not weeks, to ship a new screen",
  },
  {
    value: "4+",
    numeric: 4,
    suffix: "+",
    label: "Years shipping to real users",
    detail: "Frontend, fullstack, and architecture",
  },
];

export const work = [
  {
    id: "01",
    category: "IoT · Real-time dashboards",
    title:
      "Turned a wall of sensor data into a control room operators actually trust.",
    summary:
      "Built real-time monitoring dashboards for distributed energy systems — live telemetry, clear charts, and a UX stakeholders could present without translation.",
    role: "Software Engineer · Powerlabs",
    impact: "98.61% faster data load after DB re-architecture",
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "TigerCloud DB",
      "Recharts",
      "Firebase Auth",
    ],
    caseStudyReady: false,
  },
  {
    id: "02",
    category: "Multi-tenant SaaS · Enterprise",
    title:
      "Led the Energy Trading module and authored the architecture powering multi-tenant operations.",
    summary:
      "Owned Energy Trading inside Pai Enterprise — buyer management, invoicing flows, operator overview, and admin surfaces aligned to backend models across MongoDB, PostgreSQL, and analytics services.",
    role: "Software Engineer · Powerlabs",
    impact: "Full-stack ownership across UI, API, RBAC & data design",
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "shadcn/ui",
    ],
    caseStudyReady: false,
  },
  {
    id: "03",
    category: "Creative product · Founding team",
    title:
      "Founding-team frontend for a creatives platform, tuned for speed and engagement.",
    summary:
      "Architected the Next.js app and reusable component library on Yourekaa — faster feature cycles, consistent UI, and a product that stayed fast under growth.",
    role: "Frontend Developer · Founding Team",
    impact: "+40% user engagement · Lighthouse 92 · −25% initial load",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Hooks"],
    caseStudyReady: false,
  },
  {
    id: "04",
    category: "Client delivery · Contract",
    title:
      "Shipped client sites faster by treating templates as a system, not a shortcut.",
    summary:
      "Delivered corporate and service sites by standardizing components instead of reinventing each page — clients launched sooner with less tech debt.",
    role: "Frontend Developer · Contract",
    impact: "−15% delivery time · +25% conversion · −40% tech debt",
    stack: ["React", "JavaScript (ES7+)", "REST APIs", "Responsive UI"],
    caseStudyReady: false,
  },
] as const;

export const philosophy = [
  {
    number: "01",
    title: "Software is a promise.",
    body: "Every screen, endpoint, and interaction is a commitment to the person on the other side. My job is to keep it — especially under load, in edge cases, and long after launch.",
  },
  {
    number: "02",
    title: "Product before pixels.",
    body: "I read the requirement before I open the Figma file. Understanding the business outcome is what decides whether a design is right, not whether it renders cleanly.",
  },
  {
    number: "03",
    title: "Systems, not screens.",
    body: "I build component libraries, data layers, and architectures so the next twenty features cost less than the first one. Consistency is a compounding asset.",
  },
  {
    number: "04",
    title: "Accessibility is default, not polish.",
    body: "WCAG-conformant markup, keyboard paths, and screen-reader flows are part of the definition of done — never a phase-two ticket.",
  },
  {
    number: "05",
    title: "Performance is a feature.",
    body: "Load time is a trust signal. I optimize the critical path (LCP, INP, TTFB) the way a product manager optimizes onboarding: relentlessly and with numbers.",
  },
  {
    number: "06",
    title: "AI accelerates, judgment decides.",
    body: "I use AI to move faster through research, drafts, and boilerplate. Architecture, tradeoffs, and the final review stay mine.",
  },
] as const;

export const aiEngineering = {
  title: "AI as a force multiplier — not a replacement for judgment.",
  lede: "The best engineers I know neither fear AI nor outsource their thinking to it. I use it to move faster while staying entirely accountable for the outcome.",
  leanOn: [
    "Accelerate research and discovery",
    "Generate implementation options",
    "Pressure-test architecture decisions",
    "Surface edge cases early",
    "Improve testing coverage",
    "Draft and refine documentation",
  ],
  own: [
    "System design and architecture",
    "Validation and correctness",
    "Tradeoff analysis",
    "Security posture",
    "Performance budgets",
    "Final implementation and review",
  ],
};

export const architecture = {
  flow: [
    { label: "Client", detail: "React 19 · TanStack" },
    { label: "Edge / SSR", detail: "Streaming render" },
    { label: "Server Fn", detail: "Typed RPC" },
    { label: "Data", detail: "Postgres · cache" },
  ],
  renderModes: [
    { code: "SSR", body: "First paint with real data, SEO-ready" },
    { code: "CSR", body: "Rich interactivity after hydration" },
    { code: "ISR", body: "Static speed with timed revalidation" },
    { code: "RSC", body: "Server components for zero-cost data" },
  ],
  decisions: [
    {
      q: "Why TanStack Start over a heavier framework?",
      a: "Typed routing and server functions with a minimal runtime — less to ship, less to debug, full SSR control.",
    },
    {
      q: "Why a token-driven design system, not ad-hoc styling?",
      a: "A single source of truth for color, type, and spacing keeps 40+ surfaces coherent and themeable.",
    },
    {
      q: "Why not reach for Redux by default?",
      a: "Most state is server state. Query caching plus local component state removes a whole category of bugs.",
    },
    {
      q: "Why budget performance up front?",
      a: "Retrofitting speed is expensive. Virtualization and code-splitting are cheaper as constraints than cures.",
    },
  ],
};

export const craft = {
  frontend: [
    "TypeScript",
    "JavaScript (ES6+)",
    "React",
    "Next.js",
    "Tailwind CSS",
    "MobX",
    "Recharts",
    "Chart.js",
    "shadcn/ui",
  ],
  backend: [
    "FastAPI",
    "Python",
    "Node.js",
    "REST APIs",
    "Firebase Auth",
    "MongoDB",
    "PostgreSQL",
    "TigerCloud DB",
  ],
  practice: [
    "Accessible UI (WCAG)",
    "Performance",
    "Component architecture",
    "Figma → code",
    "Technical documentation",
    "Git · Agile",
    "AI-assisted development",
  ],
  domains: [
    "IoT dashboards",
    "Multi-tenant SaaS",

    "Enterprise apps",
    "Growth-stage startups",
  ],
} as const;

export const trajectory = [
  {
    period: "2025 — Present",
    role: "Software Engineer · Powerlabs",
    detail:
      "Shipped Sentinel (IoT fleet monitoring) and led the Energy Trading module inside Pai Enterprise. Authored backend integration architecture across MongoDB, PostgreSQL, and analytics services; cut data load time by 98.61%.",
  },
  {
    period: "Remote",
    role: "Frontend Developer · Yourekaa (Founding Team)",
    detail:
      "Architected the Next.js UI, built a reusable component library (−30% feature time), and optimized the critical funnel to a Lighthouse 92 and −25% initial load.",
  },
  {
    period: "Contract",
    role: "Frontend Developer · Myllash Web Services",
    detail:
      "Delivered client sites 15% faster on average, lifted conversion by ~25%, and refactored legacy JS into modern React/ES7 (−40% technical debt).",
  },
  {
    period: "Remote",
    role: "Frontend Developer Intern · FlexiSAF",
    detail:
      "Built accessible React + Tailwind components, secure multi-step forms with React Hook Form + Yup, and technical demo videos for the team.",
  },
  {
    period: "Next",
    role: "Software Engineer · Senior / Technical Lead",
    detail: "The trajectory this whole page is evidence for.",
    future: true,
  },
] as const;

export type Pace = "fast" | "slow" | "medium" | "exhale";
export type SceneTone = "base" | "deep" | "cool" | "warm" | "depth";

export const journeyChapters = [
  {
    id: "top",
    number: "00",
    label: "Hero",
    title: "Promise kept.",
    pace: "fast" as Pace,
    sceneTone: "base" as SceneTone,
    inNav: false,
  },
  {
    id: "evidence",
    number: "01",
    label: "Evidence",
    title: "Measured, not claimed.",
    pace: "fast" as Pace,
    sceneTone: "base" as SceneTone,
    inNav: false,
  },
  {
    id: "work",
    number: "02",
    label: "Work",
    title: "Systems shipped, decisions defended.",
    pace: "medium" as Pace,
    sceneTone: "deep" as SceneTone,
    inNav: true,
  },
  {
    id: "approach",
    number: "03",
    label: "Approach",
    title: "How I think about the work.",
    pace: "slow" as Pace,
    sceneTone: "depth" as SceneTone,
    inNav: true,
  },
  {
    id: "ai",
    number: "04",
    label: "AI",
    title: "AI as a force multiplier.",
    pace: "slow" as Pace,
    sceneTone: "depth" as SceneTone,
    inNav: false,
  },
  {
    id: "architecture",
    number: "05",
    label: "Architecture",
    title: "Most portfolios stop at the UI.",
    pace: "slow" as Pace,
    sceneTone: "cool" as SceneTone,
    inNav: true,
  },
  {
    id: "skills",
    number: "06",
    label: "Craft",
    title: "Tools I reach for.",
    pace: "medium" as Pace,
    sceneTone: "base" as SceneTone,
    inNav: true,
  },
  {
    id: "trajectory",
    number: "07",
    label: "Trajectory",
    title: "A deliberate progression.",
    pace: "medium" as Pace,
    sceneTone: "base" as SceneTone,
    inNav: true,
  },
  {
    id: "contact",
    number: "08",
    label: "Contact",
    title: "Let's build something worth keeping.",
    pace: "exhale" as Pace,
    sceneTone: "warm" as SceneTone,
    inNav: true,
  },
] as const;

/** Nav + spine chapters that appear in primary navigation */
export const navSections = journeyChapters.filter((c) => c.inNav);

/** Full story spine (all chapter ticks) */
export const spineChapters = journeyChapters;
