"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

export function HeroTile({
  name,
  streak,
  avgProgress,
}: {
  name: string;
  streak: number;
  avgProgress: number;
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? "Still up" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="tile relative h-full min-h-[260px] p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-violet/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-accent-cyan/20 blur-3xl"
      />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-bg-border bg-bg-elevated/70 px-3 py-1 text-xs text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
            On track this week
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {greeting}, {name}.
          </h1>
          <p className="mt-2 max-w-md text-sm text-zinc-400">
            You&rsquo;ve completed an average of{" "}
            <span className="text-white">{avgProgress}%</span> across your courses.
            Keep the momentum going.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-accent-violet/30 bg-accent-violet/10 px-4 py-2.5">
            <Flame className="h-4 w-4 text-accent-pink" />
            <span className="text-sm font-medium text-white">
              {streak}-day learning streak
            </span>
          </div>
          <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200">
            Resume last lesson
          </button>
        </div>
      </div>
    </motion.div>
  );
}
