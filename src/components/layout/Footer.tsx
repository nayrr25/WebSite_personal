"use client";

import Container from "./Container";
import { site } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { homeAnchor } from "@/lib/routes";

const SOCIAL = [
  { label: "LinkedIn", href: site.contact.linkedin },
  { label: "Google Scholar", href: site.contact.scholar },
  { label: "GitHub", href: site.contact.github },
];

export default function Footer() {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line py-12 md:mt-32">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a
            href={homeAnchor(lang, "#top")}
            className="flex items-center gap-2.5 font-display text-xl font-extrabold text-ink"
          >
            <span
              aria-hidden
              className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-white text-base text-navy"
            >
              N
            </span>
            {site.brand.name}
          </a>
          <p className="mt-3 text-[13px] text-ink-muted">
            © {year} {site.brand.name} · {t.footer.location}
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-1 block text-[13px] text-ink-2 transition-colors duration-150 hover:text-ink"
          >
            {site.contact.email}
          </a>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={homeAnchor(lang, item.href)}
                  className="text-ink-2 transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {SOCIAL.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors duration-150 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
