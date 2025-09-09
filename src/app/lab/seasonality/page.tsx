'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Plus, CheckCircle, Circle, RefreshCw } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface SeasonalTask {
  id: string;
  task: string;
  due_date: string;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
}

interface SeasonalityRule {
  id: string;
  product_name: string;
  start_week: number;
  end_week: number;
  active: boolean;
}

export default function SeasonalityPage() {
  const [tasks, setTasks] = useState<SeasonalTask[]>([]);
  const [rules, setRules] = useState<SeasonalityRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    product_name: '',
    start_week: '',
    end_week: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchRules();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/seasonality/tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error',
        description: 'Failed to load seasonal tasks',
        variant: 'destructive'
      });
    }
  };

  const fetchRules = async () => {
    try {
      const response = await fetch('/api/seasonality/rules');
      const data = await response.json();
      setRules(data.rules);
    } catch (error) {
      console.error('Error fetching rules:', error);
      toast({
        title: 'Error',
        description: 'Failed to load seasonality rules',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createRule = async () => {
    if (!formData.product_name || !formData.start_week || !formData.end_week) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    const startWeek = parseInt(formData.start_week);
    const endWeek = parseInt(formData.end_week);

    if (startWeek >= endWeek) {
      toast({
        title: 'Validation Error',
        description: 'End week must be after start week',
        variant: 'destructive'
      });
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/seasonality/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: formData.product_name,
          start_week: startWeek,
          end_week: endWeek
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRules(prev => [...prev, data.rule]);
        setFormData({
          product_name: '',
          start_week: '',
          end_week: ''
        });
        setIsDialogOpen(false);
        toast({
          title: 'Success',
          description: 'Seasonality rule created successfully'
        });
      } else {
        throw new Error('Failed to create rule');
      }
    } catch (error) {
      console.error('Error creating rule:', error);
      toast({
        title: 'Error',
        description: 'Failed to create seasonality rule',
        variant: 'destructive'
      });
    } finally {
      setCreating(false);
    }
  };

  const updateTask = async (id: string, completed: boolean) => {
    try {
      const response = await fetch('/api/seasonality/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed })
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, ...data.task } : task
          )
        );
        toast({
          title: 'Updated',
          description: 'Task status updated successfully'
        });
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      });
    }
  };

  const generateTasks = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/seasonality/tasks', {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        await fetchTasks(); // Refresh tasks list
        toast({
          title: 'Success',
          description: data.message
        });
      } else {
        throw new Error('Failed to generate tasks');
      }
    } catch (error) {
      console.error('Error generating tasks:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate seasonal tasks',
        variant: 'destructive'
      });
    } finally {
      setGenerating(false);
    }
  };

  const getWeekName = (weekNum: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Approximate month based on week number
    const monthIndex = Math.floor((weekNum - 1) / 4.3);
    return `${monthNames[Math.min(monthIndex, 11)]} (Week ${weekNum})`;
  };

  const getCurrentWeek = () => {
    return Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading seasonality planner...</p>
        </div>
      </div>
    );
  }

  const currentWeek = getCurrentWeek();
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Seasonality Planner</h1>
          <p className="text-gray-600">Manage seasonal product availability and automated tasks</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={generateTasks}
            disabled={generating}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
            Generate Tasks
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Seasonality Rule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product_name">Product Name</Label>
                  <Input
                    id="product_name"
                    value={formData.product_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, product_name: e.target.value }))}
                    placeholder="e.g., Strawberries"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_week">Start Week (1-52)</Label>
                    <Input
                      id="start_week"
                      type="number"
                      min="1"
                      max="52"
                      value={formData.start_week}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_week: e.target.value }))}
                      placeholder="22"
                    />
                  </div>

                  <div>
                    <Label htmlFor="end_week">End Week (1-52)</Label>
                    <Input
                      id="end_week"
                      type="number"
                      min="1"
                      max="52"
                      value={formData.end_week}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_week: e.target.value }))}
                      placeholder="35"
                    />
                  </div>
                </div>

                <Button onClick={createRule} disabled={creating} className="w-full">
                  {creating ? 'Creating...' : 'Create Rule'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Week</p>
                <p className="text-2xl font-bold">{currentWeek}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
              <Circle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Rules</p>
                <p className="text-2xl font-bold">{rules.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <CardTitle>Seasonal Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending seasonal tasks at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={(checked) => updateTask(task.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <p className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.task}
                    </p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seasonality Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Seasonality Rules</CardTitle>
        </CardHeader>
        <CardContent>
          {rules.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No seasonality rules</h3>
              <p className="text-gray-600 mb-4">Add rules to automatically generate seasonal tasks.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Rule
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Season Start</TableHead>
                  <TableHead>Season End</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.product_name}</TableCell>
                    <TableCell>{getWeekName(rule.start_week)}</TableCell>
                    <TableCell>{getWeekName(rule.end_week)}</TableCell>
                    <TableCell>
                      {currentWeek >= rule.start_week && currentWeek <= rule.end_week ? (
                        <Badge className="bg-green-100 text-green-800">In Season</Badge>
                      ) : currentWeek < rule.start_week ? (
                        <Badge variant="outline">Upcoming</Badge>
                      ) : (
                        <Badge variant="secondary">Off Season</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
