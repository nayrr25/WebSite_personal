import { cn } from "@/lib/cn";

interface AuroraGradientProps {
  className?: string;
  /** dim the whole effect 0..1 */
  intensity?: number;
}

/**
 * OPCIÓN C · tema claro.
 * Blooms azules muy sutiles sobre fondo claro — dan profundidad sin ensuciar.
 */
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
      {/* Azul navy — drift arriba-izquierda */}
      <div
        className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] animate-aurora-drift rounded-full blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(47,98,200,0.12) 0%, rgba(47,98,200,0.04) 35%, transparent 65%)",
        }}
      />
      {/* Azul claro — drift abajo-derecha, fase opuesta */}
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[70vh] w-[70vh] animate-aurora-drift rounded-full blur-3xl will-change-transform"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle, rgba(79,134,230,0.10) 0%, rgba(79,134,230,0.03) 35%, transparent 65%)",
        }}
      />
      {/* Velo navy abajo-centro para asentar */}
      <div
        className="absolute -bottom-1/4 left-1/2 h-[60vh] w-[100vw] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(47,98,200,0.06) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
