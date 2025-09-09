import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { sendMarketEventReminder } from "@/lib/emails";

export async function POST() {
  try {
    // Get events happening in the next 7 days with active pre-orders
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const { data: events, error: eventsError } = await supabaseAdmin
      .from('market_events')
      .select('*')
      .eq('active', true)
      .lte('event_date', nextWeek.toISOString().split('T')[0])
      .gte('event_date', new Date().toISOString().split('T')[0]);

    if (eventsError) {
      console.error('Error fetching events for reminders:', eventsError);
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    let reminderCount = 0;

    for (const event of events) {
      // Get customers who have pre-ordered for this event
      // Note: This would need to be implemented based on your order structure
      // For now, we'll send a general reminder to the business email

      const eventUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/event/${event.slug}`;

      await sendMarketEventReminder({
        to: process.env.BUSINESS_EMAIL!,
        eventName: event.name,
        eventDate: new Date(event.event_date),
        deadline: new Date(event.order_deadline),
        eventUrl
      });

      reminderCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Sent ${reminderCount} market event reminders`,
      remindersSent: reminderCount
    });
  } catch (error) {
    console.error('Error sending market event reminders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
