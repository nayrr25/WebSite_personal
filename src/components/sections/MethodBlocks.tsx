"use client";

import { useEffect, useRef } from "react";
import { STACK_LAYERS } from "@/content/data/stack";
import styles from "./MethodBlocks.module.css";

const LAYER_CLASS = [styles.l0, styles.l1, styles.l2, styles.l3];
const LAYER_DELAY = 520; // ms entre capas: la pared queda armada en ~2,5 s
const PIECE_DELAY = 70;
const IA_X = 1;
const IA_LAYER: number = STACK_LAYERS.length;
const IA_START = IA_LAYER + 2.5;

type Piece = { x: number; z: number; j: number; label: string; dx: number; dy: number; dz: number; rot: number };

// Desplazamientos fijos por pieza (sin azar): cada bloque llega desde otro lado.
const PIECES: Piece[] = STACK_LAYERS.flatMap((labels, z) =>
  labels.map((label, j) => ({ label, z, j, x: (labels.length === 4 ? 0 : 0.5) + j })),
).map((piece, i) => ({
  ...piece,
  dx: (((i * 37) % 5) - 2) * 0.8,
  dy: (((i * 53) % 5) - 2) * 0.8,
  dz: 4 + (i % 3),
  rot: (((i * 29) % 7) - 3) * 12,
}));

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
// Posición final en unidades de --s: es lo que viene en el HTML (pared armada).
const finalTransform = (x: number, z: number) => `translate3d(calc(var(--s) * ${x}), 0px, calc(var(--s) * ${z}))`;

/**
 * Pared de bloques con las herramientas de cada fase del Método y un bloque
 * "IA" que baja con el scroll y la corona. El HTML trae la pared armada; solo
 * se desarma para animarse si la sección no está a la vista al cargar. Con
 * movimiento reducido queda armada y quieta.
 */
export default function MethodBlocks({
  onPhase,
  caption,
  srLabel,
  phaseTitles,
}: {
  /** Cuántas fases están iluminadas (0 a 4) mientras cae cada capa. */
  onPhase: (lit: number) => void;
  caption: string;
  srLabel: string;
  phaseTitles: readonly string[];
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iaRef = useRef<HTMLDivElement>(null);
  const onPhaseRef = useRef(onPhase);
  onPhaseRef.current = onPhase;

  useEffect(() => {
    const stage = stageRef.current;
    const world = worldRef.current;
    const ia = iaRef.current;
    const els = pieceRefs.current;
    if (!stage || !world || !ia) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    let size = 62;
    let built = true;
    let wallDone = true;
    let iaZ = IA_LAYER;
    let rafId = 0;

    const readSize = () => {
      size = parseFloat(getComputedStyle(world).getPropertyValue("--s")) || size;
    };

    const place = (i: number, isBuilt: boolean) => {
      const p = PIECES[i];
      const el = els[i];
      if (!el) return;
      const k = isBuilt ? 0 : 1;
      el.style.transform = `translate3d(${(p.x + p.dx * k) * size}px, ${p.dy * k * size}px, ${(p.z + p.dz * k) * size}px) rotateZ(${p.rot * k}deg)`;
      for (const face of Array.from(el.children) as HTMLElement[]) face.style.opacity = isBuilt ? "1" : "0";
    };

    const iaRender = () => {
      ia.style.transform = `translate3d(${IA_X * size}px, 0px, ${iaZ * size}px)`;
      stage.classList.toggle(styles.iaLanded, iaZ - IA_LAYER < 0.03);
    };

    const iaTarget = () => {
      const rect = stage.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      // 0 cuando el escenario asoma por abajo; 1 cuando su centro llega al centro de la pantalla.
      const progress = clamp((innerHeight - center) / (innerHeight / 2));
      const z = IA_LAYER + (1 - easeOut(progress)) * (IA_START - IA_LAYER);
      // No aterriza sobre una pared incompleta.
      return wallDone ? z : Math.max(z, IA_LAYER + 1.6);
    };

    const tick = () => {
      const target = iaTarget();
      iaZ += (target - iaZ) * 0.18;
      if (Math.abs(target - iaZ) < 0.002) iaZ = target;
      iaRender();
      rafId = iaZ !== target ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const withoutTransition = (fn: () => void) => {
      els.forEach((el) => el && (el.style.transition = "none"));
      fn();
      void world.offsetWidth;
      els.forEach((el) => el && (el.style.transition = ""));
    };

    const scatter = () => {
      built = false;
      wallDone = false;
      stage.classList.remove(styles.built);
      onPhaseRef.current(0);
      withoutTransition(() =>
        PIECES.forEach((_, i) => {
          if (els[i]) els[i]!.style.transitionDelay = "0ms";
          place(i, false);
        }),
      );
      iaZ = IA_START;
      iaRender();
    };

    const build = () => {
      built = true;
      stage.classList.add(styles.built);
      PIECES.forEach((p, i) => {
        if (els[i]) els[i]!.style.transitionDelay = `${p.z * LAYER_DELAY + p.j * PIECE_DELAY}ms`;
        place(i, true);
      });
      STACK_LAYERS.forEach((_, z) => timers.push(window.setTimeout(() => onPhaseRef.current(z + 1), z * LAYER_DELAY + 150)));
      const lastLayer = STACK_LAYERS.length - 1;
      timers.push(
        window.setTimeout(() => {
          wallDone = true;
          kick();
        }, lastLayer * LAYER_DELAY + 3 * PIECE_DELAY + 650),
      );
    };

    readSize();
    const rect = stage.getBoundingClientRect();
    let observer: IntersectionObserver | undefined;
    if (rect.top >= innerHeight || rect.bottom <= 0) {
      scatter();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          build();
          observer?.disconnect();
        },
        { threshold: 0.45 },
      );
      observer.observe(stage);
    }

    const onResize = () => {
      readSize();
      withoutTransition(() => PIECES.forEach((_, i) => place(i, built)));
      iaRender();
      kick();
    };

    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", onResize);
    kick();

    return () => {
      observer?.disconnect();
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
      removeEventListener("scroll", kick);
      removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div>
      <div ref={stageRef} className={`${styles.stage} ${styles.built} ${styles.iaLanded}`} aria-hidden="true">
        <div className={styles.floorGlow} />
        <div ref={worldRef} className={styles.world}>
          <div className={styles.floor} />
          {PIECES.map((p, i) => (
            <div
              key={p.label}
              ref={(el) => {
                pieceRefs.current[i] = el;
              }}
              className={`${styles.cube} ${LAYER_CLASS[p.z]}`}
              style={{ transform: finalTransform(p.x, p.z) }}
            >
              <i className={styles.top} />
              <i className={styles.east} />
              <i className={styles.south}>{p.label}</i>
            </div>
          ))}
          <div ref={iaRef} className={`${styles.cube} ${styles.ia}`} style={{ transform: finalTransform(IA_X, IA_LAYER) }}>
            <i className={styles.top} />
            <i className={styles.east} />
            <i className={styles.south}>IA</i>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[13px] text-ink-muted">{caption}</p>
      <ul className="sr-only" aria-label={srLabel}>
        {STACK_LAYERS.map((labels, z) => (
          <li key={z}>
            {phaseTitles[z]}: {labels.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
