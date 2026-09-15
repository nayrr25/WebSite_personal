import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Tone = "live" | "build" | "concept";

const tones: Record<Tone, string> = {
  live: "border-live/30 text-live",
  build: "border-warn/30 text-warn",
  concept: "border-line text-ink-2",
};

const dots: Record<Tone, string> = {
  live: "animate-pulse-dot bg-live shadow-[0_0_10px_#7FF0C8]",
  build: "bg-warn",
  concept: "bg-ink-muted",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone: Tone;
}

export default function Badge({ tone, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className={cn("h-[7px] w-[7px] rounded-full", dots[tone])} />
      {children}
    </span>
  );
}
