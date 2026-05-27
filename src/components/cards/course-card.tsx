'use client';

import Link from 'next/link';
import { getDashboardIcon } from '@/components/dashboard/icon-map';
import { Bookmark, Ellipsis } from 'lucide-react';
import { CardShell } from '@/components/ui/card-shell';
import Button from '@/components/ui/button';
import { ProgressBar } from '@/components/dashboard/progress-bar';
import CourseLessonsClient from '@/components/courses/course-lessons-client';

interface CourseCardProps {
  title: string;
  progress: number;
  iconName: string;
  description?: string | null;
  accentClassName: string;
  index: number;
  lessonsCompleted?: number;
  lessonsTotal?: number;
  href?: `/courses/${string}`;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
}

export function CourseCard({ title, progress, iconName, description, accentClassName, index, lessonsCompleted, lessonsTotal, href, isWishlisted = false, onToggleWishlist }: CourseCardProps) {
  const Icon = getDashboardIcon(iconName);

  return (
    <CardShell className="min-h-[220px]">
      <article
        className="group relative flex h-full min-h-[180px] flex-col justify-between px-4 py-4 sm:p-6"
      >
        <span aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentClassName}`} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-px rounded-[27px] border border-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <header className="flex items-start justify-between gap-4">
            <span className={`grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white shadow-insetGlow ${accentClassName}`}>
            <Icon className="h-7 w-7" />
          </span>
          <div className="relative z-20 flex items-center gap-2">
            {onToggleWishlist ? (
              <Button
                type="button"
                aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
                aria-pressed={isWishlisted}
                onClick={onToggleWishlist}
                variant={isWishlisted ? 'primary' : 'outline'}
                className="grid h-9 w-9 place-items-center px-0"
              >
                <Bookmark className="h-4 w-4" fill={isWishlisted ? 'currentColor' : 'none'} />
              </Button>
            ) : null}
            <Button aria-label={`${title} actions`} className="grid h-9 w-9 place-items-center" variant="outline">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <section className="mt-4 flex flex-col justify-between gap-3">
          <div>
            <h3 className="max-w-[16ch] text-lg sm:text-xl font-semibold tracking-tight text-white">{title}</h3>
            <p className="mt-1 text-xs sm:text-sm text-white/50">
              <span className="text-white/90">{progress}%</span> complete
            </p>
            {description ? (
              <p className="mt-2 text-xs text-white/60 line-clamp-2">{description}</p>
            ) : null}
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <ProgressBar progress={progress} colorClassName={accentClassName} />
              <p className="mt-2 text-xs sm:text-sm text-white/45">{lessonsCompleted ?? 0} / {lessonsTotal ?? 0} Lessons</p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2 pt-0.5">
              <div className="flex -space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={`${index}-${i}`} className={`inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 border-white/8 bg-white/[0.04] text-[10px] sm:text-[11px] leading-6 sm:leading-7 text-white/80`} style={{ transform: `translateZ(0)` }}>
                    {['AS','MB','JP'][(index + i) % 3]}
                  </span>
                ))}
                <span className="ml-2 rounded-full bg-white/[0.03] px-2 py-0.5 text-xs text-white/60">+3</span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] sm:text-[12px] font-medium text-amber-300">
                In Progress
              </span>
            </div>
          </div>
        </section>
        <CourseLessonsClient courseId={href ? href.replace('/courses/', '') : ''} />
      </article>
      {href ? <Link href={href} className="absolute inset-0 z-10" aria-label={`Open ${title}`} /> : null}
    </CardShell>
  );
}