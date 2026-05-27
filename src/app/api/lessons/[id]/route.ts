import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'Supabase service credentials are not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Missing lesson id' }, { status: 400 });

    const body = await req.json();
    if (typeof body.completed !== 'boolean') {
      return NextResponse.json({ error: 'Invalid payload: completed must be boolean' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('lessons').update({ completed: body.completed }).eq('id', id).select().single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lesson: data });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
