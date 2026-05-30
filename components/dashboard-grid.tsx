"use client";

import { motion } from "framer-motion";
import type { Course, ActivityDay } from "@/types";
import { HeroTile } from "./tiles/hero-tile";
import { StreakTile } from "./tiles/streak-tile";
import { CourseTile } from "./tiles/course-tile";
import { ActivityTile } from "./tiles/activity-tile";
import { StatTile } from "./tiles/stat-tile";
import { GraduationCap, Clock, Target } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 26 },
  },
};

export function DashboardGrid({
  courses,
  activity,
  stats,
}: {
  courses: Course[];
  activity: ActivityDay[];
  stats: {
    streak: number;
    avgProgress: number;
    coursesCount: number;
    hoursThisWeek: number;
  };
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid w-full max-w-7xl auto-rows-min grid-cols-1 gap-4 md:grid-cols-6"
    >
      <motion.section variants={item} className="md:col-span-4">
        <HeroTile name="Aria" streak={stats.streak} avgProgress={stats.avgProgress} />
      </motion.section>

      <motion.section variants={item} className="md:col-span-2">
        <StreakTile streak={stats.streak} />
      </motion.section>

      <motion.div variants={item} className="md:col-span-2">
        <StatTile
          label="Active courses"
          value={stats.coursesCount.toString()}
          Icon={GraduationCap}
          accent="violet"
        />
      </motion.div>
      <motion.div variants={item} className="md:col-span-2">
        <StatTile
          label="Hours this week"
          value={`${stats.hoursThisWeek}h`}
          Icon={Clock}
          accent="cyan"
        />
      </motion.div>
      <motion.div variants={item} className="md:col-span-2">
        <StatTile
          label="Avg. progress"
          value={`${stats.avgProgress}%`}
          Icon={Target}
          accent="emerald"
        />
      </motion.div>

      <motion.section
        variants={item}
        aria-labelledby="courses-heading"
        className="md:col-span-6"
      >
        <div className="mb-3 flex items-baseline justify-between px-1">
          <h2
            id="courses-heading"
            className="text-sm font-semibold tracking-wide text-white"
          >
            Your courses
          </h2>
          <span className="text-xs text-zinc-500">
            {courses.length} enrolled
          </span>
        </div>
        {courses.length === 0 ? (
          <div className="tile p-8 text-center text-sm text-zinc-400">
            No courses yet. Add rows to the{" "}
            <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-xs text-accent-cyan">
              courses
            </code>{" "}
            table in Supabase to see them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <motion.article key={c.id} variants={item}>
                <CourseTile course={c} />
              </motion.article>
            ))}
          </div>
        )}
      </motion.section>

      <motion.section variants={item} className="md:col-span-6">
        <ActivityTile days={activity} />
      </motion.section>
    </motion.div>
  );
}
