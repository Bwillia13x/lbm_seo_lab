import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const { data: tasks, error } = await supabaseAdmin
      .from('seasonal_tasks')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error fetching seasonal tasks:', error);
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error in seasonal tasks API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const currentWeek = Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));

    // Get active seasonality rules
    const { data: rules, error: rulesError } = await supabaseAdmin
      .from('seasonality_rules')
      .select('*')
      .eq('active', true);

    if (rulesError) {
      console.error('Error fetching seasonality rules:', rulesError);
      return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 });
    }

    const newTasks = [];

    for (const rule of rules) {
      // Check if current week is within the product's season
      if (currentWeek >= rule.start_week && currentWeek <= rule.end_week) {
        // Check if task already exists for this week
        const { data: existingTask } = await supabaseAdmin
          .from('seasonal_tasks')
          .select('id')
          .eq('task', `Publish ${rule.product_name} availability`)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .single();

        if (!existingTask) {
          newTasks.push({
            task: `Publish ${rule.product_name} availability for this week`,
            due_date: new Date().toISOString().split('T')[0],
            completed: false
          });
        }
      }

      // Check if product is ending this week
      if (currentWeek === rule.end_week) {
        const { data: existingTask } = await supabaseAdmin
          .from('seasonal_tasks')
          .select('id')
          .eq('task', `Last week for ${rule.product_name}`)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .single();

        if (!existingTask) {
          newTasks.push({
            task: `Last week for ${rule.product_name} - update website and communications`,
            due_date: new Date().toISOString().split('T')[0],
            completed: false
          });
        }
      }

      // Check if product is starting next week
      if (currentWeek + 1 === rule.start_week) {
        const { data: existingTask } = await supabaseAdmin
          .from('seasonal_tasks')
          .select('id')
          .eq('task', `Prepare for ${rule.product_name} season`)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .single();

        if (!existingTask) {
          newTasks.push({
            task: `Prepare for ${rule.product_name} season starting next week`,
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            completed: false
          });
        }
      }
    }

    // Insert new tasks
    if (newTasks.length > 0) {
      const { error: insertError } = await supabaseAdmin
        .from('seasonal_tasks')
        .insert(newTasks);

      if (insertError) {
        console.error('Error inserting seasonal tasks:', insertError);
        return NextResponse.json({ error: 'Failed to create tasks' }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Generated ${newTasks.length} seasonal tasks`,
      tasksCreated: newTasks.length
    });
  } catch (error) {
    console.error('Error generating seasonal tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, completed } = body;

    const { data: task, error } = await supabaseAdmin
      .from('seasonal_tasks')
      .update({
        completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating seasonal task:', error);
      return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error in update seasonal task API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
