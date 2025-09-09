"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Calendar,
  DollarSign,
  X
} from "lucide-react";

// Mock order data - in real app this would come from database
const mockOrders = [
  {
    id: "ORD-001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    customerPhone: "403-555-0123",
    items: [
      { name: "Farm Eggs (Dozen)", quantity: 2, price: 14.00 },
      { name: "Organic Vegetables Bundle", quantity: 1, price: 25.00 }
    ],
    total: 53.00,
    status: "pending",
    pickupDate: "2024-01-15",
    pickupTime: "10:00 AM",
    notes: "Customer prefers morning pickup",
    createdAt: "2024-01-10T09:30:00Z"
  },
  {
    id: "ORD-002",
    customerName: "Mike Chen",
    customerEmail: "mike@example.com",
    customerPhone: "403-555-0456",
    items: [
      { name: "Fresh Honey", quantity: 3, price: 8.00 }
    ],
    total: 24.00,
    status: "confirmed",
    pickupDate: "2024-01-14",
    pickupTime: "2:00 PM",
    notes: "",
    createdAt: "2024-01-12T14:20:00Z"
  },
  {
    id: "ORD-003",
    customerName: "Emma Wilson",
    customerEmail: "emma@example.com",
    customerPhone: "403-555-0789",
    items: [
      { name: "Seasonal Flower Bouquet", quantity: 1, price: 45.00 },
      { name: "Farm Eggs (Dozen)", quantity: 1, price: 7.00 }
    ],
    total: 52.00,
    status: "completed",
    pickupDate: "2024-01-13",
    pickupTime: "11:30 AM",
    notes: "Wedding pickup - special care needed",
    createdAt: "2024-01-11T16:45:00Z"
  }
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusIcons: Record<string, React.ComponentType<any>> = {
  pending: Clock,
  confirmed: Package,
  completed: CheckCircle,
  cancelled: X
};

export default function OrderTracker() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusStats = () => {
    return orders.reduce((acc: Record<string, number>, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order Tracker</h1>
          <p className="text-muted-foreground">Manage customer orders and pickup coordination</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{stats.pending || 0}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.confirmed || 0}</div>
                <div className="text-xs text-muted-foreground">Confirmed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.completed || 0}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">${orders.reduce((sum, order) => sum + order.total, 0).toFixed(0)}</div>
                <div className="text-xs text-muted-foreground">Total Sales</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Orders</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by customer name or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <CardDescription>{order.customerName}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusColors[order.status]}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {order.status}
                    </Badge>
                    <div className="text-right">
                      <div className="font-bold">${order.total.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4" />
                      {order.customerEmail}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      {order.customerPhone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      Pickup: {order.pickupDate} at {order.pickupTime}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Order Items:</Label>
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                    {order.notes && (
                      <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                        <Label className="text-xs font-medium">Notes:</Label>
                        <div>{order.notes}</div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Little Bow Meadows Farm - Ready for pickup
                  </div>
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "confirmed")}
                      >
                        Confirm Order
                      </Button>
                    )}
                    {order.status === "confirmed" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "completed")}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Orders will appear here when customers make purchases."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
