import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a subtle gradient border that activates on hover */
  hoverable?: boolean;
  /** Adds the cyan glow shadow */
  glow?: boolean;
}

export default function GlassCard({
  className,
  hoverable = false,
  glow = false,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated/60 backdrop-blur-md",
        "transition-all duration-300 ease-smooth",
        hoverable &&
          "hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-glow",
        glow && "shadow-glow",
        className,
      )}
      {...rest}
    >
      {/* Inner stroke */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/[0.03]"
      />
      {children}
    </div>
  );
}
