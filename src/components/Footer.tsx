import { Wordmark } from "./Brand";
import { Wrap } from "./Sections";
import { site } from "@/site.config";

const linkovi: [string, string][] = [
  ["Radovi", "#radovi"],
  ["Šta dobijete", "#sta"],
  ["Cijene", "#cijene"],
  ["Kako ide", "#kako"],
  ["O meni", "#o-nama"],
  ["Česta pitanja", "#pitanja"],
];

export default function Footer() {
  return (
    <footer className="pb-28 pt-14 sm:pb-14 sm:pt-18">
      <Wrap>
        <div className="rule grid gap-9 pt-8 sm:grid-cols-12 sm:gap-8">
          {/* Identitet */}
          <div className="sm:col-span-5">
            <Wordmark size="lg" />
            <p className="body-sm mt-5 max-w-[34ch] text-ink/65">
              Izrada web stranica za male biznise i samostalne poduzetnike.
              Dogovor ide direktno sa mnom, od prve poruke do objave sajta.
            </p>
          </div>

          {/* Navigacija */}
          <nav className="sm:col-span-3" aria-label="Podnožje">
            <p className="mono text-ink/40">Na stranici</p>
            <ul className="mt-4 space-y-2">
              {linkovi.map(([naziv, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="link-underline text-[1rem] text-ink/70 hover:text-ink"
                  >
                    {naziv}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt */}
          <div className="sm:col-span-4">
            <p className="mono text-ink/40">Kontakt</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`tel:${site.telefon.replace(/\s/g, "")}`}
                  className="link-underline text-[1rem] text-ink/70 hover:text-ink"
                >
                  {site.telefon}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-[1rem] text-ink/70 hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[1rem] text-ink/70 hover:text-ink"
                >
                  Facebook
                </a>
              </li>
            </ul>

            <a
              href="#kontakt"
              className="mt-6 inline-flex w-full items-center justify-center bg-ink px-6 py-3.5 text-[1rem] font-semibold text-paper transition-colors hover:bg-ink-2 sm:w-auto"
            >
              Zatražite ponudu
            </a>
          </div>
        </div>

        <div className="rule mt-10 flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.8125rem] text-ink/40">
            © {new Date().getFullYear()} {site.puniNaziv}
          </p>
          <p className="font-mono text-[0.8125rem] text-ink/40">
            {site.slogan}
          </p>
        </div>
      </Wrap>
    </footer>
  );
}
