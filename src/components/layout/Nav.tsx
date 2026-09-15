"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { alternateHref, homeAnchor } from "@/lib/routes";

/**
 * Menú siempre visible (sticky). Antes aparecía recién a los 80 px de scroll
 * y en móvil el botón no respondía en el primer pantallazo.
 */
export default function Nav() {
  const { lang, t } = useLanguage();
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-button")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const switchLabel =
    lang === "es" ? t.langToggle.switchToEnglish : t.langToggle.switchToSpanish;
  const otherCode = lang === "es" ? "en" : "es";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled || open
          ? "border-line bg-navy/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-content items-center justify-between gap-6 px-5 md:px-10">
        <a
          href={homeAnchor(lang, "#top")}
          aria-label={`${site.brand.name}, ${t.menu.home}`}
          className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tightish text-ink"
        >
          <span
            aria-hidden
            className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-white text-base text-navy"
          >
            N
          </span>
          {site.brand.name}
        </a>

        <nav aria-label={t.menu.label} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
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

        <div className="flex items-center gap-4">
          <Link
            href={alternateHref(pathname, lang)}
            hrefLang={otherCode}
            aria-label={switchLabel}
            className="text-[13px] font-semibold text-ink-2 transition-colors duration-150 hover:text-ink"
          >
            {lang === "es" ? t.langToggle.en : t.langToggle.es}
          </Link>
          <a
            href={homeAnchor(lang, "#contact")}
            className="hidden rounded-full bg-white px-[18px] py-[11px] text-sm font-semibold leading-none text-navy shadow-btn-glow transition-[transform,box-shadow] duration-200 ease-out hover:shadow-btn-glow-hover active:scale-[0.97] lg:inline-flex"
          >
            {t.navCTA}
          </a>
          <button
            id="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex rounded-full border border-line-strong px-3.5 py-2 text-sm font-semibold text-ink active:scale-[0.97] lg:hidden"
          >
            {open ? t.menu.close : t.menu.open}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={t.menu.label}
        hidden={!open}
        className="border-t border-line bg-navy lg:hidden"
      >
        <ul className="px-5 pb-5 pt-2">
          {[...t.nav, { label: t.navCTA, href: "#contact" }].map((item) => (
            <li key={item.label}>
              <a
                href={homeAnchor(lang, item.href)}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3.5 text-[17px] text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
