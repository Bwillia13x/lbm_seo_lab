"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LBM_CONSTANTS } from "@/lib/constants";
import QRCode from "qrcode";
import Image from "next/image";

function monthCode() {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function buildLink(base: string, params: Record<string, string>) {
  const u = new URL(base);
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}

export default function LinkInBio() {
  const [placeUrl, setPlaceUrl] = useState(LBM_CONSTANTS.REVIEW_GOOGLE_URL);
  const [qr, setQr] = useState<string>("");
  const campaign = `lbm_linkinbio_${monthCode()}`;
  const baseBook = (typeof window !== "undefined" && localStorage.getItem("lbm_onboarding_booking")) || LBM_CONSTANTS.BOOK_URL;

  useEffect(() => {
    try {
      const u = localStorage.getItem("lbm_google_review_url");
      if (u) setPlaceUrl(u);
    } catch {}
  }, []);

  const tiles = useMemo(() => {
    const source = "instagram";
    const medium = "bio";
    return [
      {
        label: "Request Tour",
        href: buildLink(LBM_CONSTANTS.WEBSITE_URL + "/weddings", { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: "wedding-tour" }),
      },
      {
        label: "Book Flowers",
        href: buildLink(LBM_CONSTANTS.WEBSITE_URL + "/flowers", { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: "bouquet-order" }),
      },
      {
        label: "Join Workshop",
        href: buildLink(LBM_CONSTANTS.WEBSITE_URL + "/workshops", { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: "floral-workshop" }),
      },
      {
        label: "Book Stay",
        href: buildLink(baseBook, { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: "airbnb-booking" }),
      },
      {
        label: "Leave a Review",
        href: placeUrl,
      },
    ];
  }, [baseBook, placeUrl, campaign]);

  useEffect(() => {
    QRCode.toDataURL(window.location.href, { width: 384, margin: 2 }).then(setQr).catch(() => setQr(""));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <CardContent className="p-6 space-y-4">
          <div className="text-center space-y-1">
            <div className="text-xl font-semibold">Little Bow Meadows</div>
            <div className="text-sm text-muted-foreground">Little Bow River • High River</div>
          </div>
          <div className="grid gap-3">
            {tiles.map((t) => (
              <Button key={t.label} asChild className="w-full">
                <a href={t.href} target="_blank" rel="noopener noreferrer">{t.label}</a>
              </Button>
            ))}
          </div>
          {qr && (
            <div className="text-center space-y-2">
              <Image src={qr} alt="QR to this bio page" className="mx-auto" width={160} height={160} />
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = qr; a.download = "belmont-link-in-bio.png"; a.click();
                  }}
                >
                  Download Bio QR
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
