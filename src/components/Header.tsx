import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/Button";

const LINKS = [
  { to: "/about", label: "About" },
  { to: "/network", label: "Our Network" },
  { to: "/solutions", label: "Solutions" },
  { to: "/contact", label: "Contact" },
];

const HEADER_HEIGHT = 68;

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [overHero, setOverHero] = useState(isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }

    const hero = document.getElementById("top");
    if (!hero) {
      setOverHero(false);
      return;
    }

    setOverHero(true);
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        overHero && !menuOpen
          ? "border-transparent bg-transparent"
          : "border-white/8 bg-ink/92 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Vega Charge — home"
          className="flex items-center gap-2.5 rounded-sm"
        >
          <img
            src="/media/vega-charge-lockup.svg"
            alt=""
            className="h-10 w-auto"
          />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `border-b-2 pb-0.5 font-sans text-[13.5px] font-semibold transition-colors ${
                  isActive
                    ? "border-mint text-white"
                    : "border-transparent text-onink hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Button href="/partner" variant="mint" size="sm">
            Let's Grow Together
          </Button>
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center text-onink md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition-transform duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/8 bg-ink/97 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-sm px-2 py-3 font-sans text-[15px] font-semibold transition-colors ${
                  isActive ? "text-mint" : "text-onink hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Button href="/partner" variant="mint" size="md" className="mt-3 w-full">
            Let's Grow Together
          </Button>
        </nav>
      </div>
    </header>
  );
}
