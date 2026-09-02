# Racan Web Studio

Prodajni sajt studija. Jedna stranica, bez baze podataka.

**Next.js 16 · Tailwind CSS 4 · TypeScript**

---

## Pokretanje

```bash
npm install
npm run dev
```

Otvara se na http://localhost:3000

---

## Gdje se šta mijenja

| Šta                                   | Fajl                          |
| ------------------------------------- | ----------------------------- |
| Telefon, email, ključ forme, piksel    | `src/site.config.ts`          |
| **Domen i preusmjerenja**             | `src/domeni.mjs`              |
| Radovi u portfoliju                   | `src/data/projects.ts`        |
| Paketi i cijene                       | `src/data/paketi.ts`          |
| Česta pitanja                         | `src/data/faq.ts`             |
| Tekstovi sekcija                      | `src/components/Sections.tsx` |
| Kontakt sekcija i forma               | `src/components/Kontakt.tsx`  |
| Boje, tipografija, animacije          | `src/app/globals.css`         |
| SEO i strukturirani podaci            | `src/app/layout.tsx`          |
| Logotip                               | `public/logo/`                |
| Screenshotovi radova                  | `public/radovi/`              |

Paketi i pitanja se iz `src/data/` povlače i u sekcije i u strukturirane
podatke za Google — mijenjaš na jednom mjestu.

---

## Prije objave

- [ ] **Web3Forms ključ** u `src/site.config.ts` (web3forms.com → upiši mail → Create Access Key)
- [ ] **Domen** upisan u `src/domeni.mjs` → `KANONSKI` (odatle se povlači i canonical i preusmjerenje)
- [ ] U Vercel → Settings → Domains: `racan.cc` postavljen kao **Production domain**, `www.racan.cc` kao **Redirect** na njega
- [ ] Telefon, Viber i WhatsApp provjereni klikom **na telefonu**
- [ ] Poslata probna poruka kroz formu i stigla na mail
- [ ] **Meta Pixel ID** u `site.config.ts` (tek kad puštaš reklame) — dok je prazan, na sajtu nema Meta koda ni trake za pristanak

---

## Dodavanje novog rada

1. Screenshotove (`.webp`, desktop ~1200 px širine, mobilni ~420 px) ubaci u `public/radovi/`
2. Dopiši objekat u listu u `src/data/projects.ts`

```ts
{
  slug: "naziv-projekta",
  naziv: "Naziv",
  djelatnost: "Djelatnost klijenta",
  tip: "Prezentacioni sajt",
  status: "live",              // "live" = stvarno naručen i objavljen
  oznaka: "Klijentski sajt",   // tekst na oznaci
  opis: "Dvije rečenice jezikom klijenta.",
  sadrzi: ["Stavka", "Stavka"],
  link: "https://…",           // izostavi ako sajt nije javan
  domen: "primjer.com",
  mobile: "/radovi/naziv-mobile.webp",
  desktop: "/radovi/naziv-desktop.webp",
  bg: "#ffffff",
}
```

**`status: "live"` samo za sajt koji je stvarno naručen.** Za sve ostalo
`"koncept"` — ispod se automatski ispiše napomena da rad nije naručen.

---

## Analitika

**Vercel Analytics** je ugrađen i radi sam čim se sajt objavi na Vercelu —
broj posjeta vidiš u Vercel dashboardu, kartica *Analytics*. Ne postavlja
kolačiće.

**Meta piksel** se pali samo ako je `metaPixelId` popunjen, i to tek nakon
što posjetilac klikne „U redu" na traci za pristanak. Odbijanje se pamti i
piksel se tada nikad ne učita. Uspješno poslata forma javlja Meti događaj
`Lead`, po kojem oglas uči koga da traži.

---

## Objava na Vercel

1. Pushuj repo na GitHub
2. vercel.com → **Add New Project** → izaberi repo → **Deploy**
3. **Settings → Domains** → `racan.cc` kao *Production domain*, `www.racan.cc` postavljen da preusmjerava na njega

Ništa se ne podešava ručno — Vercel sam prepozna Next.js.

### Kanonski domen

Sajt ima **jednu** pravu adresu: `racan.cc`. `www.racan.cc` šalje **308** na
nju. To radi na dva nivoa: Vercel na svom ulazu, a `next.config.mjs` kao
sigurnosna mreža — oba čitaju `src/domeni.mjs`, pa se canonical i
preusmjerenje ne mogu razići.

Ako ikad promijeniš domen, mijenjaš **samo `src/domeni.mjs`**.

---

## Dizajn — kratko

Sajt je namjerno miran i skoro jednobojan: boju daju radovi u portfoliju,
ne sam sajt.

- Bez zaobljenih uglova (`* { border-radius: 0 }`) i bez sjenki — samo linije od 1 px
- Mono font za brojeve, cijene i oznake
- Fontovi se hostuju sa sajta, nema poziva prema Google-u
- Animacije: podrazumijevano stanje je **uvijek vidljivo**, animacija samo dodaje
  pokret ako je podržana i ako korisnik nije tražio smanjen pokret
