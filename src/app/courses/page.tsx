import { BookOpen, ChevronDown, Clock3, Flame, Search, Sparkles, Trophy } from 'lucide-react';
import { getDashboardData } from '@/lib/dashboard-data';
import Button from '@/components/ui/button';
import { CardShell } from '@/components/ui/card-shell';
import { CoursesBrowserClient } from '@/components/courses/courses-browser-client';

const accentClasses = [
  'from-violet-500/35 via-fuchsia-500/10 to-cyan-400/10',
  'from-emerald-500/30 via-lime-400/10 to-cyan-400/10',
  'from-amber-500/30 via-orange-500/10 to-rose-400/10',
  'from-indigo-500/35 via-violet-500/10 to-fuchsia-400/10'
];

function StatCard({ icon: Icon, label, value, hint, tone }: { icon: typeof BookOpen; label: string; value: string; hint: string; tone: string }) {
  return (
    <CardShell className="p-4 sm:p-5">
      <section className="flex items-center gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tone} text-white shadow-[0_0_24px_rgba(168,85,247,0.12)]`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-white/55">{label}</p>
          <p className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">{value}</p>
          <p className="mt-1 text-sm text-emerald-300">{hint}</p>
        </div>
      </section>
    </CardShell>
  );
}

export default async function CoursesPage({ searchParams }: { searchParams?: Promise<{ q?: string; sort?: string }> }) {
  const data = await getDashboardData();

  let courses = data.courses.slice();

  const sp = (await searchParams) ?? {};
  const q = (sp.q as string | undefined)?.toLowerCase?.() ?? '';
  const sort = sp.sort as string | undefined;

  if (q) {
    courses = courses.filter((course) => (course.title + ' ' + (course.description ?? '')).toLowerCase().includes(q));
  }

  if (sort === 'recent') {
    courses.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
  } else if (sort === 'progress') {
    courses.sort((a, b) => b.progress - a.progress);
  } else if (sort === 'alpha') {
    courses.sort((a, b) => a.title.localeCompare(b.title));
  }

  const totalCourses = courses.length;
  const inProgress = courses.filter((course) => course.progress > 0 && course.progress < 100).length;
  const completed = courses.filter((course) => course.progress >= 100).length;
  const totalLearningTime = '42.6 hrs';
  const recommendedCourse = courses[0];

  return (
    <main className="mx-auto w-full max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
      <section className="mb-5 flex flex-col gap-4 border-b border-white/5 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-violet-300 shadow-[0_0_22px_rgba(124,58,237,0.12)] lg:grid">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-white/35">LearnHub</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-[34px]">Courses</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">Continue learning and grow your skills</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex items-center gap-3">
            <label className="flex h-11 min-w-[220px] items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 text-sm text-white/45 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
              <Search className="h-4 w-4 text-white/35" />
              <span>Search courses...</span>
            </label>
            <button className="relative grid h-11 w-11 place-items-center rounded-full border border-white/8 bg-white/[0.03] text-white/75">
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-fuchsia-500 text-[10px] font-semibold text-white">3</span>
              <span className="text-lg">🔔</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button href="/" variant="outline" className="inline-flex items-center gap-2">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-5 grid gap-4 xl:grid-cols-4">
        <StatCard icon={BookOpen} label="Total Courses" value={String(totalCourses)} hint="+2 this month" tone="bg-violet-500/15 text-violet-200" />
        <StatCard icon={Flame} label="In Progress" value={String(inProgress)} hint="Keep it up! 🔥" tone="bg-emerald-500/15 text-emerald-200" />
        <StatCard icon={Trophy} label="Completed" value={String(completed)} hint="Great job! 🎉" tone="bg-amber-500/15 text-amber-200" />
        <StatCard icon={Clock3} label="Total Learning Time" value={totalLearningTime} hint="+8.4 hrs this week" tone="bg-indigo-500/15 text-indigo-200" />
      </section>

      <CoursesBrowserClient courses={courses} accentClassNames={accentClasses} />

      {recommendedCourse ? (
        <CardShell className="mt-5 overflow-hidden p-0">
          <div className="flex flex-col gap-4 border-l-4 border-violet-500 bg-[linear-gradient(135deg,rgba(88,28,135,0.22),rgba(17,24,39,0.2))] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-sm text-violet-200">Recommended for you</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Next up: {recommendedCourse.title}</h2>
              <p className="mt-1 text-sm text-white/60">You&apos;re making great progress. Let&apos;s continue where you left off.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-semibold text-white">{recommendedCourse.progress}% <span className="text-sm font-normal text-white/65">Complete</span></div>
                <div className="text-sm text-white/55">{recommendedCourse.lessonsCompleted ?? 0} / {recommendedCourse.lessonsTotal ?? 0} Lessons</div>
              </div>
              <Button href={`/courses/${recommendedCourse.id}`} variant="primary" className="inline-flex items-center gap-2 px-5 py-3">
                Continue Learning
                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
              </Button>
            </div>
          </div>
        </CardShell>
      ) : null}
    </main>
  );
}
