"use client";

import { ChevronLeft, ChevronRight, Crown, GraduationCap, LayoutGrid, Settings, Sparkles, Trophy, Users } from 'lucide-react';
import Link from 'next/link';
import { SidebarItem } from '@/components/sidebar/sidebar-item';
import Button from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutGrid, href: '/' },
  { label: 'Courses', icon: GraduationCap, href: '/courses' },
  { label: 'Community', icon: Users, href: '/community' },
  { label: 'Achievements', icon: Trophy, href: '/achievements' },
  { label: 'Premium', icon: Crown, href: '/pricing' },
  { label: 'Settings', icon: Settings, href: '/settings' }
] as const;

interface SidebarCounts {
  community?: number;
  achievements?: number;
}

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  counts?: SidebarCounts;
}

export function Sidebar({ collapsed, onToggleCollapse, counts }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`hidden h-screen shrink-0 border-r border-white/5 panel-gradient panel-glass px-4 py-5 backdrop-blur-xl md:flex md:flex-col ${
        collapsed ? 'lg:w-24' : 'lg:w-[284px]'
      } md:w-24`}
    >
      <section className="flex items-center justify-between gap-3 px-2 pb-6">
        <section className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/15 text-violet-200 shadow-[0_0_28px_rgba(168,85,247,0.18)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className={`space-y-0.5 ${collapsed ? 'lg:hidden' : 'hidden lg:block'}`}>
            <strong className="block text-lg font-semibold tracking-tight text-white">Learnify</strong>
            <span className="block text-xs tracking-[0.24em] text-white/35">Premium learning</span>
          </span>
        </section>

        <div className="hidden lg:grid">
          <Button onClick={onToggleCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} variant="small" className="h-9 w-9 p-0 grid place-items-center">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </section>

        <nav aria-label="Primary" className="flex-1 px-1">
          <ul className="space-y-1.5">
            {sidebarItems.map((item) => {
              const isActive = item.href ? pathname === item.href || pathname?.startsWith(item.href + '/') : false;
              const itemCount = item.label === 'Community' ? counts?.community : item.label === 'Achievements' ? counts?.achievements : undefined;
              return (
                <SidebarItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                  active={isActive}
                  collapsed={collapsed}
                  count={itemCount}
                />
              );
            })}
          </ul>
        </nav>

      <Link
        href="/profile"
        prefetch={false}
        className="mt-6 block rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-insetGlow transition hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-white/[0.05]"
        aria-label="Open profile page"
      >
        <section className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-white">
            <span className="h-8 w-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0.3)_35%,rgba(255,255,255,0.05)_65%)]" />
          </span>
          <section className={`min-w-0 ${collapsed ? 'lg:hidden' : 'hidden lg:block'}`}>
            <p className="truncate text-sm font-medium text-white">Ayush Singh</p>
            <p className="text-xs text-violet-200/75">Premium Plan</p>
          </section>
        </section>
      </Link>
    </aside>
  );
}