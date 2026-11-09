"use client";

import { useCallback, useRef, useState } from "react";
import { architecture } from "@/lib/content";

/**
 * Interactive data-flow pipeline — drag or keyboard to push data through stages.
 */
export function ArchPipeline() {
  const stages = architecture.flow;
  const stageCount = stages.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [progress, setProgress] = useState(0);

  const litIndex = Math.min(
    stageCount - 1,
    Math.floor(progress * (stageCount - 0.001)),
  );
  const litCount = stages.filter((_, i) => {
    const threshold = i / (stageCount - 1);
    return progress >= threshold - 0.02;
  }).length;

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const next = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setProgress(next);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 1 / (stageCount - 1);
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setProgress((p) => Math.min(1, p + step));
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setProgress((p) => Math.max(0, p - step));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setProgress(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setProgress(1);
    }
  };

  return (
    <div className="arch-pipeline">
      <div
        ref={trackRef}
        className="arch-pipeline-track throughline-stroke"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="arch-pipeline-fill"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        >
          <span className="arch-packet" />
        </div>
        <button
          type="button"
          className="arch-pipeline-handle"
          style={{ left: `${progress * 100}%` }}
          aria-label="Push data through the pipeline"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuetext={`Stage ${litIndex + 1} of ${stageCount}: ${stages[litIndex].label}`}
          role="slider"
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
        />
      </div>

      <div className="arch-pipeline-stages">
        {stages.map((node, i) => {
          const threshold = i / (stageCount - 1);
          const lit = progress >= threshold - 0.02;
          return (
            <div
              key={node.label}
              className={`arch-stage ${lit ? "is-lit" : ""}`}
            >
              <p className="arch-stage-index">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-lg font-bold tracking-tight">
                {node.label}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                {node.detail}
              </p>
            </div>
          );
        })}
      </div>

      <p className="arch-pipeline-hint">
        Drag to push data through · Arrow keys to step · {litCount} / {stageCount} lit
      </p>
    </div>
  );
}
