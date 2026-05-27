import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  BarChart3,
  BrainCircuit,
  BookOpen,
  CalendarDays,
  ChartSpline,
  CircuitBoard,
  Code2,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  MessageSquareText,
  Orbit,
  Settings,
  Sparkles,
  Target,
  Trophy,
  Users,
  Workflow
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  atom: Atom,
  'bar-chart-3': BarChart3,
  'brain-circuit': BrainCircuit,
  'book-open': BookOpen,
  'calendar-days': CalendarDays,
  'chart-spline': ChartSpline,
  'circuit-board': CircuitBoard,
  'code-2': Code2,
  compass: Compass,
  'graduation-cap': GraduationCap,
  'layout-dashboard': LayoutDashboard,
  'layout-grid': LayoutGrid,
  'message-square-text': MessageSquareText,
  orbit: Orbit,
  settings: Settings,
  sparkles: Sparkles,
  target: Target,
  trophy: Trophy,
  users: Users,
  workflow: Workflow
};

export function getDashboardIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? LayoutGrid;
}