"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";

const ParticleNetwork = dynamic(
  () => import("@/components/backgrounds/ParticleNetwork"),
  { ssr: false },
);

/**
 * Banda de red neuronal entre secciones.
 *
 * El problema: la red moría al terminar el hero y la página se partía en dos —
 * arriba algo vivo, abajo kilómetros de gris plano.
 *
 * Por qué una BANDA y no un fondo de sección completa: dos razones.
 *
 * 1. Legibilidad. Estas secciones son densas en texto (bio, casos, FAQ) y una
 *    red animada detrás de un párrafo compite con la lectura. Una banda no
 *    contiene texto por definición, así que nunca puede taparlo.
 *
 * 2. Visibilidad. ParticleNetwork topa en 110 nodos. Repartidos sobre una
 *    sección de ~2.900px de alto quedan tan dispersos que la red no se ve
 *    (medido: cero píxeles dibujados en 400x400). En una banda de ~260px los
 *    mismos nodos se concentran y la red se lee con fuerza.
 *
 * El movimiento es el mismo del hero: es el mismo componente y el mismo bucle
 * de animación. Se detiene solo al salir del viewport y con
 * prefers-reduced-motion.
 */
export default function NetworkBand({
  className,
  /** Alto de la banda. Suficiente para que la red respire, sin comerse scroll. */
  height = 260,
  /** Presencia. Más alta que en el hero porque aquí no hay texto encima. */
  strength = 1.6,
}: {
  className?: string;
  height?: number;
  strength?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
    >
      <ParticleNetwork density={0.16} linkDistance={150} strength={strength} />
      {/* Desvanecido arriba y abajo para que la banda se funda con las
       * secciones vecinas en lugar de aparecer como un recuadro pegado. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-base) 0%, transparent 28%, transparent 72%, var(--bg-base) 100%)",
        }}
      />
    </div>
  );
}
