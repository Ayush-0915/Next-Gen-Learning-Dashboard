"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from './button';

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const router = useRouter();

  function openModal() {
    setOpen(true);
    setTimeout(() => {
      const el = document.getElementById('search-input');
      if (el) (el as HTMLInputElement).focus();
    }, 50);
  }

  function closeModal() {
    setOpen(false);
  }

  function submitSearch(e?: React.FormEvent) {
    e?.preventDefault();
    const url = `/courses${q ? `?q=${encodeURIComponent(q)}` : ''}` as Parameters<typeof router.push>[0];
    router.push(url);
    closeModal();
  }

  return (
    <div>
      <Button onClick={openModal} className="inline-flex items-center gap-2" variant="ghost">
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <form onSubmit={submitSearch} className="relative z-10 w-full max-w-xl rounded-2xl bg-white/6 ring-1 ring-white/10 p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-white/[0.02] h-10 w-10">
                <Search className="h-5 w-5 text-white/80" />
              </div>
              <input id="search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, lessons, authors..." className="w-full bg-transparent text-white placeholder-white/40 outline-none text-sm" />
              <Button type="submit" className="ml-2" variant="primary">Search</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
