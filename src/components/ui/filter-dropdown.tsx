"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from './button';

export default function FilterDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function applySort(sort: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('sort', sort);
    router.push(`/courses?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <Button onClick={() => setOpen((s) => !s)} variant="ghost" className="px-3 py-2 text-xs sm:text-sm">Filter</Button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded bg-white/6 p-2">
          <button onClick={() => applySort('recent')} className="block w-full text-left px-3 py-2 text-sm text-white/80">Recently Updated</button>
          <button onClick={() => applySort('progress')} className="block w-full text-left px-3 py-2 text-sm text-white/80">Progress</button>
          <button onClick={() => applySort('alpha')} className="block w-full text-left px-3 py-2 text-sm text-white/80">A → Z</button>
        </div>
      )}
    </div>
  );
}
