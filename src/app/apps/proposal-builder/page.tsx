"use client";

import React, { useState, useMemo } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  Download,
  Heart,
  Users,
  Camera,
  Flower,
  Music,
  Utensils,
  DollarSign,
  CheckCircle,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

interface PackageItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  included: boolean;
}

interface Proposal {
  coupleName: string;
  eventDate: string;
  guestCount: number;
  ceremonyType: string;
  selectedItems: PackageItem[];
  totalPrice: number;
  notes: string;
}

const BASE_PACKAGES: PackageItem[] = [
  {
    id: "ceremony-basic",
    name: "Basic Ceremony Package",
    description: "Outdoor ceremony space with natural floral arch and sound system",
    price: 2500,
    category: "ceremony",
    included: false,
  },
  {
    id: "ceremony-full",
    name: "Full Ceremony Package",
    description: "Complete ceremony setup with premium floral arrangements and ceremony coordination",
    price: 4500,
    category: "ceremony",
    included: false,
  },
  {
    id: "reception-basic",
    name: "Basic Reception Package",
    description: "Tables, chairs, and basic setup for up to 100 guests",
    price: 1500,
    category: "reception",
    included: false,
  },
  {
    id: "reception-full",
    name: "Full Reception Package",
    description: "Complete reception setup with premium linens and full coordination",
    price: 3000,
    category: "reception",
    included: false,
  },
];

const ADD_ONS: PackageItem[] = [
  {
    id: "floral-arch",
    name: "Floral Arch & Aisle",
    description: "Custom floral arch and aisle decorations with seasonal blooms",
    price: 800,
    category: "floral",
    included: false,
  },
  {
    id: "bridal-bouquet",
    name: "Bridal Bouquet & Boutonniere",
    description: "Custom bridal bouquet and boutonniere with fresh flowers",
    price: 250,
    category: "floral",
    included: false,
  },
  {
    id: "table-centerpieces",
    name: "Table Centerpieces",
    description: "Floral centerpieces for reception tables (per table)",
    price: 75,
    category: "floral",
    included: false,
  },
  {
    id: "photography-session",
    name: "Engagement Photography",
    description: "1-hour engagement photography session at the venue",
    price: 500,
    category: "photography",
    included: false,
  },
  {
    id: "sound-system",
    name: "Professional Sound System",
    description: "Complete sound system with wireless microphones",
    price: 300,
    category: "audio",
    included: false,
  },
  {
    id: "ceremony-music",
    name: "Ceremony Musician",
    description: "Acoustic musician for ceremony (guitar/violin)",
    price: 400,
    category: "music",
    included: false,
  },
];

