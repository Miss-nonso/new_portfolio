"use client";

import { useRef, useState } from "react";

const email = "chinonsodaniels2020@gmail.com";

export function CampfireContact() {
  const [charged, setCharged] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const light = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setCharged(true);
  };
  const beginCharge = () => { timer.current = window.setTimeout(light, 650); };
  const stopCharge = () => { if (timer.current) window.clearTimeout(timer.current); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); } catch { /* The mailto link remains the reliable fallback. */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <section id="contact" className={`campfire signal-contact ${charged ? "is-lit" : ""}`} aria-labelledby="campfire-title"><div className="campfire-copy"><span className="mini-label">07 / OPEN A SIGNAL</span><h2 id="campfire-title">Let’s make the next<br/>difficult thing <em>simple.</em></h2><p>Good work begins with a clear conversation. Send an impulse, or take the direct route.</p><div className="campfire-actions"><button type="button" className="fire-button" onPointerDown={beginCharge} onPointerUp={stopCharge} onPointerLeave={stopCharge} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") beginCharge(); }} onKeyUp={stopCharge} onClick={light} aria-pressed={charged}><span className="fire-icon" aria-hidden="true">⊹</span>{charged ? "Signal established" : "Hold to establish signal"}</button>{charged && <div className="contact-reveal"><a className="contact-link" href={`mailto:${email}`}>Start a conversation <span>↗</span></a><button type="button" className="copy-email" onClick={copy}>{copied ? "Email copied" : "Copy email"}</button></div>}</div><a className="campfire-fallback" href={`mailto:${email}`}>{email} <span>↗</span></a></div><div className="firepit signal-orbit" aria-hidden="true"><span/><span/><span/><i/><i/><i/></div><footer><a className="footer-brand" href="#top">CD<span>↗</span></a><span>© 2026 CHINONSO DANIELS</span><div><a href="https://github.com/Miss-nonso">GitHub ↗</a><a href="https://linkedin.com/in/nonso-daniels">LinkedIn ↗</a><a href="/Chinonso-Daniels-CV.txt" download>CV ↓</a></div><a href="#top">BACK TO TOP ↑</a></footer></section>;
}
