'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#09090b] px-6 text-white">
      <section className="max-w-xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-glow backdrop-blur-xl">
        <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-rose-400/20 bg-rose-500/10 text-rose-200">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">The dashboard could not render right now. Retry to reload the data and try again.</p>
        <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left font-mono text-xs text-white/45">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/12 px-5 py-3 text-sm font-medium text-violet-100 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-violet-500/18"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </section>
    </main>
  );
}