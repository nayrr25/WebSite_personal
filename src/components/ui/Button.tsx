import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "subtle";

interface BaseProps {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-4 text-[15px] font-semibold leading-none transition-[transform,box-shadow,background-color,color] duration-200 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-white text-navy shadow-btn-glow hover:shadow-btn-glow-hover",
  ghost: "border border-white/25 bg-white/[0.03] text-ink hover:bg-white/[0.08]",
  subtle: "px-0 py-2 text-accent hover:text-accent-cyan",
};

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none"
    />
  );
}

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
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
      {children}
      {withArrow && <Arrow />}
    </a>
  );
}
