"use client";

import { motion } from "framer-motion";
import type { ActivityDay } from "@/types";

function colorFor(count: number) {
  if (count === 0) return "bg-bg-elevated";
  if (count <= 2) return "bg-accent-violet/25";
  if (count <= 4) return "bg-accent-violet/50";
  if (count <= 6) return "bg-accent-violet/75";
  return "bg-accent-violet";
}

export function ActivityTile({ days }: { days: ActivityDay[] }) {
  // group into 7-row columns (weeks)
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const total = days.reduce((a, d) => a + d.count, 0);
  const activeDays = days.filter((d) => d.count > 0).length;

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="tile p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Study activity
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {activeDays} active days · {total} sessions in the last{" "}
            {weeks.length} weeks
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span>Less</span>
          {[0, 2, 4, 6, 8].map((n) => (
            <span key={n} className={`h-2.5 w-2.5 rounded-sm ${colorFor(n)}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1.5">
              {week.map((day, di) => (
                <motion.span
                  key={day.date}
                  title={`${day.date} · ${day.count} sessions`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wi + di) * 0.005,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  className={`h-3 w-3 rounded-sm ${colorFor(day.count)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
