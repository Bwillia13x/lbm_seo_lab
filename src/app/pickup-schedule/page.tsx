'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';

interface PickupSlot {
  id: string;
  startTime: string;
  capacity: number;
  reserved: number;
  available: number;
  displayTime: string;
}

interface AvailableSlotsResponse {
  date: string;
  availableSlots: PickupSlot[];
}

export default function PickupScheduler() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get('product');
  const qty = parseInt(searchParams.get('qty') || '1');

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<PickupSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Fetch available slots when date changes
  useEffect(() => {
    if (!selectedDate) return;

    setLoading(true);
    fetch(`/api/pickup-slots/available?date=${selectedDate}`)
      .then(res => res.json())
      .then((data: AvailableSlotsResponse) => {
        setAvailableSlots(data.availableSlots);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching slots:', error);
        setLoading(false);
      });
  }, [selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(''); // Clear selection when date changes
  };

  const getAvailabilityColor = (available: number) => {
    if (available >= 3) return 'default';
    if (available >= 1) return 'secondary';
    return 'destructive';
  };

  const getAvailabilityText = (available: number) => {
    if (available >= 3) return 'Available';
    if (available >= 1) return 'Limited';
    return 'Almost Full';
  };

  if (!productSlug) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No product selected. Please go back to the shop.</p>
            <Button asChild className="mt-4">
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Your Pickup</h1>
          <p className="text-gray-600">
            Choose a convenient time for your farm pickup. All times are in your local timezone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 14 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i + 1); // Start from tomorrow
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = selectedDate === dateStr;

                return (
                  <Button
                    key={dateStr}
                    variant={isSelected ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleDateChange(dateStr)}
                  >
                    <div className="text-left">
                      <div className="font-medium">
                        {date.toLocaleDateString('en-CA', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {date.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Available Times
                {selectedDate && (
                  <Badge variant="outline" className="ml-auto">
                    {new Date(selectedDate).toLocaleDateString('en-CA', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading available times...</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pickup times available for this date.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try selecting a different date.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedSlot === slot.id ? "default" : "outline"}
                      className="h-auto p-4 justify-start"
                      onClick={() => setSelectedSlot(slot.id)}
                      disabled={slot.available < qty}
                    >
                      <div className="text-left w-full">
                        <div className="font-medium">{slot.displayTime}</div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span className="text-xs">
                              {slot.available} of {slot.capacity} available
                            </span>
                          </div>
                          <Badge
                            variant={getAvailabilityColor(slot.available)}
                            className="text-xs"
                          >
                            {getAvailabilityText(slot.available)}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Checkout Button */}
        {selectedSlot && (
          <div className="mt-8 flex justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="font-medium mb-2">Ready to checkout?</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll be redirected to complete your payment and confirm your pickup time.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link
                    href={`/api/checkout?slug=${productSlug}&qty=${qty}&pickup_slot_id=${selectedSlot}`}
                  >
                    Complete Order
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
