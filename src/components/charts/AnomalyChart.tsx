"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
} from "recharts";
import { useMemo } from "react";

interface AnomalyChartProps {
  /** number of points (default 60) */
  points?: number;
  /** optional fixed seed for deterministic rendering */
  seed?: number;
}

function rand(seed: number) {
  // mulberry32
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Point {
  i: number;
  base: number;
  anomaly: number | null;
}

export default function AnomalyChart({ points = 60, seed = 42 }: AnomalyChartProps) {
  const data = useMemo<Point[]>(() => {
    const r = rand(seed);
    const arr: Point[] = [];
    let v = 50;
    for (let i = 0; i < points; i++) {
      // gentle random walk with weekly seasonality
      v += (r() - 0.5) * 6;
      v += Math.sin(i / 6) * 1.6;
      v = Math.max(20, Math.min(80, v));
      const isAnomaly =
        (i === 12 && true) ||
        (i === 27 && true) ||
        (i === 41 && true) ||
        (i === 54 && true);
      arr.push({
        i,
        base: Math.round(v * 10) / 10,
        anomaly: isAnomaly ? Math.round((v + 18) * 10) / 10 : null,
      });
    }
    return arr;
  }, [points, seed]);

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="areaCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5EE9F0" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5EE9F0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="i" hide />
          <YAxis hide domain={[0, 110]} />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.08)" }}
            contentStyle={{
              background: "rgba(12,16,20,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#F5F7FA",
            }}
            labelStyle={{ color: "#A6ADBB" }}
            formatter={(v: number, name: string) => [
              v?.toFixed?.(1) ?? v,
              name === "base" ? "Signal" : "Anomaly",
            ]}
            labelFormatter={(i) => `t-${data.length - Number(i)}`}
          />
          <Area
            type="monotone"
            dataKey="base"
            stroke="#5EE9F0"
            strokeWidth={1.5}
            fill="url(#areaCyan)"
            isAnimationActive
            animationDuration={900}
          />
          <Scatter
            dataKey="anomaly"
            fill="#5EE9F0"
            shape={(props: { cx?: number; cy?: number }) => {
              const { cx, cy } = props;
              if (cx === undefined || cy === undefined) return <g />;
              return (
                <g>
                  <circle cx={cx} cy={cy} r={9} fill="#5EE9F0" opacity="0.18" />
                  <circle cx={cx} cy={cy} r={5} fill="#5EE9F0" opacity="0.35" />
                  <circle cx={cx} cy={cy} r={2.5} fill="#7CF5C4" />
                </g>
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
