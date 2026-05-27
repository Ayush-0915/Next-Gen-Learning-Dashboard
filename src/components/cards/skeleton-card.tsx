'use client';

import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  variant: 'hero' | 'course' | 'activity';
  className?: string;
}

export function SkeletonCard({ variant, className }: SkeletonCardProps) {
  return (
    <article
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-glow backdrop-blur-xl',
        className
      )}
    >
      <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.06)_35%,transparent_70%)] bg-[length:200%_100%] motion-safe:animate-[shimmer_2.5s_linear_infinite]" />
      {variant === 'hero' && (
        <section className="relative flex h-full min-h-[280px] flex-col justify-between p-6 sm:p-8">
          <section className="space-y-4">
            <span className="block h-5 w-40 rounded-full bg-white/10" />
            <span className="block h-10 w-64 rounded-full bg-white/14" />
            <span className="block h-4 w-80 max-w-full rounded-full bg-white/8" />
          </section>
          <section className="flex items-end justify-between gap-4">
            <span className="h-16 w-44 rounded-3xl bg-white/10" />
            <span className="flex gap-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <span key={index} className="h-9 w-9 rounded-full bg-white/10" />
              ))}
            </span>
          </section>
        </section>
      )}
      {variant === 'activity' && (
        <section className="flex h-full min-h-[280px] flex-col gap-5 p-6 sm:p-7">
          <span className="h-5 w-40 rounded-full bg-white/10" />
          <span className="h-3 w-28 rounded-full bg-white/8" />
          <section className="grid grid-cols-7 gap-2">
            {Array.from({ length: 49 }).map((_, index) => (
              <span key={index} className="aspect-square rounded-[4px] bg-white/8" />
            ))}
          </section>
        </section>
      )}
      {variant === 'course' && (
        <section className="flex h-full min-h-[220px] flex-col justify-between p-5 sm:p-6">
          <section className="flex items-start justify-between gap-4">
            <span className="h-14 w-14 rounded-2xl bg-white/10" />
            <span className="h-9 w-9 rounded-full bg-white/8" />
          </section>
          <section className="space-y-3">
            <span className="block h-6 w-40 rounded-full bg-white/10" />
            <span className="block h-4 w-28 rounded-full bg-white/8" />
            <span className="block h-2 w-full rounded-full bg-white/8" />
          </section>
        </section>
      )}
    </article>
  );
}