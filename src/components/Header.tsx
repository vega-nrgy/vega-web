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
        overHero
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
            Join the Charge
          </Button>
        </nav>
        <Button href="/network" variant="mint" size="sm" className="md:hidden">
          Find a Station
        </Button>
      </div>
    </header>
  );
}
