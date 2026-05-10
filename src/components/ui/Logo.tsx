import Image from "next/image";
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
  /** width in px (height auto-scales) */
  width?: number;
  priority?: boolean;
}

/**
 * Full lockup — uses the user-supplied logo.png (mark + wordmark + tagline).
 * Use this in hero/footer or wherever the full brand story should read.
 */
export function LogoFull({ className, width = 420, priority = false }: LogoFullProps) {
  return (
    <Image
      src="/logo.png"
      alt="N-AI · Nancy Artificial Intelligence · Data · Insights · AI"
      width={1200}
      height={600}
      priority={priority}
      sizes="(max-width: 768px) 80vw, 420px"
      className={cn("h-auto select-none", className)}
      style={{ width: `${width}px`, maxWidth: "100%" }}
    />
  );
}
