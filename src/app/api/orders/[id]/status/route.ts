import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    if (!['ready', 'collected', 'canceled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Get current order status for audit
    const { data: currentOrder } = await supabaseAdmin
      .from('orders')
      .select('status')
      .eq('id', params.id)
      .single();

    // Update order status
    const updateData: any = { status };
    if (status === 'collected') {
      updateData.collected_at = new Date().toISOString();
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    // Log audit event
    try {
      await supabaseAdmin.from('audit_log').insert({
        actor: 'staff', // In production, get from auth
        action: 'update_order_status',
        entity: 'orders',
        entity_id: params.id,
        old_values: { status: currentOrder?.status },
        new_values: { status },
        meta: {
          order_id: params.id,
          customer_email: order.customer_email
        }
      });
    } catch (auditError) {
      console.error('Failed to log audit event:', auditError);
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Error in order status update API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
