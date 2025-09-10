'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface MarketEvent {
  id: string;
  name: string;
  slug: string;
  event_date: string;
  location: string;
  order_deadline: string;
  active: boolean;
  event_products: Array<{
    product_id: string;
    limit_per_customer: number;
  }>;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  price_cents: number;
  currency: string;
  unit: string;
  in_stock: boolean;
}

export default function MarketEventPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [event, setEvent] = useState<MarketEvent | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventAndProducts = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(`/api/market-events/${slug}`);
        if (!eventResponse.ok) {
          throw new Error('Event not found');
        }
        const eventData = await eventResponse.json();
        setEvent(eventData.event);

        // Fetch products available for this event
        const productIds = eventData.event.event_products.map((ep: any) => ep.product_id);
        if (productIds.length > 0) {
          const productsResponse = await fetch('/api/products?ids=' + productIds.join(','));
          const productsData = await productsResponse.json();
          setProducts(productsData.products);
        }

        setLoading(false);
    } catch (err) {
      console.error('Error fetching event:', err);
      setError('Failed to load event details');
      setLoading(false);
    };

    fetchEventAndProducts();
  }, [slug]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (cents: number) => {
    return (cents / 100).toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD'
    });
  };

  const isDeadlinePassed = (deadline: string) => {
    return new Date() > new Date(deadline);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-4">
              {error || "The market event you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/">Back to Shop</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const deadlinePassed = isDeadlinePassed(event.order_deadline);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Event Date</p>
                    <p className="font-medium">{formatDate(event.event_date)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Order Deadline</p>
                    <p className="font-medium">{formatDate(event.order_deadline)}</p>
                    {deadlinePassed && (
                      <Badge variant="destructive" className="mt-1">
                        Deadline Passed
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Available Products</h2>

          {products.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Products Available</h3>
                <p className="text-gray-600">
                  Products for this event will be announced soon.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(product.price_cents)}
                      </span>
                      <span className="text-sm text-gray-500">per {product.unit}</span>
                    </div>

                    {deadlinePassed ? (
                      <Button disabled className="w-full">
                        Deadline Passed
                      </Button>
                    ) : (
                      <Button asChild className="w-full">
                        <Link href={`/product/${product.slug}?event=${event.slug}`}>
                          Pre-Order Now
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Event Info */}
        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Pre-Order Benefits</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Guaranteed availability of your favorite products</li>
                <li>Skip the line at the market</li>
                <li>Pickup your pre-ordered items quickly</li>
                <li>Support local farming directly</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">How It Works</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                <li>Browse and select products above</li>
                <li>Complete your order by the deadline</li>
                <li>Pay securely through our checkout</li>
                <li>Pick up your items at the market on event day</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Need help?</strong> Contact us at orders@littlebowmeadows.ca
                or call us directly. We're here to make your market experience smooth!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
