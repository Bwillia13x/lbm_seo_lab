import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: { date: string } }
) {
  const { date } = params;

  try {
    // Get occupancy status for the date
    const { data: occupancyData, error: occupancyError } = await supabaseAdmin
      .from('airbnb_occupancy')
      .select('occupied')
      .eq('day', date)
      .single();

    if (occupancyError && occupancyError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching occupancy:', occupancyError);
      return NextResponse.json({ error: 'Failed to fetch occupancy data' }, { status: 500 });
    }

    const occupied = occupancyData?.occupied || false;

    // Get the weekday (0 = Sunday, 6 = Saturday)
    const weekday = new Date(date).getDay();

    // Get capacity rules for this weekday
    const { data: rulesData, error: rulesError } = await supabaseAdmin
      .from('capacity_rules')
      .select('base_pickups, occupied_pickups')
      .eq('weekday', weekday)
      .single();

    if (rulesError) {
      console.error('Error fetching capacity rules:', rulesError);
      return NextResponse.json({ error: 'Failed to fetch capacity rules' }, { status: 500 });
    }

    const capacity = occupied ? rulesData.occupied_pickups : rulesData.base_pickups;

    return NextResponse.json({
      date,
      occupied,
      weekday,
      capacity
    });
  } catch (error) {
    console.error('Error in capacity lookup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
