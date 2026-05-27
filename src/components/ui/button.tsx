"use client";

import Link from 'next/link';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'primary' | 'outline' | 'pill' | 'small';
  href?: string;
};

const variantClass: Record<string, string> = {
  ghost: 'rounded-full border border-white/8 bg-white/[0.03] text-white/70 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30',
  primary: 'rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
  outline: 'rounded-full border border-white/8 bg-transparent text-white/80 hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30',
  pill: 'rounded-full border border-white/6 bg-white/[0.02] text-white/80 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30',
  small: 'rounded-full border border-white/8 bg-white/[0.02] text-xs text-white/70 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30'
};

export function Button({ variant = 'ghost', href, className = '', children, ...rest }: ButtonProps) {
  const classes = `${variantClass[variant]} px-3 py-1 sm:px-4 sm:py-2 ${className}`;

  if (href) {
    return (
      <Link href={href} prefetch={false} className={classes} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
