import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/layout/app-shell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Student Learning Dashboard',
  description: 'A futuristic premium student learning dashboard built with Next.js 15 and Supabase.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#09090b] font-sans text-white antialiased`}>
        <span aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.07),_transparent_26%)]" />
        <span aria-hidden="true" className="pointer-events-none fixed inset-0 opacity-[0.14] mix-blend-overlay [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:90px_90px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}