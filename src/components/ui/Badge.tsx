import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Tone = "live" | "build" | "concept" | "neutral" | "danger";

const tones: Record<Tone, string> = {
  live: "border-accent-mint/40 bg-accent-mint/[0.06] text-accent-mint",
  build: "border-accent-cyan/40 bg-accent-cyan/[0.06] text-accent-cyan",
  concept: "border-border-strong bg-bg-glass text-text-secondary",
  neutral: "border-border-subtle bg-bg-glass text-text-secondary",
  danger: "border-danger/40 bg-danger/[0.08] text-danger",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Show a pulsing dot to the left (live status) */
  pulse?: boolean;
}

export default function Badge({
  tone = "neutral",
  pulse = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-eyebrow",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {pulse && (
        <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-current opacity-60 [animation:pulseDot_2s_ease-in-out_infinite]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
