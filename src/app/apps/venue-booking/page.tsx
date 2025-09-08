"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, MapPin, Phone, Mail, DollarSign, Calendar as CalendarIcon, Star, CheckCircle, AlertCircle } from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

interface Booking {
  id: string;
  date: string;
  time: string;
  eventType: string;
  guestCount: number;
  coupleName: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'deposit-paid' | 'cancelled';
  package: string;
  totalPrice: number;
  notes: string;
  createdAt: string;
}

interface VenuePackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  guestCapacity: number;
  includes: string[];
  seasonalMultiplier: number;
}

const VENUE_PACKAGES: VenuePackage[] = [
  {
    id: "rustic-barn",
    name: "Rustic Barn Package",
    description: "Intimate ceremonies in our charming barn with outdoor reception space",
    basePrice: 2500,
    guestCapacity: 75,
    includes: ["Venue rental", "Basic setup", "Outdoor ceremony space", "Bridal suite"],
    seasonalMultiplier: 1.2
  },
  {
    id: "garden-elegance",
    name: "Garden Elegance Package",
    description: "Outdoor garden ceremonies with tented reception area",
    basePrice: 3500,
    guestCapacity: 120,
    includes: ["Garden ceremony", "Tented reception", "Dance floor", "Lighting package"],
    seasonalMultiplier: 1.0
  },
  {
    id: "grand-celebration",
    name: "Grand Celebration Package",
    description: "Full venue access with premium amenities and services",
    basePrice: 5000,
    guestCapacity: 150,
    includes: ["Full venue access", "Premium setup", "Catering kitchen", "Bridal suite", "Groom's quarters"],
    seasonalMultiplier: 1.3
  }
];

const SEASONS = {
  spring: { name: "Spring", multiplier: 1.1, months: [3, 4, 5] },
  summer: { name: "Summer", multiplier: 1.3, months: [6, 7, 8] },
  fall: { name: "Fall", multiplier: 1.2, months: [9, 10, 11] },
  winter: { name: "Winter", multiplier: 0.8, months: [12, 1, 2] }
};

export default function VenueBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    date: '',
    time: '',
    eventType: 'wedding',
    guestCount: 50,
    coupleName: '',
    email: '',
    phone: '',
    status: 'pending',
    package: '',
    totalPrice: 0,
    notes: ''
  });

  // Load sample bookings
  useEffect(() => {
    const sampleBookings: Booking[] = [
      {
        id: "1",
        date: "2024-06-15",
        time: "16:00",
        eventType: "wedding",
        guestCount: 85,
        coupleName: "Sarah & Michael",
        email: "sarah.michael@email.com",
        phone: "403-555-0123",
        status: "confirmed",
        package: "garden-elegance",
        totalPrice: 4200,
        notes: "Outdoor ceremony, tented reception",
        createdAt: "2024-01-15"
      },
      {
        id: "2",
        date: "2024-07-22",
        time: "17:00",
        eventType: "wedding",
        guestCount: 120,
        coupleName: "Emma & David",
        email: "emma.david@email.com",
        phone: "403-555-0456",
        status: "deposit-paid",
        package: "grand-celebration",
        totalPrice: 6500,
        notes: "Full venue, premium package",
        createdAt: "2024-01-20"
      },
      {
        id: "3",
        date: "2024-08-10",
        time: "15:00",
        eventType: "wedding",
        guestCount: 60,
        coupleName: "Jessica & Ryan",
        email: "jessica.ryan@email.com",
        phone: "403-555-0789",
        status: "pending",
        package: "rustic-barn",
        totalPrice: 3000,
        notes: "Intimate ceremony, rustic theme",
        createdAt: "2024-01-25"
      }
    ];
    setBookings(sampleBookings);
  }, []);

  const getSeasonMultiplier = (date: string) => {
    const month = new Date(date).getMonth() + 1;
    for (const season of Object.values(SEASONS)) {
      if (season.months.includes(month)) {
        return season.multiplier;
      }
    }
    return 1.0;
  };

  const calculatePrice = (pkgId: string, date: string, guestCount: number) => {
    const pkg = VENUE_PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return 0;
    
    const seasonMultiplier = getSeasonMultiplier(date);
    const guestMultiplier = guestCount > pkg.guestCapacity ? 1.2 : 1.0;
    
    return Math.round(pkg.basePrice * seasonMultiplier * guestMultiplier);
  };

  const handleCreateBooking = () => {
    if (!newBooking.date || !newBooking.time || !newBooking.package || !newBooking.coupleName) {
      alert("Please fill in all required fields");
      return;
    }

    const price = calculatePrice(newBooking.package, newBooking.date, newBooking.guestCount || 0);
    
    const booking: Booking = {
      id: Date.now().toString(),
      date: newBooking.date,
      time: newBooking.time,
      eventType: newBooking.eventType || 'wedding',
      guestCount: newBooking.guestCount || 0,
      coupleName: newBooking.coupleName,
      email: newBooking.email || '',
      phone: newBooking.phone || '',
      status: 'pending',
      package: newBooking.package,
      totalPrice: price,
      notes: newBooking.notes || '',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings([...bookings, booking]);
    setNewBooking({
      date: '',
      time: '',
      eventType: 'wedding',
      guestCount: 50,
      coupleName: '',
      email: '',
      phone: '',
      status: 'pending',
      package: '',
      totalPrice: 0,
      notes: ''
    });
    setShowNewBooking(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'deposit-paid': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'deposit-paid': return <DollarSign className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.date === selectedDate || selectedDate === ''
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Venue Booking Management</h1>
          <p className="text-muted-foreground">
            Manage wedding bookings and venue availability for Little Bow Meadows
          </p>
        </div>
        <Button onClick={() => setShowNewBooking(true)}>
          <Calendar className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Booking Form */}
      {showNewBooking && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Booking</CardTitle>
            <CardDescription>
              Add a new wedding booking to the calendar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Wedding Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="time">Ceremony Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={newBooking.time}
                  onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="couple">Couple Name *</Label>
                <Input
                  id="couple"
                  value={newBooking.coupleName}
                  onChange={(e) => setNewBooking({...newBooking, coupleName: e.target.value})}
                  placeholder="Sarah & Michael"
                />
              </div>
              <div>
                <Label htmlFor="guests">Guest Count</Label>
                <Input
                  id="guests"
                  type="number"
                  value={newBooking.guestCount}
                  onChange={(e) => setNewBooking({...newBooking, guestCount: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newBooking.email}
                  onChange={(e) => setNewBooking({...newBooking, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newBooking.phone}
                  onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="package">Venue Package *</Label>
                <Select value={newBooking.package} onValueChange={(value) => setNewBooking({...newBooking, package: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {VENUE_PACKAGES.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - ${pkg.basePrice.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({...newBooking, notes: e.target.value})}
                  placeholder="Special requests or additional information..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewBooking(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateBooking}>
                Create Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Wedding Bookings</CardTitle>
          <CardDescription>
            Manage and view all wedding bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No bookings found for the selected date
              </p>
            ) : (
              filteredBookings.map((booking) => {
                const pkg = VENUE_PACKAGES.find(p => p.id === booking.package);
                return (
                  <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{booking.coupleName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status.replace('-', ' ')}</span>
                        </Badge>
                        <span className="text-lg font-bold">${booking.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{booking.guestCount} guests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{pkg?.name || 'Unknown Package'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{booking.email}</span>
                      </div>
                    </div>
                    {booking.notes && (
                      <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                        {booking.notes}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}