import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardShellProps {
  children: ReactNode;
  className?: string;
}

export function CardShell({ children, className }: CardShellProps) {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] text-white shadow-glow backdrop-blur-xl',
        className
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.16),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_30%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-px rounded-[27px] border border-white/5" />
      <section className="relative">{children}</section>
    </article>
  );
}