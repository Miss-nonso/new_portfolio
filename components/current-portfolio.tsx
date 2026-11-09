"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SignalScene } from "@/components/signal-scene";
import { LivingSystem } from "@/components/living-system";
import { SkillConstellation } from "@/components/skill-constellation";
import { CampfireContact } from "@/components/campfire-contact";
import { MotionSystem, MotionToggle, MagneticLink, useMotionSettings } from "@/components/motion-system";

const projects = [
  { id: "sentinel", number: "01", name: "Sentinel", category: "IOT / ENERGY SYSTEMS", title: "A clearer view.\nA smarter response.", description: "From a wall of sensor data to a fleet-monitoring dashboard operators can act on. Real-time metrics, thoughtful visualizations, and clarity at every level.", role: "Software Engineer · Powerlabs", stack: "React / TypeScript / Recharts / FastAPI", outcome: "Production fleet monitoring", layers: ["Operator interface", "Real-time metrics & visualization", "Energy system telemetry"], decision: "Making the signal useful", detail: "I worked with hardware and IoT teams to translate sensor data into actionable operator insights. I built and shipped the dashboard, with Recharts visualizations and a stakeholder-ready interface recognized internally for its clarity and design quality." },
  { id: "pai", number: "02", name: "Pai Enterprise", category: "MULTI-TENANT / ENTERPRISE", title: "Many moving parts.\nOne coherent system.", description: "Energy trading, buyer management, billing, and customer support. Connected workflows built for the people running complex energy operations.", role: "Software Engineer · Powerlabs", stack: "React / TypeScript / FastAPI / PostgreSQL", outcome: "End-to-end feature ownership", layers: ["Trading, support & admin interfaces", "API integration & role-based access", "Enterprise models & data services"], decision: "Designing across the boundaries", detail: "I led the Energy Trading module and authored the architecture for backend integration across PostgreSQL and analytics services. I also delivered Customer Support across the UI, API integration, and role-based access, and extended admin models for multi-tenant operations." },
  { id: "yourekaa", number: "03", name: "Yourekaa", category: "CREATIVE PLATFORM / FOUNDING TEAM", title: "More room\nfor possibility.", description: "A home for creative ambition. A responsive Next.js experience, reusable components, and faster journeys from first visit to competition registration.", role: "Frontend Developer · Founding Team", stack: "Next.js / React / Tailwind CSS", outcome: "92 Lighthouse performance score", layers: ["Discovery & registration journeys", "Shared components & custom hooks", "Asset optimization & deferred scripts"], decision: "Building speed into the foundation", detail: "I architected the interface and component library, reducing feature development time by 30%. Asset optimization and deferred scripts reduced initial page load time by 25%. I collaborated with a three-person design team and backend engineers through agile sprints." },
];

