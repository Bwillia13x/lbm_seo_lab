import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function POST() {
  try {
    // First, refresh Airbnb occupancy data
    const airbnbResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/airbnb/refresh`);
    const airbnbResult = await airbnbResponse.json();
    console.log('Airbnb refresh result:', airbnbResult);

    // Generate slots for the next 14 days
    const today = new Date();
    const slotsToCreate = [];

    for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + dayOffset);
      const dateStr = targetDate.toISOString().split('T')[0];
      const weekday = targetDate.getDay();

      // Get capacity for this date
      const capacityResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/capacity/${dateStr}`);
      if (!capacityResponse.ok) {
        console.error(`Failed to get capacity for ${dateStr}`);
        continue;
      }
      const capacityData = await capacityResponse.json();
      const dailyCapacity = capacityData.capacity;

      // Get pickup windows for this weekday
      const { data: windows, error: windowsError } = await supabaseAdmin
        .from('pickup_windows')
        .select('*')
        .eq('weekday', weekday)
        .eq('active', true);

      if (windowsError) {
        console.error('Error fetching pickup windows:', windowsError);
        continue;
      }

      // Generate slots for each window
      for (const window of windows) {
        const startTime = new Date(`${dateStr}T${window.start_time}`);
        const endTime = new Date(`${dateStr}T${window.end_time}`);

        // Create slots every slot_minutes interval
        for (let slotTime = new Date(startTime); slotTime < endTime; slotTime.setMinutes(slotTime.getMinutes() + window.slot_minutes)) {
          slotsToCreate.push({
            day: dateStr,
            start_ts: slotTime.toISOString(),
            capacity: dailyCapacity,
            reserved: 0
          });
        }
      }
    }

    // Insert slots (ignore conflicts if they already exist)
    if (slotsToCreate.length > 0) {
      const { error: insertError } = await supabaseAdmin
        .from('pickup_slots')
        .upsert(slotsToCreate, {
          onConflict: 'day,start_ts',
          ignoreDuplicates: true
        });

      if (insertError) {
        console.error('Error inserting pickup slots:', insertError);
        return NextResponse.json({ error: 'Failed to create pickup slots' }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Airbnb refreshed and ${slotsToCreate.length} pickup slots generated for next 14 days`,
      airbnbRefreshed: airbnbResult.ok,
      slotsCreated: slotsToCreate.length
    });

  } catch (error) {
    console.error('Error generating pickup slots:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
