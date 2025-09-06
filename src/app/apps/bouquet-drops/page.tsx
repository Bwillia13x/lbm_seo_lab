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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import {
  Flower,
  Calendar,
  Users,
  Clock,
  MapPin,
  Bell,
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

interface BouquetDrop {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  available: number;
  dropDate: string;
  pickupStart: string;
  pickupEnd: string;
  flowers: string[];
  status: "draft" | "active" | "ended";
}

interface WorkshopSignup {
  id: string;
  workshopId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  participants: number;
  specialRequests: string;
  signupDate: string;
  status: "confirmed" | "waitlist" | "cancelled";
}

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  maxParticipants: number;
  currentSignups: number;
  price: number;
  status: "upcoming" | "full" | "past";
}

const SAMPLE_DROPS: BouquetDrop[] = [
  {
    id: "spring-tulips",
    name: "Spring Tulip Collection",
    description: "Fresh tulips in vibrant spring colors",
    price: 45,
    quantity: 50,
    available: 23,
    dropDate: "2024-04-15",
    pickupStart: "2024-04-16",
    pickupEnd: "2024-04-20",
    flowers: ["Tulips", "Hyacinths", "Daffodils"],
    status: "active",
  },
  {
    id: "summer-wildflowers",
    name: "Prairie Wildflowers",
    description: "Local wildflowers and native blooms",
    price: 55,
    quantity: 30,
    available: 12,
    dropDate: "2024-06-01",
    pickupStart: "2024-06-02",
    pickupEnd: "2024-06-08",
    flowers: ["Black-eyed Susans", "Prairie Lilies", "Coneflowers"],
    status: "draft",
  },
];

const SAMPLE_WORKSHOPS: Workshop[] = [
  {
    id: "bridal-basics",
    title: "Bridal Bouquet Basics",
    description: "Learn to create beautiful bridal bouquets with seasonal flowers",
    date: "2024-04-20",
    time: "10:00 AM",
    duration: "3 hours",
    maxParticipants: 8,
    currentSignups: 5,
    price: 85,
    status: "upcoming",
  },
  {
    id: "centerpieces",
    title: "Reception Centerpieces",
    description: "Design stunning centerpieces for wedding receptions",
    date: "2024-04-25",
    time: "2:00 PM",
    duration: "2.5 hours",
    maxParticipants: 10,
    currentSignups: 8,
    price: 75,
    status: "upcoming",
  },
];

