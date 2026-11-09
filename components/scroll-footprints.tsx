"use client";

import { useEffect, useState } from "react";

export function ScrollFootprints() {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximum > 0 ? window.scrollY / maximum : 0;
      setSteps(Math.min(10, Math.max(0, Math.ceil(progress * 10))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className="scroll-footprints" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i className={index < steps ? "is-made" : ""} key={index} />)}</div>;
}