function ProductPreview({ kind }: { kind: string }) {
 const [sensor, setSensor] = useState("Solar array");
 const [role, setRole] = useState("Operator");
 if (kind === "yourekaa") return <div className="creative-preview"><div className="creative-nav"><b>yourekaa<span>✳</span></b><span>A place for your next big idea ↗</span></div><div className="creative-body"><span className="mini-label">FOR THE BEAUTIFULLY CURIOUS</span><h4>MAKE<br /><i>SOME</i><br />THING.</h4><div className="creative-flower" aria-hidden="true">✳</div><span className="creative-sticker">Ideas deserve<br />a stage.</span></div><div className="creative-footer">CREATE. CONNECT. BE DISCOVERED.<span>↗</span></div></div>;
 if (kind === "pai") return <div className="app-preview pai-preview"><aside><b>pai<span>®</span></b><span>Workspace</span><strong>▦ Overview</strong><span>↗ Energy trading</span><span>▤ Invoices</span><span>◉ Support</span></aside><div className="app-main"><div className="app-top"><span>Enterprise / Overview</span><span className="live-pill">● Workspace</span></div><div className="app-heading"><h4>{role} overview</h4><select aria-label="Preview workspace role" value={role} onChange={e=>setRole(e.target.value)}><option>Operator</option><option>Administrator</option></select></div><p className="preview-description">Everything connected. Everything in view.</p><div className="metric-row"><div><small>Energy traded</small><strong>24.8 <em>MWh</em></strong></div><div><small>Active buyers</small><strong>36</strong></div></div><div className="preview-table"><div><span>{role === "Administrator" ? "Enterprise locations" : "Recent transactions"}</span><span>Status</span></div>{["Marina", "Ikeja", "Victoria Island"].map((x,i)=><div key={x}><span><i>0{i+1}</i> {x} {role === "Administrator" ? "· Location" : "· Energy purchase"}</span><span className="table-status">{role === "Administrator" ? "Active" : "Completed"}</span></div>)}</div></div></div>;
 return <div className="app-preview sentinel-preview"><aside><b><span>◈</span> sentinel</b><span>MONITOR</span><strong>▦ Fleet overview</strong><span>⌁ Telemetry</span><span>◷ Activity</span><span>⚙ Settings</span><div className="aside-bottom">● Systems connected</div></aside><div className="app-main"><div className="app-top"><span>Workspace / Fleet overview</span><span className="live-pill">● Demo telemetry</span></div><div className="app-heading"><h4>Fleet overview</h4><span>Today ↗</span></div><div className="metric-row"><div><small>Power output</small><strong>{sensor === "Solar array" ? "128.4" : "86.2"}<em> kW</em></strong><span className="metric-note">↗ Steady generation</span></div><div><small>System health</small><strong>Optimal<span className="health-dot">●</span></strong><span className="metric-note">All checks passed</span></div></div><div className="chart-top"><span>Energy production</span><select aria-label="Preview sensor" value={sensor} onChange={e=>setSensor(e.target.value)}><option>Solar array</option><option>Battery storage</option></select></div><svg className="telemetry-chart" viewBox="0 0 500 130" role="img" aria-label={`Illustrative ${sensor.toLowerCase()} energy production chart`}><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#dc8259" stopOpacity=".35"/><stop offset="1" stopColor="#dc8259" stopOpacity="0"/></linearGradient></defs>{[25,60,95].map(y=><path key={y} d={`M0 ${y}H500`} stroke="#ffffff12"/>)}<path d={sensor === "Solar array" ? "M0 105L25 95L50 99L75 65L100 77L125 55L150 62L175 30L200 40L225 20L250 32L275 10L300 25L325 15L350 42L375 28L400 55L425 45L450 72L475 64L500 88V130H0Z" : "M0 80L50 70L100 75L150 45L200 52L250 35L300 48L350 30L400 42L450 35L500 55V130H0Z"} fill="url(#chart-fill)" stroke="#dc8259" strokeWidth="2"/></svg><div className="chart-times"><span>06:00</span><span>10:00</span><span>14:00</span><span>18:00</span></div></div></div>;
}

function Landmark({ kind }: { kind: string }) {
 const labels = { sentinel: "THE WATCHTOWER", pai: "THE MARKET", yourekaa: "THE STAGE" } as const;
 return <div className={`project-landmark landmark-${kind}`} aria-hidden="true"><svg viewBox="0 0 180 120" fill="none"><path d={kind === "sentinel" ? "M30 104L71 25L106 104M51 66H91M71 25V10M121 104V47L153 29V104M121 68H153" : kind === "pai" ? "M20 98H160M31 98V48H68V98M74 98V28H118V98M125 98V57H151V98M81 45H111M81 63H111" : "M29 96C29 54 55 28 90 28C125 28 151 54 151 96M53 96V74H127V96M68 42L90 21L112 42M90 21V9"} /><circle cx="90" cy="104" r="4" /></svg><span>{labels[kind as keyof typeof labels]}</span></div>;
}