export default function ProposalBuilder() {
  const [proposal, setProposal] = useState<Proposal>({
    coupleName: "",
    eventDate: "",
    guestCount: 50,
    ceremonyType: "outdoor",
    selectedItems: [],
    totalPrice: 0,
    notes: "",
  });

  const [generatedProposal, setGeneratedProposal] = useState<string>("");

  const allItems = useMemo(() => [...BASE_PACKAGES, ...ADD_ONS], []);

  const toggleItem = (itemId: string) => {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    setProposal(prev => {
      const isSelected = prev.selectedItems.some(i => i.id === itemId);
      let newSelectedItems;

      if (isSelected) {
        newSelectedItems = prev.selectedItems.filter(i => i.id !== itemId);
      } else {
        newSelectedItems = [...prev.selectedItems, item];
      }

      const totalPrice = newSelectedItems.reduce((sum, item) => sum + item.price, 0);

      return {
        ...prev,
        selectedItems: newSelectedItems,
        totalPrice,
      };
    });
  };

  const updateProposal = (field: keyof Proposal, value: string | number) => {
    setProposal(prev => ({ ...prev, [field]: value }));
  };

  const generateProposal = () => {
    const proposalText = `
# Wedding Proposal for ${proposal.coupleName}

## Event Overview
- **Date**: ${proposal.eventDate || "TBD"}
- **Guest Count**: ${proposal.guestCount}
- **Ceremony Type**: ${proposal.ceremonyType === "outdoor" ? "Outdoor Prairie Ceremony" : "Indoor/Alternative Setup"}

## Selected Package Items

### Base Packages
${proposal.selectedItems
  .filter(item => BASE_PACKAGES.some(bp => bp.id === item.id))
  .map(item => `- **${item.name}**: $${item.price.toLocaleString()}\n  ${item.description}`)
  .join("\n\n")}

### Add-Ons
${proposal.selectedItems
  .filter(item => ADD_ONS.some(ao => ao.id === item.id))
  .map(item => `- **${item.name}**: $${item.price.toLocaleString()}\n  ${item.description}`)
  .join("\n\n")}

## Pricing Summary
- **Subtotal**: $${proposal.totalPrice.toLocaleString()}
- **Taxes**: $${(proposal.totalPrice * 0.05).toLocaleString()} (GST)
- **Total**: $${(proposal.totalPrice * 1.05).toLocaleString()}

## Next Steps
1. Venue tour and finalization
2. Contract signing and deposit
3. Detailed planning timeline
4. Vendor coordination

## Additional Notes
${proposal.notes || "No additional notes provided."}

---
*Proposal generated by Little Bow Meadows Wedding Planning Tool*
*Contact: ${LBM_CONSTANTS.PHONE_DISPLAY} | info@littlebowmeadows.ca*
    `.trim();

    setGeneratedProposal(proposalText);
  };

  const exportProposal = () => {
    const blob = new Blob([generatedProposal], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wedding-proposal-${proposal.coupleName.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wedding Proposal Builder"
        subtitle="Create customized wedding packages and proposals for couples"
      />

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList>
          <TabsTrigger value="builder">Package Builder</TabsTrigger>
          <TabsTrigger value="proposal">Generated Proposal</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Proposal Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Couple & Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="coupleName">Couple's Names</Label>
                      <Input
                        id="coupleName"
                        value={proposal.coupleName}
                        onChange={(e) => updateProposal("coupleName", e.target.value)}
                        placeholder="John & Jane Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventDate">Wedding Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={proposal.eventDate}
                        onChange={(e) => updateProposal("eventDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="guestCount">Guest Count</Label>
                      <Input
                        id="guestCount"
                        type="number"
                        min="1"
                        max="300"
                        value={proposal.guestCount}
                        onChange={(e) => updateProposal("guestCount", parseInt(e.target.value) || 50)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ceremonyType">Ceremony Type</Label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={proposal.ceremonyType}
                        onChange={(e) => updateProposal("ceremonyType", e.target.value)}
                      >
                        <option value="outdoor">Outdoor Prairie Ceremony</option>
                        <option value="indoor">Indoor/Alternative Setup</option>
                        <option value="elopement">Intimate Elopement</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Package Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Package Selection
                  </CardTitle>
                  <CardDescription>
                    Choose base packages and add-ons for your custom proposal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Base Packages */}
                  <div>
                    <h4 className="font-semibold mb-4">Base Packages</h4>
                    <div className="space-y-3">
                      {BASE_PACKAGES.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={item.id}
                            checked={proposal.selectedItems.some(i => i.id === item.id)}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={item.id} className="font-medium cursor-pointer">
                                {item.name}
                              </Label>
                              <span className="font-semibold text-primary">
                                ${item.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Add-Ons */}
                  <div>
                    <h4 className="font-semibold mb-4">Add-Ons & Enhancements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ADD_ONS.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={item.id}
                            checked={proposal.selectedItems.some(i => i.id === item.id)}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <Label htmlFor={item.id} className="font-medium cursor-pointer text-sm">
                                {item.name}
                              </Label>
                              <span className="font-semibold text-primary text-sm">
                                ${item.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={proposal.notes}
                    onChange={(e) => updateProposal("notes", e.target.value)}
                    placeholder="Any special requests, customization notes, or additional information..."
                    rows={4}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Pricing Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Pricing Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {proposal.selectedItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>${item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {proposal.selectedItems.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Subtotal</span>
                        <span>${proposal.totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>GST (5%)</span>
                        <span>${(proposal.totalPrice * 0.05).toFixed(0)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold text-primary">
                        <span>Total</span>
                        <span>${(proposal.totalPrice * 1.05).toFixed(0)}</span>
                      </div>
                    </>
                  )}

                  <Button
                    onClick={generateProposal}
                    className="w-full"
                    disabled={!proposal.coupleName || proposal.selectedItems.length === 0}
                  >
                    Generate Proposal
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Package Includes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Venue coordination and setup</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Day-of coordination services</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Basic lighting and sound</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cleanup and breakdown</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="proposal" className="space-y-6">
          {generatedProposal ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Proposal</CardTitle>
                      <CardDescription>
                        Wedding proposal for {proposal.coupleName}
                      </CardDescription>
                    </div>
                    <Button onClick={exportProposal} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-4 rounded-lg overflow-x-auto">
                    {generatedProposal}
                  </pre>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setGeneratedProposal("")}>
                  Create New Proposal
                </Button>
                <Button onClick={exportProposal}>
                  Download as Markdown
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Proposal Generated Yet</h3>
                <p className="text-muted-foreground">
                  Build your wedding package in the Package Builder tab, then generate a professional proposal.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
