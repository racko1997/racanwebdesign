"use client";

import { useState } from "react";
import { Wrap } from "./Sections";
import { site, cta } from "@/site.config";

type Stanje = "mirno" | "salje" | "poslato" | "greska";

export default function Kontakt() {
  const [stanje, setStanje] = useState<Stanje>("mirno");
  const [poruka, setPoruka] = useState("");

  async function posalji(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!site.web3formsKey) {
      setStanje("greska");
      setPoruka(
        "Forma još nije povezana. Upišite Web3Forms ključ u src/site.config.ts.",
      );
      return;
    }

    setStanje("salje");
    const data = new FormData(form);
    data.append("access_key", site.web3formsKey);
    data.append("subject", "Novi upit sa Racan sajta");
    data.append("from_name", "Racan sajt");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStanje("poslato");
        form.reset();
      } else {
        setStanje("greska");
        setPoruka("Slanje nije uspjelo. Pozovite me ili pišite na Viber.");
      }
    } catch {
      setStanje("greska");
      setPoruka("Nema veze sa internetom. Pokušajte ponovo ili me pozovite.");
    }
  }

  return (
    <section
      id="kontakt"
      className="mt-24 scroll-mt-20 bg-ink pb-28 pt-20 text-paper sm:mt-32 sm:pb-28 sm:pt-28"
    >
      <Wrap>
        <div className="rise rule-dark pt-7">
          <div className="flex gap-5 sm:gap-8">
            <span className="mono shrink-0 pt-2.5 text-paper/55">07</span>
            <div className="min-w-0">
              <h2 className="display text-[2.125rem] text-paper sm:text-[2.875rem]">
                Imate biznis kojem treba bolji sajt?
              </h2>
              <p className="lead mt-5 max-w-[50ch] text-paper/80">
                Napišite nekoliko rečenica o tome čime se bavite i šta vam treba.
                Javim vam šta bih preporučio, okvirnu cijenu i rok izrade — bez
                obaveze.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Forma */}
          <div className="lg:col-span-7">
            {stanje === "poslato" ? (
              <div className="border border-[var(--line-dark)] p-8">
                <p className="display text-[1.875rem] text-paper">
                  Primljeno — hvala.
                </p>
                <p className="body mt-4 max-w-[42ch] text-paper/80">
                  Javljam se {site.rokOdgovora}. Ako vam se žuri, slobodno
                  pozovite na {site.telefon}.
                </p>
              </div>
            ) : (
              <form onSubmit={posalji} className="space-y-8">
                {/* Zamka za robote — korisnik ovo ne vidi */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <div>
                  <label htmlFor="ime" className="mono text-paper/70">
                    Ime
                  </label>
                  <input
                    id="ime"
                    name="ime"
                    required
                    autoComplete="name"
                    placeholder="Vaše ime"
                    className="field field-dark mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="kontakt-podatak" className="mono text-paper/70">
                    Telefon ili email
                  </label>
                  <input
                    id="kontakt-podatak"
                    name="kontakt"
                    required
                    autoComplete="tel"
                    placeholder="065 123 456 ili vas@email.com"
                    className="field field-dark mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="firma" className="mono text-paper/70">
                    Čime se bavite
                  </label>
                  <input
                    id="firma"
                    name="firma"
                    required
                    autoComplete="organization"
                    placeholder="Npr. auto servis, frizerski salon, restoran"
                    className="field field-dark mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="posao" className="mono text-paper/70">
                    Šta vam treba{" "}
                    <span className="normal-case tracking-normal text-paper/50">
                      (opcionalno)
                    </span>
                  </label>
                  <textarea
                    id="posao"
                    name="posao"
                    rows={3}
                    placeholder="Nemate sajt, imate stari koji loše radi na telefonu, treba vam cjenovnik ili galerija…"
                    className="field field-dark mt-2 resize-none"
                  />
                </div>

                <div className="flex flex-col items-start gap-5 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <button
                    type="submit"
                    disabled={stanje === "salje"}
                    className="w-full bg-paper px-8 py-4 text-[1.0625rem] font-semibold text-ink transition-colors hover:bg-paper-2 active:translate-y-px disabled:opacity-50 sm:w-auto"
                  >
                    {stanje === "salje" ? "Šaljem…" : "Pošaljite upit"}
                  </button>
                  <p className="text-[0.9375rem] text-paper/65">{cta.podnaslov}</p>
                </div>

                {stanje === "greska" && (
                  <p className="border-l-2 border-peach pl-4 text-[0.9375rem] text-peach">
                    {poruka}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Direktan kontakt */}
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="mono text-paper/70">Ne volite forme?</p>
            <p className="body-sm mt-3 max-w-[34ch] text-paper/80">
              Javite se direktno — odgovaram na isti način na koji vam je lakše.
            </p>

            <div className="mt-6 space-y-0">
              <Direktno
                oznaka="Telefon"
                vrijednost={site.telefon}
                href={`tel:${site.telefon.replace(/\s/g, "")}`}
              />
              <Direktno
                oznaka="Viber"
                vrijednost={site.telefon}
                href={`viber://chat?number=%2B${site.telefonRaw}`}
              />
              <Direktno
                oznaka="WhatsApp"
                vrijednost="Pošaljite poruku"
                href={`https://wa.me/${site.telefonRaw}`}
              />
              <Direktno
                oznaka="Email"
                vrijednost={site.email}
                href={`mailto:${site.email}`}
              />
              <Direktno
                oznaka="Facebook"
                vrijednost={site.puniNaziv}
                href={site.facebook}
              />
            </div>

            <p className="body-sm mt-8 max-w-[34ch] text-paper/65">
              Ne morate znati šta tačno želite. Dovoljno je da mi kažete čime se
              bavite — ostalo izvučemo kroz razgovor.
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function Direktno({
  oznaka,
  vrijednost,
  href,
}: {
  oznaka: string;
  vrijednost: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="rule-dark group flex items-center justify-between gap-4 py-4 last:border-b last:border-[var(--line-dark)]"
    >
      <span className="mono text-paper/60">{oznaka}</span>
      <span className="text-[1rem] font-medium text-paper transition-colors group-hover:text-cyan-bright">
        {vrijednost}
      </span>
    </a>
  );
}
