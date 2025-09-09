import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }

  try {
    // Get all slots for the date
    const { data: slots, error } = await supabaseAdmin
      .from('pickup_slots')
      .select('*')
      .eq('day', date)
      .order('start_ts');

    // Filter slots with available capacity (can't do this in Supabase query)
    const availableSlots = slots?.filter(slot => slot.reserved < slot.capacity) || [];

    if (error) {
      console.error('Error fetching available slots:', error);
      return NextResponse.json({ error: 'Failed to fetch available slots' }, { status: 500 });
    }

    // Format slots for frontend
    const formattedSlots = availableSlots.map(slot => ({
      id: slot.id,
      startTime: slot.start_ts,
      capacity: slot.capacity,
      reserved: slot.reserved,
      available: slot.capacity - slot.reserved,
      displayTime: new Date(slot.start_ts).toLocaleTimeString('en-CA', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }));

    return NextResponse.json({
      date,
      availableSlots: formattedSlots
    });

  } catch (error) {
    console.error('Error in available slots API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
