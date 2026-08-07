import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import "./Loader.css";

/* Traced from public/design/logo.jpg — outer silhouette + inner hole of the mark,
   normalized to a 163.5x174 viewBox. Re-trace if the source logo changes. */
const OUTER_D =
  "M96.5,6 L121.5,6 L122,86.5 L157.5,88 L82.5,162.5 L70,168 L42,168 L42,88 L6,86.5 L80,12.5 L87.5,8 Z";
const HOLE_D = "M95.5,34.5 L96,87 L120,88 L68,140 L68,88 L67,86.5 L43.5,86.5 Z";

const HOLD_MS = 5300;
const REDUCED_HOLD_MS = 600;
const FADE_MS = 700;

/* Total time the loader covers the page — other homepage entrance animations
   (e.g. the hero headline typewriter) should wait for this before starting. */
export const LOADER_DURATION_MS = HOLD_MS + FADE_MS;

/* The loader is mounted once at the app root (see main.tsx) and only ever
   plays on the initial page load, not on client-side route changes. Other
   components (e.g. Hero, remounted on every visit to "/") read this to know
   whether they still need to wait out the loader or can animate immediately. */
export let hasLoaderPlayed = false;

export function Loader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"playing" | "hiding" | "done">("playing");
  const outerRef = useRef<SVGPathElement>(null);
  const holeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    for (const ref of [outerRef, holeRef]) {
      const path = ref.current;
      if (!path) continue;
      const len = path.getTotalLength();
      path.style.setProperty("--len", String(len));
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    }

    const timer = setTimeout(
      () => setPhase("hiding"),
      reduced ? REDUCED_HOLD_MS : HOLD_MS,
    );
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (phase !== "hiding") return;
    const timer = setTimeout(() => {
      hasLoaderPlayed = true;
      setPhase("done");
    }, FADE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`vega-loader ${reduced ? "vega-loader--reduced" : ""} ${
        phase === "hiding" ? "vega-loader--hide" : ""
      }`}
      aria-hidden="true"
    >
      <div className="vega-loader-stage">
        <div className="vega-loader-glow" />
        <svg
          className="vega-logo-trace"
          viewBox="0 0 163.5 174"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            ref={outerRef}
            d={OUTER_D}
            className="vega-trace-path vega-trace-outer"
          />
          <path
            ref={holeRef}
            d={HOLE_D}
            className="vega-trace-path vega-trace-hole"
          />
        </svg>
        {/* <span className="vega-loader-word">VEGA CHARGE</span> */}
      </div>
    </div>
  );
}
