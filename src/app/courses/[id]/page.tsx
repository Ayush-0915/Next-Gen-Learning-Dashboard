import { createSupabaseServerClient, hasSupabaseConfig } from '@/lib/supabase/server';
import CourseIconClient from '@/components/courses/course-icon-client';
import CourseMetaClient from '@/components/courses/course-meta-client';
import { CardShell } from '@/components/ui/card-shell';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: Params) {
  const { id } = await params;

  // fallback content
  let course = { id, title: 'Course', progress: 0, icon_name: 'sparkles', description: 'No description available.' } as any;

  if (hasSupabaseConfig()) {
    const supabase = createSupabaseServerClient();
      if (supabase) {
      const { data, error } = await supabase.from('courses').select('id,title,progress,icon_name,description').eq('id', id).single();
      if (!error && data) {
        course = data;
      }
      // fetch lessons for this course
      let lessons: any[] = [];
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('id,title,completed')
        .eq('course_id', id)
        .order('position', { ascending: true });

      if (!lessonsError && lessonsData) {
        lessons = lessonsData;
      }

      // attach lessons to course object for passing to client
      (course as any).lessons = lessons;
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <CardShell>
        <section className="p-6">
          <header className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">{course.title}</h1>
              <p className="text-sm text-white/60 mt-1">{(course as any).description ?? 'No description.'}</p>
            </div>

            <div className="mt-2 md:mt-0 flex items-center gap-4">
              <CourseIconClient iconName={course.icon_name} title={course.title} />
            </div>
          </header>

          <section>
            <CourseMetaClient progress={course.progress ?? 0} lessons={(course as any).lessons ?? []} />
          </section>
        </section>
      </CardShell>
    </main>
  );
}
