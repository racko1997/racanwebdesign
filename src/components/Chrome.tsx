"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Brand";
import { site, cta } from "@/site.config";

const meni: [string, string][] = [
  ["Radovi", "#radovi"],
  ["Šta dobijate", "#sta"],
  ["Cijene", "#cijene"],
  ["O meni", "#o-nama"],
];

export function Header({ overDark = false }: { overDark?: boolean }) {
  const [solid, setSolid] = useState(false);
  const light = overDark && !solid;

  useEffect(() => {
    // Dok smo iznad tamnog heroja traka ostaje tamna sa svijetlim tekstom;
    // čim hero prođe, prelazi u svijetlu traku.
    const prag = () => {
      if (!overDark) return 24;
      const hero = document.getElementById("vrh");
      return hero ? hero.offsetHeight - 64 : 24;
    };
    const onScroll = () => setSolid(window.scrollY > prag());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overDark]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-[var(--line)] bg-paper/92 backdrop-blur-sm"
          : light
            ? "border-b border-transparent bg-ink"
            : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <a href="#vrh" aria-label="Racan Web Studio — početak">
          <Wordmark light={light} />
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Glavni meni"
        >
          {meni.map(([naziv, href]) => (
            <a
              key={href}
              href={href}
              className={`link-underline text-[0.9375rem] ${
                light
                  ? "text-paper/75 hover:text-paper"
                  : "text-ink/75 hover:text-ink"
              }`}
            >
              {naziv}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${site.telefon.replace(/\s/g, "")}`}
            className={`hidden font-mono text-[0.8125rem] tracking-wide sm:block ${
              light
                ? "text-paper/75 hover:text-paper"
                : "text-ink/75 hover:text-ink"
            }`}
          >
            {site.telefon}
          </a>
          <a
            href="#kontakt"
            className={`hidden px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors sm:inline-block ${
              light
                ? "bg-paper text-ink hover:bg-paper-2"
                : "bg-ink text-paper hover:bg-ink-2"
            }`}
          >
            {cta.primarni}
          </a>
        </div>
      </div>
    </header>
  );
}

/** Fiksna traka na dnu ekrana — samo na telefonu. Glavni alat za konverziju. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-[var(--line-dark)] bg-ink sm:hidden">
      <a
        href={`viber://chat?number=%2B${site.telefonRaw}`}
        className="flex min-h-[54px] items-center justify-center gap-2 border-r border-[var(--line-dark)] py-3.5 text-[0.9375rem] font-medium text-paper/85"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M6.6 2.7A10 10 0 0 1 20 12v.6a1 1 0 0 1-2 0V12A8 8 0 0 0 7.4 4.5a1 1 0 1 1-.8-1.8Zm.3 4.1a5.9 5.9 0 0 1 7.6 5.6 1 1 0 1 1-2 0 3.9 3.9 0 0 0-5-3.7 1 1 0 0 1-.6-1.9ZM5 3h2.2c.5 0 .9.3 1 .8l.7 3c.1.4 0 .8-.4 1l-1.5 1a12 12 0 0 0 5.3 5.3l1-1.5c.2-.3.6-.5 1-.4l3 .7c.5.1.8.5.8 1V17a3 3 0 0 1-3 3A14 14 0 0 1 2 6a3 3 0 0 1 3-3Z" />
        </svg>
        Viber
      </a>
      <a
        href="#kontakt"
        className="flex min-h-[54px] items-center justify-center bg-paper py-3.5 text-[0.9375rem] font-semibold text-ink"
      >
        {cta.primarni}
      </a>
    </div>
  );
}
