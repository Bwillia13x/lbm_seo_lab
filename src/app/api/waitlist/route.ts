import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id, email } = body;

    if (!product_id || !email) {
      return NextResponse.json({ error: 'Product ID and email are required' }, { status: 400 });
    }

    // Check if already on waitlist
    const { data: existing } = await supabaseAdmin
      .from('waitlist')
      .select('id')
      .eq('product_id', product_id)
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({
        message: 'Already on waitlist',
        already_exists: true
      });
    }

    // Add to waitlist
    const { data: waitlistEntry, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        product_id,
        email
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding to waitlist:', error);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    // Log audit event
    try {
      await supabaseAdmin.from('audit_log').insert({
        actor: 'customer',
        action: 'join_waitlist',
        entity: 'waitlist',
        entity_id: waitlistEntry.id,
        meta: {
          product_id,
          email
        }
      });
    } catch (auditError) {
      console.error('Failed to log audit event:', auditError);
    }

    return NextResponse.json({
      message: 'Successfully added to waitlist',
      waitlistEntry
    });

  } catch (error) {
    console.error('Error in waitlist API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');
    const email = searchParams.get('email');

    if (!product_id || !email) {
      return NextResponse.json({ error: 'Product ID and email are required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('waitlist')
      .delete()
      .eq('product_id', product_id)
      .eq('email', email);

    if (error) {
      console.error('Error removing from waitlist:', error);
      return NextResponse.json({ error: 'Failed to remove from waitlist' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Successfully removed from waitlist' });

  } catch (error) {
    console.error('Error in waitlist delete API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
