import { BrowserFrame, PhoneFrame, ScrollShot } from "./ScrollShot";
import { projekti } from "@/data/projects";
import { site, cta } from "@/site.config";
import { paketi } from "@/data/paketi";
import { pitanja } from "@/data/faq";

/* ============================================================ */
/*  Zajednički dijelovi                                          */
/* ============================================================ */

export function Wrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHead({
  index,
  title,
  lead,
  light = false,
}: {
  index: string;
  title: string;
  lead?: string;
  light?: boolean;
}) {
  return (
    <div className={`rise ${light ? "rule-dark pt-7" : "rule pt-7"}`}>
      <div className="flex gap-5 sm:gap-8">
        <span
          className={`mono shrink-0 pt-2.5 ${light ? "text-paper/55" : "text-ink/40"}`}
        >
          {index}
        </span>
        <div className="min-w-0">
          <h2
            className={`display text-[2.125rem] sm:text-[2.875rem] ${
              light ? "text-paper" : "text-ink"
            }`}
          >
            {title}
          </h2>
          {lead && (
            <p
              className={`lead mt-5 max-w-[48ch] ${
                light ? "text-paper/80" : "text-ink/70"
              }`}
            >
              {lead}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3.5 text-[1rem] font-medium transition-colors";
  const styles = {
    solid: "bg-ink text-paper hover:bg-ink-2",
    outline:
      "border border-[var(--line-strong)] text-ink hover:bg-ink hover:text-paper",
    light: "bg-paper text-ink hover:bg-paper-2",
  }[variant];
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

/* ============================================================ */
/*  HERO                                                         */
/* ============================================================ */

/** Kratke činjenice — sve provjerljive iz same ponude. */
const heroPodaci: [string, string][] = [
  ["Javljam se", site.rokOdgovora],
  ["Prvi prijedlog", "prije plaćanja"],
  ["Dogovor", "direktno sa mnom"],
  ["Sitne izmjene", "30 dana besplatno"],
];

export function Hero() {
  return (
    <section id="vrh" className="bg-ink pb-14 pt-24 text-paper sm:pb-16 sm:pt-28">
      <Wrap>
        {/* Naslov lijevo, prateći tekst desno i poravnat po dnu naslova —
            time se popunjava desna polovina umjesto praznog prostora. */}
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 className="ulaz ulaz-1 display text-[2.75rem] leading-[0.95] text-paper sm:text-[4.5rem] lg:col-span-7 lg:text-[5rem] xl:text-[5.5rem]">
            Web stranice za male biznise u regionu.
          </h1>

          <div className="ulaz ulaz-2 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="max-w-[54ch] text-[1.1875rem] leading-[1.6] text-paper/80 sm:text-[1.3125rem] lg:text-[1.1875rem]">
              Moderan sajt koji izgleda profesionalno, odlično radi na telefonu
              i pretvara posjetioce u pozive, rezervacije i upite.
            </p>

            {/* Kompaktna linija vrijednosti — prelama se po stavkama */}
            <ul className="mono mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-paper/60">
              {["Od 399 KM", "Gotov sajt za 7–10 dana", "Bez mjesečnih naknada"].map(
                (t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    {i > 0 && <span className="text-paper/30">·</span>}
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="ulaz ulaz-3 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center bg-paper px-8 py-4 text-[1.0625rem] font-semibold text-ink transition-colors hover:bg-paper-2 active:translate-y-px"
          >
            {cta.primarni}
          </a>
          <a
            href="#radovi"
            className="inline-flex items-center justify-center border border-[var(--line-dark)] px-6 py-4 text-[1rem] font-medium text-paper/90 transition-colors hover:bg-paper hover:text-ink"
          >
            Pogledajte radove
          </a>
        </div>

        {/* Tehnička traka — činjenice koje skidaju rizik */}
        <dl className="ulaz ulaz-4 rule-dark mt-12 grid grid-cols-2 gap-x-8 gap-y-7 pt-7 sm:mt-14 sm:grid-cols-4">
          {heroPodaci.map(([k, v]) => (
            <div key={k}>
              <dt className="mono text-paper/60">{k}</dt>
              <dd className="mt-2 text-[1.0625rem] font-medium leading-snug text-paper">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </section>
  );
}

/* ============================================================ */
/*  01 — RADOVI                                                  */
/*  Struktura ove sekcije je namjerna — ne mijenjati raspored.   */
/* ============================================================ */

function StatusOznaka({
  status,
  oznaka,
}: {
  status: "live" | "koncept";
  oznaka?: string;
}) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-2.5 py-1">
        <span className="puls h-1.5 w-1.5 rounded-full bg-cyan-bright" />
        <span className="mono text-ink/70">{oznaka ?? "Živi sajt"}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 border border-[var(--line)] px-2.5 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-peach" />
      <span className="mono text-ink/55">{oznaka ?? "Koncept"}</span>
    </span>
  );
}

function Rad({ p, index }: { p: (typeof projekti)[number]; index: number }) {
  const br = String(index + 1).padStart(2, "0");
  return (
    <article className="rule py-14 first:border-t-0 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Tekst */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-4">
              <span className="mono text-ink/35">{br}</span>
              <StatusOznaka status={p.status} oznaka={p.oznaka} />
            </div>

            <h3 className="display mt-5 text-[2rem] sm:text-[2.5rem]">{p.naziv}</h3>

            <p className="mono mt-2.5 text-ink/50">
              {p.djelatnost}
              {p.tip && (
                <>
                  <span className="mx-2 text-ink/25">·</span>
                  {p.tip}
                </>
              )}
            </p>

            <p className="body mt-5 max-w-[44ch] text-ink/75">{p.opis}</p>

            <ul className="mt-7 space-y-0">
              {p.sadrzi.map((s) => (
                <li
                  key={s}
                  className="rule py-3 text-[1rem] leading-snug text-ink/80 last:border-b last:border-[var(--line)]"
                >
                  {s}
                </li>
              ))}
            </ul>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2.5 border border-[var(--line-strong)] px-5 py-3 text-[1rem] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Pogledajte projekat
                <span aria-hidden>↗</span>
              </a>
            )}

            {(p.napomena || p.status === "koncept") && (
              <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink/50">
                {p.napomena ??
                  "Samostalan rad — nije naručen od strane firme čije ime nosi."}
              </p>
            )}
          </div>
        </div>

        {/* Prikaz sajta.
            Mobilni screenshot se ispisuje SAMO JEDNOM — na telefonu stoji
            centriran, a od lg naviše ga CSS premjesti u ugao okvira
            browsera. Ranije su postojala dva ista <img> elementa, pa je
            telefon nepotrebno dekodirao istu (vrlo visoku) sliku dvaput. */}
        <div className="lg:col-span-8">
          <div className={p.desktop ? "lg:relative" : ""}>
            {p.desktop && (
              <div className="hidden lg:block">
                <BrowserFrame domen={p.domen}>
                  <ScrollShot
                    src={p.desktop}
                    alt={`Naslovna strana sajta ${p.naziv}`}
                    bg={p.bg}
                    className="h-[520px] w-full"
                  />
                </BrowserFrame>
              </div>
            )}

            <div
              className={
                p.desktop
                  ? "flex justify-center lg:block"
                  : "flex justify-center lg:justify-start"
              }
            >
              <PhoneFrame
                className={
                  p.desktop
                    ? "w-full max-w-[300px] lg:absolute lg:-bottom-8 lg:right-8 lg:w-[190px] lg:max-w-none"
                    : "w-full max-w-[300px] lg:max-w-[360px]"
                }
              >
                <ScrollShot
                  src={p.mobile}
                  alt={`Mobilna verzija sajta ${p.naziv}`}
                  bg={p.bg}
                  className={
                    p.desktop
                      ? "h-[480px] w-full lg:h-[340px]"
                      : "h-[480px] w-full lg:h-[640px]"
                  }
                />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Radovi() {
  return (
    <section id="radovi" className="pt-20 sm:pt-28">
      <Wrap>
        <SectionHead
          index="01"
          title="Radovi"
          lead="Nisu samo naslovne strane — svaki sajt se skroluje unutar okvira, pa odmah vidite kako izgleda od vrha do dna, i na računaru i na telefonu."
        />
        <div className="mt-12">
          {projekti.map((p, i) => (
            <Rad key={p.slug} p={p} index={i} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================ */
/*  02 — ŠTA DOBIJETE                                            */
/* ============================================================ */

const stavke: [string, string][] = [
  [
    "Odlično radi na telefonu",
    "Većina ljudi vas otvara sa Instagrama, Facebooka ili Googlea — sa telefona. Sajt se zato prvo pravi za taj ekran, pa se onda širi na veliki.",
  ],
  [
    "Kontakt na jedan dodir",
    "Broj se poziva dodirom, Viber otvara poruku, adresa pokreće navigaciju. Bez prepisivanja broja i traženja gdje se tačno nalazite.",
  ],
  [
    "Ponuda koja se odmah razumije",
    "Usluge, jelovnik ili cjenovnik posloženi tako da posjetilac za nekoliko sekundi vidi šta radite i koliko to košta.",
  ],
  [
    "Spreman za Google i mreže",
    "Dobijate svoju adresu koju stavljate na Google profil, Instagram i Facebook. Osnovno podešavanje da vas pretraga prepozna je uključeno.",
  ],
  [
    "Tekst i fotografije sređeni",
    "Napišem prijedlog teksta na osnovu kratkog razgovora, a vaše fotografije obradim i posložim. Ne morate ništa sami sastavljati.",
  ],
  [
    "Bez tehničkih komplikacija",
    "Domen, hosting i objavu radim ja. Vi ne otvarate nijedan nalog, ne podešavate ništa i ne brinete o tome kako sajt radi.",
  ],
];

export function StaDobijete() {
  return (
    <section id="sta" className="pt-24 sm:pt-32">
      <Wrap>
        <SectionHead
          index="02"
          title="Šta dobijete"
          lead="Ne prodajem tehnologiju ni pakete usluga. Ovo su konkretne stvari koje sajt radi za vaš biznis."
        />
        <ul className="mt-12 grid gap-x-14 sm:grid-cols-2">
          {stavke.map(([naslov, tekst]) => (
            <li key={naslov} className="rise rule py-7">
              <h3 className="text-[1.1875rem] font-semibold leading-snug">
                {naslov}
              </h3>
              <p className="body-sm mt-3 max-w-[48ch] text-ink/65">{tekst}</p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ============================================================ */
/*  03 — CIJENE                                                  */
/* ============================================================ */


export function Cijene() {
  return (
    <section id="cijene" className="mt-24 bg-ink py-20 text-paper sm:mt-32 sm:py-28">
      <Wrap>
        <SectionHead
          index="03"
          title="Cijene"
          light
          lead="Bez skrivanja i bez „kontaktirajte nas za cijenu“. Ovo su okvirne cijene — tačnu dobijete u ponudi, prije nego što bilo šta počne."
        />

        <div className="mt-14 grid gap-px bg-[var(--line-dark)] sm:grid-cols-3">
          {paketi.map((p) => (
            <div
              key={p.naziv}
              className={`rise flex flex-col p-7 sm:p-8 ${
                p.istaknuto ? "bg-ink-2" : "bg-ink"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.5rem] font-semibold">{p.naziv}</h3>
                {p.istaknuto && (
                  <span className="mono text-cyan-bright">Najčešće</span>
                )}
              </div>

              <p className="mono mt-3 text-paper/65">{p.zaKoga}</p>

              <p className="display mt-6 text-[2.125rem] text-paper">{p.cijena}</p>
              <p className="mono mt-2.5 text-paper/60">Rok · {p.rok}</p>

              <p className="body-sm mt-5 text-paper/80">{p.opis}</p>

              <ul className="mt-7 flex-1 space-y-0">
                {p.stavke.map((s) => (
                  <li
                    key={s}
                    className="rule-dark py-3 text-[1rem] leading-snug text-paper"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="#kontakt"
                  className={`inline-flex w-full items-center justify-center px-5 py-3.5 text-[1rem] font-medium transition-colors ${
                    p.istaknuto
                      ? "bg-paper font-semibold text-ink hover:bg-paper-2"
                      : "border border-[var(--line-dark)] text-paper hover:bg-paper hover:text-ink"
                  }`}
                >
                  {cta.primarni}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Najjača razlika prema konkurenciji sa mjesečnom pretplatom —
            zaslužuje svoju liniju, a ne fusnotu. */}
        <p className="rule-dark mt-12 max-w-[62ch] pt-8 text-[1.25rem] leading-[1.55] text-paper sm:text-[1.4375rem]">
          Bez mjesečne pretplate. Hosting je besplatan, domen ide na vaše ime.
          Sajt je vaš i ostaje vaš.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h4 className="mono text-paper/60">Šta mijenja cijenu</h4>
            <p className="body-sm mt-3.5 max-w-[44ch] text-paper/80">
              Broj stranica i količina sadržaja, da li već imate upotrebljive
              fotografije i tekstove, te posebne stvari poput rezervacija, više
              jezika ili online narudžbe.
            </p>
          </div>
          <div>
            <h4 className="mono text-paper/60">Šta se plaća posebno</h4>
            <p className="body-sm mt-3.5 max-w-[44ch] text-paper/80">
              Samo domen — otprilike 25 do 60 KM godišnje, zavisno od nastavka
              (.com, .ba, .info). Kupujem ga i podešavam ja, a vodi se na vaše
              ime.
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================ */
/*  04 — KAKO IDE                                                */
/* ============================================================ */

const koraci: [string, string][] = [
  [
    "Javite se",
    "Kažete čime se bavite i šta vam treba. Ne morate znati kako sajt treba da izgleda ni šta da sadrži.",
  ],
  [
    "Dogovorimo projekat",
    `Javljam se ${site.rokOdgovora} sa cijenom, rokom i prijedlogom šta bi sajt trebalo da sadrži. Bez obaveze.`,
  ],
  [
    "Izrada",
    "Prvo dobijete naslovnu stranu na pregled. Kad kažete da je dobro, radi se ostatak sajta.",
  ],
  [
    "Sajt ide online",
    "Povezujem domen, objavljujem sajt i predajem vam ga. Prvih 30 dana sitne izmjene su besplatne.",
  ],
];

export function Kako() {
  return (
    <section id="kako" className="pt-24 sm:pt-32">
      <Wrap>
        <SectionHead
          index="04"
          title="Kako ide"
          lead="Četiri koraka, bez sastanaka i bez papirologije. Sve može preko poruka ako vam tako odgovara."
        />
        <ol className="mt-12 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {koraci.map(([naslov, tekst], i) => (
            <li key={naslov} className="rise bg-paper p-7 sm:p-8">
              <span className="mono text-ink/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[1.1875rem] font-semibold">{naslov}</h3>
              <p className="body-sm mt-3 text-ink/65">{tekst}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

/* ============================================================ */
/*  05 — KO STOJI IZA VERTEXA                                    */
/* ============================================================ */

export function ONama() {
  return (
    <section id="o-nama" className="pt-24 sm:pt-32">
      <Wrap>
        <SectionHead index="05" title="Ko stoji iza Racana" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/*
              PORTRET — kad budeš imao svoju fotografiju, otkomentariši ovo
              i ubaci fajl u /public/stefan.jpg. Bez prave fotografije ovdje
              namjerno ne stoji ništa: stock ili AI portret bi upravo pokvario
              povjerenje koje ova sekcija treba da gradi.

              <img
                src="/stefan.jpg"
                alt="Stefan, Racan Web Studio"
                width={220}
                height={275}
                className="mb-8 w-[180px] object-cover sm:w-[220px]"
              />
            */}

            <div className="max-w-[58ch] space-y-6 text-ink/75">
              <p className="text-[1.3125rem] leading-[1.55] text-ink sm:text-[1.4375rem]">
                Ja sam Stefan i vodim Racan. Radim sajtove za male firme i
                samostalne biznise kojima treba da izgledaju profesionalno — bez
                agencijskih cijena i bez komplikovanog procesa.
              </p>
              <p className="body">
                Sa mnom dogovarate sve direktno, od prve poruke do objave sajta.
                Nema call centra, nema posrednika i nema dijela posla koji neko
                drugi „preuzima“. Vi imate jedan broj i jednog čovjeka koji zna
                sve o vašem sajtu.
              </p>
              <p className="body">
                Radim mali broj projekata istovremeno, pa svaki dobije pažnju.
                Cilj nije sajt koji samo lijepo izgleda, nego sajt na kojem
                posjetilac za nekoliko sekundi vidi šta radite i kako da vas
                dobije.
              </p>
              <p className="body">
                Racan je mlad studio i to ne krijem. Nemam iza sebe stotinu
                klijenata pa nemam ni potrebu da ih izmišljam — pogledajte radove
                iznad i procijenite sami. A prije nego što bilo šta platite,
                vidite prijedlog kako će vaš sajt izgledati.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="space-y-0">
              {[
                ["Studio", site.puniNaziv],
                ["Radim za", site.podrucje],
                ["Dogovor", "direktno sa mnom"],
                ["Odgovor", site.rokOdgovora],
              ].map(([k, v]) => (
                <div key={k} className="rule flex justify-between gap-5 py-4">
                  <dt className="mono shrink-0 text-ink/45">{k}</dt>
                  <dd className="text-right text-[1rem] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center justify-center border border-[var(--line-strong)] px-6 py-3.5 text-[1rem] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {cta.primarni}
            </a>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================ */
/*  06 — PITANJA                                                 */
/* ============================================================ */


export function Pitanja() {
  return (
    <section id="pitanja" className="pt-24 sm:pt-32">
      <Wrap>
        <SectionHead index="06" title="Česta pitanja" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
          {pitanja.map(([q, a]) => (
            <details
              key={q}
              className="rule group last:border-b last:border-[var(--line)]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.125rem] font-medium leading-snug transition-colors marker:hidden hover:text-ink/70 sm:py-6">
                <span>{q}</span>
                <span
                  className="mt-0.5 shrink-0 text-[1.5rem] leading-none text-ink/40 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="odgovor body-sm max-w-[62ch] pb-6 pr-8 text-ink/65">{a}</p>
            </details>
          ))}
          </div>

          {/* Pitanje kojeg nema na spisku — direktan izlaz umjesto prazne kolone */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rule pt-7 lg:sticky lg:top-28">
              <p className="mono text-ink/45">Nema vašeg pitanja?</p>
              <p className="body-sm mt-3.5 max-w-[32ch] text-ink/70">
                Pitajte direktno. Nema obaveze i ne morate ništa znati o
                sajtovima — javljam se {site.rokOdgovora}.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="#kontakt"
                  className="inline-flex items-center justify-center bg-ink px-6 py-3.5 text-[1rem] font-semibold text-paper transition-colors hover:bg-ink-2"
                >
                  {cta.primarni}
                </a>
                <a
                  href={`tel:${site.telefon.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center border border-[var(--line-strong)] px-6 py-3.5 font-mono text-[0.9375rem] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  {site.telefon}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Wrap>
    </section>
  );
}
