import { KANONSKI, SPOREDNI } from "./src/domeni.mjs";

const kanonskiHost = new URL(KANONSKI).host;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Trajno preusmjerenje sa sporednih domena na kanonski.
   * Vercel ovo obično odradi i sam ako je racan.cc postavljen kao
   * produkcijski domen — ovo je sigurnosna mreža ako se tamo nešto
   * pomjeri. `permanent: true` šalje 308, što Google tretira isto
   * kao 301: sav rejting se prenosi na novu adresu.
   */
  async redirects() {
    return SPOREDNI.filter((host) => host && host !== kanonskiHost).map(
      (host) => ({
        source: "/:staza*",
        has: [{ type: "host", value: host }],
        destination: `${KANONSKI}/:staza*`,
        permanent: true,
      }),
    );
  },
};

export default nextConfig;
