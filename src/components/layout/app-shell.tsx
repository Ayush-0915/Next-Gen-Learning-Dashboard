"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { MobileNav } from '@/components/sidebar/mobile-nav';
import MobileMenu from '@/components/sidebar/mobile-menu';
import { Menu } from 'lucide-react';
import Button from '@/components/ui/button';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-collapse behavior:
  // - Desktop (>=1024px): expanded
  // - Tablet (768px - 1023px): collapsed (icons only)
  // - Mobile (<768px): sidebar hidden (mobile nav shown)
  useEffect(() => {
    function update() {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w >= 1024) setCollapsed(false);
      else if (w >= 768) setCollapsed(true);
      else setCollapsed(false);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_28%),#09090b] text-white">
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} />

      <main className="relative flex-1 px-4 pb-28 pt-4 sm:px-6 lg:px-8">
        {/* Mobile hamburger (keeps MobileNav bottom bar) */}
        <div className="md:hidden fixed left-4 top-4 z-50">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" className="h-10 w-10 p-0 grid place-items-center">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {children}
      </main>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <MobileNav />
    </section>
  );
}
