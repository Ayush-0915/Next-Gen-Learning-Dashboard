import { CalendarRange, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '@/components/ui/button';

const SearchModal = dynamic(() => import('@/components/ui/search-modal'), { ssr: false });

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/5 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-white/40">Student Learning Dashboard</p>
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Good to see you, {userName}</h1>
        <p className="max-w-2xl text-sm leading-6 text-white/60">
          Premium progress tracking, course momentum, and learning activity in one calm, high-signal workspace.
        </p>
      </section>

      <section className="flex items-center gap-3">
        <SearchModal />
        <Button href="/pricing" variant="primary" className="inline-flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Upgrade
        </Button>
        <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65 md:inline-flex">
          <CalendarRange className="h-4 w-4" />
          Last 6 months
        </span>
      </section>
    </header>
  );
}