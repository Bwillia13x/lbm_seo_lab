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
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  RefreshCw,
  Calendar,
  BarChart3
} from "lucide-react";

// Mock inventory data
const inventoryData = [
  {
    id: 1,
    name: "Farm Eggs (Dozen)",
    currentStock: 45,
    maxStock: 100,
    minStock: 10,
    unit: "dozen",
    category: "Protein",
    supplier: "Farm Production",
    lastRestocked: "2024-01-10",
    expiryDate: "2024-02-10",
    salesVelocity: "high",
    reorderPoint: 20
  },
  {
    id: 2,
    name: "Organic Vegetables Bundle",
    currentStock: 12,
    maxStock: 50,
    minStock: 5,
    unit: "bundles",
    category: "Produce",
    supplier: "Local Farmers",
    lastRestocked: "2024-01-08",
    expiryDate: null,
    salesVelocity: "medium",
    reorderPoint: 15
  },
  {
    id: 3,
    name: "Fresh Honey",
    currentStock: 8,
    maxStock: 30,
    minStock: 3,
    unit: "jars",
    category: "Pantry",
    supplier: "Bee Cooperative",
    lastRestocked: "2024-01-05",
    expiryDate: "2025-01-05",
    salesVelocity: "low",
    reorderPoint: 5
  },
  {
    id: 4,
    name: "Seasonal Flower Bouquet",
    currentStock: 3,
    maxStock: 25,
    minStock: 2,
    unit: "bouquets",
    category: "Floral",
    supplier: "Flower Farm",
    lastRestocked: "2024-01-12",
    expiryDate: null,
    salesVelocity: "high",
    reorderPoint: 8
  },
  {
    id: 5,
    name: "Herb Garden Kit",
    currentStock: 15,
    maxStock: 40,
    minStock: 4,
    unit: "kits",
    category: "Gardening",
    supplier: "Garden Supply Co",
    lastRestocked: "2024-01-09",
    expiryDate: "2024-12-31",
    salesVelocity: "medium",
    reorderPoint: 10
  }
];

const getStockStatus = (current: number, min: number, reorder: number) => {
  if (current <= min) return { status: "critical", color: "bg-red-100 text-red-800", icon: AlertTriangle };
  if (current <= reorder) return { status: "low", color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle };
  return { status: "good", color: "bg-green-100 text-green-800", icon: CheckCircle };
};

const getVelocityColor = (velocity: string) => {
  switch (velocity) {
    case "high": return "text-red-600";
    case "medium": return "text-yellow-600";
    case "low": return "text-green-600";
    default: return "text-gray-600";
  }
};

export default function InventoryManager() {
  const [inventory, setInventory] = useState(inventoryData);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const updateStock = (id: number, change: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, currentStock: Math.max(0, item.currentStock + change) }
          : item
      )
    );
  };

  const filteredInventory = selectedCategory === "all"
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  const categories = ["all", ...Array.from(new Set(inventory.map(item => item.category)))];
  const lowStockItems = inventory.filter(item => item.currentStock <= item.reorderPoint);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Manager</h1>
          <p className="text-muted-foreground">Track stock levels and manage farm product inventory</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alerts ({lowStockItems.length})
            </CardTitle>
            <CardDescription className="text-amber-700">
              These items need to be restocked soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.currentStock} {item.unit} remaining
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    Reorder needed
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Inventory Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div>
              <Label>Category Filter</Label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="ml-2 px-3 py-2 border rounded-md text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{inventory.length}</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {inventory.filter(item => getStockStatus(item.currentStock, item.minStock, item.reorderPoint).status === "good").length}
              </div>
              <div className="text-sm text-muted-foreground">Well Stocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {inventory.filter(item => getStockStatus(item.currentStock, item.minStock, item.reorderPoint).status === "low").length}
              </div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {inventory.filter(item => getStockStatus(item.currentStock, item.minStock, item.reorderPoint).status === "critical").length}
              </div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>Manage stock levels and track inventory status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.minStock, item.reorderPoint);
              const StatusIcon = stockStatus.icon;

              return (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge className={stockStatus.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {stockStatus.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{item.currentStock} {item.unit}</div>
                      <div className="text-sm text-muted-foreground">
                        of {item.maxStock} max
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">Supplier</Label>
                      <div className="font-medium">{item.supplier}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Last Restocked</Label>
                      <div className="font-medium">{new Date(item.lastRestocked).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Sales Velocity</Label>
                      <div className={`font-medium ${getVelocityColor(item.salesVelocity)}`}>
                        {item.salesVelocity}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Reorder Point</Label>
                      <div className="font-medium">{item.reorderPoint} {item.unit}</div>
                    </div>
                  </div>

                  {item.expiryDate && (
                    <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                      <Label className="text-xs font-medium">Expiry Date:</Label>
                      <span className="ml-2">{new Date(item.expiryDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStock(item.id, -1)}
                        disabled={item.currentStock <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium min-w-[3rem] text-center">
                        {item.currentStock}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStock(item.id, 1)}
                        disabled={item.currentStock >= item.maxStock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Restock
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stock Level Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Level Overview</CardTitle>
          <CardDescription>Visual representation of current inventory levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventory.map((item) => {
              const percentage = (item.currentStock / item.maxStock) * 100;
              const stockStatus = getStockStatus(item.currentStock, item.minStock, item.reorderPoint);

              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span>{item.currentStock}/{item.maxStock} {item.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        stockStatus.status === "critical" ? "bg-red-500" :
                        stockStatus.status === "low" ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
