"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function StreakTile({ streak }: { streak: number }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const completed = Math.min(streak % 7 || 7, 7);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="tile h-full min-h-[260px] p-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Streak
        </span>
        <Flame className="h-4 w-4 text-accent-pink" />
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl font-semibold text-white">{streak}</span>
        <span className="text-sm text-zinc-400">days</span>
      </div>
      <p className="mt-1 text-xs text-zinc-500">Best this month</p>

      <div className="mt-6 flex items-end justify-between gap-1.5">
        {days.map((d, i) => {
          const active = i < completed;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                initial={{ height: 8 }}
                animate={{ height: active ? 36 + i * 4 : 12 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 240, damping: 20 }}
                className={`w-full rounded-md ${
                  active
                    ? "bg-gradient-to-t from-accent-violet to-accent-pink"
                    : "bg-bg-elevated"
                }`}
              />
              <span className="text-[10px] text-zinc-500">{d}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
