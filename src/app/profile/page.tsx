import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Flame,
  GraduationCap,
  LayoutGrid,
  Mail,
  Medal,
  Settings,
  ShieldCheck,
  Target,
  Trophy,
  Users
} from 'lucide-react';
import Button from '@/components/ui/button';
import { CardShell } from '@/components/ui/card-shell';
import styles from './profile.module.css';

const stats = [
  { label: 'Courses Enrolled', value: '8', icon: BookOpen, tone: 'violet' },
  { label: 'Courses Completed', value: '5', icon: BadgeCheck, tone: 'emerald' },
  { label: 'Certificates Earned', value: '3', icon: Trophy, tone: 'cyan' },
  { label: 'Day Streak', value: '7', icon: Flame, tone: 'amber' },
  { label: 'Total Points', value: '2,680', icon: Target, tone: 'fuchsia' }
];

const learningProgress = [
  { label: 'Advanced React Patterns', value: 80, accent: 'violet' },
  { label: 'Node.js Mastery', value: 65, accent: 'emerald' },
  { label: 'SQL for Developers', value: 40, accent: 'blue' },
  { label: 'System Design Basics', value: 60, accent: 'amber' }
];

const achievements = [
  { title: 'Course Explorer', subtitle: 'Enrolled in 5 courses', xp: '+100 XP', time: '2 days ago', icon: GraduationCap, tone: 'violet' },
  { title: '7 Day Streak', subtitle: 'Maintained a 7 day learning streak', xp: '+150 XP', time: '5 days ago', icon: Flame, tone: 'amber' },
  { title: 'Assessment Ace', subtitle: 'Scored 90% or above in 5 quizzes', xp: '+120 XP', time: '1 week ago', icon: ShieldCheck, tone: 'emerald' },
  { title: 'Quick Learner', subtitle: 'Completed 3 courses', xp: '+200 XP', time: '2 weeks ago', icon: Medal, tone: 'blue' }
];

const activityMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const activityRows = ['Mon', 'Wed', 'Fri'];
const activityCells = Array.from({ length: 35 }, (_, index) => {
  const strength = [0, 1, 2, 3, 4][(index * 7) % 5];
  return strength;
});

const goals = [
  { title: 'Complete 10 Courses', value: '8 / 10', progress: 80, tone: 'violet' },
  { title: 'Earn 5 Certificates', value: '3 / 5', progress: 60, tone: 'emerald' },
  { title: 'Maintain 14 Day Streak', value: '7 / 14', progress: 50, tone: 'amber' }
];

const activityLegend = [0, 1, 2, 3, 4];

function ringOffset(progress: number) {
  return 339.292 - (339.292 * progress) / 100;
}

