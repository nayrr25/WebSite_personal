"use client";

import { cn } from "@/lib/cn";

export interface BarItem {
  label: string;
  value: number;
}

interface BarListProps {
  items: BarItem[];
  /** Arranca la animación de las barras (una sola vez). */
  animate: boolean;
  /** Con movimiento reducido las barras aparecen en su valor final. */
  reduce: boolean;
  max?: number;
  /** Ancho de la columna de la barra. */
  barWidth?: string;
  className?: string;
}

/** Barras horizontales animadas con `scaleX` (sin recálculo de layout). */
export default function BarList({
  items,
  animate,
  reduce,
  max = 100,
  barWidth = "70px",
  className,
}: BarListProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, i) => (
        <li
          key={item.label}
          className="grid items-center gap-2 text-xs text-[#C3CBDD]"
          style={{ gridTemplateColumns: `minmax(0,1fr) ${barWidth} 26px` }}
        >
          <span className="truncate">{item.label}</span>
          <span className="h-1.5 overflow-hidden rounded bg-white/[0.08]">
            <span
              className="block h-full origin-left rounded bg-gradient-to-r from-accent to-accent-cyan"
              style={{
                transform: `scaleX(${animate || reduce ? item.value / max : 0})`,
                transition: reduce
                  ? "none"
                  : `transform 900ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 60}ms`,
              }}
            />
          </span>
          <span className="text-right tabular-nums text-ink">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
