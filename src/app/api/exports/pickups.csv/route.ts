import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { toCSV } from "@/lib/csv";

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data: slots, error } = await supabaseAdmin
      .from('pickup_slots')
      .select('*')
      .eq('day', today)
      .order('start_ts');

    if (error) {
      return new NextResponse('Failed to fetch pickups', { status: 500 });
    }

    const rows = (slots || []).map(s => ({
      day: today,
      start_time: new Date(s.start_ts).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' }),
      capacity: s.capacity,
      reserved: s.reserved,
      available: s.capacity - s.reserved,
    }));

    const csv = toCSV(rows);
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="pickups-${today}.csv"`
      }
    });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}


