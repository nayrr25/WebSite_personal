import Container from "./Container";
import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border-subtle bg-bg-base py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.06]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <circle
                    cx="12"
                    cy="12"
                    r="6"
                    fill="none"
                    stroke="#5EE9F0"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="2" fill="#7CF5C4" />
                </svg>
              </span>
              <span className="text-[15px] font-medium tracking-tight text-text-primary">
                {site.brand.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-text-secondary">
              {site.brand.fullName}. {site.brand.tagline}.
            </p>
          </div>

          <div>
            <p className="text-eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 md:flex-row md:items-center">
          <p className="text-xs text-text-muted">
            © {year} {site.brand.name} · {site.brand.subBrand}
          </p>
          <p className="flex items-center gap-2 text-xs text-text-muted">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-accent-cyan shadow-glow"
            />
            Theme · Dark
          </p>
        </div>
      </Container>
    </footer>
  );
}
