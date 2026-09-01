"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Prikazuje visok screenshot sajta unutar okvira koji se sam skroluje
 * dok posjetilac skroluje stranicu. Radi isto na telefonu i na desktopu.
 */
export function ScrollShot({
  src,
  alt,
  bg,
  className = "",
  rounded = false,
}: {
  src?: string;
  alt: string;
  bg: string;
  className?: string;
  rounded?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [broken, setBroken] = useState(!src);

  useEffect(() => {
    if (broken) return;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 kad blok tek uđe odozdo, 1 kad izađe na vrh
      const raw = (vh - rect.top) / (vh + rect.height);
      const p = Math.min(1, Math.max(0, raw));
      const travel = img.offsetHeight - wrap.clientHeight;
      if (travel > 0) {
        img.style.transform = `translate3d(0, ${-(p * travel).toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    img.addEventListener("load", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      img.removeEventListener("load", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [broken, src]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ background: bg }}
    >
      {broken ? (
        <Placeholder src={src} rounded={rounded} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          className="shot-track absolute left-0 top-0 w-full"
        />
      )}
    </div>
  );
}

function Placeholder({ src, rounded }: { src?: string; rounded: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-paper-2 px-5 text-center ${
        rounded ? "" : ""
      }`}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-ink/35"
        aria-hidden
      >
        <path d="M3 5h18v14H3z" />
        <path d="m3 16 5-5 4 4 3-3 6 6" />
      </svg>
      <p className="mono text-ink/45">Screenshot nedostaje</p>
      {src && (
        <code className="font-mono text-[10px] leading-relaxed text-ink/35 break-all">
          public{src}
        </code>
      )}
    </div>
  );
}

/** Okvir koji izgleda kao prozor browsera. */
export function BrowserFrame({
  domen,
  children,
}: {
  domen: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[var(--line-strong)] bg-paper">
      <div className="flex items-center gap-3 border-b border-[var(--line)] bg-paper-2 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
        </div>
        <span className="font-mono text-[10px] tracking-wide text-ink/45">
          {domen}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Okvir koji izgleda kao telefon. */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-[6px] border-ink bg-ink p-0 shadow-none ${className}`}
      style={{ borderRadius: 0 }}
    >
      <div className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 z-10 h-1 w-14 -translate-x-1/2 bg-ink/60" />
        {children}
      </div>
    </div>
  );
}
