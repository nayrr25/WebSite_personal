import { cn } from "@/lib/cn";

interface AuroraGradientProps {
  className?: string;
  /** dim the whole effect 0..1 */
  intensity?: number;
}

export default function AuroraGradient({
  className,
  intensity = 1,
}: AuroraGradientProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ opacity: intensity }}
    >
      {/* Cyan glow — top-left drift */}
      <div
        className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] animate-aurora-drift rounded-full blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(94,233,240,0.18) 0%, rgba(94,233,240,0.05) 35%, transparent 65%)",
        }}
      />
      {/* Mint glow — bottom-right drift, opposite phase */}
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[70vh] w-[70vh] animate-aurora-drift rounded-full blur-3xl will-change-transform"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle, rgba(124,245,196,0.12) 0%, rgba(124,245,196,0.04) 35%, transparent 65%)",
        }}
      />
      {/* Deep navy haze — bottom center for grounding */}
      <div
        className="absolute -bottom-1/4 left-1/2 h-[60vh] w-[100vw] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(11,31,58,0.6) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