export default function ProfilePage() {
  return (
    <main className={`${styles.page} mx-auto w-full max-w-[1180px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Profile</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">My Profile</h1>
          <p className="mt-1 text-sm text-white/60">Manage your profile and track your learning journey</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button href="/settings" variant="ghost" className="inline-flex items-center gap-2 rounded-full">
            <Settings className="h-4 w-4" />
            Edit Profile
          </Button>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/8 bg-white/[0.03] text-white/70">
            <Users className="h-4 w-4" />
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/8 bg-white/[0.03] text-white/70">
            <LayoutGrid className="h-4 w-4" />
          </span>
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <CardShell className={`${styles.heroCard} overflow-hidden p-5 lg:p-6`}>
          <div className={styles.heroGrid}>
            <div className={styles.profileBlock}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>AS</div>
                <span className={styles.avatarBadge}>
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">Ayush Singh</h2>
                  <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/20 bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-200">
                    <Medal className="h-3.5 w-3.5" />
                    Pro Member
                  </span>
                </div>
                <p className="text-sm text-white/60">Frontend Developer & Lifelong Learner</p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-white/45" />
                    Mumbai, India
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-white/45" />
                    ayushofficialuse@gmail.com
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-white/45" />
                    Joined January 2024
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.levelBlock}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={styles.levelBadge}>12</div>
                  <div>
                    <p className="text-sm font-medium text-white">Level 12</p>
                    <p className="text-xs text-white/45">680 / 1000 XP</p>
                  </div>
                </div>
                <div className="text-sm text-white/55">Goal progress</div>
              </div>

              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '68%' }} />
              </div>

              <blockquote className="space-y-2 text-sm leading-6 text-white/65">
                <p className="text-white/80">
                  “The beautiful thing about learning is that no one can take it away from you.”
                </p>
                <footer className="text-xs uppercase tracking-[0.24em] text-white/35">- B.B. King</footer>
              </blockquote>
            </div>
          </div>
        </CardShell>

        <CardShell className={`${styles.sidebarCard} flex flex-col justify-between p-5 lg:p-6`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Upgrade to Premium</p>
                <p className="mt-2 text-sm leading-6 text-white/65">Unlock unlimited courses, exclusive content and premium support.</p>
              </div>
              <div className={styles.sidebarIcon}>
                <Trophy className="h-4 w-4" />
              </div>
            </div>

            <Button href="/pricing" variant="primary" className="inline-flex w-fit items-center gap-2 self-start">
              Upgrade Now <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-semibold text-black">
                AS
              </div>
              <div>
                <p className="text-sm font-medium text-white">Ayush Singh</p>
                <p className="text-xs text-white/50">View profile</p>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-white/40" />
            </div>
          </div>
        </CardShell>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <CardShell key={item.label} className={`${styles.statCard} p-4`}>
              <div className="flex items-center gap-3">
                <div className={`${styles[`tone${item.tone[0].toUpperCase()}${item.tone.slice(1)}`] ?? styles.toneViolet} ${styles.statIcon}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white/55">{item.label}</p>
                  <p className="text-2xl font-semibold tracking-tight text-white">{item.value}</p>
                </div>
              </div>
            </CardShell>
          );
        })}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <CardShell className={`${styles.panelCard} p-5`}>
          <div className={styles.progressCardHeader}>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white">Learning Progress</h3>
              <p className="text-sm text-white/55">Track course momentum and completion.</p>
            </div>
            <div className={styles.ringWrap}>
              <svg viewBox="0 0 120 120" className={styles.ringSvg}>
                <circle cx="60" cy="60" r="54" className={styles.ringTrack} />
                <circle cx="60" cy="60" r="54" className={styles.ringFill} style={{ strokeDashoffset: ringOffset(62) }} />
              </svg>
              <div className={styles.ringLabel}>
                <strong>62%</strong>
                <span>Overall Progress</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {learningProgress.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm text-white/75">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles[`bar${item.accent[0].toUpperCase()}${item.accent.slice(1)}`] ?? styles.barViolet}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <Button href="/courses" variant="ghost" className="mt-5 inline-flex w-fit items-center justify-center px-4 py-2">
            View All Courses <ChevronRight className="h-4 w-4" />
          </Button>
        </CardShell>

        <CardShell className={`${styles.panelCard} p-5`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Achievements</h3>
              <p className="text-sm text-white/55">Milestones earned across your learning path.</p>
            </div>
            <Button href="/achievements" variant="ghost" className="rounded-full px-4 py-2 text-xs">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={styles.achievementRow}>
                  <div className={`${styles.achievementIcon} ${styles[`achievement${item.tone[0].toUpperCase()}${item.tone.slice(1)}`] ?? styles.achievementViolet}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="mt-0.5 text-sm text-white/50">{item.subtitle}</p>
                      </div>
                      <p className="text-sm font-medium text-violet-300">{item.xp}</p>
                    </div>
                    <p className="mt-2 text-xs text-white/35">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardShell>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <CardShell className={`${styles.panelCard} p-5`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Activity Overview</h3>
              <p className="text-sm text-white/55">Your study rhythm for the last five months.</p>
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">23 days active this month</p>
          </div>

          <div className="space-y-4">
            <div className={styles.activityMonths}>
              {activityMonths.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            <div className={styles.activityGrid}>
              {activityRows.map((row) => (
                <div key={row} className={styles.activityRowLabel}>
                  {row}
                </div>
              ))}
              {activityCells.map((level, index) => (
                <span key={`${index}-${level}`} className={`${styles.activityCell} ${styles[`heat${level}`] ?? styles.heat0}`} />
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 text-xs text-white/45">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                {activityLegend.map((level) => (
                  <span key={level} className={`${styles.heatSwatch} ${styles[`heat${level}`] ?? styles.heat0}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </CardShell>

        <CardShell className={`${styles.panelCard} p-5`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Current Goals</h3>
              <p className="text-sm text-white/55">Keep momentum moving toward the next level.</p>
            </div>
            <Button href="/achievements" variant="ghost" className="rounded-full px-4 py-2 text-xs">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.title} className={styles.goalRow}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3 text-sm text-white/75">
                    <span>{goal.title}</span>
                    <span>{goal.value}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/[0.05]">
                    <div className={`${styles.goalFill} ${styles[`goal${goal.tone[0].toUpperCase()}${goal.tone.slice(1)}`] ?? styles.goalViolet}`} style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardShell>
      </section>
    </main>
  );
}
