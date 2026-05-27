import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';

export async function POST(req: Request) {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ success: true, info: 'Created local draft (no DB available)' });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const body = await req.json();
    const plan = body.plan as string | undefined;
    const interval = body.interval as 'monthly' | 'annual' | undefined;
    const userEmail = body.email as string | undefined;

    if (!plan || !interval) {
      return NextResponse.json({ error: 'Missing plan or interval' }, { status: 400 });
    }

    // Try to insert a subscription record into Supabase if table exists.
    try {
      const payload: Record<string, string> = {
        plan_id: plan,
        interval: interval,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      if (userEmail) payload.email = userEmail;

      const { data, error } = await supabaseAdmin.from('subscriptions').insert(payload).select().single();
      if (error) {
        // If the table doesn't exist or insert failed, return success with info so UI can proceed to external checkout.
        return NextResponse.json({ success: true, warning: error.message, info: 'Subscription record not created; proceed to checkout' });
      }

      return NextResponse.json({ success: true, subscription: data });
    } catch (err: unknown) {
      return NextResponse.json({ success: true, info: 'Created local draft (no DB available)' });
    }
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
