'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Package, CheckCircle, XCircle, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_cents: number;
  created_at: string;
  items: Array<{
    qty: number;
    product_name: string;
  }>;
  notes: string;
}

interface PickupSlot {
  slotTime: string;
  orders: Order[];
  totalItems: number;
}

interface RunSheetData {
  date: string;
  runSheet: PickupSlot[];
  totalOrders: number;
  totalItems: number;
}

export default function PickupsPage() {
  const [runSheet, setRunSheet] = useState<RunSheetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRunSheet();
  }, []);

  const fetchRunSheet = async () => {
    try {
      const response = await fetch('/api/orders/today');
      const data = await response.json();
      setRunSheet(data);
    } catch (error) {
      console.error('Error fetching run sheet:', error);
      toast({
        title: 'Error',
        description: 'Failed to load pickup run sheet',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'ready' | 'collected') => {
    setUpdating(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        await fetchRunSheet(); // Refresh the data
        toast({
          title: 'Status Updated',
          description: `Order marked as ${status}`
        });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive'
      });
    } finally {
      setUpdating(null);
    }
  };

  const formatCurrency = (cents: number) => {
    return (cents / 100).toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD'
    });
  };

  const exportRunSheet = () => {
    if (!runSheet) return;

    const csvContent = [
      ['Pickup Time', 'Customer', 'Email', 'Items', 'Total', 'Status'].join(','),
      ...runSheet.runSheet.flatMap(slot =>
        slot.orders.map(order =>
          [
            slot.slotTime,
            `"${order.customer_name || 'Unknown'}"`,
            `"${order.customer_email}"`,
            `"${order.items.map(item => `${item.qty}x ${item.product_name}`).join(', ')}"`,
            formatCurrency(order.total_cents),
            'Ready'
          ].join(',')
        )
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pickup-run-sheet-${runSheet.date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Exported',
      description: 'Run sheet exported as CSV'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading pickup run sheet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pickup Management</h1>
          <p className="text-gray-600">Today's orders organized by pickup time</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchRunSheet}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportRunSheet}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      {runSheet && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{runSheet.totalOrders}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold">{runSheet.totalItems}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pickup Slots</p>
                  <p className="text-2xl font-bold">{runSheet.runSheet.length}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Run Sheet */}
      {runSheet && runSheet.runSheet.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Orders Today</h3>
            <p className="text-gray-600">
              There are no paid orders scheduled for pickup today.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {runSheet?.runSheet.map((slot) => (
            <Card key={slot.slotTime}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {slot.slotTime} Pickup
                  </span>
                  <Badge variant="secondary">
                    {slot.orders.length} orders • {slot.totalItems} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Order Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {slot.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.customer_name || 'Unknown Customer'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.customer_email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.items.map((item, idx) => (
                              <div key={idx}>
                                {item.qty}x {item.product_name}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(order.total_cents)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleTimeString('en-CA', {
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              disabled={updating === order.id}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Ready
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'collected')}
                              disabled={updating === order.id}
                            >
                              <Package className="h-3 w-3 mr-1" />
                              Collected
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
