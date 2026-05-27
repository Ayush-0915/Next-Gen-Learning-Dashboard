import type { ActivityCell, CourseCardModel, CourseRow, DashboardData } from '@/types/dashboard';
import { createSupabaseServerClient, hasSupabaseConfig } from '@/lib/supabase/server';

const fallbackCourses: CourseCardModel[] = [
  { id: 'course-1', title: 'Advanced React Patterns', progress: 75, iconName: 'atom', createdAt: new Date().toISOString() },
  { id: 'course-2', title: 'Full Stack TypeScript', progress: 60, iconName: 'code-2', createdAt: new Date().toISOString() },
  { id: 'course-3', title: 'AI Fundamentals', progress: 40, iconName: 'brain-circuit', createdAt: new Date().toISOString() },
  { id: 'course-4', title: 'Motion Design Systems', progress: 90, iconName: 'sparkles', createdAt: new Date().toISOString() }
];

const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

function seededValue(index: number) {
  const raw = Math.sin(index * 13.37) * 10000;
  return Math.floor((raw - Math.floor(raw)) * 5);
}

function buildActivityGrid(): ActivityCell[] {
  return Array.from({ length: 18 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const index = weekIndex * 7 + dayIndex + 1;
      const value = seededValue(index);
      return {
        id: `cell-${weekIndex}-${dayIndex}`,
        value,
        label: `${months[weekIndex % months.length]} week ${weekIndex + 1}, day ${dayIndex + 1}`,
        month: months[weekIndex % months.length]
      };
    })
  ).flat();
}

function mapCourses(rows: CourseRow[]): CourseCardModel[] {
  return rows.map((course) => ({
    id: course.id,
    title: course.title,
    progress: course.progress,
    iconName: course.icon_name,
    createdAt: course.created_at
    ,description: course.description ?? ''
  }));
}

export async function getDashboardData(): Promise<DashboardData> {
  const activity = buildActivityGrid();

  if (!hasSupabaseConfig()) {
    return {
      userName: 'Ayush Singh',
      streak: 12,
      courses: fallbackCourses,
      activity
    };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      userName: 'Ayush Singh',
      streak: 12,
      courses: fallbackCourses,
      activity
    };
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('id,title,progress,icon_name,created_at,description')
      .order('created_at', { ascending: true });

    if (error || !data?.length) {
      return {
        userName: 'Ayush Singh',
        streak: 12,
        courses: fallbackCourses,
        activity
      };
    }

    // augment each course with lessons counts
    const rows = data as CourseRow[];
    const courses = await Promise.all(
      rows.map(async (r) => {
        const base = {
          id: r.id,
          title: r.title,
          progress: r.progress,
          iconName: r.icon_name,
          createdAt: r.created_at,
          description: r.description ?? ''
        } as CourseCardModel;

        try {
          const { data: lessons } = await supabase.from('lessons').select('id,completed').eq('course_id', r.id);
          if (lessons) {
            (base as any).lessonsTotal = lessons.length;
            (base as any).lessonsCompleted = (lessons as any[]).filter((l) => l.completed).length;
          } else {
            (base as any).lessonsTotal = 0;
            (base as any).lessonsCompleted = 0;
          }
        } catch (e) {
          (base as any).lessonsTotal = 0;
          (base as any).lessonsCompleted = 0;
        }

        return base;
      })
    );

    // Deduplicate courses by title (case-insensitive). Keep the most recently created entry.
    const map = new Map<string, CourseCardModel>();
    for (const c of courses) {
      const key = (c.title || '').toLowerCase().trim();
      if (!key) continue;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, c);
      } else {
        const existingTime = existing.createdAt || '';
        const currentTime = c.createdAt || '';
        if (currentTime > existingTime) {
          map.set(key, c);
        }
      }
    }

    const uniqueCourses = Array.from(map.values()).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

    const achievementsCount = uniqueCourses.filter((c) => c.progress >= 100).length;
    const communityCount = 3; // demo placeholder; replace with real community data if available

    return {
      userName: 'Ayush Singh',
      streak: 12,
      courses: uniqueCourses,
      activity,
      achievementsCount,
      communityCount
    };
  } catch {
    return {
      userName: 'Ayush Singh',
      streak: 12,
      courses: fallbackCourses,
      activity
    };
  }
}