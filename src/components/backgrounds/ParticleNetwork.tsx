"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface ParticleNetworkProps {
  className?: string;
  /** density per 100k px² */
  density?: number;
  /** maximum link distance in px */
  linkDistance?: number;
  /** main color used for nodes/links */
  color?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * Canvas-based animated network.
 * - 60fps cap (rAF naturally targets monitor refresh; we throttle work to ~60Hz max).
 * - Pauses while off-screen via IntersectionObserver.
 * - Pauses while tab is hidden.
 * - Reduced-motion users get a single static frame.
 * - DPR-aware. Resize-aware.
 */
export default function ParticleNetwork({
  className,
  density = 0.06,
  linkDistance = 140,
  color = "94,233,240",
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
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const step = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(step);
      if (t - lastT < minFrame) return;
      lastT = t;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.7)`;
        ctx.fill();
      }

      // draw links
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
            const alpha = (1 - d2 / ld2) * 0.35;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
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
      // single static frame
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.6)`;
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
  }, [color, density, linkDistance]);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
