"use client";

import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  courseId: string;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

export default function CourseLessonsClient({ courseId }: Props) {
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    setLoading(true);
    supabase
      .from('lessons')
      .select('id,title,completed')
      .eq('course_id', courseId)
      .order('position', { ascending: true })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          console.error('Error fetching lessons', error);
          setLessons([]);
        } else {
          setLessons((data as any[]) || []);
        }
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [open, courseId]);

  async function toggle(lesson: Lesson) {
    const updated = { ...lesson, completed: !lesson.completed };
    setLessons((ls) => (ls ? ls.map((l) => (l.id === lesson.id ? updated : l)) : ls));

    try {
      const res = await fetch(`/api/lessons/${lesson.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ completed: updated.completed }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        console.error('Failed to update lesson', json);
        setLessons((ls) => (ls ? ls.map((l) => (l.id === lesson.id ? lesson : l)) : ls));
      }
    } catch (err) {
      console.error('Failed to update lesson', err);
      setLessons((ls) => (ls ? ls.map((l) => (l.id === lesson.id ? lesson : l)) : ls));
    }
  }

  return (
    <div className="mt-3 w-full">
      <Button onClick={() => setOpen((s) => !s)} aria-expanded={open} variant="pill">
        {open ? 'Hide lessons' : 'Show lessons'}
      </Button>

      {open && (
        <div className="mt-2 rounded-md bg-white/[0.03] p-3">
          {loading && <div className="text-sm text-white/60">Loading...</div>}
          {!loading && lessons && lessons.length === 0 && <div className="text-sm text-white/60">No lessons.</div>}
          {!loading && lessons && lessons.length > 0 && (
            <ul className="space-y-2">
              {lessons.map((l) => (
                <li key={l.id} className="flex items-center gap-3 text-sm text-white/80">
                  <input
                    aria-label={`Mark ${l.title} completed`}
                    type="checkbox"
                    checked={!!l.completed}
                    onChange={() => toggle(l)}
                    className="h-4 w-4 rounded border-white/10 bg-white/5"
                  />
                  <span className={l.completed ? 'line-through text-white/50' : ''}>{l.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
