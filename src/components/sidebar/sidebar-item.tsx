'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  href?: '/' | '/courses' | '/community' | '/achievements' | '/pricing' | '/settings';
  active?: boolean;
  collapsed?: boolean;
  count?: number;
}

export function SidebarItem({ label, icon: Icon, href, active = false, collapsed = false, count }: SidebarItemProps) {
  return (
    <li>
      {href ? (
        <Link
          href={href}
          prefetch={false}
          aria-current={active ? 'page' : undefined}
          className="group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-white/72 transition-colors hover:text-white"
        >
          {active && (
            <span
              className="absolute inset-0 rounded-2xl border border-violet-400/20 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(124,58,237,0.15)]"
            />
          )}
          <span
            className={`relative grid h-9 w-9 place-items-center rounded-xl border text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 ${
              active ? 'border-violet-300/30 bg-violet-500/20 shadow-[0_0_28px_rgba(168,85,247,0.18)]' : 'border-white/10 bg-white/[0.04]'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span className={`relative transition-opacity duration-300 ${collapsed ? 'lg:hidden' : 'hidden lg:block'}`}>{label}</span>
          {typeof count === 'number' && count > 0 ? (
            <span className="ml-auto inline-flex items-center rounded-full bg-rose-500/20 px-2 py-0.5 text-xs font-medium text-rose-300">{count}</span>
          ) : null}
        </Link>
      ) : (
        <button
          type="button"
          aria-current={active ? 'page' : undefined}
          className="group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-white/72 transition-colors hover:text-white"
        >
          {active && (
              <span
              className="absolute inset-0 rounded-2xl border border-violet-400/20 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(124,58,237,0.15)]"
            />
          )}
          <span
            className={`relative grid h-9 w-9 place-items-center rounded-xl border text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 ${
              active ? 'border-violet-300/30 bg-violet-500/20 shadow-[0_0_28px_rgba(168,85,247,0.18)]' : 'border-white/10 bg-white/[0.04]'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span className={`relative transition-opacity duration-300 ${collapsed ? 'lg:hidden' : 'hidden lg:block'}`}>{label}</span>
        </button>
      )}
    </li>
  );
}