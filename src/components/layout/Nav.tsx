"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { Menu, X } from "lucide-react";

const HIDE_UNTIL = 80;

export default function Nav() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setVisible(y > HIDE_UNTIL);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-smooth",
        "pointer-events-none",
        visible && "pointer-events-auto",
      )}
    >
      <div
        className={cn(
          "mx-auto mt-3 flex w-full max-w-content items-center justify-between gap-6 rounded-xl border px-4 py-2.5 md:mx-auto md:px-5",
          scrolled
            ? "border-border-subtle bg-bg-base/70 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
        style={{ marginInline: "max(1rem, calc((100vw - 1280px) / 2))" }}
      >
        <a
          href="#top"
          aria-label={`${site.brand.name} home`}
          className="flex items-center gap-2"
        >
          <Logo />
          <span className="text-[15px] font-medium tracking-tight text-text-primary">
            {site.brand.name}
          </span>
          <span className="hidden text-[12px] tracking-eyebrow text-text-muted md:inline">
            · {site.brand.tagline}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-[13.5px] text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-md border border-accent-cyan/40 bg-accent-cyan/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-text-primary transition-all duration-200 ease-smooth hover:border-accent-cyan/80 hover:shadow-glow md:inline-block"
          >
            Work With N-AI
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-primary md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          y: open ? 0 : -8,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden"
        aria-hidden={!open}
      >
        <div className="mx-4 mt-2 rounded-xl border border-border-subtle bg-bg-base/95 p-4 backdrop-blur-xl">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                onClick={() => setOpen(false)}
                href="#contact"
                className="block rounded-md border border-accent-cyan/40 px-3 py-2 text-center text-sm font-medium text-text-primary"
              >
                Work With N-AI
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.header>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.06]"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <circle cx="12" cy="12" r="6" fill="none" stroke="#5EE9F0" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="#7CF5C4" />
      </svg>
    </span>
  );
}
