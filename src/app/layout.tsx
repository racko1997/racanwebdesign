import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Analitika } from "@/components/Analitika";
import { site } from "@/site.config";
import { pitanja } from "@/data/faq";
import { paketi } from "@/data/paketi";

/* Fontovi se hostuju sa samog sajta (nema poziva prema Google-u).
   Brže se učitavaju i sajt radi i bez pristupa Google Fonts servisu. */
import "@fontsource-variable/archivo";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

import "./globals.css";

const naslov = "Racan Web Studio — izrada web stranica za male biznise";

const opis =
  "Izrada web stranica za male i srednje biznise. Sajt koji dobro izgleda na telefonu i olakšava ljudima da vas pronađu, pogledaju ponudu i pozovu. Cijene od 399 KM, izrada 7–10 dana.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: naslov, template: "%s · Racan" },
  description: opis,
  applicationName: site.puniNaziv,
  authors: [{ name: site.puniNaziv, url: site.url }],
  creator: site.puniNaziv,
  publisher: site.puniNaziv,
  alternates: { canonical: "/" },
  keywords: [
    "izrada sajtova",
    "izrada web stranica",
    "web dizajn",
    "web stranica za restoran",
    "sajt za mali biznis",
    "cijena izrade sajta",
    "web studio",
    "Bosna i Hercegovina",
  ],
  openGraph: {
    type: "website",
    locale: "bs_BA",
    url: site.url,
    siteName: site.puniNaziv,
    title: naslov,
    description: opis,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Racan Web Studio — web stranice za male biznise u regionu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: naslov,
    description: opis,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: false, email: true },
  verification: {
    ...(site.googleVerifikacija ? { google: site.googleVerifikacija } : {}),
    ...(site.metaVerifikacija
      ? { other: { "facebook-domain-verification": site.metaVerifikacija } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#101821",
  width: "device-width",
  initialScale: 1,
};

/* ------------------------------------------------------------------
   Strukturirani podaci za Google.
   Tri stvari: ko smo, šta nudimo (sa cijenama) i česta pitanja.
   FAQ podaci znaju da se prikažu direktno u rezultatima pretrage.
   ------------------------------------------------------------------ */
function strukturiraniPodaci() {
  const studio = {
    "@type": "ProfessionalService",
    "@id": `${site.url}#studio`,
    name: site.puniNaziv,
    alternateName: site.naziv,
    description: opis,
    url: site.url,
    telephone: site.telefon,
    email: site.email,
    image: `${site.url}/og.png`,
    priceRange: "od 399 KM",
    areaServed: ["Bosna i Hercegovina", "Srbija", "Hrvatska", "Crna Gora"],
    knowsLanguage: ["bs", "sr", "hr"],
    sameAs: [site.facebook],
    makesOffer: paketi.map((p) => ({
      "@type": "Offer",
      name: `${p.naziv} — izrada web stranice`,
      description: p.opis,
      category: "Izrada web stranica",
      ...(p.cijena.includes("KM")
        ? {
            price: p.cijena.replace(/\D/g, ""),
            priceCurrency: "BAM",
            eligibleQuantity: { "@type": "QuantitativeValue", value: 1 },
          }
        : {}),
      itemOffered: {
        "@type": "Service",
        name: `Izrada web stranice — paket ${p.naziv}`,
        serviceType: "Web dizajn i izrada web stranica",
        provider: { "@id": `${site.url}#studio` },
      },
    })),
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${site.url}#pitanja`,
    mainEntity: pitanja.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [studio, faq] };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bs">
      <body>
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Preskoči na sadržaj
        </a>
        {children}
        {/* Broj posjeta — bez kolačića, uključuje se sam na Vercelu */}
        <Analytics />
        {/* Meta piksel + traka za pristanak — samo ako je ID upisan */}
        <Analitika />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(strukturiraniPodaci()),
          }}
        />
      </body>
    </html>
  );
}
