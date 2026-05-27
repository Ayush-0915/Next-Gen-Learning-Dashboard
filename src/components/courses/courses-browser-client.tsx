'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { CourseCard } from '@/components/cards/course-card';
import Button from '@/components/ui/button';
import type { CourseCardModel } from '@/types/dashboard';

type CourseTab = 'all' | 'in-progress' | 'completed' | 'wishlist';

const tabs: Array<{ id: CourseTab; label: string }> = [
  { id: 'all', label: 'All Courses' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'wishlist', label: 'Wishlist' }
];

const wishlistStorageKey = 'learnhub-course-wishlist';

interface Props {
  courses: CourseCardModel[];
  accentClassNames: string[];
}

export function CoursesBrowserClient({ courses, accentClassNames }: Props) {
  const [activeTab, setActiveTab] = useState<CourseTab>('all');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(wishlistStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setWishlistIds(parsed.filter((id): id is string => typeof id === 'string'));
      }
    } catch {
      setWishlistIds([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlistIds));
    } catch {
      // ignore storage errors
    }
  }, [wishlistIds]);

  const toggleWishlist = (courseId: string) => {
    setWishlistIds((current) =>
      current.includes(courseId)
        ? current.filter((id) => id !== courseId)
        : [...current, courseId]
    );
  };

  const filteredCourses = useMemo(() => {
    if (activeTab === 'in-progress') {
      return courses.filter((course) => course.progress > 0 && course.progress < 100);
    }

    if (activeTab === 'completed') {
      return courses.filter((course) => course.progress >= 100);
    }

    if (activeTab === 'wishlist') {
      return courses.filter((course) => wishlistIds.includes(course.id));
    }

    return courses;
  }, [activeTab, courses, wishlistIds]);

  const counts = useMemo(
    () => ({
      all: courses.length,
      inProgress: courses.filter((course) => course.progress > 0 && course.progress < 100).length,
      completed: courses.filter((course) => course.progress >= 100).length,
      wishlist: courses.filter((course) => wishlistIds.includes(course.id)).length
    }),
    [courses, wishlistIds]
  );

  return (
    <>
      <section className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = tab.id === 'all' ? counts.all : tab.id === 'in-progress' ? counts.inProgress : tab.id === 'completed' ? counts.completed : counts.wishlist;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${isActive ? 'border border-violet-400/25 bg-violet-500/12 text-violet-100 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]' : 'text-white/55 hover:bg-white/[0.03] hover:text-white'}`}
              >
                {tab.label} <span className="ml-1 text-white/35">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="inline-flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="inline-flex items-center gap-2">
            Recently Updated
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredCourses.length ? filteredCourses.map((course, index) => (
          <CourseCard
            key={course.id}
            title={course.title}
            progress={course.progress}
            iconName={course.iconName}
            description={course.description}
            lessonsCompleted={course.lessonsCompleted}
            lessonsTotal={course.lessonsTotal}
            accentClassName={accentClassNames[index % accentClassNames.length]}
            index={index}
            href={`/courses/${course.id}`}
            isWishlisted={wishlistIds.includes(course.id)}
            onToggleWishlist={() => toggleWishlist(course.id)}
          />
        )) : (
          <div className="col-span-full rounded-3xl border border-white/8 bg-white/[0.03] p-8 text-center text-sm text-white/60">
            No courses found in this section.
          </div>
        )}
      </section>
    </>
  );
}