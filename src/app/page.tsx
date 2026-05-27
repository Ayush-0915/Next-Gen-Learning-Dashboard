import { Suspense } from 'react';
import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { SkeletonCard } from '@/components/cards/skeleton-card';

export const dynamic = 'force-dynamic';

function DashboardFallback() {
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#09090b] px-4 py-4 text-white sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-white/5 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <section className="space-y-3">
            <span className="block h-3 w-44 rounded-full bg-white/10" />
            <span className="block h-8 w-96 max-w-full rounded-full bg-white/10" />
            <span className="block h-4 w-[42rem] max-w-full rounded-full bg-white/8" />
          </section>
          <section className="flex gap-3">
            <span className="h-10 w-28 rounded-full bg-white/8" />
            <span className="h-10 w-28 rounded-full bg-white/8" />
            <span className="h-10 w-36 rounded-full bg-white/8" />
          </section>
        </header>

        <section className="grid gap-4 lg:grid-cols-12">
          <SkeletonCard variant="hero" className="lg:col-span-8 min-h-[280px]" />
          <SkeletonCard variant="activity" className="lg:col-span-4 min-h-[280px]" />
          <section className="lg:col-span-12">
            <span className="mb-4 block h-5 w-32 rounded-full bg-white/8" />
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} variant="course" className="min-h-[220px]" />
              ))}
            </section>
          </section>
        </section>
      </main>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  );
}