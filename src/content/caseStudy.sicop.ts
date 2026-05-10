// Static, language-agnostic case-study data.
// All translatable strings live in src/content/i18n/{es,en}.ts under `t.sicop.*`.

export const institutions: Array<{
  name: string;
  score: number;
  tier: "low" | "medium" | "high" | "critical";
}> = [
  { name: "INSTITUCIÓN A", score: 23, tier: "low" },
  { name: "INSTITUCIÓN B", score: 31, tier: "low" },
  { name: "INSTITUCIÓN C", score: 28, tier: "low" },
  { name: "INSTITUCIÓN D", score: 47, tier: "medium" },
  { name: "INSTITUCIÓN E", score: 52, tier: "medium" },
  { name: "INSTITUCIÓN F", score: 58, tier: "medium" },
  { name: "INSTITUCIÓN G", score: 49, tier: "medium" },
  { name: "INSTITUCIÓN H", score: 71, tier: "high" },
  { name: "INSTITUCIÓN I", score: 76, tier: "high" },
  { name: "INSTITUCIÓN J", score: 68, tier: "high" },
  { name: "INSTITUCIÓN K", score: 84, tier: "critical" },
  { name: "INSTITUCIÓN L", score: 91, tier: "critical" },
];
