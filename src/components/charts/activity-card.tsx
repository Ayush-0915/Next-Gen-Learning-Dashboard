'use client';

import { CardShell } from '@/components/ui/card-shell';
import type { ActivityCell } from '@/types/dashboard';

interface ActivityCardProps {
  activity: ActivityCell[];
}

const levelStyles: Record<number, string> = {
  0: 'bg-white/5',
  1: 'bg-cyan-500/30',
  2: 'bg-cyan-400/45',
  3: 'bg-violet-400/55',
  4: 'bg-fuchsia-400/70'
};

const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <CardShell className="md:col-span-4 min-h-[280px]">
      <section
        className="flex h-full min-h-[280px] flex-col gap-5 p-6 sm:p-7"
      >
        <header className="flex items-center justify-between gap-4">
          <section>
            <p className="text-sm font-medium text-white/80">Activity Overview</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/35">Last 6 months</p>
          </section>
          <p className="text-xs text-white/45">Mon - Sun</p>
        </header>

        <section className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/30">
          {months.map((month) => (
            <span key={month} className="w-8 text-center">
              {month}
            </span>
          ))}
        </section>

        <section className="grid grid-flow-col grid-rows-7 gap-1">
          {activity.map((cell, index) => {
            const intensity = levelStyles[cell.value];
            return (
              <span
                key={cell.id}
                title={cell.label}
                aria-label={cell.label}
                className={`aspect-square w-3 rounded-[4px] border border-white/5 ${intensity}`}
              />
            );
          })}
        </section>

        <footer className="mt-auto flex items-center justify-between gap-4 text-[11px] text-white/45">
          <span>Less</span>
          <section className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((value) => (
              <span key={value} className={`h-3 w-3 rounded-[4px] ${levelStyles[value]}`} />
            ))}
          </section>
          <span>More</span>
        </footer>
      </section>
    </CardShell>
  );
}