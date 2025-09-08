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
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  Heart, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Star,
  MessageSquare,
  FileText,
  Camera
} from "lucide-react";

interface WeddingCouple {
  id: string;
  coupleName: string;
  email: string;
  phone: string;
  weddingDate: string;
  guestCount: number;
  package: string;
  budget: number;
  status: 'inquiry' | 'touring' | 'quoted' | 'booked' | 'planning' | 'completed' | 'cancelled';
  leadSource: string;
  notes: string;
  lastContact: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  createdAt: string;
}

interface Task {
  id: string;
  coupleId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  createdAt: string;
}

const WEDDING_PACKAGES = [
  "Rustic Barn Package",
  "Garden Elegance Package", 
  "Grand Celebration Package",
  "Custom Package"
];

const LEAD_SOURCES = [
  "Website",
  "Google Search",
  "Facebook",
  "Instagram",
  "Referral",
  "Wedding Fair",
  "Vendor Referral",
  "Other"
];

const TEAM_MEMBERS = [
  "Sarah (Owner)",
  "Mike (Venue Manager)",
  "Emma (Floral Designer)",
  "David (Event Coordinator)"
];

export default function WeddingCRMPage() {
  const [couples, setCouples] = useState<WeddingCouple[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'couples' | 'tasks' | 'analytics'>('couples');
  const [showNewCouple, setShowNewCouple] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [newCouple, setNewCouple] = useState<Partial<WeddingCouple>>({
    coupleName: '',
    email: '',
    phone: '',
    weddingDate: '',
    guestCount: 50,
    package: '',
    budget: 0,
    status: 'inquiry',
    leadSource: '',
    notes: '',
    priority: 'medium',
    assignedTo: '',
    lastContact: new Date().toISOString().split('T')[0]
  });
  const [newTask, setNewTask] = useState<Partial<Task>>({
    coupleId: '',
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    assignedTo: ''
  });

  // Load sample data
  useEffect(() => {
    const sampleCouples: WeddingCouple[] = [
      {
        id: "1",
        coupleName: "Sarah & Michael",
        email: "sarah.michael@email.com",
        phone: "403-555-0123",
        weddingDate: "2024-06-15",
        guestCount: 85,
        package: "Garden Elegance Package",
        budget: 15000,
        status: "booked",
        leadSource: "Website",
        notes: "Interested in outdoor ceremony, tented reception. Love rustic theme.",
        lastContact: "2024-01-20",
        priority: "high",
        assignedTo: "Sarah (Owner)",
        createdAt: "2024-01-15"
      },
      {
        id: "2",
        coupleName: "Emma & David",
        email: "emma.david@email.com",
        phone: "403-555-0456",
        weddingDate: "2024-07-22",
        guestCount: 120,
        package: "Grand Celebration Package",
        budget: 25000,
        status: "planning",
        leadSource: "Instagram",
        notes: "Full venue access, premium package. Very excited about floral arrangements.",
        lastContact: "2024-01-25",
        priority: "high",
        assignedTo: "Mike (Venue Manager)",
        createdAt: "2024-01-20"
      },
      {
        id: "3",
        coupleName: "Jessica & Ryan",
        email: "jessica.ryan@email.com",
        phone: "403-555-0789",
        weddingDate: "2024-08-10",
        guestCount: 60,
        package: "Rustic Barn Package",
        budget: 8000,
        status: "touring",
        leadSource: "Referral",
        notes: "Intimate ceremony, rustic theme. Budget conscious but very interested.",
        lastContact: "2024-01-28",
        priority: "medium",
        assignedTo: "Emma (Floral Designer)",
        createdAt: "2024-01-25"
      },
      {
        id: "4",
        coupleName: "Amanda & Chris",
        email: "amanda.chris@email.com",
        phone: "403-555-0321",
        weddingDate: "2024-09-05",
        guestCount: 100,
        package: "Garden Elegance Package",
        budget: 12000,
        status: "quoted",
        leadSource: "Google Search",
        notes: "Received quote, considering options. Very responsive to follow-ups.",
        lastContact: "2024-01-30",
        priority: "medium",
        assignedTo: "David (Event Coordinator)",
        createdAt: "2024-01-28"
      }
    ];

    const sampleTasks: Task[] = [
      {
        id: "1",
        coupleId: "1",
        title: "Finalize ceremony timeline",
        description: "Confirm ceremony start time and coordinate with photographer",
        dueDate: "2024-02-15",
        status: "pending",
        priority: "high",
        assignedTo: "Sarah (Owner)",
        createdAt: "2024-01-20"
      },
      {
        id: "2",
        coupleId: "2",
        title: "Floral consultation",
        description: "Meet with couple to discuss bouquet and centerpiece designs",
        dueDate: "2024-02-10",
        status: "in-progress",
        priority: "medium",
        assignedTo: "Emma (Floral Designer)",
        createdAt: "2024-01-25"
      },
      {
        id: "3",
        coupleId: "3",
        title: "Venue tour scheduling",
        description: "Schedule venue tour for Jessica & Ryan",
        dueDate: "2024-02-05",
        status: "pending",
        priority: "high",
        assignedTo: "Mike (Venue Manager)",
        createdAt: "2024-01-28"
      }
    ];

    setCouples(sampleCouples);
    setTasks(sampleTasks);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'inquiry': return 'bg-blue-100 text-blue-800';
      case 'touring': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'booked': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'booked': case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'planning': case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleAddCouple = () => {
    if (!newCouple.coupleName || !newCouple.email) {
      alert("Please fill in all required fields");
      return;
    }

    const couple: WeddingCouple = {
      id: Date.now().toString(),
      coupleName: newCouple.coupleName,
      email: newCouple.email || '',
      phone: newCouple.phone || '',
      weddingDate: newCouple.weddingDate || '',
      guestCount: newCouple.guestCount || 50,
      package: newCouple.package || '',
      budget: newCouple.budget || 0,
      status: 'inquiry',
      leadSource: newCouple.leadSource || '',
      notes: newCouple.notes || '',
      lastContact: new Date().toISOString().split('T')[0],
      priority: newCouple.priority || 'medium',
      assignedTo: newCouple.assignedTo || '',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCouples([...couples, couple]);
    setNewCouple({
      coupleName: '',
      email: '',
      phone: '',
      weddingDate: '',
      guestCount: 50,
      package: '',
      budget: 0,
      status: 'inquiry',
      leadSource: '',
      notes: '',
      priority: 'medium',
      assignedTo: '',
      lastContact: new Date().toISOString().split('T')[0]
    });
    setShowNewCouple(false);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.coupleId) {
      alert("Please fill in all required fields");
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      coupleId: newTask.coupleId,
      title: newTask.title,
      description: newTask.description || '',
      dueDate: newTask.dueDate || '',
      status: 'pending',
      priority: newTask.priority || 'medium',
      assignedTo: newTask.assignedTo || '',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks([...tasks, task]);
    setNewTask({
      coupleId: '',
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
      priority: 'medium',
      assignedTo: ''
    });
    setShowNewTask(false);
  };

  const filteredCouples = couples.filter(couple => {
    const matchesSearch = couple.coupleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         couple.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || couple.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const upcomingWeddings = couples.filter(couple => {
    const weddingDate = new Date(couple.weddingDate);
    const today = new Date();
    const diffDays = Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 30 && diffDays >= 0;
  });

  const totalRevenue = couples
    .filter(couple => couple.status === 'booked' || couple.status === 'planning')
    .reduce((sum, couple) => sum + couple.budget, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wedding CRM</h1>
          <p className="text-muted-foreground">
            Manage wedding inquiries, couple relationships, and planning process for Little Bow Meadows
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewCouple(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Couple
          </Button>
          <Button onClick={() => setShowNewTask(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Couples</p>
                <p className="text-2xl font-bold">{couples.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Booked Weddings</p>
                <p className="text-2xl font-bold">{couples.filter(c => c.status === 'booked' || c.status === 'planning').length}</p>
              </div>
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming (30 days)</p>
                <p className="text-2xl font-bold">{upcomingWeddings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'couples' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('couples')}
          className="flex-1"
        >
          <Users className="h-4 w-4 mr-2" />
          Couples
        </Button>
        <Button
          variant={activeTab === 'tasks' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('tasks')}
          className="flex-1"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Tasks
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('analytics')}
          className="flex-1"
        >
          <FileText className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>

      {/* New Couple Form */}
      {showNewCouple && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Couple</CardTitle>
            <CardDescription>
              Add a new wedding couple to the CRM system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coupleName">Couple Name *</Label>
                <Input
                  id="coupleName"
                  value={newCouple.coupleName}
                  onChange={(e) => setNewCouple({...newCouple, coupleName: e.target.value})}
                  placeholder="Sarah & Michael"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCouple.email}
                  onChange={(e) => setNewCouple({...newCouple, email: e.target.value})}
                  placeholder="sarah.michael@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newCouple.phone}
                  onChange={(e) => setNewCouple({...newCouple, phone: e.target.value})}
                  placeholder="403-555-0123"
                />
              </div>
              <div>
                <Label htmlFor="weddingDate">Wedding Date</Label>
                <Input
                  id="weddingDate"
                  type="date"
                  value={newCouple.weddingDate}
                  onChange={(e) => setNewCouple({...newCouple, weddingDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="guestCount">Guest Count</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={newCouple.guestCount}
                  onChange={(e) => setNewCouple({...newCouple, guestCount: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newCouple.budget}
                  onChange={(e) => setNewCouple({...newCouple, budget: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="package">Package Interest</Label>
                <Select value={newCouple.package} onValueChange={(value) => setNewCouple({...newCouple, package: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {WEDDING_PACKAGES.map((pkg) => (
                      <SelectItem key={pkg} value={pkg}>{pkg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="leadSource">Lead Source</Label>
                <Select value={newCouple.leadSource} onValueChange={(value) => setNewCouple({...newCouple, leadSource: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAD_SOURCES.map((source) => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newCouple.priority} onValueChange={(value) => setNewCouple({...newCouple, priority: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select value={newCouple.assignedTo} onValueChange={(value) => setNewCouple({...newCouple, assignedTo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_MEMBERS.map((member) => (
                      <SelectItem key={member} value={member}>{member}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCouple.notes}
                  onChange={(e) => setNewCouple({...newCouple, notes: e.target.value})}
                  placeholder="Additional notes about this couple..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewCouple(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCouple}>
                Add Couple
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* New Task Form */}
      {showNewTask && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>
              Add a new task for wedding planning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coupleId">Couple *</Label>
                <Select value={newTask.coupleId} onValueChange={(value) => setNewTask({...newTask, coupleId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select couple" />
                  </SelectTrigger>
                  <SelectContent>
                    {couples.map((couple) => (
                      <SelectItem key={couple.id} value={couple.id}>{couple.coupleName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g., Venue tour scheduling"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select value={newTask.assignedTo} onValueChange={(value) => setNewTask({...newTask, assignedTo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_MEMBERS.map((member) => (
                      <SelectItem key={member} value={member}>{member}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Task description..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewTask(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Couples Tab */}
      {activeTab === 'couples' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Wedding Couples</CardTitle>
                <CardDescription>
                  Manage wedding inquiries and couple relationships
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search couples..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="inquiry">Inquiry</SelectItem>
                    <SelectItem value="touring">Touring</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCouples.map((couple) => (
                <div key={couple.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-pink-600" />
                      <div>
                        <h3 className="font-semibold">{couple.coupleName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Wedding: {couple.weddingDate ? new Date(couple.weddingDate).toLocaleDateString() : 'TBD'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(couple.status)}>
                        {getStatusIcon(couple.status)}
                        <span className="ml-1 capitalize">{couple.status}</span>
                      </Badge>
                      <Badge className={getPriorityColor(couple.priority)}>
                        {couple.priority}
                      </Badge>
                      <span className="text-lg font-bold">${couple.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{couple.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{couple.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{couple.guestCount} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-gray-500" />
                      <span>{couple.leadSource}</span>
                    </div>
                  </div>
                  {couple.notes && (
                    <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                      {couple.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <Card>
          <CardHeader>
            <CardTitle>Wedding Planning Tasks</CardTitle>
            <CardDescription>
              Track and manage wedding planning tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => {
                const couple = couples.find(c => c.id === task.coupleId);
                return (
                  <div key={task.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {couple?.coupleName} • Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Assigned to: {task.assignedTo}</span>
                      <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {LEAD_SOURCES.map((source) => {
                  const count = couples.filter(c => c.leadSource === source).length;
                  return (
                    <div key={source} className="flex justify-between">
                      <span>{source}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['inquiry', 'touring', 'quoted', 'booked', 'planning', 'completed', 'cancelled'].map((status) => {
                  const count = couples.filter(c => c.status === status).length;
                  return (
                    <div key={status} className="flex justify-between">
                      <span className="capitalize">{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}