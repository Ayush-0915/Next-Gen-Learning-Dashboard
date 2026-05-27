'use client';

import { GraduationCap, LayoutGrid, Settings, Users } from 'lucide-react';
import Button from '@/components/ui/button';

const mobileNavItems = [
  { label: 'Dashboard', icon: LayoutGrid, href: '/', active: true },
  { label: 'Courses', icon: GraduationCap, href: '/courses' },
  { label: 'Community', icon: Users, href: '/community' },
  { label: 'Settings', icon: Settings, href: '/settings' }
];

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#09090b]/90 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-4 gap-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <a href={item.href} aria-current={item.active ? 'page' : undefined}>
                <Button variant={item.active ? 'pill' : 'ghost'} className="flex w-full flex-col items-center gap-1 text-[11px]">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}