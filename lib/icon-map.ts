import {
  BookOpen,
  Code2,
  Database,
  Brain,
  Atom,
  Calculator,
  Palette,
  Globe,
  Music,
  Cpu,
  FlaskConical,
  Languages,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  code: Code2,
  database: Database,
  brain: Brain,
  atom: Atom,
  calculator: Calculator,
  palette: Palette,
  globe: Globe,
  music: Music,
  cpu: Cpu,
  flask: FlaskConical,
  languages: Languages,
};

export function getCourseIcon(name: string): LucideIcon {
  return ICONS[name] ?? BookOpen;
}
