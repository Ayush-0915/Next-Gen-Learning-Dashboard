import Link from 'next/link';
import { Award, BadgeCheck, ChevronRight, Flame, Lock, Rocket, Sparkles, Target, Trophy, BookOpen, ShieldCheck } from 'lucide-react';
import { getDashboardData } from '@/lib/dashboard-data';
import { CardShell } from '@/components/ui/card-shell';

type AchievementTier = 'Learning' | 'Courses' | 'Quizzes' | 'Streaks' | 'Special';

const tierLabels: AchievementTier[] = ['Learning', 'Courses', 'Quizzes', 'Streaks', 'Special'];

function Ring({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative grid h-40 w-40 place-items-center">
      <svg viewBox="0 0 140 140" className="absolute inset-0 h-full w-full -rotate-90">
        <defs>
          <linearGradient id="achievement-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#achievement-ring)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="relative text-center">
        <div className="text-4xl font-semibold tracking-tight text-white">{clamped}%</div>
        <div className="mt-1 text-sm text-white/55">Completed</div>
      </div>
    </div>
  );
}

export default async function AchievementsPage() {
  const data = await getDashboardData();

  const totalCourses = Math.max(1, data.courses.length);
  const completedCourses = data.courses.filter((course) => course.progress >= 100).length;
  const completionRate = Math.round((completedCourses / totalCourses) * 100);
  const completedLessons = data.courses.reduce((sum, course) => sum + (course.lessonsCompleted ?? 0), 0);
  const totalPoints = completedCourses * 100 + completedLessons * 20 + data.streak * 30;
  const level = Math.max(1, Math.floor(totalPoints / 55) + 1);
  const levelProgress = totalPoints % 1000;
  const achievementsCount = data.achievementsCount ?? completedCourses * 2 + Math.max(1, Math.floor(data.streak / 2));

  const recentAchievements = [
    {
      title: 'Course Explorer',
      detail: `Enrolled in ${totalCourses} courses`,
      xp: '+100 XP',
      time: '2 hours ago',
      icon: Rocket,
      tone: 'violet'
    },
    {
      title: '7 Day Streak',
      detail: 'Maintained a 7 day learning streak',
      xp: '+150 XP',
      time: '1 day ago',
      icon: Flame,
      tone: 'amber'
    },
    {
      title: 'Quick Learner',
      detail: `Completed ${Math.max(1, completedCourses || 3)} courses`,
      xp: '+200 XP',
      time: '2 days ago',
      icon: BookOpen,
      tone: 'blue'
    },
    {
      title: 'Assessment Ace',
      detail: 'Scored 90% or above in 5 quizzes',
      xp: '+120 XP',
      time: '3 days ago',
      icon: Target,
      tone: 'green'
    }
  ];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Enroll in your first course',
      category: 'Learning',
      progress: 100,
      xp: '+50 XP',
      status: 'Completed',
      icon: Sparkles,
      tone: 'green'
    },
    {
      title: 'Course Explorer',
      description: 'Enroll in 5 courses',
      category: 'Courses',
      progress: Math.min(100, Math.round((totalCourses / 5) * 100)),
      xp: '+100 XP',
      status: 'Completed',
      icon: Rocket,
      tone: 'violet'
    },
    {
      title: 'Dedicated Learner',
      description: 'Spend 10 hours learning',
      category: 'Learning',
      progress: Math.min(100, Math.round((completedLessons / 10) * 100)),
      xp: '+150 XP',
      status: `${Math.min(10, Math.max(0, Math.floor(completedLessons / 2)))} / 10`,
      icon: Award,
      tone: 'blue'
    },
    {
      title: 'Knowledge Seeker',
      description: 'Complete 5 courses',
      category: 'Courses',
      progress: Math.min(100, Math.round((completedCourses / 5) * 100)),
      xp: '+150 XP',
      status: `${completedCourses} / 5`,
      icon: BadgeCheck,
      tone: 'amber'
    },
    {
      title: 'Perfect Score',
      description: 'Score 100% in any quiz',
      category: 'Quizzes',
      progress: 0,
      xp: '+250 XP',
      status: 'Locked',
      icon: Lock,
      tone: 'slate'
    },
    {
      title: '30 Day Streak',
      description: 'Maintain a 30 day learning streak',
      category: 'Streaks',
      progress: Math.min(100, Math.round((data.streak / 30) * 100)),
      xp: '+300 XP',
      status: 'Locked',
      icon: Flame,
      tone: 'gray'
    }
  ];

  const metrics = [
    {
      icon: Trophy,
      iconClass: 'text-violet-300',
      ringClass: 'from-violet-500/20 to-violet-500/5',
      label: 'Total Achievements',
      value: achievementsCount.toString(),
      sublabel: 'Keep it up!'
    },
    {
      icon: Award,
      iconClass: 'text-amber-300',
      ringClass: 'from-amber-400/20 to-amber-400/5',
      label: 'Completed',
      value: completedCourses.toString(),
      sublabel: `${completionRate}% completed`
    },
    {
      icon: Target,
      iconClass: 'text-blue-300',
      ringClass: 'from-blue-500/20 to-blue-500/5',
      label: 'Total Points',
      value: totalPoints.toString(),
      sublabel: 'Next milestone: 1000'
    },
    {
      icon: Flame,
      iconClass: 'text-emerald-300',
      ringClass: 'from-emerald-500/20 to-emerald-500/5',
      label: 'Day Streak',
      value: data.streak.toString(),
      sublabel: 'Keep the streak!'
    }
  ];

  const progressBars = [
    {
      label: 'Learning Milestones',
      value: Math.min(15, Math.max(1, Math.round((data.streak + completedCourses) / 2)))
    },
    {
      label: 'Course Completions',
      value: Math.max(1, completedCourses || 3),
      max: Math.max(6, totalCourses)
    },
    {
      label: 'Skill Mastery',
      value: Math.max(1, Math.round(completedLessons / 2) || 4),
      max: 10
    },
    {
      label: 'Consistency',
      value: Math.min(14, Math.max(1, data.streak + 1)),
      max: 14
    }
  ];

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Achievements</h1>
          <p className="mt-1 text-sm text-white/60">Track your progress and celebrate your learning milestones.</p>
        </div>

        <CardShell className="w-full max-w-[320px] self-end md:self-auto">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Keep learning, keep growing!</div>
              <div className="text-xs text-white/55">You&apos;re doing great 🚀</div>
            </div>
          </div>
        </CardShell>
      </div>

      <CardShell className="mb-5 p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4">
                <div className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${metric.ringClass}`}>
                  <Icon className={`h-6 w-6 ${metric.iconClass}`} />
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-white">{metric.value}</div>
                  <div className="text-sm text-white/55">{metric.label}</div>
                  <div className="text-xs text-white/45">{metric.sublabel}</div>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 md:col-span-2 xl:col-span-1">
            <div>
              <div className="text-sm text-white/70">Level {level}</div>
              <div className="text-lg font-medium text-white">Learner</div>
              <div className="mt-3 h-2 w-40 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${Math.max(18, Math.min(100, Math.round((levelProgress / 1000) * 100)))}%` }} />
              </div>
              <div className="mt-2 text-xs text-white/55">{levelProgress} / 1000 XP</div>
            </div>

            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-200">
              <ShieldCheck className="h-7 w-7" />
            </div>
          </div>
        </div>
      </CardShell>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">
        <CardShell className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Achievements</h2>
              <p className="text-sm text-white/55">Your latest wins and milestones.</p>
            </div>
            <Link href="/achievements" className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-white/70 transition hover:bg-white/[0.04]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAchievements.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4">
                  <div className="flex items-center gap-4">
                    <div className={`grid h-14 w-14 place-items-center rounded-2xl border border-white/8 bg-gradient-to-br ${item.tone === 'violet' ? 'from-violet-500/25 to-fuchsia-500/10 text-violet-200' : item.tone === 'amber' ? 'from-amber-400/25 to-orange-500/10 text-amber-200' : item.tone === 'blue' ? 'from-blue-500/25 to-cyan-500/10 text-blue-200' : 'from-emerald-500/25 to-green-500/10 text-emerald-200'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="text-sm text-white/55">{item.detail}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-violet-300">{item.xp}</div>
                    <div className="text-xs text-white/45">{item.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardShell>

        <CardShell className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Achievement Progress</h2>
              <p className="text-sm text-white/55">How close you are to your next milestones.</p>
            </div>
            <Link href="/achievements" className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-white/70 transition hover:bg-white/[0.04]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
            <div className="flex justify-center lg:w-[42%]">
              <Ring value={completionRate || 50} />
            </div>

            <div className="flex-1 space-y-4">
              {progressBars.map((bar, index) => {
                const max = bar.max ?? 15;
                const progress = Math.max(0, Math.min(100, Math.round((bar.value / max) * 100)));
                const colors = ['bg-violet-500', 'bg-blue-500', 'bg-emerald-400', 'bg-amber-400'];
                return (
                  <div key={bar.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-white/80">
                        <span className={`h-2.5 w-2.5 rounded-full ${colors[index % colors.length]}`} />
                        {bar.label}
                      </div>
                      <div className="text-white/55">{bar.value} / {max}</div>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${colors[index % colors.length]}`} style={{ width: `${Math.max(18, progress)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardShell>
      </div>

      <div className="mt-5">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">All Achievements</h2>
            <p className="text-sm text-white/55">Browse every milestone in your learning journey.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tierLabels.map((label, index) => (
              <button
                key={label}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${index === 0 ? 'border-violet-400/30 bg-violet-500/10 text-violet-100' : 'border-white/8 bg-white/[0.02] text-white/55 hover:bg-white/[0.04]'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {achievements.map((item) => {
            const Icon = item.icon;
            const isLocked = item.progress <= 0 || item.status === 'Locked';
            return (
              <CardShell key={item.title} className="p-0">
                <div className="flex h-full min-h-[238px] flex-col p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className={`grid h-14 w-14 place-items-center rounded-2xl border border-white/8 bg-gradient-to-br ${item.tone === 'green' ? 'from-emerald-500/20 to-green-400/10 text-emerald-200' : item.tone === 'violet' ? 'from-violet-500/20 to-fuchsia-500/10 text-violet-200' : item.tone === 'blue' ? 'from-blue-500/20 to-cyan-500/10 text-blue-200' : item.tone === 'amber' ? 'from-amber-500/20 to-orange-500/10 text-amber-200' : 'from-white/10 to-white/5 text-white/50'}`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    {isLocked ? (
                      <div className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/40">
                        <Lock className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                        Completed
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-semibold text-white">{item.title}</div>
                    <div className="text-xs text-white/50">{item.description}</div>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${item.tone === 'green' ? 'bg-emerald-400' : item.tone === 'violet' ? 'bg-violet-500' : item.tone === 'blue' ? 'bg-blue-500' : item.tone === 'amber' ? 'bg-amber-400' : 'bg-white/30'}`} style={{ width: `${Math.max(8, item.progress)}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-white/45">{item.category}</div>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <div>
                      <div className="text-sm font-medium text-white/90">{item.xp}</div>
                      <div className="text-xs text-white/45">{isLocked ? 'Locked' : item.status}</div>
                    </div>
                    <div className={`rounded-full px-2 py-1 text-xs ${isLocked ? 'border border-white/8 text-white/40' : 'border border-emerald-400/20 text-emerald-300'}`}>
                      {isLocked ? 'Locked' : 'Completed'}
                    </div>
                  </div>
                </div>
              </CardShell>
            );
          })}
        </div>
      </div>
    </main>
  );
}
