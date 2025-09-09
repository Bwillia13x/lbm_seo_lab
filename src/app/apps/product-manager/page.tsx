"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit2, Trash2, Save, X, Package, DollarSign, Image as ImageIcon } from "lucide-react";
import { allProducts, findBySlug } from "@/lib/products";
import { formatCAD } from "@/lib/currency";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  currency: string;
  price_cents: number;
  stripe_price_id: string;
  unit: string;
  in_stock: boolean;
  max_per_order: number;
  pickup_only: boolean;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    setProducts(allProducts());
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleSave = () => {
    if (!editingProduct) return;

    // In a real app, this would save to a database
    // For now, we'll just update the local state
    setProducts(prev =>
      prev.map(p => p.id === editingProduct.id ? editingProduct : p)
    );
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      slug: "",
      name: "",
      description: "",
      image: "/images/PRAIRIESIGNALLOGO.png",
      currency: "CAD",
      price_cents: 0,
      stripe_price_id: "",
      unit: "each",
      in_stock: true,
      max_per_order: 10,
      pickup_only: true
    };
    setEditingProduct(newProduct);
    setIsAddingNew(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Manager</h1>
          <p className="text-muted-foreground">Manage your farm products and pricing</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={product.in_stock ? "default" : "secondary"}>
                    {product.in_stock ? "In Stock" : "Out of Stock"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Price</Label>
                  <div className="font-medium">{formatCAD(product.price_cents)}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Unit</Label>
                  <div className="font-medium">{product.unit}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Max per Order</Label>
                  <div className="font-medium">{product.max_per_order}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Stripe Price ID</Label>
                  <div className="font-mono text-xs truncate">{product.stripe_price_id}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>{isAddingNew ? "Add New Product" : "Edit Product"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={editingProduct.slug}
                  onChange={(e) => setEditingProduct({...editingProduct, slug: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (cents)</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingProduct.price_cents}
                  onChange={(e) => setEditingProduct({...editingProduct, price_cents: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={editingProduct.unit}
                  onChange={(e) => setEditingProduct({...editingProduct, unit: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxOrder">Max per Order</Label>
                <Input
                  id="maxOrder"
                  type="number"
                  value={editingProduct.max_per_order}
                  onChange={(e) => setEditingProduct({...editingProduct, max_per_order: parseInt(e.target.value) || 1})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripeId">Stripe Price ID</Label>
                <Input
                  id="stripeId"
                  value={editingProduct.stripe_price_id}
                  onChange={(e) => setEditingProduct({...editingProduct, stripe_price_id: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                checked={editingProduct.in_stock}
                onChange={(e) => setEditingProduct({...editingProduct, in_stock: e.target.checked})}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <Separator />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Product
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Product Images
          </CardTitle>
          <CardDescription>
            Upload high-quality images for your products to /public/images/
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Current images should be placed in the <code>/public/images/</code> directory.
            Update the "image" field in each product to reference the correct image path.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
