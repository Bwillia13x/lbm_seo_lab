import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Get all orders for today with pickup slots
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        pickup_slots (
          start_ts,
          notes
        ),
        order_items (
          qty,
          product_name
        )
      `)
      .eq('status', 'paid')
      .gte('created_at', today)
      .order('created_at');

    if (error) {
      console.error('Error fetching today orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    // Group by pickup slot time
    const groupedBySlot = (orders || []).reduce((acc, order) => {
      if (!order.pickup_slots) return acc;

      const slotTime = new Date(order.pickup_slots.start_ts).toLocaleTimeString('en-CA', {
        hour: 'numeric',
        minute: '2-digit'
      });

      if (!acc[slotTime]) {
        acc[slotTime] = {
          slotTime,
          orders: [],
          totalItems: 0
        };
      }

      acc[slotTime].orders.push({
        id: order.id,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        total_cents: order.total_cents,
        created_at: order.created_at,
        items: order.order_items,
        notes: order.notes
      });

      acc[slotTime].totalItems += order.order_items?.reduce((sum, item) => sum + item.qty, 0) || 0;

      return acc;
    }, {} as Record<string, any>);

    const runSheet = Object.values(groupedBySlot).sort((a: any, b: any) =>
      a.slotTime.localeCompare(b.slotTime)
    );

    return NextResponse.json({
      date: today,
      runSheet,
      totalOrders: orders?.length || 0,
      totalItems: runSheet.reduce((sum, slot: any) => sum + slot.totalItems, 0)
    });

  } catch (error) {
    console.error('Error in today orders API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
