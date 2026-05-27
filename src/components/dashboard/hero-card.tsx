'use client';

import { ChevronDown, Flame } from 'lucide-react';
import { CardShell } from '@/components/ui/card-shell';

interface HeroCardProps {
  userName: string;
  streak: number;
}

const weekdayProgress = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function HeroCard({ userName, streak }: HeroCardProps) {
  return (
    <CardShell className="md:col-span-8 min-h-[280px]">
      <section
        className="relative flex h-full min-h-[280px] flex-col justify-between p-6 sm:p-8"
      >
        <span aria-hidden="true" className="pointer-events-none absolute -right-10 top-4 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute right-20 top-16 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />

        <section className="relative flex max-w-2xl flex-col gap-4">
          <p className="text-lg font-medium text-white/80">Welcome back,</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">{userName} 👋</h2>
          <p className="max-w-xl text-sm leading-6 text-white/60 hidden xs:block sm:block md:block lg:block">Keep pushing forward. Your learning streak and course momentum are looking sharp.</p>
        </section>

        <section className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <article className="inline-flex w-fit items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.05] px-5 py-4 shadow-insetGlow backdrop-blur-xl">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400/25 to-orange-500/10 text-2xl text-amber-300">
              <Flame className="h-6 w-6" />
            </span>
            <span className="space-y-0.5">
              <strong className="block text-2xl font-semibold text-white">{streak}</strong>
              <span className="block text-sm text-white/55">Day streak</span>
            </span>
          </article>

          <section className="flex items-center gap-2 sm:justify-end">
            {weekdayProgress.map((day, index) => {
              const active = index < 6;
              return (
                <span
                  key={`${day}-${index}`}
                  className={`grid h-9 w-9 place-items-center rounded-full border text-xs font-medium ${
                    active ? 'border-violet-400/30 bg-violet-500/90 text-white shadow-[0_0_24px_rgba(168,85,247,0.35)]' : 'border-white/10 bg-white/[0.04] text-white/30'
                  }`}
                >
                  {day}
                </span>
              );
            })}
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
              aria-label="Open streak details"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </section>
        </section>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[18%] top-[16%] h-24 w-24 rounded-full bg-violet-500/10 blur-3xl"
        />
      </section>
    </CardShell>
  );
}