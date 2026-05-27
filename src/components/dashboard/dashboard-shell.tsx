'use client';

import { useState } from 'react';
import type { DashboardData } from '@/types/dashboard';
// Sidebar and MobileNav are provided globally by AppShell
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { BentoGrid } from '@/components/dashboard/bento-grid';
import { usePathname } from 'next/navigation';

interface DashboardShellProps {
  data: DashboardData;
}

export function DashboardShell({ data }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <section>
      <main className="relative flex-1 px-4 pb-28 pt-4 sm:px-6 lg:px-8">
        <section
          key={pathname}
          className="mx-auto flex w-full max-w-[1400px] flex-col gap-6"
        >
          <DashboardHeader userName={data.userName} />
          <BentoGrid data={data} />
        </section>
      </main>

    </section>
  );
}