function Project({ project, view }: { project: typeof projects[number]; view: "tiles" | "list" }) {
 const [underneath, setUnderneath] = useState(false);
 const [expanded, setExpanded] = useState(false);
 const { disabled } = useMotionSettings();
 const visible = view === "tiles" || expanded;
 return <motion.article initial={disabled ? false : { y: 28 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .1 }} layout={!disabled} transition={{ type: "spring", stiffness: 160, damping: 25 }} className={`project project-${project.id} ${expanded ? "is-expanded" : ""}`} id={project.id}>
   <div className="project-index-row">
     <span className="project-number">/{project.number}</span>
     <div><h3>{project.name}</h3><span>{project.category}</span></div>
     <span className="index-role">{project.role}</span>
     <button className="project-open" aria-expanded={expanded} aria-controls={`${project.id}-body`} onClick={() => setExpanded(value => !value)} aria-label={`${expanded ? "Close" : "View"} ${project.name} project`}><span>{expanded ? "Close project" : "View project"}</span><i aria-hidden="true">{expanded ? "−" : "↗"}</i></button>
   </div>
   <div id={`${project.id}-body`} hidden={!visible}>
   <div className="project-meta"><span>{project.number} / {project.category}</span><span>{project.role}</span></div>
   <div className="project-stage"><div className="project-wordmark" aria-hidden="true">{project.name}</div><Landmark kind={project.id}/><div className={`preview-frame ${underneath ? "is-underneath" : ""}`}><ProductPreview kind={project.id}/></div><div className="stage-caption"><span>INTERFACE STUDY · ILLUSTRATIVE DATA</span><span>{project.stack}</span></div></div>
   <div className="project-copy"><div><span className="mini-label">{project.name}</span><h3>{project.title}</h3></div><div><p>{project.description}</p><span className="project-outcome">↗ {project.outcome}</span><button className="underneath-button" aria-expanded={underneath} aria-controls={`${project.id}-layers`} onClick={()=>setUnderneath(!underneath)}>{underneath ? "Back to the experience" : "Look underneath"}<span>{underneath ? "−" : "+"}</span></button></div></div>
   <div id={`${project.id}-layers`} className="underneath-panel" hidden={!underneath}><div className="layer-stack">{project.layers.map((layer,i)=><motion.div key={layer} initial={false} animate={{x: underneath && !disabled ? i * 5 : 0}}><span>0{i+1}</span>{layer}<span>↗</span></motion.div>)}</div><div><span className="mini-label">THE ENGINEERING STORY</span><h4>{project.decision}</h4><p>{project.detail}</p><small>Conceptual breakdown of my contribution; interface studies are reconstructed, not production screenshots.</small></div></div>
   </div>
 </motion.article>;
}

function JourneyThread({ chapter }: { chapter: "arrival" | "thinking" | "systems" | "forward" }) {
 const { disabled } = useMotionSettings();
 const paths = {
   arrival: "M8 138 C95 138 76 30 166 30 S268 150 364 87 S447 42 534 80",
   thinking: "M8 102 C88 102 93 32 161 32 C231 32 221 141 292 141 C361 141 374 56 438 56 S506 93 534 93",
   systems: "M8 100 H120 L160 48 H255 L300 140 H395 L440 75 H534",
   forward: "M8 124 C102 124 108 35 196 35 S280 123 347 123 S426 60 534 60",
 };
 return <svg className={`journey-thread journey-thread-${chapter}`} viewBox="0 0 542 170" fill="none" aria-hidden="true">
   <motion.path d={paths[chapter]} initial={disabled ? { pathLength: 1 } : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: .4 }} transition={{ duration: disabled ? 0 : 1.55, ease: "easeInOut" }} />
   <motion.circle cx="8" cy={chapter === "arrival" ? "138" : chapter === "thinking" ? "102" : chapter === "systems" ? "100" : "124"} r="5" initial={disabled ? { scale: 1 } : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: .35, type: "spring" }} />
   <circle cx="534" cy={chapter === "arrival" ? "80" : chapter === "thinking" ? "93" : chapter === "systems" ? "75" : "60"} r="5" />
 </svg>;
}

