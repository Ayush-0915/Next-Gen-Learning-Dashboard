import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment');
  process.exit(1);
}

const supabase = createClient(url, key);

async function ensure() {
  try {
    const { data: courses, error: cErr } = await supabase.from('courses').select('id,title,progress').order('created_at', { ascending: true });
    if (cErr) throw cErr;
    if (!courses || courses.length === 0) {
      console.log('No courses found.');
      process.exit(0);
    }

    const lessonsByCourse = {
      'Advanced React Patterns': [
        'Introduction to Patterns',
        'Compound Components',
        'Controlled vs Uncontrolled',
        'Render Props & Hooks',
        'Performance Patterns'
      ],
      'Full Stack TypeScript': [
        'TypeScript Basics',
        'Typing APIs',
        'DB Models in TS',
        'End-to-End Types',
        'Deployment & Tooling'
      ],
      'AI Fundamentals': [
        'Math Refresher',
        'Intro to ML',
        'Supervised Learning',
        'Neural Networks',
        'Model Deployment'
      ],
      'Motion Design Systems': [
        'Principles of Motion',
        'Keyframes & Timing',
        'Animating UI Components',
        'Performance & Accessibility',
        'Motion Tokens & Tokens'
      ],
      'Node.js Mastery': [
        'Node.js Basics',
        'Async Patterns',
        'Building APIs',
        'Streams & Performance',
        'Scaling Node Apps'
      ],
      'SQL for Developers': [
        'SQL Fundamentals',
        'Joins & Subqueries',
        'Indexes & Performance',
        'Transactions',
        'Analytical Queries'
      ],
      'System Design Basics': [
        'Requirements & Goals',
        'API Design',
        'Data Modeling',
        'Scaling Strategies',
        'Tradeoffs & Case Studies'
      ]
    };

    for (const c of courses) {
      const courseId = c.id;
      const title = c.title;

      // remove existing lessons for a clean overwrite
      const { error: delErr } = await supabase.from('lessons').delete().eq('course_id', courseId);
      if (delErr) {
        console.error('Failed to clear existing lessons for', title, delErr);
        continue;
      }

      const defaultLessons = lessonsByCourse[title] ?? [
        'Introduction',
        'Core Concepts',
        'Hands-on Exercise',
        'Advanced Topics',
        'Wrap-up'
      ];

      const total = defaultLessons.length;
      const completedCount = Math.round(((c.progress || 0) / 100) * total);

      const toInsert = defaultLessons.map((t, i) => ({
        course_id: courseId,
        title: t,
        completed: i < completedCount,
        position: i + 1
      }));

      const { data: ins, error: insErr } = await supabase.from('lessons').insert(toInsert).select();
      if (insErr) {
        console.error('Failed to insert lessons for', title, insErr);
      } else {
        console.log(`Inserted ${ins.length} lessons for '${title}', ${completedCount} marked completed.`);
      }
    }

    console.log('Done ensuring lessons.');
    process.exit(0);
  } catch (err) {
    console.error('Error ensuring lessons:', err);
    process.exit(1);
  }
}

ensure();
