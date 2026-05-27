"use client";

import dynamic from 'next/dynamic';
import { getDashboardIcon } from '@/components/dashboard/icon-map';
import { ActivityCard } from '@/components/charts/activity-card';
import Button from '@/components/ui/button';
import { CourseCard } from '@/components/cards/course-card';
import type { DashboardData } from '@/types/dashboard';
import { HeroCard } from '@/components/dashboard/hero-card';
import { useRouter, useSearchParams } from 'next/navigation';
const FilterDropdown = dynamic(() => import('@/components/ui/filter-dropdown'), { ssr: false });

interface BentoGridProps {
  data: DashboardData;
}

const courseAccents = [
  'bg-gradient-to-br from-violet-500/30 via-fuchsia-500/15 to-transparent',
  'bg-gradient-to-br from-cyan-500/30 via-blue-500/15 to-transparent',
  'bg-gradient-to-br from-emerald-500/30 via-lime-500/15 to-transparent',
  'bg-gradient-to-br from-pink-500/30 via-rose-500/15 to-transparent'
];

export function BentoGrid({ data }: BentoGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function sortRecent() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('sort', 'recent');
    router.push(`/courses?${params.toString()}`);
  }
  return (
    <section className="grid gap-4 md:grid-cols-12">
      <HeroCard userName={data.userName} streak={data.streak} />
      <ActivityCard activity={data.activity} />

      <section className="lg:col-span-12">
        <header className="mb-6">
          <section className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/70">Courses</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/35">Dynamic from Supabase</p>
            </div>
            <div className="hidden gap-3 sm:flex md:flex">
              {/* Filter dropdown client component */}
              <div className="inline-block"><FilterDropdown /></div>
              <div><Button onClick={sortRecent} variant="ghost" className="px-2 py-1 text-xs sm:text-sm">Recently Updated ▾</Button></div>
            </div>
          </section>

          <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <article className="rounded-2xl border border-white/8 panel-gradient panel-glass p-4">
              <p className="text-xs text-white/40">Total Courses</p>
              <div className="mt-2 flex items-baseline justify-between">
                <h4 className="text-2xl font-semibold">{data.courses.length}</h4>
                <p className="text-sm text-green-400">+2 this month</p>
              </div>
            </article>

            <article className="rounded-2xl border border-white/8 panel-gradient panel-glass p-4">
              <p className="text-xs text-white/40">In Progress</p>
              <div className="mt-2 flex items-baseline justify-between">
                <h4 className="text-2xl font-semibold">{data.courses.filter((c) => c.progress > 0 && c.progress < 100).length}</h4>
                <p className="text-sm text-green-400">Keep it up! 🔥</p>
              </div>
            </article>

            <article className="rounded-2xl border border-white/8 panel-gradient panel-glass p-4">
              <p className="text-xs text-white/40">Completed</p>
              <div className="mt-2 flex items-baseline justify-between">
                <h4 className="text-2xl font-semibold">{data.courses.filter((c) => c.progress >= 100).length}</h4>
                <p className="text-sm text-green-400">Great job! 🎉</p>
              </div>
            </article>

            <article className="rounded-2xl border border-white/8 panel-gradient panel-glass p-4">
              <p className="text-xs text-white/40">Total Learning Time</p>
              <div className="mt-2 flex items-baseline justify-between">
                <h4 className="text-2xl font-semibold">42.6 hrs</h4>
                <p className="text-sm text-green-400">+8.4 hrs this week</p>
              </div>
            </article>
          </section>
        </header>

        {/* Mobile toolbar: compact controls shown on xs */}
        <div className="flex items-center justify-end gap-2 md:hidden mb-3">
          <div><FilterDropdown /></div>
          <div><Button onClick={sortRecent} variant="small">Recently Updated ▾</Button></div>
        </div>

        <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.courses.map((course, index) => {
            // derive lesson counts for display purposes (visual only)
            const totals = [16, 30, 25, 30];
            const totalLessons = totals[index] ?? 20;
            const completedLessons = Math.max(0, Math.round((course.progress / 100) * totalLessons));

            return (
              <CourseCard
                key={course.id}
                title={course.title}
                progress={course.progress}
                iconName={course.iconName}
                accentClassName={courseAccents[index % courseAccents.length]}
                index={index}
                lessonsCompleted={completedLessons}
                lessonsTotal={totalLessons}
                href={`/courses/${course.id}`}
              />
            );
          })}
        </section>
      </section>
    </section>
  );
}