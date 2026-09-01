export type Projekat = {
  slug: string;
  naziv: string;
  djelatnost: string;
  /** Kratka oznaka tipa posla, npr. "Prezentacioni sajt", "Webshop". */
  tip?: string;
  status: "live" | "koncept";
  /** Tekst na oznaci umjesto podrazumijevanog ("Živi sajt" / "Koncept"). */
  oznaka?: string;
  /** Napomena ispod teksta umjesto podrazumijevane napomene za koncept. */
  napomena?: string;
  /** Kratak opis — jedna do dvije rečenice, bez marketing fraza. */
  opis: string;
  /** Šta sajt sadrži — prikazuje se kao tehnički spisak. */
  sadrzi: string[];
  /** Link na živi sajt. Ostavi prazno ako ne želiš da se otvara. */
  link?: string;
  /** Tekst koji se prikazuje umjesto URL-a u okviru browsera. */
  domen: string;
  /** Slike u /public/radovi/. Mobilna je obavezna, desktop je opciona. */
  mobile?: string;
  desktop?: string;
  /** Boja pozadine okvira dok se slika učitava — uzmi iz same slike. */
  bg: string;
};

/**
 * ============================================================
 *  RADOVI
 * ============================================================
 *  Da dodaš novi rad: ubaci screenshotove u /public/radovi/
 *  i dopiši objekat u listu ispod.
 *
 *  status: "live"     = pravi, objavljen sajt
 *  status: "koncept"  = samostalan rad, nije naručen od klijenta
 *
 *  NIKAD ne stavljaj "live" na nešto što nije stvarno naručeno.
 * ============================================================
 */

export const projekti: Projekat[] = [
  {
    slug: "nutricionista-marija-dereh",
    naziv: "Nutricionista Marija Dereh",
    djelatnost: "Nutricionistička ordinacija",
    tip: "Prezentacioni sajt + zakazivanje",
    status: "live",
    oznaka: "Klijentski sajt",
    opis:
      "Kompletan sajt privatne ordinacije: usluge, predstavljanje prostora i mišljenja klijenata. Pacijent izabere termin i zakaže konsultaciju direktno na sajtu, bez poziva i bez čekanja odgovora.",
    sadrzi: [
      "Zakazivanje termina na sajtu",
      "Usluge i način rada",
      "Predstavljanje ordinacije sa galerijom",
      "Mišljenja klijenata",
      "Kontakt i lokacija",
    ],
    link: "https://nutricionistamarijadereh.com/",
    domen: "nutricionistamarijadereh.com",
    mobile: "/radovi/nutricionista-mobile.webp",
    desktop: "/radovi/nutricionista-desktop.webp",
    bg: "#ffffff",
  },
  {
    slug: "magicni-magnet",
    naziv: "Magični Magnet",
    djelatnost: "Online prodaja poklona",
    tip: "Webshop",
    status: "live",
    oznaka: "Klijentski sajt",
    opis:
      "Webshop za personalizovani poklon. Kupac pošalje fotografiju i pjesmu, izabere paket i naruči u nekoliko koraka — narudžba stiže na mail, bez poziva i dopisivanja.",
    sadrzi: [
      "Narudžba sa slanjem fotografije",
      "Cijene i količinski popusti",
      "Video i galerija proizvoda",
      "Česta pitanja",
      "Plaćanje pouzećem i dostava",
    ],
    link: "https://magicnimagnet.com/",
    domen: "magicnimagnet.com",
    mobile: "/radovi/magicni-magnet-mobile.webp",
    desktop: "/radovi/magicni-magnet-desktop.webp",
    bg: "#ffffff",
  },
  {
    slug: "stanica",
    naziv: "Stanica",
    djelatnost: "Restoran i apartmani",
    tip: "Prezentacioni sajt",
    status: "koncept",
    opis:
      "Restoran i prenoćište na istom sajtu, a da se ne guraju. Gost koji traži hranu i gost koji traži sobu idu odvojenim putem, svaki do svoje rezervacije.",
    sadrzi: [
      "Restoran i apartmani na jednom sajtu",
      "Ponuda kuhinje i preporuke",
      "Galerija soba",
      "Rezervacija i pozivi u jedan klik",
      "Lokacija i radno vrijeme",
    ],
    oznaka: "Koncept",
    domen: "koncept",
    mobile: "/radovi/stanica-mobile.webp",
    desktop: "/radovi/stanica-desktop.webp",
    bg: "#324e6c",
  },
  {
    slug: "kazamat",
    naziv: "Kazamat",
    djelatnost: "Restoran, Banja Luka",
    tip: "Prezentacioni sajt",
    status: "koncept",
    oznaka: "Koncept redizajna",
    napomena:
      "Koncept redizajna — samostalan rad, nije naručen od strane restorana.",
    opis:
      "Prijedlog sajta za restoran u Kastelu. Fotografija nosi atmosferu prostora, a jelovnik, radno vrijeme i rezervacija stola su uvijek na dohvat ruke.",
    sadrzi: [
      "Jelovnik i vinska karta",
      "Galerija prostora i jela",
      "Rezervacija stola",
      "Priča o mjestu",
      "Mapa i radno vrijeme",
    ],
    domen: "restoran-kazamat.vercel.app",
    link: "https://restoran-kazamat.vercel.app/",
    mobile: "/radovi/kazamat-mobile.webp",
    desktop: "/radovi/kazamat-desktop.webp",
    bg: "#171412",
  },
  {
    slug: "zlatibor",
    naziv: "Zlatibor",
    djelatnost: "Restoran, Gradiška",
    tip: "Prezentacioni sajt + jelovnik",
    status: "koncept",
    opis:
      "Cijeli jelovnik posložen kao da je štampan, ali čitljiv na telefonu — bez PDF-a koji se mora zumirati. Gost za desetak sekundi vidi šta se jede i koliko košta.",
    sadrzi: [
      "Kompletan jelovnik sa cijenama",
      "Karta pića",
      "Muzika uživo i najave",
      "Dostava",
      "Mapa i kontakt",
    ],
    link: "https://restoran-zlatibor.vercel.app/",
    domen: "restoran-zlatibor.vercel.app",
    mobile: "/radovi/zlatibor-mobile.webp",
    desktop: "/radovi/zlatibor-desktop.webp",
    bg: "#0b0a06",
  },
  {
    slug: "useljivo",
    naziv: "Useljivo",
    djelatnost: "Platforma za nekretnine",
    tip: "Web platforma",
    status: "koncept",
    oznaka: "U razvoju",
    napomena: "Vlastiti projekat — nije klijentski sajt.",
    opis:
      "Platforma za pretragu nekretnina koju sam razvijam. Korisnik svojim riječima opiše šta traži, a sistem prati ponudu umjesto njega i javi kad se nešto poklopi.",
    sadrzi: [
      "Pretraga sa filterima",
      "Oglasi sa cijenom po kvadratu",
      "Podudaranje po opisu",
      "Nalozi za agencije",
      "Objava oglasa",
    ],
    domen: "useljivo.com",
    mobile: "/radovi/useljivo-mobile.webp",
    desktop: "/radovi/useljivo-desktop.webp",
    bg: "#ffffff",
  },
];
