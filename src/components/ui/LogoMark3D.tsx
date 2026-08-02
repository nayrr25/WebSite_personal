"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface LogoMark3DProps {
  className?: string;
  /** lado del SVG en px */
  size?: number;
  /** anillo/halo alrededor del mark */
  ring?: boolean;
  /** 0..1 — cuánto llega a girar. 0.55 es un buen punto de partida. */
  amplitude?: number;
}

/**
 * Versión 3D del mark N–AI — variante "profundidad real".
 *
 * Cada nodo tiene coordenada z propia y se reproyecta cuadro a cuadro con
 * perspectiva (`scale = f / (f - z)`), así que hay PARALAJE REAL entre nodos:
 * los del frente crecen y los del fondo se achican. El trazo izquierdo vive al
 * fondo, el derecho al frente, y la diagonal de la N cruza de atrás hacia
 * adelante — que es literalmente lo que dice la marca: el dato atravesando el
 * sistema.
 *
 * Sin WebGL, sin librerías: ~1.5 kB de matemática y un <svg>. El loop se
 * detiene solo cuando el mark sale del viewport, cuando la pestaña se oculta
 * y cuando el usuario pide `prefers-reduced-motion`.
 */

type P3 = { x: number; y: number; z: number };

// Geometría del mark original (viewBox 0..32) centrada en el origen.
const NODES: Record<string, P3 & { r: number; c: string }> = {
  A: { x: -9, y: -10, z: -7, r: 2.4, c: "#08A5B8" }, // sup. izq — al fondo
  B: { x: 9, y: -10, z: 7, r: 2.2, c: "#0BB07C" }, // sup. der — al frente
  C: { x: -9, y: 10, z: -7, r: 2.2, c: "#0BB07C" }, // inf. izq — al fondo
  D: { x: 9, y: 10, z: 7, r: 2.4, c: "#08A5B8" }, // inf. der — al frente
  E: { x: 0, y: 0, z: 0, r: 1.3, c: "#0BB07C" }, // inflexión central
};
const STROKES: [string, string][] = [
  ["A", "C"],
  ["A", "D"],
  ["B", "D"],
];
const CONNECTOR: [string, string][] = [["C", "B"]];
const FOCAL = 70;

function rotate(p: P3, yaw: number, pitch: number): P3 {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x = p.x * cy + p.z * sy;
  let z = -p.x * sy + p.z * cy;
  const cx = Math.cos(pitch);
  const sx = Math.sin(pitch);
  const y = p.y * cx - z * sx;
  z = p.y * sx + z * cx;
  return { x, y, z };
}

export default function LogoMark3D({
  className,
  size = 72,
  ring = true,
  amplitude = 0.55,
}: LogoMark3DProps) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const [reduce, setReduce] = useState(false);
  // El estado de proyección vive en refs y se escribe directo al DOM:
  // re-renderizar React 60 veces por segundo sería absurdo para esto.
  const nodeRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let yaw = 0.38;
    let pitch = -0.2;
    let targetYaw = reduce ? 0.38 : 0;
    let targetPitch = reduce ? -0.2 : 0;
    let raf = 0;
    let running = false;
    let inView = true;

    const project = () => {
      const proj: Record<string, { x: number; y: number; s: number }> = {};
      for (const key in NODES) {
        const n = NODES[key];
        const r = rotate(n, yaw, pitch);
        const s = FOCAL / (FOCAL - r.z);
        proj[key] = { x: r.x * s, y: r.y * s, s };
      }
      for (const [a, b] of [...STROKES, ...CONNECTOR]) {
        const el = lineRefs.current[`${a}${b}`];
        if (!el) continue;
        const A = proj[a];
        const B = proj[b];
        el.setAttribute("x1", A.x.toFixed(2));
        el.setAttribute("y1", A.y.toFixed(2));
        el.setAttribute("x2", B.x.toFixed(2));
        el.setAttribute("y2", B.y.toFixed(2));
        const base = CONNECTOR.some(([p, q]) => p === a && q === b) ? 1 : 1.75;
        el.setAttribute("stroke-width", (base * ((A.s + B.s) / 2)).toFixed(2));
      }
      for (const key in NODES) {
        const el = nodeRefs.current[key];
        if (!el) continue;
        const p = proj[key];
        el.setAttribute("cx", p.x.toFixed(2));
        el.setAttribute("cy", p.y.toFixed(2));
        el.setAttribute("r", (NODES[key].r * p.s).toFixed(2));
        el.setAttribute(
          "opacity",
          (0.55 + 0.45 * Math.min(1.3, p.s)).toFixed(2),
        );
      }
    };

    const loop = () => {
      if (!running) return;
      yaw += (targetYaw - yaw) * 0.085;
      pitch += (targetPitch - pitch) * 0.085;
      project();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce || !inView) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // El ángulo lo dicta la posición del puntero en la VENTANA, no sobre el
    // logo: así el mark reacciona aunque el cursor esté lejos, que es lo que
    // hace que se sienta un objeto en el espacio y no un botón con hover.
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetYaw = nx * 0.85 * amplitude;
      targetPitch = -ny * 0.5 * amplitude;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(host);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      // Pose fija con volumen — se ve el 3D, no se mueve nada.
      project();
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      project();
      start();
    }

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduce, amplitude]);

  return (
    <span
      ref={hostRef}
      aria-hidden
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="-24 -24 48 48"
        width={size}
        height={size}
        fill="none"
        className="block overflow-visible"
      >
        <defs>
          <linearGradient id="nai-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#08A5B8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0BB07C" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2f62c8" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="nai-glow">
            <stop offset="0%" stopColor="#5EE9F0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#5EE9F0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Halo suave — asienta el mark sobre el fondo claro */}
        {ring && <circle cx="0" cy="0" r="21" fill="url(#nai-glow)" />}

        {/* FIX: el anillo existía pero a rgba(94,233,240,0.12) era invisible.
         * Ahora es un trazo con gradiente de marca, punteado fino, que sí se
         * lee y refuerza la idea de "sistema cerrado". */}
        {ring && (
          <circle
            cx="0"
            cy="0"
            r="19"
            fill="none"
            stroke="url(#nai-ring)"
            strokeWidth="1.1"
            strokeDasharray="1.5 4"
            strokeLinecap="round"
          />
        )}
        {ring && (
          <circle
            cx="0"
            cy="0"
            r="15.5"
            fill="none"
            stroke="rgba(11,176,124,0.35)"
            strokeWidth="0.6"
          />
        )}

        {/* Conector punteado — el "flujo de datos" que cruza la N */}
        {CONNECTOR.map(([a, b]) => (
          <line
            key={`${a}${b}`}
            ref={(el) => {
              lineRefs.current[`${a}${b}`] = el;
            }}
            stroke="rgba(8,165,184,0.8)"
            strokeWidth="1"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
        ))}

        {/* Silueta de la N */}
        {STROKES.map(([a, b]) => (
          <line
            key={`${a}${b}`}
            ref={(el) => {
              lineRefs.current[`${a}${b}`] = el;
            }}
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="text-text-primary"
          />
        ))}

        {/* Nodos */}
        {Object.keys(NODES).map((key) => (
          <circle
            key={key}
            ref={(el) => {
              nodeRefs.current[key] = el;
            }}
            fill={NODES[key].c}
          />
        ))}
      </svg>
    </span>
  );
}
