import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "../ui/Button";
import { fadeOnly, fadeUp, staggerChildren } from "../../lib/variants";
import { HeroKenBurns } from "./HeroKenBurns";
import { hasLoaderPlayed, LOADER_DURATION_MS } from "../loader/Loader";

const DAY_IMG = "/media/hero-day.jpg";
const HEADLINE = "Charging India Forward";
// Forces the wrap after "Charging" so "India Forward" always stays together
// on its own line, instead of the browser's natural greedy wrap (which pairs
// "Charging India" and strands "Forward" alone) — keep in sync with HEADLINE.
const FIRST_LINE_LEN = "Charging".length;

/* Same 4 corners in both states (top-left, top-right, bottom-right,
   bottom-left) so the transition moves each vertex in a straight horizontal
   line instead of cutting diagonally across the frame. */
const CLIP_HIDDEN = "polygon(0 0,0 0,0 100%,0 100%)";
// const CLIP_FULL = "polygon(0 0,100% 0,100% 100%,0 100%)";

// const NIGHT_OUT_AT = 0.32;
// const WIPE_AT = 0.45;
// const DAY_IN_AT = 0.55;

/* Scroll-pinned night -> day wipe. Night = the live hero video (unchanged
   copy/CTAs). Day resolves into the About page intro (see PageIntro in
   AboutPage.tsx) as the diagonal wipe reveals a daylight station shot.

   The headline used to type itself out character-by-character. Dropped —
   the post-build prerender step (scripts/prerender.mjs) snapshots each
   route on `networkidle`, which fires before the typewriter's startDelay
   even elapses, so crawlers/link-unfurlers were getting a static HTML
   snapshot with an empty headline (just a bare blinking-cursor span, no
   text). A static heading renders correctly in that snapshot every time. */
export function Hero() {
  const reduced = useReducedMotion();
  const item = reduced ? fadeOnly : fadeUp;
  // First homepage visit: the full-screen loader (see loader/Loader.tsx)
  // covers the page for LOADER_DURATION_MS, so hold the entrance stagger
  // until it's gone instead of animating in underneath it.
  const delayChildren = (hasLoaderPlayed ? 0 : LOADER_DURATION_MS / 1000) + 0.35;

  const pinRef = useRef<HTMLElement>(null);
  const dayLayerRef = useRef<HTMLDivElement>(null);
  const nightCopyRef = useRef<HTMLDivElement>(null);
  // const dayCopyRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function onScroll() {
  //     const pin = pinRef.current;
  //     const day = dayLayerRef.current;
  //     if (!pin || !day) return;

  //     const rect = pin.getBoundingClientRect();
  //     const total = pin.offsetHeight - window.innerHeight;
  //     const scrolled = Math.min(Math.max(-rect.top, 0), total);
  //     const progress = total > 0 ? scrolled / total : 0;

  //     day.style.clipPath = progress >= WIPE_AT ? CLIP_FULL : CLIP_HIDDEN;
  //     if (nightCopyRef.current) {
  //       nightCopyRef.current.style.opacity =
  //         progress >= NIGHT_OUT_AT ? "0" : "1";
  //     }
  //     if (dayCopyRef.current) {
  //       dayCopyRef.current.style.opacity = progress >= DAY_IN_AT ? "1" : "0";
  //     }
  //   }

  //   onScroll();
  //   document.addEventListener("scroll", onScroll, { passive: true });
  //   return () => document.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <section
      id="top"
      ref={pinRef}
      aria-labelledby="hero-heading"
      className="relative isolate h-svh bg-ink"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="absolute inset-0 opacity-55">
          <HeroKenBurns />
        </div>
        <div
          ref={dayLayerRef}
          className="absolute inset-0 bg-cover bg-center transition-[clip-path] duration-1000 ease-out"
          style={{ backgroundImage: `url(${DAY_IMG})`, clipPath: CLIP_HIDDEN }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/15 to-ink/[.85]"
          aria-hidden="true"
        />

        <div
          ref={nightCopyRef}
          className="absolute inset-0 z-2 mx-auto flex h-full max-w-7xl items-end px-6 pb-18 pt-28 transition-opacity duration-500 ease-out lg:px-8"
        >
          <motion.div
            className="max-w-2xl"
            variants={staggerChildren(delayChildren, 0.18)}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={item}
              className="font-display text-[11px] font-normal tracking-[0.18em] text-mint"
            >
              INDIA&rsquo;S HIGHWAY EV CHARGING NETWORK
            </motion.p>
            <motion.h1
              id="hero-heading"
              variants={item}
              className="mt-5 font-avapore text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl"
            >
              {HEADLINE.slice(0, FIRST_LINE_LEN)}
              <br />
              {HEADLINE.slice(FIRST_LINE_LEN + 1)}
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-lg font-display text-lg leading-relaxed text-onink"
            >
              High-power charging hubs strategically located across key highway
              corridors &mdash; built for passenger EVs, fleets and commercial
              electric vehicles.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Button href="/network" variant="mint" className="font-display!">
                Explore Our Network
              </Button>
              <Button href="/partner" variant="ghost-onink" className="font-display!">
                Partner With Vega Charge
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* <div
          ref={dayCopyRef}
          className="absolute inset-0 z-2 mx-auto flex h-full max-w-7xl items-end px-6 pb-18 pt-28 opacity-0 transition-opacity duration-500 ease-out lg:px-8"
        >
          <div className="max-w-xl">
            <p className="font-mono text-[11px] font-normal tracking-[0.18em] text-mint-deep">
              ABOUT US &middot; VEGA CHARGE PRIVATE LIMITED
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
              We&rsquo;re building the roads India&rsquo;s EVs deserve.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              We&rsquo;re solving it with Vega Charge &mdash; a network of
              premium, multi-standard fast-charging stations designed for
              highway corridors across Telangana, Andhra Pradesh, and beyond.
            </p>
          </div>
        </div> */}

        {/* <div
          className="absolute bottom-[14%] right-[6%] z-2 flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/60"
          aria-hidden="true"
        >
          <span>SCROLL</span>
          <div className="relative h-[34px] w-px overflow-hidden bg-white/40">
            <div className="absolute left-0 top-[-100%] h-full w-full animate-scroll-down bg-mint motion-reduce:animate-none" />
          </div>
        </div> */}
      </div>
    </section>
  );
}
