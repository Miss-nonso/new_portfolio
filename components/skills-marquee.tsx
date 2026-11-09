import { craft } from "@/lib/content";

const all = [
  ...craft.frontend,
  ...craft.backend,
  ...craft.practice,
  ...craft.domains,
];

export function SkillsMarquee() {
  const loop = [...all, ...all];

  return (
    <div className="marquee" aria-label="Technical skills">
      <div className="marquee-track">
        {loop.map((skill, i) => (
          <span key={`${skill}-${i}`} className="marquee-item">
            <span className="marquee-dot" aria-hidden />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
