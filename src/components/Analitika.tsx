"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { site } from "@/site.config";

const KLJUC = "racan-pristanak";

type Stanje = "ucitava" | "pitaj" | "da" | "ne";

/**
 * ============================================================
 *  ANALITIKA I PRISTANAK
 * ============================================================
 *  Vercel Analytics (broj posjeta) je odvojen — ne postavlja
 *  kolačiće, pa mu pristanak ne treba i uvijek radi.
 *
 *  Meta piksel POSTAVLJA kolačiće, pa se ovdje pali tek kad
 *  posjetilac klikne „U redu“. Ako je `metaPixelId` prazan,
 *  nema ni piksela ni trake — na sajtu tada nema nikakvog
 *  Meta koda ni pitanja za posjetioca.
 * ============================================================
 */
export function Analitika() {
  const [stanje, setStanje] = useState<Stanje>("ucitava");

  useEffect(() => {
    // Nema piksela → nema šta da se pita.
    if (!site.metaPixelId) {
      setStanje("ne");
      return;
    }
    try {
      const spremljeno = localStorage.getItem(KLJUC);
      setStanje(spremljeno === "da" ? "da" : spremljeno === "ne" ? "ne" : "pitaj");
    } catch {
      // Pregledač blokira lokalno čuvanje — pitamo, ali ne pamtimo.
      setStanje("pitaj");
    }
  }, []);

  function odluci(odgovor: "da" | "ne") {
    try {
      localStorage.setItem(KLJUC, odgovor);
    } catch {
      /* nije presudno */
    }
    setStanje(odgovor);
  }

  return (
    <>
      {stanje === "da" && <MetaPixel id={site.metaPixelId} />}
      {stanje === "pitaj" && <Traka onOdluka={odluci} />}
    </>
  );
}

/* ---------------------------------------------------------------- */

function MetaPixel({ id }: { id: string }) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${id}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

/* ---------------------------------------------------------------- */

function Traka({ onOdluka }: { onOdluka: (o: "da" | "ne") => void }) {
  return (
    <div
      role="region"
      aria-label="Pitanje o praćenju posjeta"
      className="fixed inset-x-0 bottom-[54px] z-[60] border-t border-[var(--line-dark)] bg-ink text-paper sm:bottom-0"
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
        <p className="max-w-[60ch] text-[0.875rem] leading-snug text-paper/70">
          Facebook kolačić — samo da znamo koja reklama dovodi ljude. Sajt radi
          isto i bez njega.
        </p>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={() => onOdluka("ne")}
            className="link-underline py-1 text-[0.875rem] text-paper/60 transition-colors hover:text-paper"
          >
            Ne, hvala
          </button>
          <button
            type="button"
            onClick={() => onOdluka("da")}
            className="bg-paper px-5 py-2 text-[0.875rem] font-semibold text-ink transition-colors hover:bg-paper-2 active:translate-y-px"
          >
            U redu
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Javlja Meti da je neko poslao upit — po tome oglas uči koga da traži.
 * Ako piksel nije podešen ili posjetilac nije pristao, ne radi ništa.
 */
export function prijaviUpit() {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (fbq) fbq("track", "Lead");
}
