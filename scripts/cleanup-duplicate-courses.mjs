import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment');
  process.exit(1);
}

const supabase = createClient(url, key);

async function cleanup() {
  try {
    const { data: courses, error } = await supabase.from('courses').select('id,title,created_at').order('created_at', { ascending: true });
    if (error) throw error;

    const byTitle = new Map();
    for (const c of courses) {
      const title = c.title;
      if (!byTitle.has(title)) byTitle.set(title, []);
      byTitle.get(title).push(c);
    }

    const toDelete = [];
    for (const [title, list] of byTitle.entries()) {
      if (list.length > 1) {
        // keep the earliest (first) entry, delete the rest
        const keep = list[0];
        const remove = list.slice(1).map((r) => r.id);
        toDelete.push(...remove);
        console.log(`Will remove ${remove.length} duplicate(s) for title: ${title}`);
      }
    }

    if (toDelete.length === 0) {
      console.log('No duplicate course titles found.');
      process.exit(0);
    }

    const { error: delErr } = await supabase.from('courses').delete().in('id', toDelete);
    if (delErr) throw delErr;

    console.log('Deleted duplicate courses:', toDelete.length);
    process.exit(0);
  } catch (err) {
    console.error('Error cleaning duplicates:', err);
    process.exit(1);
  }
}

cleanup();