function Hero() {
 const { disabled } = useMotionSettings();
 const lines = ["Complexity", "has a shape.", "I make it clear."];
 return <section className="journey-hero living-hero" id="top">
   <div className="hero-eyebrow"><span>CHINONSO DANIELS / SOFTWARE ENGINEER</span><span><i className="status-dot"/> LAGOS, NIGERIA</span></div>
   <div className="journey-hero-grid">
     <div className="journey-hero-copy">
       <p className="hero-small-label">A LIVING SYSTEM / SOFTWARE ENGINEER</p>
       <h1 aria-label="Complexity has a shape. I make it clear.">{lines.map((line, index) => <span className="hero-line" key={line} aria-hidden="true"><motion.span initial={disabled ? false : { y: "110%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: .95, delay: .12 + index * .12, ease: [.22, 1, .36, 1] }}>{line}</motion.span></span>)}</h1>
       <motion.p className="hero-reveal" initial={disabled ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>I’m Chinonso Daniels. Software engineer.</motion.p>
       <div className="hero-description"><span className="tiny-cross" aria-hidden="true">✳</span><p>I design and build thoughtful digital products where engineering, product thinking, and craft meet.</p></div>
       <div className="hero-actions"><MagneticLink className="solid-link" href="#work">Explore the work <span>↓</span></MagneticLink><a className="text-link" href="#work">Recruiter view <span>→</span></a></div>
     </div>
     <div className="journey-hero-art"><span className="art-coordinate">THE FIRST MARK / 01</span><JourneyThread chapter="arrival"/><SignalScene mode="hero" paused={disabled}/><span className="art-coordinate art-coordinate-bottom">FOLLOW THE THREAD</span></div>
   </div>
   <div className="hero-bottom"><span>SYSTEM / RESPONSIVE</span><a href="#work">SCROLL TO SEE THE WORK <span>↓</span></a><span>INPUT → RESPONSE</span></div>
 </section>;
}

function BeforeCode() {
 const fragments = ["I notice what feels off.", "I ask what the real problem is.", "I keep going until the complicated feels obvious."];
 return <section className="before-code" id="before-code"><div className="section-kicker"><span>01 / BEFORE THE CODE</span><span>THE HUMAN BIT</span></div><div className="before-code-layout"><JourneyThread chapter="arrival"/><div><h2>Before the code,<br/><em>there’s curiosity.</em></h2><p className="before-code-intro">The work starts long before an editor opens: with attention, questions, and a slightly stubborn belief that useful things can also be beautiful.</p></div></div><div className="fragment-grid">{fragments.map((fragment, index) => <motion.article key={fragment} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ delay: index * .12 }}><span>0{index + 1}</span><p>{fragment}</p><i aria-hidden="true">✳</i></motion.article>)}</div></section>;
}

function HowIThink() {
 const decisions = [
  ["01", "Listen first", "Requirements are a clue, not a complete answer. I look for the actual decision or person on the other side."],
  ["02", "Make the shape", "I map the system before polishing the screen: data, states, constraints, and the seams where things can fail."],
  ["03", "Refine with evidence", "The final pass is where clarity earns its keep: accessible, responsive, measurable, and ready for real use."],
 ];
 return <section className="how-i-think" id="thinking"><div className="thinking-header"><div><span className="mini-label">02 / HOW I THINK</span><h2>Elegance is not decoration.<br/><em>It is resolution.</em></h2></div><p>When every part understands its job, the product feels calm. That calm is the point.</p></div><JourneyThread chapter="thinking"/><div className="decision-steps">{decisions.map(([number, title, body]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div><i aria-hidden="true">↘</i></article>)}</div></section>;
}

function WorkCollection() {
 const [view, setView] = useState<"tiles" | "list">("tiles");
 const { disabled } = useMotionSettings();
 return <section id="work" className="work-section journey-work">
   <div className="section-intro"><span className="mini-label">03 / BUILT IN THE REAL WORLD</span><motion.h2 initial={false} whileInView={{ y: 0 }} transition={{ duration: disabled ? 0 : .8 }}>The thread becomes<br/><em>a system.</em></motion.h2><p>Product, engineering, and curiosity meeting where the work becomes useful.</p></div>
   <div className="work-thread"><JourneyThread chapter="systems"/></div>
   <div className="work-toolbar"><span>THREE PROJECTS. MANY GOOD DECISIONS.</span><div className="view-switch" role="group" aria-label="Project display"><button aria-label="Tile view" aria-pressed={view === "tiles"} onClick={() => setView("tiles")}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 2h6v6H2zM12 2h6v6h-6zM2 12h6v6H2zM12 12h6v6h-6z"/></svg><span>Tiles</span></button><button aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 4h16M2 10h16M2 16h16"/></svg><span>List</span></button></div></div>
   <div className={`project-collection view-${view}`}>{projects.map(project=><Project key={project.id} project={project} view={view}/>)}</div>
 </section>;
}

function Playground() {
 const { disabled } = useMotionSettings();
 return <section className="playground workshop" aria-labelledby="playground-title"><div className="playground-heading"><span className="mini-label">05 / THE WORKSHOP</span><h2 id="playground-title">Every good system<br/><em>starts with a tool.</em></h2><p>Drag, throw, or scatter the pieces. This is a small bounded physics world: a reminder that interaction should respond to people, not just inputs.</p></div><div className="playground-stage"><span className="playground-watermark" aria-hidden="true">MAKE / TEST / REFINE</span><SignalScene mode="play" paused={disabled}/></div></section>;
}

function PathSection() {
 return <section className="about-section path-section" id="path"><div className="about-kicker"><span className="mini-label">06 / THE HORIZON</span><span className="about-asterisk" aria-hidden="true">✳</span></div><div className="about-copy"><JourneyThread chapter="forward"/><h2>Still building<br/>the way <em>forward.</em></h2><p>I’m Chinonso, a software engineer based in Lagos. I turn product requirements, Figma designs, and complex data into interfaces people can use with confidence.</p><p>My next questions sit at the intersection of human-centred systems, practical AI assistance, and the interfaces that help people make better decisions under pressure.</p><div className="horizon-note"><span>LASU / COMPUTER SCIENCE</span><p>Learning in public, testing ideas with care, and following the evidence wherever it leads.</p></div><div className="skills-list"><span>React & Next.js</span><span>TypeScript</span><span>Python & FastAPI</span><span>Node.js</span><span>PostgreSQL & MongoDB</span><span>Accessible interfaces</span></div></div><div className="experience-list"><div><span>NOW · SEP 2025 — PRESENT</span><h3>Powerlabs</h3><p>Software Engineer · Lagos</p></div><div><span>FOUNDING TEAM</span><h3>Yourekaa</h3><p>Frontend Developer · Remote</p></div><div><span>CONTRACT</span><h3>Myllash Web Services</h3><p>Frontend Developer</p></div><div><span>INTERNSHIP</span><h3>FlexiSAF</h3><p>Frontend Developer Intern · Remote</p></div><div><span>EDUCATION</span><h3>Lagos State University</h3><p>BSc(ED), Computer Science</p></div></div></section>;
}

function PortfolioContent() {
 return <LivingSystem><div className="current"><a href="#main" className="skip-link">Skip to content</a><header className="current-nav"><a className="brand" href="#top" aria-label="Chinonso Daniels home">c<span>↗</span>d<span className="brand-caption">CHINONSO<br/>DANIELS</span></a><div className="nav-right"><span className="trail-clock" aria-label="System responds to pointer and scroll">SYSTEM / ONLINE</span><MotionToggle/><nav aria-label="Main navigation"><a href="#thinking">Thinking <sup>02</sup></a><a href="#work">Work <sup>03</sup></a><a href="#constellation">Skills</a><a href="#path">Path</a><a href="#contact">Let’s talk <span>↗</span></a></nav></div></header><main id="main"><Hero/><div className="current-ribbon" aria-hidden="true"><div><span>SYSTEMS THINK <i>✳</i> PRODUCTS RESPOND <i>✳</i> CRAFT MATTERS <i>✳</i> </span><span>SYSTEMS THINK <i>✳</i> PRODUCTS RESPOND <i>✳</i> CRAFT MATTERS <i>✳</i> </span></div></div><BeforeCode/><HowIThink/><WorkCollection/><SkillConstellation/><PathSection/><Playground/><CampfireContact/></main></div></LivingSystem>;
}

export function CurrentPortfolio() {
 return <MotionSystem><PortfolioContent/></MotionSystem>;
}
