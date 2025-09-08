"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Flower2, 
  Calendar, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Droplets,
  Sun,
  Thermometer,
  BarChart3,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface FloralInventory {
  id: string;
  name: string;
  variety: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  harvestDate: string;
  expirationDate: string;
  status: 'fresh' | 'aging' | 'expired' | 'sold';
  location: string;
  notes: string;
}

interface CropPlan {
  id: string;
  flower: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  quantity: number;
  status: 'planted' | 'growing' | 'ready' | 'harvested';
  location: string;
  notes: string;
}

interface FloralOrder {
  id: string;
  customerName: string;
  eventDate: string;
  orderDate: string;
  items: Array<{
    flower: string;
    quantity: number;
    unit: string;
    price: number;
  }>;
  totalPrice: number;
  status: 'pending' | 'in-progress' | 'ready' | 'delivered' | 'cancelled';
  notes: string;
}

const FLOWER_TYPES = [
  "Roses", "Sunflowers", "Lavender", "Peonies", "Daisies", "Tulips", 
  "Lilies", "Carnations", "Chrysanthemums", "Baby's Breath", "Eucalyptus", "Greenery"
];

const SUPPLIERS = [
  "Alberta Seed Co", "Prairie Plants", "Mountain View Seeds", "Local Growers Co-op"
];

const LOCATIONS = [
  "Greenhouse A", "Greenhouse B", "Field 1", "Field 2", "Cold Storage", "Processing Room"
];

