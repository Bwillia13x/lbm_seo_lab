export function generateICSFile(event: {
  title: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
}) {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Little Bow Meadows//Pickup Reminder//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(event.start)}`,
    `DTEND:${formatDate(event.end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    event.location ? `LOCATION:${event.location}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line.length > 0).join('\r\n');

  return icsContent;
}

export function createPickupReminderICS(pickupSlot: {
  startTime: Date;
  customerName?: string;
  location?: string;
}) {
  const endTime = new Date(pickupSlot.startTime);
  endTime.setMinutes(endTime.getMinutes() + 15); // 15-minute slots

  return generateICSFile({
    title: 'Farm Pickup - Little Bow Meadows',
    description: `Your scheduled pickup time at Little Bow Meadows${pickupSlot.customerName ? ` for ${pickupSlot.customerName}` : ''}`,
    start: pickupSlot.startTime,
    end: endTime,
    location: pickupSlot.location || 'Little Bow Meadows Farm'
  });
}
