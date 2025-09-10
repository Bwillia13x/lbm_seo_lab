'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, CheckCircle, Circle, Code, FileText, Star } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  completed: boolean;
  notes: string;
  updated_at: string;
}

export default function SEOPage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [schemaMarkup, setSchemaMarkup] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await fetch('/api/seo/checklist');
        const data = await response.json();
        setChecklist(data.checklist);
      } catch (error) {
        console.error('Error fetching checklist:', error);
        toast({
          title: 'Error',
          description: 'Failed to load SEO checklist',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchSchemaMarkup = async () => {
      try {
        const response = await fetch('/api/seo/schema');
        const data = await response.json();
        setSchemaMarkup(data);
      } catch (error) {
        console.error('Error fetching schema markup:', error);
      }
    };

    fetchChecklist();
    fetchSchemaMarkup();
  }, [toast]);

  const updateChecklistItem = async (id: string, completed: boolean, notes: string) => {
    try {
      const response = await fetch('/api/seo/checklist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed, notes })
      });

      if (response.ok) {
        const data = await response.json();
        setChecklist(prev =>
          prev.map(item =>
            item.id === id ? { ...item, ...data.item } : item
          )
        );
        toast({
          title: 'Updated',
          description: 'Checklist item updated successfully'
        });
      } else {
        throw new Error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating checklist item:', error);
      toast({
        title: 'Error',
        description: 'Failed to update checklist item',
        variant: 'destructive'
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Schema markup copied to clipboard'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'primary_category':
      case 'secondary_categories':
        return '🏷️';
      case 'hours':
        return '🕐';
      case 'photos':
        return '📸';
      case 'products':
        return '🥕';
      case 'attributes':
        return '✨';
      case 'description':
        return '📝';
      case 'website':
        return '🌐';
      case 'phone':
        return '📞';
      case 'address':
        return '📍';
      default:
        return '✅';
    }
  };

  const getCompletionRate = () => {
    if (checklist.length === 0) return 0;
    const completed = checklist.filter(item => item.completed).length;
    return Math.round((completed / checklist.length) * 100);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading SEO tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SEO Command Center</h1>
          <p className="text-gray-600">Local SEO tools and Google Business Profile optimization</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {getCompletionRate()}% Complete
        </Badge>
      </div>

      <Tabs defaultValue="checklist" className="space-y-6">
        <TabsList>
          <TabsTrigger value="checklist">GBP Checklist</TabsTrigger>
          <TabsTrigger value="schema">Schema Markup</TabsTrigger>
          <TabsTrigger value="reviews">Review Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Google Business Profile Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Complete these items to improve your local search visibility and Google Business Profile ranking.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {checklist
              .reduce((groups: { [key: string]: ChecklistItem[] }, item) => {
                if (!groups[item.category]) {
                  groups[item.category] = [];
                }
                groups[item.category].push(item);
                return groups;
              }, {})
              .map((items: ChecklistItem[], category: string) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg capitalize flex items-center gap-2">
                      <span>{getCategoryIcon(category)}</span>
                      {category.replace('_', ' ')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={(checked) =>
                            updateChecklistItem(item.id, checked as boolean, item.notes)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={item.completed ? 'line-through text-gray-500' : ''}>
                              {item.item}
                            </span>
                            {item.completed && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <Textarea
                            placeholder="Add notes or details..."
                            value={item.notes}
                            onChange={(e) =>
                              updateChecklistItem(item.id, item.completed, e.target.value)
                            }
                            className="text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="schema" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                JSON-LD Schema Markup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Code className="h-4 w-4" />
                <AlertDescription>
                  Add these schema markups to your website to help search engines understand your business better.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {schemaMarkup && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Local Business Schema</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(schemaMarkup.business, null, 2)}
                  </pre>
                  <Button
                    onClick={() => copyToClipboard(JSON.stringify(schemaMarkup.business, null, 2))}
                    className="mt-4"
                  >
                    Copy Schema
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Schema (Example)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(schemaMarkup.product, null, 2)}
                  </pre>
                  <Button
                    onClick={() => copyToClipboard(JSON.stringify(schemaMarkup.product, null, 2))}
                    className="mt-4"
                  >
                    Copy Schema
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organization Schema</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(schemaMarkup.organization, null, 2)}
                  </pre>
                  <Button
                    onClick={() => copyToClipboard(JSON.stringify(schemaMarkup.organization, null, 2))}
                    className="mt-4"
                  >
                    Copy Schema
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Review Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Star className="h-4 w-4" />
                <AlertDescription>
                  Track and manage customer reviews across platforms. Use the templates below for consistent responses.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Positive Review Response Template</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  className="min-h-20"
                  value="Thank you so much for your kind words! We're thrilled that you enjoyed our farm-fresh products. Your support means the world to our small family farm. We look forward to serving you again soon! 🌱"
                />
                <Button
                  onClick={() => copyToClipboard("Thank you so much for your kind words! We're thrilled that you enjoyed our farm-fresh products. Your support means the world to our small family farm. We look forward to serving you again soon! 🌱")}
                  className="mt-2"
                >
                  Copy Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Constructive Feedback Response Template</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  className="min-h-20"
                  value="Thank you for your feedback! We truly appreciate you taking the time to share your experience. We're always looking for ways to improve and will take your suggestions into consideration. Please don't hesitate to reach out directly if you'd like to discuss this further. We value your input and hope to serve you better in the future."
                />
                <Button
                  onClick={() => copyToClipboard("Thank you for your feedback! We truly appreciate you taking the time to share your experience. We're always looking for ways to improve and will take your suggestions into consideration. Please don't hesitate to reach out directly if you'd like to discuss this further. We value your input and hope to serve you better in the future.")}
                  className="mt-2"
                >
                  Copy Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