export default function FloralOperationsPage() {
  const [inventory, setInventory] = useState<FloralInventory[]>([]);
  const [cropPlans, setCropPlans] = useState<CropPlan[]>([]);
  const [orders, setOrders] = useState<FloralOrder[]>([]);
  const [activeTab, setActiveTab] = useState<'inventory' | 'crops' | 'orders'>('inventory');
  const [showNewItem, setShowNewItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<FloralInventory>>({
    name: '',
    variety: '',
    quantity: 0,
    unit: 'stems',
    costPerUnit: 0,
    supplier: '',
    harvestDate: '',
    expirationDate: '',
    status: 'fresh',
    location: '',
    notes: ''
  });

  // Load sample data
  useEffect(() => {
    const sampleInventory: FloralInventory[] = [
      {
        id: "1",
        name: "Roses",
        variety: "Red Hybrid Tea",
        quantity: 150,
        unit: "stems",
        costPerUnit: 2.50,
        supplier: "Alberta Seed Co",
        harvestDate: "2024-01-15",
        expirationDate: "2024-01-25",
        status: "fresh",
        location: "Cold Storage",
        notes: "Premium quality, long stems"
      },
      {
        id: "2",
        name: "Sunflowers",
        variety: "Giant Yellow",
        quantity: 75,
        unit: "stems",
        costPerUnit: 1.80,
        supplier: "Prairie Plants",
        harvestDate: "2024-01-10",
        expirationDate: "2024-01-20",
        status: "aging",
        location: "Field 1",
        notes: "Ready for summer weddings"
      },
      {
        id: "3",
        name: "Lavender",
        variety: "English",
        quantity: 200,
        unit: "bunches",
        costPerUnit: 3.00,
        supplier: "Mountain View Seeds",
        harvestDate: "2024-01-05",
        expirationDate: "2024-01-30",
        status: "fresh",
        location: "Greenhouse A",
        notes: "Dried, perfect for bouquets"
      }
    ];

    const sampleCrops: CropPlan[] = [
      {
        id: "1",
        flower: "Roses",
        variety: "Pink Garden",
        plantingDate: "2024-01-01",
        expectedHarvest: "2024-03-15",
        quantity: 300,
        status: "growing",
        location: "Greenhouse B",
        notes: "Spring wedding season prep"
      },
      {
        id: "2",
        flower: "Peonies",
        variety: "White Sarah Bernhardt",
        plantingDate: "2023-10-15",
        expectedHarvest: "2024-05-01",
        quantity: 100,
        status: "growing",
        location: "Field 2",
        notes: "Perennial, established plants"
      }
    ];

    const sampleOrders: FloralOrder[] = [
      {
        id: "1",
        customerName: "Sarah & Michael",
        eventDate: "2024-06-15",
        orderDate: "2024-01-15",
        items: [
          { flower: "Roses", quantity: 50, unit: "stems", price: 125 },
          { flower: "Baby's Breath", quantity: 25, unit: "bunches", price: 50 }
        ],
        totalPrice: 175,
        status: "pending",
        notes: "Bridal bouquet and centerpieces"
      },
      {
        id: "2",
        customerName: "Emma & David",
        eventDate: "2024-07-22",
        orderDate: "2024-01-20",
        items: [
          { flower: "Sunflowers", quantity: 100, unit: "stems", price: 180 },
          { flower: "Lavender", quantity: 30, unit: "bunches", price: 90 }
        ],
        totalPrice: 270,
        status: "in-progress",
        notes: "Rustic summer wedding theme"
      }
    ];

    setInventory(sampleInventory);
    setCropPlans(sampleCrops);
    setOrders(sampleOrders);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'bg-green-100 text-green-800';
      case 'aging': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'planted': return 'bg-blue-100 text-blue-800';
      case 'growing': return 'bg-green-100 text-green-800';
      case 'ready': return 'bg-yellow-100 text-yellow-800';
      case 'harvested': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fresh': case 'ready': case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'aging': case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'expired': case 'cancelled': return <AlertTriangle className="h-4 w-4" />;
      case 'growing': return <TrendingUp className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleAddInventory = () => {
    if (!newItem.name || !newItem.quantity || !newItem.supplier) {
      alert("Please fill in all required fields");
      return;
    }

    const item: FloralInventory = {
      id: Date.now().toString(),
      name: newItem.name,
      variety: newItem.variety || '',
      quantity: newItem.quantity || 0,
      unit: newItem.unit || 'stems',
      costPerUnit: newItem.costPerUnit || 0,
      supplier: newItem.supplier,
      harvestDate: newItem.harvestDate || new Date().toISOString().split('T')[0],
      expirationDate: newItem.expirationDate || '',
      status: 'fresh',
      location: newItem.location || '',
      notes: newItem.notes || ''
    };

    setInventory([...inventory, item]);
    setNewItem({
      name: '',
      variety: '',
      quantity: 0,
      unit: 'stems',
      costPerUnit: 0,
      supplier: '',
      harvestDate: '',
      expirationDate: '',
      status: 'fresh',
      location: '',
      notes: ''
    });
    setShowNewItem(false);
  };

  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.quantity * item.costPerUnit), 0);
  const expiringSoon = inventory.filter(item => {
    const expDate = new Date(item.expirationDate);
    const today = new Date();
    const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 3 && diffDays >= 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Floral Farm Operations</h1>
          <p className="text-muted-foreground">
            Manage floral inventory, crop planning, and orders for Little Bow Meadows
          </p>
        </div>
        <Button onClick={() => setShowNewItem(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Inventory
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inventory</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
                <p className="text-2xl font-bold">${totalInventoryValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Crops</p>
                <p className="text-2xl font-bold">{cropPlans.filter(c => c.status === 'growing').length}</p>
              </div>
              <Flower2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {expiringSoon.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800">Inventory Expiring Soon</p>
                <p className="text-sm text-yellow-700">
                  {expiringSoon.length} items will expire within 3 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'inventory' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('inventory')}
          className="flex-1"
        >
          <Package className="h-4 w-4 mr-2" />
          Inventory
        </Button>
        <Button
          variant={activeTab === 'crops' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('crops')}
          className="flex-1"
        >
          <Flower2 className="h-4 w-4 mr-2" />
          Crop Planning
        </Button>
        <Button
          variant={activeTab === 'orders' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('orders')}
          className="flex-1"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Orders
        </Button>
      </div>

      {/* New Item Form */}
      {showNewItem && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Inventory Item</CardTitle>
            <CardDescription>
              Add flowers or supplies to the inventory
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Flower Type *</Label>
                <Select value={newItem.name} onValueChange={(value) => setNewItem({...newItem, name: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flower type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FLOWER_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="variety">Variety</Label>
                <Input
                  id="variety"
                  value={newItem.variety}
                  onChange={(e) => setNewItem({...newItem, variety: e.target.value})}
                  placeholder="e.g., Red Hybrid Tea"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={newItem.unit} onValueChange={(value) => setNewItem({...newItem, unit: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stems">Stems</SelectItem>
                    <SelectItem value="bunches">Bunches</SelectItem>
                    <SelectItem value="plants">Plants</SelectItem>
                    <SelectItem value="pounds">Pounds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cost">Cost Per Unit</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={newItem.costPerUnit}
                  onChange={(e) => setNewItem({...newItem, costPerUnit: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="supplier">Supplier *</Label>
                <Select value={newItem.supplier} onValueChange={(value) => setNewItem({...newItem, supplier: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPLIERS.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="harvest">Harvest Date</Label>
                <Input
                  id="harvest"
                  type="date"
                  value={newItem.harvestDate}
                  onChange={(e) => setNewItem({...newItem, harvestDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="expiration">Expiration Date</Label>
                <Input
                  id="expiration"
                  type="date"
                  value={newItem.expirationDate}
                  onChange={(e) => setNewItem({...newItem, expirationDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={newItem.location} onValueChange={(value) => setNewItem({...newItem, location: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newItem.notes}
                  onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                  placeholder="Additional notes about this inventory item..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewItem(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddInventory}>
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <Card>
          <CardHeader>
            <CardTitle>Floral Inventory</CardTitle>
            <CardDescription>
              Current inventory of flowers and supplies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Flower2 className="h-5 w-5 text-purple-600" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.variety}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status}</span>
                      </Badge>
                      <span className="text-lg font-bold">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span>{item.supplier}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Harvest: {new Date(item.harvestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-gray-500" />
                      <span>Expires: {new Date(item.expirationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <span>Value: ${(item.quantity * item.costPerUnit).toLocaleString()}</span>
                    </div>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Crop Planning Tab */}
      {activeTab === 'crops' && (
        <Card>
          <CardHeader>
            <CardTitle>Crop Planning</CardTitle>
            <CardDescription>
              Track growing crops and harvest schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cropPlans.map((crop) => (
                <div key={crop.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Flower2 className="h-5 w-5 text-green-600" />
                      <div>
                        <h3 className="font-semibold">{crop.flower}</h3>
                        <p className="text-sm text-muted-foreground">{crop.variety}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(crop.status)}>
                        {getStatusIcon(crop.status)}
                        <span className="ml-1 capitalize">{crop.status}</span>
                      </Badge>
                      <span className="text-lg font-bold">{crop.quantity} plants</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Planted: {new Date(crop.plantingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Expected: {new Date(crop.expectedHarvest).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span>Location: {crop.location}</span>
                    </div>
                  </div>
                  {crop.notes && (
                    <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                      {crop.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <CardTitle>Floral Orders</CardTitle>
            <CardDescription>
              Manage customer orders and deliveries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">{order.customerName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Event: {new Date(order.eventDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status.replace('-', ' ')}</span>
                      </Badge>
                      <span className="text-lg font-bold">${order.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Order Items:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity} {item.unit} {item.flower}</span>
                        <span>${item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                      {order.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}