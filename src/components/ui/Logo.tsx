import { cn } from "@/lib/cn";

interface LogoMarkProps {
  className?: string;
  /** size in px; the SVG is square */
  size?: number;
  /** show the cyan glow halo behind the mark */
  glow?: boolean;
}

/**
 * Compact mark — geometric "N" silhouette with 4 luminous nodes.
 * Self-contained SVG, scales crisply at any size. Use this in places where
 * the full lockup would be too dense (nav, badges, portrait corner, favicon).
 */
export function LogoMark({ className, size = 28, glow = false }: LogoMarkProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex items-center justify-center",
        glow && "drop-shadow-[0_0_12px_rgba(94,233,240,0.45)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="none"
        className="block"
      >
        {/* Subtle outer halo */}
        {glow && (
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="none"
            stroke="rgba(94,233,240,0.12)"
            strokeWidth="1"
          />
        )}
        {/* N silhouette — three strokes */}
        <line
          x1="7"
          y1="6"
          x2="7"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-text-primary"
        />
        <line
          x1="7"
          y1="6"
          x2="25"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-text-primary"
        />
        <line
          x1="25"
          y1="6"
          x2="25"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-text-primary"
        />
        {/* Connector — soft data flow */}
        <line
          x1="7"
          y1="26"
          x2="25"
          y2="6"
          stroke="rgba(94,233,240,0.45)"
          strokeWidth="1"
          strokeDasharray="2 3"
          strokeLinecap="round"
        />
        {/* Glowing nodes at corners — alternate cyan / mint */}
        <circle cx="7" cy="6" r="2.4" fill="#5EE9F0">
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="25" cy="6" r="2.2" fill="#7CF5C4" />
        <circle cx="7" cy="26" r="2.2" fill="#7CF5C4" />
        <circle cx="25" cy="26" r="2.4" fill="#5EE9F0">
          <animate
            attributeName="opacity"
            values="1;0.55;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Center inflection node */}
        <circle
          cx="16"
          cy="16"
          r="1.3"
          fill="#7CF5C4"
          opacity="0.85"
        />
      </svg>
    </span>
  );
}

interface LogoFullProps {
  className?: string;
  /** size scaling — `lg` for hero, `md` for footer, `sm` for compact use */
  size?: "sm" | "md" | "lg";
}

/**
 * Full brand lockup, rendered in HTML/CSS (no PNG dependency).
 * Composition:
 *   [mark]  N - AI
 *           Nancy Artificial Intelligence
 *           ────────────────────────
 *           Data · Insights · AI
 *
 * Scales crisply at any size, themeable, ~5 KB instead of 2 MB.
 */
export function LogoFull({ className, size = "lg" }: LogoFullProps) {
  const dims = {
    sm: {
      mark: 32,
      wordmark: "text-[28px]",
      sub: "text-[8px]",
      tag: "text-[10px]",
      gap: "gap-3",
    },
    md: {
      mark: 44,
      wordmark: "text-[40px]",
      sub: "text-[10px]",
      tag: "text-[12px]",
      gap: "gap-4",
    },
    lg: {
      mark: 72,
      wordmark: "text-[64px] md:text-[80px]",
      sub: "text-[11px] md:text-[12px]",
      tag: "text-[13px] md:text-[14px]",
      gap: "gap-5",
    },
  }[size];

  return (
    <div className={cn("inline-flex items-center", dims.gap, className)}>
      <LogoMark size={dims.mark} glow />
      <div className="flex flex-col items-start">
        <div
          className={cn(
            "font-sans font-light tracking-tighter leading-none text-text-primary",
            dims.wordmark,
          )}
          aria-label="N-AI"
        >
          <span>N</span>
          <span className="mx-1 text-accent-cyan">–</span>
          <span>AI</span>
        </div>
        <div
          className={cn(
            "mt-2 uppercase tracking-[0.22em] text-text-secondary",
            dims.sub,
          )}
        >
          Nancy Artificial Intelligence
        </div>
        <div
          aria-hidden
          className="mt-2 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(94,233,240,0) 0%, rgba(94,233,240,0.6) 30%, rgba(124,245,196,0.6) 70%, rgba(124,245,196,0) 100%)",
          }}
        />
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-2 uppercase tracking-[0.22em] text-text-secondary",
            dims.tag,
          )}
        >
          <span>Data</span>
          <span
            aria-hidden
            className="inline-block h-1 w-1 rounded-full bg-accent-cyan"
          />
          <span>Insights</span>
          <span
            aria-hidden
            className="inline-block h-1 w-1 rounded-full bg-accent-mint"
          />
          <span>AI</span>
        </div>
      </div>
    </div>
  );
}
