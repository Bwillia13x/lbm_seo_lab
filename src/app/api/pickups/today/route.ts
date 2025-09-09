import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data: slots, error } = await supabaseAdmin
      .from('pickup_slots')
      .select('*')
      .eq('day', today)
      .order('start_ts');

    if (error) {
      console.error('Error fetching today pickups:', error);
      return NextResponse.json({ error: 'Failed to fetch pickups' }, { status: 500 });
    }

    const timeline = (slots || []).map(s => ({
      id: s.id,
      start_ts: s.start_ts,
      reserved: s.reserved,
      capacity: s.capacity,
      available: s.capacity - s.reserved
    }));

    const totals = timeline.reduce((acc, s) => {
      acc.reserved += s.reserved;
      acc.capacity += s.capacity;
      return acc;
    }, { reserved: 0, capacity: 0 });

    return NextResponse.json({
      date: today,
      totals,
      timeline
    });
  } catch (error) {
    console.error('Error in today pickups API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


