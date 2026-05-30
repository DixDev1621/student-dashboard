"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  Activity,
  Settings,
  type LucideIcon,
} from "lucide-react";

const MOBILE_ITEMS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/", label: "Home", Icon: LayoutDashboard },
  { href: "/courses", label: "Courses", Icon: GraduationCap },
  { href: "/schedule", label: "Schedule", Icon: Calendar },
  { href: "/activity", label: "Activity", Icon: Activity },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-bg-border bg-bg-surface/90 px-2 py-2 shadow-glow backdrop-blur md:hidden"
    >
      <ul className="flex items-center justify-between">
        {MOBILE_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="relative flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium text-zinc-400"
              >
                {active && (
                  <motion.span
                    layoutId="mobile-active"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-accent-violet/15 ring-1 ring-accent-violet/30"
                  />
                )}
                <Icon
                  className={`relative z-10 h-5 w-5 ${active ? "text-white" : ""}`}
                />
                <span className={`relative z-10 ${active ? "text-white" : ""}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
