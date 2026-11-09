"use client";

import { useState } from "react";

const triageOptions = [
  "Compare error rate before and after the release",
  "Change the dashboard accent colour",
  "Ask every user to hard refresh",
];
const indexOptions = [
  "(created_at)",
  "(enterprise_id, status, created_at DESC)",
  "(status)",
];

export function PlaygroundGames() {
  const [triage, setTriage] = useState<number | null>(null);
  const [production, setProduction] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const canDeploy = production && !maintenance;

  return <section className="playroom" id="play">
    <div className="playroom-heading"><span>01 / ENGINEERING JUDGMENT</span><h2>Test the<br/><em>reasoning.</em></h2><p>Small, practical drills—not trivia. Each one asks the question before the implementation.</p></div>
    <div className="game-grid">
      <article className="game incident-game"><div><span>01 / INCIDENT TRIAGE</span><b>02:17</b></div><p>Errors rose after a release. Before changing anything, which signal gives the team a defensible starting point?</p><div className="engine-options">{triageOptions.map((option, optionIndex) => <button className={triage === null ? "" : optionIndex === 0 ? "is-right" : triage === optionIndex ? "is-wrong" : ""} key={option} onClick={() => setTriage(optionIndex)}>{option}</button>)}</div><small>{triage === null ? "Good incident work starts by reducing uncertainty." : triage === 0 ? "Right. First establish correlation; then isolate the regression with evidence." : "Useful later, perhaps. First identify when and where the behaviour changed."}</small></article>
      <article className="game logic-game"><div><span>02 / DEPLOY GATE</span><b>{canDeploy ? "OPEN" : "LOCKED"}</b></div><p>Release only when the system is serving production traffic and maintenance is not active.</p><div className="logic-switches"><button aria-pressed={production} className={production ? "is-on" : ""} onClick={() => setProduction(value => !value)}><i/>production</button><button aria-pressed={maintenance} className={maintenance ? "is-on" : ""} onClick={() => setMaintenance(value => !value)}><i/>maintenance</button></div><div className={`logic-result ${canDeploy ? "is-open" : ""}`}>deploy = production &amp;&amp; !maintenance</div><small>{canDeploy ? "Gate open. The release condition is explicit and testable." : "Set the inputs to meet the release condition."}</small></article>
      <article className="game query-game"><div><span>03 / QUERY PLAN</span><b>INDEX</b></div><p>A tenant feed filters by enterprise and status, then orders by recency. Which index avoids unnecessary work?</p><code>WHERE enterprise_id = ? AND status = ?<br/>ORDER BY created_at DESC</code><div className="engine-options index-options">{indexOptions.map((option, optionIndex) => <button className={index === null ? "" : optionIndex === 1 ? "is-right" : index === optionIndex ? "is-wrong" : ""} key={option} onClick={() => setIndex(optionIndex)}>{option}</button>)}</div><small>{index === null ? "Choose the index you would be ready to defend in a migration review." : index === 1 ? "Correct. Match the filter columns, then support the requested ordering." : "Not quite. This still makes the database filter or sort more than it needs to."}</small></article>
    </div>
  </section>;
}