export default function BouquetDrops() {
  const [drops, setDrops] = useState<BouquetDrop[]>(SAMPLE_DROPS);
  const [workshops, setWorkshops] = useState<Workshop[]>(SAMPLE_WORKSHOPS);
  const [signups, setSignups] = useState<WorkshopSignup[]>([]);
  const [activeTab, setActiveTab] = useState("drops");

  // Load data from localStorage on mount
  useEffect(() => {
    const savedDrops = localStorage.getItem("lbm_bouquet_drops");
    const savedWorkshops = localStorage.getItem("lbm_workshops");
    const savedSignups = localStorage.getItem("lbm_workshop_signups");

    if (savedDrops) setDrops(JSON.parse(savedDrops));
    if (savedWorkshops) setWorkshops(JSON.parse(savedWorkshops));
    if (savedSignups) setSignups(JSON.parse(savedSignups));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("lbm_bouquet_drops", JSON.stringify(drops));
  }, [drops]);

  useEffect(() => {
    localStorage.setItem("lbm_workshops", JSON.stringify(workshops));
  }, [workshops]);

  useEffect(() => {
    localStorage.setItem("lbm_workshop_signups", JSON.stringify(signups));
  }, [signups]);

  const createNewDrop = () => {
    const newDrop: BouquetDrop = {
      id: Date.now().toString(),
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      available: 0,
      dropDate: "",
      pickupStart: "",
      pickupEnd: "",
      flowers: [],
      status: "draft",
    };
    setDrops([...drops, newDrop]);
  };

  const createNewWorkshop = () => {
    const newWorkshop: Workshop = {
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      maxParticipants: 0,
      currentSignups: 0,
      price: 0,
      status: "upcoming",
    };
    setWorkshops([...workshops, newWorkshop]);
  };

  const updateDrop = (id: string, updates: Partial<BouquetDrop>) => {
    setDrops(drops.map(drop =>
      drop.id === id ? { ...drop, ...updates } : drop
    ));
  };

  const updateWorkshop = (id: string, updates: Partial<Workshop>) => {
    setWorkshops(workshops.map(workshop =>
      workshop.id === id ? { ...workshop, ...updates } : workshop
    ));
  };

  const deleteDrop = (id: string) => {
    setDrops(drops.filter(drop => drop.id !== id));
  };

  const deleteWorkshop = (id: string) => {
    setWorkshops(workshops.filter(workshop => workshop.id !== id));
  };

  const addWorkshopSignup = (workshopId: string, signup: Omit<WorkshopSignup, "id" | "signupDate" | "workshopId">) => {
    const newSignup: WorkshopSignup = {
      id: Date.now().toString(),
      workshopId,
      signupDate: new Date().toISOString(),
      ...signup,
    };
    setSignups([...signups, newSignup]);

    // Update workshop participant count
    setWorkshops(workshops.map(w =>
      w.id === workshopId
        ? { ...w, currentSignups: w.currentSignups + signup.participants }
        : w
    ));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bouquet Drops & Workshop Manager"
        subtitle="Manage seasonal floral offerings and workshop registrations"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="drops">Bouquet Drops</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="signups">Signups</TabsTrigger>
        </TabsList>

        {/* Bouquet Drops Tab */}
        <TabsContent value="drops" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Seasonal Bouquet Drops</h3>
              <p className="text-sm text-muted-foreground">
                Manage limited-quantity floral offerings
              </p>
            </div>
            <Button onClick={createNewDrop}>
              <Plus className="h-4 w-4 mr-2" />
              New Drop
            </Button>
          </div>

          <div className="grid gap-4">
            {drops.map((drop) => (
              <Card key={drop.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{drop.name || "Untitled Drop"}</CardTitle>
                      <CardDescription>{drop.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={drop.status === "active" ? "default" : "secondary"}>
                        {drop.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteDrop(drop.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium">Price</Label>
                      <p className="text-lg font-semibold">${drop.price}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Available</Label>
                      <p className="text-lg font-semibold">{drop.available}/{drop.quantity}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Drop Date</Label>
                      <p className="text-sm">{drop.dropDate || "Not set"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Flowers Included</Label>
                    <div className="flex flex-wrap gap-1">
                      {drop.flowers.map((flower, index) => (
                        <Badge key={index} variant="outline">{flower}</Badge>
                      ))}
                    </div>
                  </div>

                  {drop.pickupStart && drop.pickupEnd && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Pickup: {drop.pickupStart} to {drop.pickupEnd}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Workshops Tab */}
        <TabsContent value="workshops" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Floral Workshops</h3>
              <p className="text-sm text-muted-foreground">
                Manage workshop offerings and capacity
              </p>
            </div>
            <Button onClick={createNewWorkshop}>
              <Plus className="h-4 w-4 mr-2" />
              New Workshop
            </Button>
          </div>

          <div className="grid gap-4">
            {workshops.map((workshop) => (
              <Card key={workshop.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{workshop.title || "Untitled Workshop"}</CardTitle>
                      <CardDescription>{workshop.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={workshop.status === "upcoming" ? "default" : "secondary"}>
                        {workshop.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteWorkshop(workshop.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium">Date & Time</Label>
                      <p className="text-sm">{workshop.date} at {workshop.time}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Duration</Label>
                      <p className="text-sm">{workshop.duration}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Participants</Label>
                      <p className="text-sm">{workshop.currentSignups}/{workshop.maxParticipants}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Price</Label>
                      <p className="text-lg font-semibold">${workshop.price}</p>
                    </div>
                  </div>

                  {workshop.currentSignups >= workshop.maxParticipants && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-yellow-800">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Workshop is at capacity</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Signups Tab */}
        <TabsContent value="signups" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Workshop Signups</h3>
            <p className="text-sm text-muted-foreground">
              Manage workshop registrations and waitlists
            </p>
          </div>

          <div className="grid gap-4">
            {signups.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Signups Yet</h3>
                  <p className="text-muted-foreground">
                    Workshop registrations will appear here once customers sign up.
                  </p>
                </CardContent>
              </Card>
            ) : (
              signups.map((signup) => {
                const workshop = workshops.find(w => w.id === signup.workshopId);
                return (
                  <Card key={signup.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{signup.customerName}</CardTitle>
                          <CardDescription>
                            {workshop?.title} - {signup.signupDate.split('T')[0]}
                          </CardDescription>
                        </div>
                        <Badge variant={signup.status === "confirmed" ? "default" : "secondary"}>
                          {signup.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Contact</Label>
                          <p className="text-sm">{signup.customerEmail}</p>
                          <p className="text-sm">{signup.customerPhone}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Details</Label>
                          <p className="text-sm">{signup.participants} participant(s)</p>
                          {signup.specialRequests && (
                            <p className="text-sm text-muted-foreground mt-1">
                              "{signup.specialRequests}"
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
