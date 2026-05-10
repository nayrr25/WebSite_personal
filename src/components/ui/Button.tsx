import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "subtle";

interface BaseProps {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 py-3 text-sm font-medium tracking-wide transition-all duration-200 ease-smooth focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "border border-accent-cyan/40 bg-accent-cyan/5 text-text-primary hover:border-accent-cyan/80 hover:bg-accent-cyan/10 hover:shadow-glow",
  ghost:
    "border border-border-subtle bg-transparent text-text-primary hover:border-border-strong hover:bg-bg-glass",
  subtle:
    "border border-transparent bg-bg-glass text-text-secondary hover:bg-white/[0.06] hover:text-text-primary",
};

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight
          aria-hidden
          className="relative z-10 h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  withArrow = false,
  className,
  children,
  href,
  ...rest
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight
          aria-hidden
          className="relative z-10 h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
