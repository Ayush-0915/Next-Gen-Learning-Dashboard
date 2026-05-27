import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment');
  process.exit(1);
}

const supabase = createClient(url, key);

async function removeEmpty() {
  try {
    // find courses with null or empty description
    const { data: toRemove, error: fetchErr } = await supabase
      .from('courses')
      .select('id,title,description')
      .or('description.is.null,description.eq.')
      .limit(1000);

    if (fetchErr) throw fetchErr;

    if (!toRemove || toRemove.length === 0) {
      console.log('No courses with empty or null description found.');
      process.exit(0);
    }

    console.log(`Found ${toRemove.length} course(s) with empty description. Deleting...`);
    const ids = toRemove.map((r) => r.id);
    const { error: delErr } = await supabase.from('courses').delete().in('id', ids);
    if (delErr) throw delErr;

    console.log('Deleted courses:', ids.length);
    toRemove.forEach((c) => console.log('-', c.title, c.id));
    process.exit(0);
  } catch (err) {
    console.error('Error removing courses:', err);
    process.exit(1);
  }
}

removeEmpty();
