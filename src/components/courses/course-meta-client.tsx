"use client";

import React from 'react';
import { ProgressBar } from '@/components/dashboard/progress-bar';

interface Props {
  progress: number;
  lessons?: { id: string; title: string; completed: boolean }[];
}

export default function CourseMetaClient({ progress, lessons = [] }: Props) {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm text-white/60">Course Progress</div>
          <div className="mt-2">
            <ProgressBar progress={progress} colorClassName="bg-amber-400" />
          </div>
        </div>
        <div className="w-20 text-right text-lg font-semibold text-white">{progress}%</div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-white/90">Lessons</h4>
        <ul className="mt-2 space-y-2">
          {lessons.length
            ? lessons.map((l) => (
                <li key={l.id} className="flex items-center gap-3 text-sm text-white/70">
                  <input type="checkbox" checked={l.completed} readOnly className="h-4 w-4 rounded border-white/10 bg-white/5" />
                  <span className={`${l.completed ? 'line-through text-white/50' : ''}`}>{l.title}</span>
                </li>
              ))
            : (
              <li className="text-sm text-white/60">No lessons available.</li>
            )}
        </ul>
      </div>
    </div>
  );
}
