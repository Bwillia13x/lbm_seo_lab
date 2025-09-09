import { Resend } from "resend";
import { createPickupReminderICS } from "./ics";

export async function sendOwnerOrderEmail(args: {
  to: string;
  total: string;
  summary: string;
  pickupSlot?: {
    startTime: Date;
    customerName?: string;
    location?: string;
  };
}) {
  if (!process.env.RESEND_API_KEY) return; // no-op in dev
  const resend = new Resend(process.env.RESEND_API_KEY);

  const attachments = args.pickupSlot ? [{
    filename: 'pickup-reminder.ics',
    content: createPickupReminderICS(args.pickupSlot)
  }] : [];

  await resend.emails.send({
    from: "Little Bow Meadows <orders@littlebowmeadows.ca>",
    to: [args.to],
    subject: "New farm order",
    text: `New paid order.\n\n${args.summary}\n\nTotal: ${args.total}${args.pickupSlot ? `\n\nPickup Time: ${args.pickupSlot.startTime.toLocaleString()}` : ''}`,
    attachments
  });
}

export async function sendCustomerPickupReminder(args: {
  to: string;
  customerName: string;
  pickupSlot: {
    startTime: Date;
    location?: string;
  };
}) {
  if (!process.env.RESEND_API_KEY) return; // no-op in dev
  const resend = new Resend(process.env.RESEND_API_KEY);

  const pickupTime = args.pickupSlot.startTime.toLocaleString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  await resend.emails.send({
    from: "Little Bow Meadows <orders@littlebowmeadows.ca>",
    to: [args.to],
    subject: "Pickup Reminder - Tomorrow",
    text: `Hi ${args.customerName},

This is a reminder that your pickup is scheduled for tomorrow:

📅 ${pickupTime}
📍 ${args.pickupSlot.location || 'Little Bow Meadows Farm'}

Please arrive on time and bring this email for reference. We'll have your order ready!

If you need to change your pickup time, please contact us as soon as possible.

Best regards,
Little Bow Meadows Team`,
    attachments: [{
      filename: 'pickup-reminder.ics',
      content: createPickupReminderICS({
        startTime: args.pickupSlot.startTime,
        customerName: args.customerName,
        location: args.pickupSlot.location
      })
    }]
  });
}

export async function sendMarketEventReminder(args: {
  to: string;
  eventName: string;
  eventDate: Date;
  deadline: Date;
  eventUrl: string;
}) {
  if (!process.env.RESEND_API_KEY) return; // no-op in dev
  const resend = new Resend(process.env.RESEND_API_KEY);

  const eventDateStr = args.eventDate.toLocaleString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  await resend.emails.send({
    from: "Little Bow Meadows <orders@littlebowmeadows.ca>",
    to: [args.to],
    subject: `Pre-order for ${args.eventName}`,
    text: `Hi there,

We're excited about the upcoming ${args.eventName} on ${eventDateStr}!

To ensure we have your favorite items available, please place your pre-order by ${args.deadline.toLocaleDateString()}.

Reserve your items: ${args.eventUrl}

See you at the market!
Little Bow Meadows Team`
  });
}
