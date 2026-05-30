"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  Activity,
  Library,
  Settings,
  ChevronLeft,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";

const NAV_ICONS: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "graduation-cap": GraduationCap,
  calendar: Calendar,
  activity: Activity,
  library: Library,
  settings: Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 248 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="sticky top-0 hidden h-screen shrink-0 border-r border-bg-border bg-bg-surface/60 backdrop-blur md:flex md:flex-col"
    >
      <div className="flex items-center justify-between px-5 py-6">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-violet to-accent-cyan shadow-glow">
            <Sparkles className="h-4 w-4 text-black" />
          </div>
          {!collapsed && (
            <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white">
              Orbit
            </span>
          )}
        </Link>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((c) => !c)}
          className="hidden h-7 w-7 place-items-center rounded-md border border-bg-border bg-bg-elevated text-zinc-400 transition hover:text-white lg:grid"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.iconName] ?? LayoutDashboard;
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "text-white"
                      : "text-zinc-400 hover:bg-bg-elevated hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-violet/20 to-accent-cyan/10 ring-1 ring-accent-violet/30"
                    />
                  )}
                  <Icon className="relative z-10 h-4.5 w-4.5 shrink-0" />
                  {!collapsed && (
                    <span className="relative z-10 truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-bg-border p-4">
        <div
          className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-pink to-accent-violet text-xs font-semibold text-white">
            AK
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Aria Kim</p>
              <p className="truncate text-xs text-zinc-500">Computer Science · Y3</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
