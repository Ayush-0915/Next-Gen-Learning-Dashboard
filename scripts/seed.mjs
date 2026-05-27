import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment');
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  try {
    const seedRows = [
      { title: 'Advanced React Patterns', progress: 75, icon_name: 'atom', description: 'Patterns and techniques for building reusable and maintainable React components.' },
      { title: 'Full Stack TypeScript', progress: 60, icon_name: 'code-2', description: 'End-to-end TypeScript: backend, frontend, and build tooling.' },
      { title: 'AI Fundamentals', progress: 40, icon_name: 'brain-circuit', description: 'Introduction to machine learning concepts and practical AI workflows.' },
      { title: 'Motion Design Systems', progress: 90, icon_name: 'sparkles', description: 'Design systems focused on motion, transitions, and interaction design.' }
    ];

    console.log('Clearing existing courses...');
    await supabase.from('courses').delete().neq('id', '');

    console.log('Seeding courses...');
    const { data, error } = await supabase.from('courses').insert(seedRows).select();

    if (error) {
      console.error('Seed error:', error);
      process.exit(1);
    }

    console.log('Seed complete. Inserted rows:');
    console.table((data || []).map((r) => ({ id: r.id, title: r.title, progress: r.progress, icon: r.icon_name })));
    // Seed lessons for each inserted course
    const courses = data || [];

    console.log('Clearing existing lessons...');
    await supabase.from('lessons').delete().neq('id', '');

    const lessonsToInsert = [];
    courses.forEach((c, idx) => {
      lessonsToInsert.push(
        { course_id: c.id, title: 'Introduction', completed: idx % 2 === 0, position: 1 },
        { course_id: c.id, title: 'Core Concepts', completed: false, position: 2 },
        { course_id: c.id, title: 'Advanced Patterns', completed: false, position: 3 }
      );
    });

    if (lessonsToInsert.length) {
      const { error: lessonError, data: lessonData } = await supabase.from('lessons').insert(lessonsToInsert).select();
      if (lessonError) {
        console.error('Lessons seed error:', lessonError);
        process.exit(1);
      }

      console.log('Seeded lessons count:', (lessonData || []).length);
    }

    process.exit(0);
  } catch (err) {
    console.error('Unexpected error', err);
    process.exit(1);
  }
}

seed();
