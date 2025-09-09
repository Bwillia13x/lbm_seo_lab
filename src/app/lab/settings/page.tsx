'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Shield, Settings, FileText } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface GlobalSettings {
  panic_mode: boolean;
  auto_pause_threshold: number;
}

interface BlackoutDay {
  day: string;
  reason: string;
  created_at: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<GlobalSettings>({
    panic_mode: false,
    auto_pause_threshold: 8
  });
  const [blackoutDays, setBlackoutDays] = useState<BlackoutDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newBlackoutDay, setNewBlackoutDay] = useState('');
  const [newBlackoutReason, setNewBlackoutReason] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
    fetchBlackoutDays();
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch('/api/audit?limit=20');
      const data = await response.json();
      setAuditLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive'
      });
    }
  };

  const fetchBlackoutDays = async () => {
    try {
      const response = await fetch('/api/blackout-days');
      const data = await response.json();
      setBlackoutDays(data.blackoutDays || []);
    } catch (error) {
      console.error('Error fetching blackout days:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async () => {
    setUpdating(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast({
          title: 'Settings Updated',
          description: 'Global settings have been saved successfully'
        });
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive'
      });
    } finally {
      setUpdating(false);
    }
  };

  const addBlackoutDay = async () => {
    if (!newBlackoutDay || !newBlackoutReason) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in both date and reason',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('/api/blackout-days', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: newBlackoutDay,
          reason: newBlackoutReason
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBlackoutDays(prev => [...prev, data.blackoutDay]);
        setNewBlackoutDay('');
        setNewBlackoutReason('');
        toast({
          title: 'Blackout Day Added',
          description: 'The blackout day has been added successfully'
        });
      } else {
        throw new Error('Failed to add blackout day');
      }
    } catch (error) {
      console.error('Error adding blackout day:', error);
      toast({
        title: 'Error',
        description: 'Failed to add blackout day',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Safety & Settings</h1>
          <p className="text-gray-600">Manage panic mode, auto-pause, and blackout days</p>
        </div>
      </div>

      {/* Panic Mode Warning */}
      {settings.panic_mode && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-900">Panic Mode Active</h3>
              <p className="text-sm text-red-700">
                Online ordering is currently paused. Customers will see a message to contact you directly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Global Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="panic-mode" className="text-base font-medium">
                Panic Mode
              </Label>
              <p className="text-sm text-gray-600">
                Immediately disable all online ordering. Use during emergencies or high-demand periods.
              </p>
            </div>
            <Switch
              id="panic-mode"
              checked={settings.panic_mode}
              onCheckedChange={(checked) =>
                setSettings(prev => ({ ...prev, panic_mode: checked }))
              }
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="auto-pause-threshold" className="text-base font-medium">
              Auto-Pause Threshold (%)
            </Label>
            <p className="text-sm text-gray-600">
              Automatically pause ordering when today's reservation percentage exceeds this threshold.
            </p>
            <Input
              id="auto-pause-threshold"
              type="number"
              min="0"
              max="100"
              value={settings.auto_pause_threshold}
              onChange={(e) =>
                setSettings(prev => ({
                  ...prev,
                  auto_pause_threshold: parseInt(e.target.value) || 0
                }))
              }
              className="w-32"
            />
          </div>

          <Button onClick={updateSettings} disabled={updating}>
            {updating ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>

      {/* Blackout Days */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Blackout Days
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Manually block specific dates from pickup scheduling (e.g., holidays, maintenance days).
          </p>

          <div className="flex gap-4">
            <div className="space-y-2">
              <Label htmlFor="blackout-date">Date</Label>
              <Input
                id="blackout-date"
                type="date"
                value={newBlackoutDay}
                onChange={(e) => setNewBlackoutDay(e.target.value)}
              />
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="blackout-reason">Reason</Label>
              <Input
                id="blackout-reason"
                placeholder="e.g., Holiday closure"
                value={newBlackoutReason}
                onChange={(e) => setNewBlackoutReason(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addBlackoutDay}>
                Add Day
              </Button>
            </div>
          </div>

          {blackoutDays.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blackoutDays.map((day) => (
                  <TableRow key={day.day}>
                    <TableCell>{new Date(day.day).toLocaleDateString()}</TableCell>
                    <TableCell>{day.reason}</TableCell>
                    <TableCell>{new Date(day.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            System activity and changes for operational visibility.
          </p>

          {auditLogs.length === 0 ? (
            <p className="text-gray-500">No recent activity</p>
          ) : (
            <div className="space-y-2">
              {auditLogs.map((log: any) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {log.action}
                      </Badge>
                      <span className="text-sm font-medium">{log.entity}</span>
                      {log.entity_id && (
                        <code className="text-xs bg-gray-200 px-1 rounded">
                          {log.entity_id.substring(0, 8)}...
                        </code>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      by {log.actor} • {new Date(log.ts).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
