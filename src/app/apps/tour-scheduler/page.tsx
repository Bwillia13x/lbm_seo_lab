"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Heart,
  Camera,
  Music,
  Sparkles,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

interface TourInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestCount: string;
  eventType: string;
  specialRequests: string;
  marketingConsent: boolean;
  createdAt: string;
}

const TOUR_TIMES = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const EVENT_TYPES = [
  "Wedding Ceremony",
  "Wedding Reception",
  "Elopement",
  "Engagement Session",
  "Corporate Event",
  "Family Gathering",
  "Other"
];

export default function TourScheduler() {
  const [inquiry, setInquiry] = useState<Partial<TourInquiry>>({
    marketingConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // Generate next 30 available dates (excluding weekends for demo)
  useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    setAvailableDates(dates);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const tourInquiry: TourInquiry = {
      id: Date.now().toString(),
      name: inquiry.name || "",
      email: inquiry.email || "",
      phone: inquiry.phone || "",
      date: inquiry.date || "",
      time: inquiry.time || "",
      guestCount: inquiry.guestCount || "",
      eventType: inquiry.eventType || "",
      specialRequests: inquiry.specialRequests || "",
      marketingConsent: inquiry.marketingConsent || false,
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage for demo purposes
    const existing = JSON.parse(localStorage.getItem("lbm_tour_inquiries") || "[]");
    existing.push(tourInquiry);
    localStorage.setItem("lbm_tour_inquiries", JSON.stringify(existing));

    setSubmitted(true);
    setLoading(false);
  };

  const updateInquiry = (field: keyof TourInquiry, value: string | boolean) => {
    setInquiry(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Tour Scheduled!"
          subtitle="Thank you for your interest in Little Bow Meadows"
        />

        <Card className="text-center">
          <CardContent className="py-12">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Tour Request Submitted</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We've received your tour request for <strong>{inquiry.date}</strong> at <strong>{inquiry.time}</strong>.
              We'll send a confirmation email with directions and what to expect during your visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => {
                setSubmitted(false);
                setInquiry({ marketingConsent: false });
              }}>
                Schedule Another Tour
              </Button>
              <Button variant="outline" asChild>
                <a href="/weddings">View Wedding Packages</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule a Venue Tour"
        subtitle="Book a personalized tour of Little Bow Meadows wedding venue"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tour Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tour Details
              </CardTitle>
              <CardDescription>
                Tell us about your event so we can customize your tour experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={inquiry.name || ""}
                        onChange={(e) => updateInquiry("name", e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={inquiry.email || ""}
                        onChange={(e) => updateInquiry("email", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={inquiry.phone || ""}
                        onChange={(e) => updateInquiry("phone", e.target.value)}
                        placeholder="(403) 555-0123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guestCount">Expected Guest Count</Label>
                      <Input
                        id="guestCount"
                        value={inquiry.guestCount || ""}
                        onChange={(e) => updateInquiry("guestCount", e.target.value)}
                        placeholder="50-200 guests"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tour Scheduling */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Tour Scheduling
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date *</Label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={inquiry.date || ""}
                        onChange={(e) => updateInquiry("date", e.target.value)}
                      >
                        <option value="">Select a date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString('en-CA', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time *</Label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={inquiry.time || ""}
                        onChange={(e) => updateInquiry("time", e.target.value)}
                      >
                        <option value="">Select a time</option>
                        {TOUR_TIMES.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Event Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Event Details
                  </h4>
                  <div>
                    <Label htmlFor="eventType">Type of Event</Label>
                    <select
                      className="w-full px-3 py-2 border rounded-md"
                      value={inquiry.eventType || ""}
                      onChange={(e) => updateInquiry("eventType", e.target.value)}
                    >
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="specialRequests">Special Requests or Questions</Label>
                    <Textarea
                      id="specialRequests"
                      value={inquiry.specialRequests || ""}
                      onChange={(e) => updateInquiry("specialRequests", e.target.value)}
                      placeholder="Tell us about your vision, special requirements, or any questions you have..."
                      rows={4}
                    />
                  </div>
                </div>

                <Separator />

                {/* Marketing Consent */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketingConsent"
                    checked={inquiry.marketingConsent || false}
                    onCheckedChange={(checked) => updateInquiry("marketingConsent", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="marketingConsent" className="text-sm font-medium">
                      Email Marketing
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I'd like to receive updates about seasonal blooms, wedding tips, and special offers from Little Bow Meadows.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Schedule My Tour"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Tour Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Venue Tour</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore the ceremony space, river views, and all venue areas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Photo Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    See the best spots for wedding photography and golden hour shots
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Customization Options</h4>
                  <p className="text-sm text-muted-foreground">
                    Discuss how we can tailor the space for your unique vision
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tour Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Approximately 1 hour</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Tours are complimentary and include detailed information about packages, availability, and next steps.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">{LBM_CONSTANTS.PHONE_DISPLAY}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">info@littlebowmeadows.ca</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Little Bow River, High River</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
