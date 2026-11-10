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
  const [idempotencyKey, setIdempotencyKey] = useState(false);
  const [durableLedger, setDurableLedger] = useState(false);
  const [blindRetry, setBlindRetry] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const retryIsSafe = idempotencyKey && durableLedger && !blindRetry;

  return (
    <section className="playroom" id="play">
      <div className="playroom-heading">
        <span>04 / ENGINEERING JUDGMENT</span>
        <h2>
          Put the reasoning
          <br />
          <em>to the test.</em>
        </h2>
        <p>Three real constraints. No trivia. The point is not the answer. It is the reasoning that protects the business when conditions get messy.</p>
      </div>
      <div className="game-grid">
        <article className="game incident-game">
          <div><span>01 / INCIDENT TRIAGE</span><b>02:17</b></div>
          <p>Errors rose after a release. What do you prove before touching the code?</p>
          <div className="engine-options">{triageOptions.map((option, optionIndex) => <button className={triage === null ? "" : optionIndex === 0 ? "is-right" : triage === optionIndex ? "is-wrong" : ""} key={option} onClick={() => setTriage(optionIndex)}>{option}</button>)}</div>
          <small>{triage === null ? "Find the signal. Then make the change." : triage === 0 ? "Exactly. Evidence first; intervention second." : "A possible fix is not yet a diagnosis. Prove the regression first."}</small>
        </article>
        <article className="game logic-game">
          <div><span>02 / RETRY SAFETY</span><b>{retryIsSafe ? "SAFE" : "RISK"}</b></div>
          <p>A payment request times out after the provider may have charged the customer. Make retrying safe without charging twice.</p>
          <div className="logic-switches">
            <button aria-pressed={idempotencyKey} className={idempotencyKey ? "is-on" : ""} onClick={() => setIdempotencyKey(value => !value)}><i />idempotency key</button>
            <button aria-pressed={durableLedger} className={durableLedger ? "is-on" : ""} onClick={() => setDurableLedger(value => !value)}><i />durable payment ledger</button>
            <button aria-pressed={blindRetry} className={blindRetry ? "is-on" : ""} onClick={() => setBlindRetry(value => !value)}><i />blindly charge again</button>
          </div>
          <div className={`logic-result ${retryIsSafe ? "is-open" : ""}`}>retry = key &amp;&amp; ledger &amp;&amp; !blind_retry</div>
          <small>{retryIsSafe ? "Safe retry path: the same request resolves to the same financial outcome." : "A retry is a business decision. Make duplicate charges impossible, not merely unlikely."}</small>
        </article>
        <article className="game query-game">
          <div><span>03 / QUERY PLAN</span><b>INDEX</b></div>
          <p>Data at scale punishes vague thinking. Pick the index that earns its keep.</p>
          <code>WHERE enterprise_id = ? AND status = ?<br />ORDER BY created_at DESC</code>
          <div className="engine-options index-options">{indexOptions.map((option, optionIndex) => <button className={index === null ? "" : optionIndex === 1 ? "is-right" : index === optionIndex ? "is-wrong" : ""} key={option} onClick={() => setIndex(optionIndex)}>{option}</button>)}</div>
          <small>{index === null ? "Choose the index you can defend in a migration review." : index === 1 ? "Right. Filter with intent. Order without waste." : "Close is still expensive. Let the database do less work."}</small>
        </article>
      </div>
    </section>
  );
}
