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
  Mail, 
  MessageSquare, 
  Calendar, 
  Users, 
  TrendingUp, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Target,
  Zap,
  Heart,
  Camera,
  FileText
} from "lucide-react";

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  audience: string;
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  sendDate: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
}

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  imageUrl?: string;
  scheduledDate: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  createdAt: string;
}

interface LeadNurturing {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused' | 'draft';
  conversions: number;
  createdAt: string;
}

const AUDIENCE_SEGMENTS = [
  "All Couples",
  "Inquiry Stage",
  "Touring Stage", 
  "Quoted Stage",
  "Booked Couples",
  "Past Couples",
  "High Priority",
  "Spring Weddings",
  "Summer Weddings",
  "Fall Weddings",
  "Winter Weddings"
];

const SOCIAL_PLATFORMS = [
  "Instagram",
  "Facebook", 
  "Pinterest",
  "TikTok",
  "LinkedIn"
];

const NURTURING_TRIGGERS = [
  "New Inquiry",
  "Venue Tour Completed",
  "Quote Sent",
  "No Response (3 days)",
  "Wedding Date Approaching",
  "Post-Wedding Follow-up",
  "Seasonal Campaign"
];

const EMAIL_TEMPLATES = [
  {
    name: "Welcome New Inquiry",
    subject: "Welcome to Little Bow Meadows - Your Dream Wedding Awaits!",
    content: "Thank you for your interest in Little Bow Meadows! We're excited to help you plan your perfect wedding day..."
  },
  {
    name: "Venue Tour Reminder",
    subject: "Your Venue Tour at Little Bow Meadows - Tomorrow!",
    content: "We're looking forward to showing you our beautiful venue tomorrow. Here are the details..."
  },
  {
    name: "Quote Follow-up",
    subject: "Your Wedding Quote - Questions? We're Here to Help!",
    content: "Thank you for considering Little Bow Meadows for your special day. We'd love to answer any questions..."
  },
  {
    name: "Seasonal Promotion",
    subject: "Spring Wedding Special - Book Now and Save!",
    content: "Spring is the perfect time for a wedding at Little Bow Meadows. Book now and receive 10% off..."
  }
];

