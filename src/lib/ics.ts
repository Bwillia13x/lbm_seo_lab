export function generateICSFile(event: {
  title: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
  uid?: string;
}) {
  // Generate unique ID if not provided
  const uid = event.uid || `pickup-${Date.now()}@littlebowmeadows.ca`;

  // Format dates in America/Edmonton timezone (UTC-7/-6)
  const formatDate = (date: Date) => {
    // Convert to America/Edmonton timezone
    const edtOffset = date.getTimezoneOffset() === 360 ? -6 : -7; // EDT is UTC-4, EST is UTC-5
    const localTime = new Date(date.getTime() - (edtOffset * 60 * 60 * 1000));
    return localTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Create timestamp for DTSTAMP
  const now = new Date();
  const dtstamp = formatDate(now);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Little Bow Meadows//Pickup Reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VTIMEZONE',
    'TZID:America/Edmonton',
    'BEGIN:DAYLIGHT',
    'TZOFFSETFROM:-0700',
    'TZOFFSETTO:-0600',
    'TZNAME:MDT',
    'DTSTART:20240310T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:-0600',
    'TZOFFSETTO:-0700',
    'TZNAME:MST',
    'DTSTART:20241103T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=America/Edmonton:${formatDate(event.start).replace('Z', '')}`,
    `DTEND;TZID=America/Edmonton:${formatDate(event.end).replace('Z', '')}`,
    `SUMMARY:${escapeICSText(event.title)}`,
    `DESCRIPTION:${escapeICSText(event.description)}`,
    event.location ? `LOCATION:${escapeICSText(event.location)}` : '',
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H', // 2 hours before
    'ACTION:DISPLAY',
    'DESCRIPTION:Pickup Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line.length > 0).join('\r\n');

  return icsContent;
}

// Helper function to escape special characters in ICS text
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
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
