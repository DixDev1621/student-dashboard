"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import { getCourseIcon } from "@/lib/icon-map";
import { ArrowUpRight } from "lucide-react";

export function CourseTile({ course }: { course: Course }) {
  const Icon = getCourseIcon(course.icon_name);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const progress = Math.max(0, Math.min(100, course.progress));

  return (
    <motion.div
      onMouseMove={handleMove}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="tile group h-full cursor-pointer p-5 transition-shadow hover:shadow-glow"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-accent-violet/25 to-accent-cyan/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-bg-elevated to-bg-surface ring-1 ring-bg-border">
            <Icon className="h-5 w-5 text-accent-cyan" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-zinc-500 transition group-hover:text-white" />
        </div>

        <h3 className="mt-5 text-base font-semibold leading-snug text-white">
          {course.title}
        </h3>

        <div className="mt-6">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs text-zinc-500">Progress</span>
            <span className="text-sm font-medium text-white">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-accent-violet via-accent-pink to-accent-cyan"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
