"use client";

import { Fragment, useEffect, useRef } from 'react';
import { X, Menu, LayoutGrid, GraduationCap, Users, Settings } from 'lucide-react';

const items = [
  { label: 'Dashboard', icon: LayoutGrid, href: '/' },
  { label: 'Courses', icon: GraduationCap, href: '/courses' },
  { label: 'Community', icon: Users, href: '/community' },
  { label: 'Settings', icon: Settings, href: '/settings' }
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />

      <nav
        aria-label="Mobile menu"
        className="relative z-50 w-full max-w-xs animate-slide-up overflow-auto rounded-t-2xl bg-[#0b0b0c] p-4 shadow-2xl md:hidden"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Menu</h3>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close menu"
            className="h-9 w-9 p-0 grid place-items-center rounded-full border border-white/8 bg-white/[0.03] text-white/70 hover:bg-white/[0.04]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a href={item.href} onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/[0.02]">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-white/[0.03]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
