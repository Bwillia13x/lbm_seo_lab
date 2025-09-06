"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/ui/page-header";
import { LBM_CONSTANTS } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Onboarding() {
  const [placeId, setPlaceId] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  // Start empty; show defaults as placeholders so Reset truly clears
  const [booking, setBooking] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem("lbm_onboarding_place_id");
      const r = localStorage.getItem("lbm_google_review_url");
      const b = localStorage.getItem("lbm_onboarding_booking");
      const ph = localStorage.getItem("lbm_onboarding_phone");
      const a = localStorage.getItem("lbm_onboarding_address");
      if (p) setPlaceId(p);
      if (r) setReviewUrl(r);
      if (b) setBooking(b);
      if (ph) setPhone(ph);
      if (a) setAddress(a);
    } catch {}
  }, []);

  function saveStep() {
    try {
      if (placeId) localStorage.setItem("lbm_onboarding_place_id", placeId);
      if (reviewUrl) localStorage.setItem("lbm_google_review_url", reviewUrl);
      if (booking) localStorage.setItem("lbm_onboarding_booking", booking);
      if (phone) localStorage.setItem("lbm_onboarding_phone", phone);
      if (address) localStorage.setItem("lbm_onboarding_address", address);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {}
  }

  function resetOnboarding() {
    try {
      // Clear known keys
      localStorage.removeItem("lbm_onboarding_place_id");
      localStorage.removeItem("lbm_google_review_url");
      localStorage.removeItem("lbm_onboarding_booking");
      localStorage.removeItem("lbm_onboarding_phone");
      localStorage.removeItem("lbm_onboarding_address");
      // Defensive: clear any lbm_ scoped keys to avoid stale values
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith("lbm_")) keys.push(k);
      }
      keys.forEach((k) => {
        try { localStorage.removeItem(k); } catch {}
      });
      setPlaceId("");
      setReviewUrl("");
      setBooking("");
      setPhone("");
      setAddress("");
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {}
  }

  useEffect(() => {
    if (placeId) {
      setReviewUrl(`https://search.google.com/local/writereview?placeid=${placeId}`);
    }
  }, [placeId]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Onboarding"
        subtitle="Three quick steps to set review link, contact info, and booking URL."
        actions={
          <Button asChild>
            <Link href="/apps/review-link"><ArrowRight className="h-4 w-4 mr-2"/>Go to Review Requests</Link>
          </Button>
        }
      />

      {/* Helper: What this page does */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">What this does</CardTitle>
          <CardDescription>
            Sets your review link and contact details so every tool uses the right info. Takes about 2 minutes.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1) Google Review Link</CardTitle>
          <CardDescription>Find your Place ID and generate the one‑click review URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Google Place ID</Label>
            <Input value={placeId} onChange={(e) => setPlaceId(e.target.value)} placeholder="ChIJ..." />
            <div className="mt-2">
              <Button asChild size="sm" variant="outline">
                <a href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder" target="_blank" rel="noopener noreferrer">Open Place ID Finder</a>
              </Button>
            </div>
          </div>
          <div>
            <Label>Review URL</Label>
            <Input value={reviewUrl} onChange={(e)=>setReviewUrl(e.target.value)} placeholder="https://search.google.com/local/writereview?placeid=..." />
          </div>
          <Button onClick={saveStep}>Save</Button> {saved && <span className="text-green-600 inline-flex items-center gap-1 text-sm"><CheckCircle className="h-4 w-4"/>Saved</span>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin</CardTitle>
          <CardDescription>Maintenance controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" onClick={resetOnboarding}>Reset Onboarding Data</Button>
          <div className="text-xs text-muted-foreground">Clears locally saved Place ID, review URL, booking, phone, and address.</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2) Contact & Address</CardTitle>
          <CardDescription>Confirm your phone and address to keep content consistent.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-3">
          <div>
            <Label>Phone</Label>
            <Input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={LBM_CONSTANTS.PHONE_DISPLAY} />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder={LBM_CONSTANTS.ADDRESS_STR} />
          </div>
          <div className="md:col-span-2">
            <Button onClick={saveStep}>Save</Button> {saved && <span className="text-green-600 inline-flex items-center gap-1 text-sm"><CheckCircle className="h-4 w-4"/>Saved</span>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3) Booking URL</CardTitle>
          <CardDescription>Confirm the booking link used across UTM and QR tools.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Booking URL</Label>
            <Input value={booking} onChange={(e)=>setBooking(e.target.value)} placeholder={LBM_CONSTANTS.BOOK_URL} />
          </div>
          <Button onClick={saveStep}>Save</Button> {saved && <span className="text-green-600 inline-flex items-center gap-1 text-sm"><CheckCircle className="h-4 w-4"/>Saved</span>}
          <Separator className="my-3" />
          <div className="text-sm text-muted-foreground">
            Note: These settings save in your browser for convenience. We can hard‑code them in the app config once finalized.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
