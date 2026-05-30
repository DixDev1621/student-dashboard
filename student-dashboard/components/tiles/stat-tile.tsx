"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const ACCENT_MAP = {
  violet: "text-accent-violet bg-accent-violet/10 ring-accent-violet/20",
  cyan: "text-accent-cyan bg-accent-cyan/10 ring-accent-cyan/20",
  emerald: "text-accent-emerald bg-accent-emerald/10 ring-accent-emerald/20",
  pink: "text-accent-pink bg-accent-pink/10 ring-accent-pink/20",
} as const;

export function StatTile({
  label,
  value,
  Icon,
  accent = "violet",
}: {
  label: string;
  value: string;
  Icon: LucideIcon;
  accent?: keyof typeof ACCENT_MAP;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="tile h-full p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${ACCENT_MAP[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
