'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ExternalLink, Copy, BarChart3, QrCode } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface Link {
  id: string;
  label: string;
  target_url: string;
  short_slug: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
  active: boolean;
  hits: number;
  recentHits: number;
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    label: '',
    target_url: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links');
        const data = await response.json();
        setLinks(data.links);
      } catch (error) {
        console.error('Error fetching links:', error);
        toast({
          title: 'Error',
          description: 'Failed to load links',
          variant: 'destructive'
        });
    } finally {
      setLoading(false);
    };

    fetchLinks();
  }, [toast]);

  const createLink = async () => {
    if (!formData.label || !formData.target_url) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in label and target URL',
        variant: 'destructive'
      });
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setLinks(prev => [data.link, ...prev]);
        setFormData({
          label: '',
          target_url: '',
          utm_source: '',
          utm_medium: '',
          utm_campaign: ''
        });
        setIsDialogOpen(false);
        toast({
          title: 'Success',
          description: 'Link created successfully'
        });
      } else {
        throw new Error('Failed to create link');
      }
    } catch (error) {
      console.error('Error creating link:', error);
      toast({
        title: 'Error',
        description: 'Failed to create link',
        variant: 'destructive'
      });
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Link copied to clipboard'
    });
  };

  const getShortUrl = (slug: string) => {
    return `${window.location.origin}/r/${slug}`;
  };

  const generateQR = async (slug: string) => {
    const shortUrl = getShortUrl(slug);
    try {
      const response = await fetch(`/api/qr?url=${encodeURIComponent(shortUrl)}`);
      const data = await response.json();

      // Open QR code in new window or download
      const link = document.createElement('a');
      link.href = data.qrCode;
      link.download = `qr-${slug}.png`;
      link.click();

      toast({
        title: 'QR Code Generated',
        description: 'QR code downloaded successfully'
      });
    } catch (error) {
      console.error('Error generating QR:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate QR code',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading links...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Link & QR Campaigns</h1>
          <p className="text-gray-600">Track marketing attribution and generate QR codes</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g., Farmers Market Poster"
                />
              </div>

              <div>
                <Label htmlFor="target_url">Target URL</Label>
                <Input
                  id="target_url"
                  value={formData.target_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, target_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="utm_source">UTM Source</Label>
                  <Input
                    id="utm_source"
                    value={formData.utm_source}
                    onChange={(e) => setFormData(prev => ({ ...prev, utm_source: e.target.value }))}
                    placeholder="e.g., instagram"
                  />
                </div>

                <div>
                  <Label htmlFor="utm_medium">UTM Medium</Label>
                  <Input
                    id="utm_medium"
                    value={formData.utm_medium}
                    onChange={(e) => setFormData(prev => ({ ...prev, utm_medium: e.target.value }))}
                    placeholder="e.g., bio"
                  />
                </div>

                <div>
                  <Label htmlFor="utm_campaign">UTM Campaign</Label>
                  <Input
                    id="utm_campaign"
                    value={formData.utm_campaign}
                    onChange={(e) => setFormData(prev => ({ ...prev, utm_campaign: e.target.value }))}
                    placeholder="e.g., summer2024"
                  />
                </div>
              </div>

              <Button onClick={createLink} disabled={creating} className="w-full">
                {creating ? 'Creating...' : 'Create Link'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Links</p>
                <p className="text-2xl font-bold">{links.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold">{links.reduce((sum, link) => sum + link.hits, 0)}</p>
              </div>
              <ExternalLink className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">{links.reduce((sum, link) => sum + link.recentHits, 0)}</p>
              </div>
              <QrCode className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Links Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <div className="text-center py-8">
              <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No links yet</h3>
              <p className="text-gray-600 mb-4">Create your first tracking link to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Link
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Short URL</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>This Week</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.label}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {getShortUrl(link.short_slug)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(getShortUrl(link.short_slug))}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{link.hits}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.recentHits > 0 ? "default" : "outline"}>
                        {link.recentHits}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(link.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(getShortUrl(link.short_slug), '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generateQR(link.short_slug)}
                        >
                          <QrCode className="h-3 w-3" />
                        </Button>
                      </div>
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
