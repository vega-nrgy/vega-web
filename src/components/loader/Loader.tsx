import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import "./Loader.css";

/* Exact mark paths + viewBox from public/Vega Charge Logo Files/.../SVG/Vega Charge 11.svg
   — the mark is two overlapping solid chevrons, not one outline with a punched hole. */
const MARK_VIEWBOX = "0 0 918.1 976.25";
const PART_A_D =
  "M700.05,488.12l-328.08,328.11v-328.11h-153.91v488.12h139.29c45.01,0,84.76-15.34,118.14-45.61l442.62-442.52h-218.05Z";
const PART_B_D =
  "M218.05,488.12l328.08-328.11v328.11h153.91V0h-139.29c-45.01,0-84.76,15.34-118.14,45.61L0,488.12h218.05Z";

// Cut short: hold only long enough for the trace-draw to finish (matches
// the "1s" duration on .vega-trace-a/.vega-trace-b in Loader.css — keep
// them in sync), then dismiss immediately. No fill-in, no unfill, no
// erase-the-stroke "vanish" stage — those were removed from the CSS too.
const HOLD_MS = 1000;
const REDUCED_HOLD_MS = 400;
const FADE_MS = 400;

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
  const partARef = useRef<SVGPathElement>(null);
  const partBRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    for (const ref of [partARef, partBRef]) {
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
        <svg
          className="vega-logo-trace"
          viewBox={MARK_VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            ref={partARef}
            d={PART_A_D}
            className="vega-trace-path vega-trace-a"
          />
          <path
            ref={partBRef}
            d={PART_B_D}
            className="vega-trace-path vega-trace-b"
          />
        </svg>
        {/* <span className="vega-loader-word">VEGA CHARGE</span> */}
      </div>
    </div>
  );
}
