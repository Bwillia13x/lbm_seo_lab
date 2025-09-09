import ical from "node-ical";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  const url = process.env.AIRBNB_ICAL_URL!;

  if (!url) {
    return NextResponse.json({ error: "Airbnb iCal URL not configured" }, { status: 500 });
  }

  try {
    const data = await ical.async.fromURL(url);

    // Airbnb busy days are events with summary "Reserved"
    const busy = new Set<string>();
    for (const k of Object.keys(data)) {
      const e = data[k];
      if (e.type !== "VEVENT") continue;

      const start = new Date(e.start as Date);
      const end = new Date(e.end as Date);

      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        busy.add(d.toISOString().slice(0, 10));
      }
    }

    // Upsert 60 days of occupancy data
    const today = new Date();
    const occupancyData = [];

    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const occupied = busy.has(iso);

      occupancyData.push({
        day: iso,
        occupied,
        imported_at: new Date().toISOString()
      });
    }

    // Use upsert to update existing records or insert new ones
    const { error } = await supabaseAdmin
      .from('airbnb_occupancy')
      .upsert(occupancyData, {
        onConflict: 'day',
        ignoreDuplicates: false
      });

    if (error) {
      console.error('Error upserting occupancy data:', error);
      return NextResponse.json({ error: 'Failed to update occupancy data' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: `Updated occupancy data for next 60 days`,
      busyDaysCount: busy.size
    });
  } catch (error) {
    console.error('Error fetching Airbnb calendar:', error);
    return NextResponse.json({ error: 'Failed to fetch Airbnb calendar' }, { status: 500 });
  }
}
