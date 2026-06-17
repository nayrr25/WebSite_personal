import { cn } from "@/lib/cn";

interface GridGlowProps {
  className?: string;
  /** size of the radial mask in vmax — controls how much grid is visible */
  size?: number;
  /** color of the grid lines, comma-separated rgb (no rgba()) */
  rgb?: string;
}

/**
 * OPCIÓN C · tema claro.
 * Líneas de grilla OSCURAS sobre fondo claro + glow azul suave.
 */
export default function GridGlow({
  className,
  size = 60,
  rgb = "30,39,53",
}: GridGlowProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 mask-radial-soft"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${rgb},0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(${rgb},0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${size}vmax`,
          height: `${size}vmax`,
          background:
            "radial-gradient(circle, rgba(47,98,200,0.08) 0%, rgba(47,98,200,0.02) 35%, transparent 65%)",
          filter: "blur(0px)",
        }}
      />
    </div>
  );
}
