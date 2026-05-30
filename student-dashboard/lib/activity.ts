import type { ActivityDay } from "@/types";

/**
 * Deterministic synthetic activity for the contribution heatmap.
 * Replace with a real `study_sessions` table query when available.
 */
export function buildActivity(weeks = 16): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const total = weeks * 7;
  for (let i = total - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // deterministic pseudo-random
    const seed = (d.getDate() * 31 + d.getMonth() * 7 + d.getFullYear()) % 9;
    days.push({ date: d.toISOString().slice(0, 10), count: seed });
  }
  return days;
}
