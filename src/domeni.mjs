/**
 * ============================================================
 *  DOMENI — jedino mjesto gdje se mijenja adresa sajta
 * ============================================================
 *  Ovaj fajl čitaju:
 *    · site.config.ts   → canonical, og tagovi, sitemap, Google podaci
 *    · next.config.mjs  → trajno preusmjerenje na kanonski domen
 *
 *  Namjerno je .mjs, a ne .ts — next.config ga tako može učitati
 *  na bilo kojoj verziji Node-a.
 * ============================================================
 */

/** Prava adresa sajta. Bez završne kose crte. */
export const KANONSKI = "https://racan.cc";

/**
 * Domeni koji trajno preusmjeravaju (308) na kanonski.
 *
 * Vercel ovo obično odradi i sam ako je racan.cc postavljen kao
 * Production domain — ovo je sigurnosna mreža, da se www i apex
 * nikad ne indeksiraju kao dva odvojena sajta.
 *
 * NIKAD ne stavljaj *.vercel.app ovdje — pokvarilo bi preglede
 * (preview deployment adrese).
 */
export const SPOREDNI = ["www.racan.cc"];