export default function MarketingAutomationPage() {
  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [leadNurturing, setLeadNurturing] = useState<LeadNurturing[]>([]);
  const [activeTab, setActiveTab] = useState<'emails' | 'social' | 'nurturing' | 'analytics'>('emails');
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewNurturing, setShowNewNurturing] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<EmailCampaign>>({
    name: '',
    subject: '',
    content: '',
    audience: '',
    status: 'draft',
    sendDate: '',
    recipients: 0,
    openRate: 0,
    clickRate: 0
  });
  const [newPost, setNewPost] = useState<Partial<SocialPost>>({
    platform: '',
    content: '',
    scheduledDate: '',
    status: 'draft',
    engagement: { likes: 0, comments: 0, shares: 0 }
  });
  const [newNurturing, setNewNurturing] = useState<Partial<LeadNurturing>>({
    name: '',
    trigger: '',
    actions: [],
    status: 'draft',
    conversions: 0
  });

  // Load sample data
  useEffect(() => {
    const sampleCampaigns: EmailCampaign[] = [
      {
        id: "1",
        name: "Spring Wedding Promotion",
        subject: "Spring Wedding Special - Book Now and Save!",
        content: "Spring is the perfect time for a wedding at Little Bow Meadows...",
        audience: "All Couples",
        status: "sent",
        sendDate: "2024-01-15",
        recipients: 150,
        openRate: 45.2,
        clickRate: 12.8,
        createdAt: "2024-01-10"
      },
      {
        id: "2",
        name: "Venue Tour Follow-up",
        subject: "Thank you for touring Little Bow Meadows!",
        content: "We hope you enjoyed your tour of our beautiful venue...",
        audience: "Touring Stage",
        status: "scheduled",
        sendDate: "2024-02-01",
        recipients: 25,
        openRate: 0,
        clickRate: 0,
        createdAt: "2024-01-25"
      }
    ];

    const samplePosts: SocialPost[] = [
      {
        id: "1",
        platform: "Instagram",
        content: "Spring weddings at Little Bow Meadows are absolutely magical! 🌸 Book your 2024 wedding now. #WeddingVenue #AlbertaWeddings",
        imageUrl: "/images/spring-wedding.jpg",
        scheduledDate: "2024-02-01",
        status: "scheduled",
        engagement: { likes: 0, comments: 0, shares: 0 },
        createdAt: "2024-01-28"
      },
      {
        id: "2",
        platform: "Facebook",
        content: "Behind the scenes: Preparing for another beautiful wedding at Little Bow Meadows! Our team is ready to make your day perfect.",
        scheduledDate: "2024-01-30",
        status: "published",
        engagement: { likes: 23, comments: 5, shares: 8 },
        createdAt: "2024-01-25"
      }
    ];

    const sampleNurturing: LeadNurturing[] = [
      {
        id: "1",
        name: "New Inquiry Welcome Series",
        trigger: "New Inquiry",
        actions: ["Send welcome email", "Schedule follow-up call", "Send venue brochure"],
        status: "active",
        conversions: 12,
        createdAt: "2024-01-01"
      },
      {
        id: "2",
        name: "Touring Follow-up",
        trigger: "Venue Tour Completed",
        actions: ["Send thank you email", "Schedule quote call", "Send pricing guide"],
        status: "active",
        conversions: 8,
        createdAt: "2024-01-01"
      }
    ];

    setEmailCampaigns(sampleCampaigns);
    setSocialPosts(samplePosts);
    setLeadNurturing(sampleNurturing);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sent': case 'published': return 'bg-green-100 text-green-800';
      case 'paused': case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'paused': case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Edit className="h-4 w-4" />;
    }
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.content) {
      alert("Please fill in all required fields");
      return;
    }

    const campaign: EmailCampaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      subject: newCampaign.subject,
      content: newCampaign.content,
      audience: newCampaign.audience || 'All Couples',
      status: 'draft',
      sendDate: newCampaign.sendDate || '',
      recipients: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setEmailCampaigns([...emailCampaigns, campaign]);
    setNewCampaign({
      name: '',
      subject: '',
      content: '',
      audience: '',
      status: 'draft',
      sendDate: '',
      recipients: 0,
      openRate: 0,
      clickRate: 0
    });
    setShowNewCampaign(false);
  };

  const handleCreatePost = () => {
    if (!newPost.platform || !newPost.content) {
      alert("Please fill in all required fields");
      return;
    }

    const post: SocialPost = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      imageUrl: newPost.imageUrl,
      scheduledDate: newPost.scheduledDate || '',
      status: 'draft',
      engagement: { likes: 0, comments: 0, shares: 0 },
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSocialPosts([...socialPosts, post]);
    setNewPost({
      platform: '',
      content: '',
      scheduledDate: '',
      status: 'draft',
      engagement: { likes: 0, comments: 0, shares: 0 }
    });
    setShowNewPost(false);
  };

  const handleCreateNurturing = () => {
    if (!newNurturing.name || !newNurturing.trigger) {
      alert("Please fill in all required fields");
      return;
    }

    const nurturing: LeadNurturing = {
      id: Date.now().toString(),
      name: newNurturing.name,
      trigger: newNurturing.trigger,
      actions: newNurturing.actions || [],
      status: 'draft',
      conversions: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLeadNurturing([...leadNurturing, nurturing]);
    setNewNurturing({
      name: '',
      trigger: '',
      actions: [],
      status: 'draft',
      conversions: 0
    });
    setShowNewNurturing(false);
  };

  const totalRecipients = emailCampaigns.reduce((sum, campaign) => sum + campaign.recipients, 0);
  const avgOpenRate = emailCampaigns.length > 0 
    ? emailCampaigns.reduce((sum, campaign) => sum + campaign.openRate, 0) / emailCampaigns.length 
    : 0;
  const totalEngagement = socialPosts.reduce((sum, post) => 
    sum + post.engagement.likes + post.engagement.comments + post.engagement.shares, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing Automation</h1>
          <p className="text-muted-foreground">
            Automate your wedding venue marketing with AI-powered campaigns and content
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewCampaign(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
          <Button onClick={() => setShowNewPost(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Email Campaigns</p>
                <p className="text-2xl font-bold">{emailCampaigns.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
                <p className="text-2xl font-bold">{totalRecipients.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Open Rate</p>
                <p className="text-2xl font-bold">{avgOpenRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Social Engagement</p>
                <p className="text-2xl font-bold">{totalEngagement.toLocaleString()}</p>
              </div>
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'emails' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('emails')}
          className="flex-1"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email Campaigns
        </Button>
        <Button
          variant={activeTab === 'social' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('social')}
          className="flex-1"
        >
          <Camera className="h-4 w-4 mr-2" />
          Social Media
        </Button>
        <Button
          variant={activeTab === 'nurturing' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('nurturing')}
          className="flex-1"
        >
          <Zap className="h-4 w-4 mr-2" />
          Lead Nurturing
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('analytics')}
          className="flex-1"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>

      {/* New Campaign Form */}
      {showNewCampaign && (
        <Card>
          <CardHeader>
            <CardTitle>Create Email Campaign</CardTitle>
            <CardDescription>
              Create a new email marketing campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  placeholder="Spring Wedding Promotion"
                />
              </div>
              <div>
                <Label htmlFor="audience">Audience</Label>
                <Select value={newCampaign.audience} onValueChange={(value) => setNewCampaign({...newCampaign, audience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {AUDIENCE_SEGMENTS.map((segment) => (
                      <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject Line *</Label>
                <Input
                  id="subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                  placeholder="Spring Wedding Special - Book Now and Save!"
                />
              </div>
              <div>
                <Label htmlFor="sendDate">Send Date</Label>
                <Input
                  id="sendDate"
                  type="datetime-local"
                  value={newCampaign.sendDate}
                  onChange={(e) => setNewCampaign({...newCampaign, sendDate: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="content">Email Content *</Label>
                <Textarea
                  id="content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                  placeholder="Write your email content here..."
                  rows={6}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign}>
                Create Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* New Post Form */}
      {showNewPost && (
        <Card>
          <CardHeader>
            <CardTitle>Create Social Media Post</CardTitle>
            <CardDescription>
              Create a new social media post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform">Platform *</Label>
                <Select value={newPost.platform} onValueChange={(value) => setNewPost({...newPost, platform: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOCIAL_PLATFORMS.map((platform) => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="scheduledDate">Schedule Date</Label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={newPost.scheduledDate}
                  onChange={(e) => setNewPost({...newPost, scheduledDate: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="postContent">Post Content *</Label>
                <Textarea
                  id="postContent"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Write your post content here..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>
                Create Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Campaigns Tab */}
      {activeTab === 'emails' && (
        <Card>
          <CardHeader>
            <CardTitle>Email Campaigns</CardTitle>
            <CardDescription>
              Manage your email marketing campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailCampaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusIcon(campaign.status)}
                        <span className="ml-1 capitalize">{campaign.status}</span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {campaign.recipients} recipients
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span>{campaign.audience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(campaign.sendDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <span>{campaign.openRate}% open rate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span>{campaign.clickRate}% click rate</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                    {campaign.content.substring(0, 200)}...
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <Card>
          <CardHeader>
            <CardTitle>Social Media Posts</CardTitle>
            <CardDescription>
              Manage your social media content and scheduling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Camera className="h-5 w-5 text-pink-600" />
                      <div>
                        <h3 className="font-semibold">{post.platform}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.scheduledDate ? new Date(post.scheduledDate).toLocaleDateString() : 'Draft'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(post.status)}>
                        {getStatusIcon(post.status)}
                        <span className="ml-1 capitalize">{post.status}</span>
                      </Badge>
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span>{post.engagement.likes} likes</span>
                        <span>{post.engagement.comments} comments</span>
                        <span>{post.engagement.shares} shares</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lead Nurturing Tab */}
      {activeTab === 'nurturing' && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Nurturing Sequences</CardTitle>
            <CardDescription>
              Automate follow-up sequences for different customer stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadNurturing.map((sequence) => (
                <div key={sequence.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <div>
                        <h3 className="font-semibold">{sequence.name}</h3>
                        <p className="text-sm text-muted-foreground">Trigger: {sequence.trigger}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(sequence.status)}>
                        {getStatusIcon(sequence.status)}
                        <span className="ml-1 capitalize">{sequence.status}</span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {sequence.conversions} conversions
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Actions:</h4>
                    <ul className="space-y-1">
                      {sequence.actions.map((action, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Campaigns</span>
                  <span className="font-semibold">{emailCampaigns.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Recipients</span>
                  <span className="font-semibold">{totalRecipients.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Open Rate</span>
                  <span className="font-semibold">{avgOpenRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Click Rate</span>
                  <span className="font-semibold">
                    {emailCampaigns.length > 0 
                      ? (emailCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / emailCampaigns.length).toFixed(1)
                      : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Social Media Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Posts</span>
                  <span className="font-semibold">{socialPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Engagement</span>
                  <span className="font-semibold">{totalEngagement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Published Posts</span>
                  <span className="font-semibold">
                    {socialPosts.filter(p => p.status === 'published').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled Posts</span>
                  <span className="font-semibold">
                    {socialPosts.filter(p => p.status === 'scheduled').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}