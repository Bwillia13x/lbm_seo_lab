'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Users, TrendingUp, Home, Download, RefreshCw, Clock, Link as LinkIcon, BarChart3, Search, Settings } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface CapacityData {
  date: string;
  occupied: boolean;
  weekday: number;
  capacity: number;
}

interface DashboardStats {
  todaysCapacity: number;
  todaysPickups: number;
  thisWeekRevenue: number;
  occupancyStatus: boolean;
}

export default function LabDashboard() {
  const [capacityData, setCapacityData] = useState<CapacityData | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    todaysCapacity: 0,
    todaysPickups: 0,
    thisWeekRevenue: 0,
    occupancyStatus: false
  });
  const [todayTimeline, setTodayTimeline] = useState<{ start_ts: string; reserved: number; capacity: number; available: number }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get today's capacity
    const today = new Date().toISOString().split('T')[0];
    fetch(`/api/capacity/${today}`)
      .then(res => res.json())
      .then(data => {
        setCapacityData(data);
        setStats(prev => ({
          ...prev,
          todaysCapacity: data.capacity,
          occupancyStatus: data.occupied
        }));
      })
      .catch(console.error);

    // Fetch today's pickups timeline
    fetch('/api/pickups/today')
      .then(res => res.json())
      .then(data => {
        setTodayTimeline(data.timeline || []);
        setStats(prev => ({ ...prev, todaysPickups: (data.totals?.reserved || 0) }));
      })
      .catch(console.error);
  }, []);

  const occupancyColor = stats.occupancyStatus ? 'destructive' : 'default';
  const occupancyText = stats.occupancyStatus ? 'Airbnb Occupied' : 'Available';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">LBM Operations Lab</h1>
            <Badge variant="outline">Internal Dashboard</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today: Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant="outline"
            onClick={async () => {
              const res = await fetch('/api/airbnb/refresh');
              toast({ title: res.ok ? 'Airbnb refreshed' : 'Refresh failed', variant: res.ok ? 'success' : 'destructive' });
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh Airbnb
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              const res = await fetch('/api/pickup-slots/generate', { method: 'POST' });
              toast({ title: res.ok ? 'Slots generated' : 'Generation failed', variant: res.ok ? 'success' : 'destructive' });
            }}
          >
            <Clock className="h-4 w-4 mr-2" /> Generate Slots (14d)
          </Button>
          <Button asChild variant="outline">
            <a href="/api/exports/pickups.csv" download>
              <Download className="h-4 w-4 mr-2" /> Export Today Pickups CSV
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/api/exports/links.csv" download>
              <Download className="h-4 w-4 mr-2" /> Export Links CSV
            </a>
          </Button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Capacity</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todaysCapacity}</div>
              <p className="text-xs text-muted-foreground">pickup slots available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Pickups</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todaysPickups}</div>
              <p className="text-xs text-muted-foreground">confirmed reservations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.thisWeekRevenue}</div>
              <p className="text-xs text-muted-foreground">gross margin %</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Airbnb Status</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={occupancyColor}>{occupancyText}</Badge>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.occupancyStatus ? 'Reduced pickup capacity' : 'Normal operations'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Today Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Today’s Pickups Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {todayTimeline.length === 0 ? (
              <p className="text-muted-foreground">No pickups scheduled today.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Reserved</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayTimeline.map((row) => (
                    <TableRow key={row.start_ts}>
                      <TableCell>{new Date(row.start_ts).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}</TableCell>
                      <TableCell>{row.reserved}</TableCell>
                      <TableCell>{row.capacity}</TableCell>
                      <TableCell>{row.available}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="pickups" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pickups
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Links/QR
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pickups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Scheduler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Use the quick actions above to refresh Airbnb and generate slots. Manage details in the Pickups page.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Stock tracking and alerts coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Event pre-order management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Command Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Schema markup and GBP checklist coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Customer insights and waitlist coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Margins & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Revenue tracking and SKU analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Safety & Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Manage panic mode, auto-pause thresholds, and blackout days for operational safety.</p>
                <Button asChild className="mt-4">
                  <a href="/lab/settings">Open Settings</a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
