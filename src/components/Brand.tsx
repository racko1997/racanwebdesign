import { site } from "@/site.config";

/**
 * Logotip Racan.
 * Slike su generisane iz originalnog logotipa, u dvije varijante:
 * tamna (na papirnoj podlozi) i svijetla (na tamnoj podlozi).
 *
 * Kad budeš imao SVG verziju logotipa, zamijeni ove PNG-ove — SVG je
 * oštriji na velikim ekranima i lakši. Putanje ostaju iste.
 */
export function Wordmark({
  light = false,
  size = "sm",
}: {
  light?: boolean;
  /** sm — u traci na vrhu · lg — u podnožju */
  size?: "sm" | "lg";
}) {
  const w = size === "lg" ? 176 : 132;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={light ? "/logo/racan-lockup-paper.png" : "/logo/racan-lockup-ink.png"}
      alt={site.puniNaziv}
      width={w}
      height={Math.round((w * 66) / 241)}
      className="block h-auto"
      style={{ width: w }}
    />
  );
}
