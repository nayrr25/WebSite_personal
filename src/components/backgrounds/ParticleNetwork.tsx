"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface ParticleNetworkProps {
  className?: string;
  /** density per 100k px² */
  density?: number;
  /** maximum link distance in px */
  linkDistance?: number;
  /** main color used for nodes/links — rgb comma-separated */
  color?: string;
  /** color de acento para los nodos "vivos" — rgb comma-separated */
  accent?: string;
  /**
   * Multiplicador global de presencia (1 = base). Sube alfas y radios juntos.
   * Con el viñeteado oscuro anterior la red quedaba casi invisible; ahora que
   * el fondo está limpio se puede subir sin ensuciar.
   */
  strength?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** 0 = al fondo, 1 = al frente. Da jerarquía en vez de una malla plana. */
  depth: number;
  /** una fracción de los nodos late en cian — son los que "disparan" */
  live: boolean;
  /** desfase de la pulsación, para que no latan al unísono */
  phase: number;
}

/**
 * Red neuronal animada sobre canvas.
 *
 * Presencia: los nodos tienen profundidad (radio y alfa varían), una fracción
 * late en cian con halo, y los enlaces se refuerzan. El objetivo es que la red
 * se LEA como una red neuronal, no como un ruido de fondo.
 */
export default function ParticleNetwork({
  className,
  density = 0.06,
  linkDistance = 140,
  color = "47,98,200",
  accent = "8,165,184",
  strength = 1,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let nodes: Node[] = [];
    let raf = 0;
    let lastT = 0;
    let running = false;
    let visible = true;
    const minFrame = 1000 / 60;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const pr = dpr();
      canvas.width = w * pr;
      canvas.height = h * pr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(pr, 0, 0, pr, 0, 0);
      seed(w, h);
    };

    const seed = (w: number, h: number) => {
      const target = Math.round((w * h * density) / 1000);
      const count = Math.max(24, Math.min(target, 110));
      nodes = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          // los del frente se mueven un poco más rápido → paralaje
          vx: (Math.random() - 0.5) * (0.14 + depth * 0.14),
          vy: (Math.random() - 0.5) * (0.14 + depth * 0.14),
          r: (0.9 + depth * 2.2) * strength,
          depth,
          live: Math.random() < 0.22,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const step = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(step);
      if (t - lastT < minFrame) return;
      lastT = t;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // 1) Enlaces primero, para que los nodos queden ENCIMA y se lean nítidos.
      const ld = linkDistance;
      const ld2 = ld * ld;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < ld2) {
            const prox = 1 - d2 / ld2;
            // más contraste que antes (0.18 → 0.34) y grosor según profundidad
            const alpha = prox * 0.34 * strength;
            const bothLive = a.live && b.live;
            ctx.strokeStyle = bothLive
              ? `rgba(${accent}, ${alpha * 1.15})`
              : `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 0.6 + ((a.depth + b.depth) / 2) * 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 2) Nodos, con halo en los "vivos" — es lo que da la lectura de neurona.
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const pulse = n.live ? 0.72 + 0.28 * Math.sin(t / 900 + n.phase) : 1;
        const rgb = n.live ? accent : color;
        const a = (0.34 + n.depth * 0.5) * strength * pulse;

        if (n.live) {
          const halo = ctx.createRadialGradient(
            n.x,
            n.y,
            0,
            n.x,
            n.y,
            n.r * 6.5,
          );
          halo.addColorStop(0, `rgba(${accent}, ${0.3 * pulse * strength})`);
          halo.addColorStop(1, `rgba(${accent}, 0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 6.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(a, 0.95)})`;
        ctx.fill();
      }
    };

    const start = () => {
      if (running || reducedMotion.current || !visible) return;
      running = true;
      lastT = 0;
      raf = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisChange = () => {
      if (document.hidden) stop();
      else start();
    };

    setSize();

    if (reducedMotion.current) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      // Fotograma estático equivalente, respetando reduced-motion.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 < linkDistance * linkDistance) {
            ctx.strokeStyle = `rgba(${color}, ${(1 - d2 / (linkDistance * linkDistance)) * 0.34 * strength})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.live ? accent : color}, ${(0.34 + n.depth * 0.5) * strength})`;
        ctx.fill();
      }
    } else {
      start();
    }

    const resizeObs = new ResizeObserver(() => setSize());
    if (canvas.parentElement) resizeObs.observe(canvas.parentElement);

    const intersectObs = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    intersectObs.observe(canvas);

    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      stop();
      resizeObs.disconnect();
      intersectObs.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, [color, accent, density, linkDistance, strength]);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
