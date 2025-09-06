import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MapPin,
  Users,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Wifi,
  Car,
  Coffee,
  Mountain,
  TreePine,
  Waves,
  Flower,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const aframeFeatures = [
  {
    icon: Home,
    title: "Rustic A-Frame Design",
    description: "Charming A-frame cabin with modern amenities and prairie views",
  },
  {
    icon: Mountain,
    title: "Riverfront Location",
    description: "Direct access to the Little Bow River for fishing and relaxation",
  },
  {
    icon: TreePine,
    title: "Prairie Setting",
    description: "Surrounded by Alberta's natural beauty and farm landscapes",
  },
  {
    icon: Users,
    title: "Perfect for Groups",
    description: "Sleeps up to 6 guests comfortably for families or small gatherings",
  },
];

const amenities = [
  {
    category: "Essentials",
    items: [
      "WiFi",
      "Heating",
      "Essentials (towels, bed sheets, soap, toilet paper)",
      "Hair dryer",
      "Iron",
    ],
  },
  {
    category: "Kitchen & Dining",
    items: [
      "Refrigerator",
      "Microwave",
      "Coffee maker",
      "Cooking basics (pots, pans, utensils)",
      "Dishes and silverware",
      "Dining table",
    ],
  },
  {
    category: "Outdoor",
    items: [
      "Private backyard",
      "River access",
      "Fire pit",
      "Outdoor furniture",
      "BBQ grill",
    ],
  },
  {
    category: "Entertainment",
    items: [
      "TV with cable",
      "Board games",
      "Books",
      "Sound system",
      "Fireplace",
    ],
  },
];

const nearbyAttractions = [
  {
    name: "Little Bow River",
    description: "Fishing, kayaking, and scenic walks along the river",
    distance: "On-site",
  },
  {
    name: "High River",
    description: "Historic town with shops, restaurants, and events",
    distance: "15 minutes",
  },
  {
    name: "Calgary",
    description: "Major city amenities and attractions",
    distance: "45 minutes",
  },
  {
    name: "Prairie Trails",
    description: "Hiking and biking paths through beautiful landscapes",
    distance: "5 minutes",
  },
];

const seasonalActivities = [
  {
    season: "Spring",
    activities: ["Wildflower viewing", "River fishing", "Bird watching", "Farm tours"],
  },
  {
    season: "Summer",
    activities: ["Swimming", "Camping", "BBQ gatherings", "Stargazing"],
  },
  {
    season: "Fall",
    activities: ["Leaf viewing", "Harvest festivals", "Photography", "Hiking"],
  },
  {
    season: "Winter",
    activities: ["Ice fishing", "Snowshoeing", "Holiday lights", "Cozy fires"],
  },
];

export default function StayPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Airbnb A-Frame Rental
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            A-Frame on the Little Bow River
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Escape to our charming A-frame cabin nestled on the Little Bow River.
            Perfect for families, couples, or small groups seeking a peaceful prairie retreat
            with modern comforts and stunning natural surroundings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white">
            <Calendar className="h-5 w-5 mr-2" />
            Book on Airbnb
          </Button>
          <Button variant="outline" size="lg">
            <Phone className="h-5 w-5 mr-2" />
            Check Availability
          </Button>
        </div>
      </div>

      {/* A-Frame Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aframeFeatures.map((feature, index) => (
          <Card key={index} className="text-center group hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accommodation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Sleeping Arrangements</CardTitle>
            <CardDescription>Comfortable sleeping for up to 6 guests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Bedroom 1</h4>
              <p className="text-sm text-muted-foreground">Queen bed with river views</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Bedroom 2</h4>
              <p className="text-sm text-muted-foreground">Two twin beds (can convert to king)</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Living Area</h4>
              <p className="text-sm text-muted-foreground">Sofa bed for additional sleeping</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              <span>Sleeps up to 6 guests</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>House Rules & Policies</CardTitle>
            <CardDescription>Important information for your stay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Check-in/Check-out</h4>
              <p className="text-sm text-muted-foreground">
                Check-in: 4:00 PM<br />
                Check-out: 11:00 AM
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Pets</h4>
              <p className="text-sm text-muted-foreground">Pets welcome with approval</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Smoking</h4>
              <p className="text-sm text-muted-foreground">No smoking indoors</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Events</h4>
              <p className="text-sm text-muted-foreground">Small gatherings allowed with notice</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities & Features</CardTitle>
          <CardDescription>
            Everything you need for a comfortable prairie stay
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold">{category.category}</h4>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Seasonal Activities
          </CardTitle>
          <CardDescription>
            Make the most of your stay with seasonal adventures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalActivities.map((season, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-center">{season.season}</h4>
                <ul className="space-y-2">
                  {season.activities.map((activity, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Attractions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Attractions
          </CardTitle>
          <CardDescription>
            Explore the beauty of Southern Alberta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">{attraction.name}</h4>
                  <p className="text-sm text-muted-foreground">{attraction.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {attraction.distance}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farm Connection */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="h-5 w-5" />
            Little Bow Meadows Farm Experience
          </CardTitle>
          <CardDescription>
            Enhance your stay with our farm activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <Flower className="h-8 w-8 mx-auto text-primary" />
              <h4 className="font-semibold">Flower Farm Tours</h4>
              <p className="text-sm text-muted-foreground">
                Take a guided tour of our seasonal flower fields
              </p>
            </div>
            <div className="text-center space-y-2">
              <Waves className="h-8 w-8 mx-auto text-primary" />
              <h4 className="font-semibold">River Activities</h4>
              <p className="text-sm text-muted-foreground">
                Fishing, kayaking, and scenic river walks
              </p>
            </div>
            <div className="text-center space-y-2">
              <Coffee className="h-8 w-8 mx-auto text-primary" />
              <h4 className="font-semibold">Farm Fresh Breakfast</h4>
              <p className="text-sm text-muted-foreground">
                Optional farm-fresh breakfast delivery
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button variant="outline">
              Learn About Farm Activities
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Booking CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Experience Prairie Hospitality</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book your stay in our charming A-frame and create memories amidst
            Alberta's natural beauty. Perfect for a romantic getaway, family retreat,
            or prairie adventure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <Home className="h-5 w-5 mr-2" />
              Book on Airbnb
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Contact Host
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
