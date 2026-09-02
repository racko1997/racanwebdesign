import { KANONSKI } from "./domeni.mjs";

/**
 * ============================================================
 *  RACAN — JEDINO MJESTO KOJE MORAŠ UREDITI
 * ============================================================
 *  Ovdje mijenjaš kontakt podatke, ključ za formu i domen.
 *  Sve ostalo na sajtu se povlači odavde.
 * ============================================================
 */

export const site = {
  naziv: "Racan",
  puniNaziv: "Racan Web Studio",
  slogan: "Moderni i pristupačni web sajtovi",

  /**
   * Kanonski domen — mijenja se u src/domeni.mjs, ne ovdje.
   * Odatle ga čita i next.config.mjs za preusmjerenja, pa ne može
   * da se desi da se canonical i redirect raziđu.
   */
  url: KANONSKI,

  /** ---- KONTAKT: OBAVEZNO ZAMIJENI ---------------------------------- */
  telefon: "066 168 704",
  /** Isti broj bez razmaka i bez +, za Viber i WhatsApp linkove. */
  telefonRaw: "38766168704",
  email: "racanwebdesign@gmail.com",
  facebook: "https://www.facebook.com/share/1HYsG49sD3/",

  /** Gdje se radi — namjerno široko, da se ponuda ne veže za jedan grad. */
  podrucje: "BiH i region",

  /**
   * ---- KONTAKT FORMA (Web3Forms) -----------------------------------
   * 1. Idi na https://web3forms.com
   * 2. Upiši svoj email i klikni "Create Access Key"
   * 3. Ključ stiže na mail — zalijepi ga ovdje.
   * Dok je prazno, forma radi ali te samo upozori da fali ključ.
   */
  web3formsKey: "",

  /**
   * ---- META PIXEL (Facebook / Instagram reklame) -------------------
   * Ostavi prazno dok ne pustiš reklame — tada na sajtu nema Meta koda.
   *
   * Kad budeš spreman:
   * 1. business.facebook.com → Events Manager → Connect Data Sources → Web
   * 2. Izaberi "Meta Pixel", daj mu ime (npr. "Racan sajt")
   * 3. Kopiraj ID (15-16 cifara) i zalijepi ga ovdje.
   *
   * Bez ovoga Meta ne zna ko je sa reklame poslao upit, pa ne može
   * da optimizuje prikazivanje oglasa ka sličnim ljudima.
   */
  metaPixelId: "",

  /**
   * ---- VERIFIKACIJA DOMENA -----------------------------------------
   * Popunjava se tek kad sajt bude na pravom domenu.
   *
   * Facebook: business.facebook.com → Business Settings → Brand Safety
   *   → Domains → Add → izaberi „Meta-tag verification" i kopiraj samo
   *   vrijednost content="..." ovdje.
   *   Bez ovoga Meta ne da da sam biraš koji događaj je najvažniji, a
   *   iOS korisnici se slabije prate.
   *
   * Google: search.google.com/search-console → Add property → URL prefix
   *   → HTML tag → kopiraj vrijednost content="..." ovdje.
   *   Poslije toga u Search Console pošalji sitemap: /sitemap.xml
   */
  metaVerifikacija: "",
  googleVerifikacija: "",

  /** Odgovor koji obećavaš u copy-ju. Mijenjaj slobodno. */
  rokOdgovora: "isti dan",
};

export const cta = {
  primarni: "Zatraži ponudu",
  podnaslov: "Odgovor isti dan. Bez obaveze.",
};
