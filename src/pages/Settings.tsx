
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSaveGeneralSettings = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings.</p>
        </div>
        
        <Tabs defaultValue="general" className="animate-fade-in">
          <TabsList className={isMobile ? "grid w-full grid-cols-2" : ""}>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            {!isMobile && <TabsTrigger value="security">Security</TabsTrigger>}
            {!isMobile && <TabsTrigger value="notifications">Notifications</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage the general settings for your application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="Snip AI" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input id="site-description" defaultValue="Audio and Video Transcription Tool" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" defaultValue="support@snip.ai" />
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable the application for maintenance
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register
                    </p>
                  </div>
                  <Switch id="user-registration" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Configure API settings and keys.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" type="password" defaultValue="sk_live_12345678901234567890" className="flex-1" />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Your API key is secret. Do not share it with anyone.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" defaultValue="https://example.com/webhook" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-access">API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable external API access
                    </p>
                  </div>
                  <Switch id="api-access" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => toast.success("API settings saved!")}>
                  Save API Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>
                  Manage billing settings for your application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-key">Stripe API Key</Label>
                  <div className="flex gap-2">
                    <Input id="stripe-key" type="password" defaultValue="sk_live_example_stripe_key" className="flex-1" />
                    <Button variant="outline">Update</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <select 
                    id="currency" 
                    className="w-full px-3 py-2 rounded-md border border-border bg-background"
                    defaultValue="USD"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="invoice-emails">Invoice Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Send invoice emails to customers
                    </p>
                  </div>
                  <Switch id="invoice-emails" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="receipt-emails">Receipt Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Send receipt emails to customers
                    </p>
                  </div>
                  <Switch id="receipt-emails" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => toast.success("Billing settings saved!")}>
                  Save Billing Settings
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                  Configure subscription plans and pricing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Basic Plan</h3>
                      <Badge className="bg-primary text-white">$9.99/month</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Entry-level plan with basic features.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Premium Plan</h3>
                      <Badge className="bg-primary text-white">$29.99/month</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Advanced features for power users.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Enterprise Plan</h3>
                      <Badge className="bg-secondary text-white">$99.99/month</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Full-featured plan for large organizations.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Add New Plan</Button>
                <Button onClick={() => toast.success("Plans saved!")}>
                  Save Plans
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {!isMobile && (
            <TabsContent value="security" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security settings for your application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin users
                      </p>
                    </div>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-policy">Strong Password Policy</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce strong password requirements
                      </p>
                    </div>
                    <Switch id="password-policy" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out inactive users
                      </p>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-length">Session Length (minutes)</Label>
                    <Input id="session-length" type="number" defaultValue="60" min="5" max="1440" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast.success("Security settings saved!")}>
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
          
          {!isMobile && (
            <TabsContent value="notifications" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure notification settings for your application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="user-signup">New User Signup</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a new user signs up
                      </p>
                    </div>
                    <Switch id="user-signup" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="subscription-change">Subscription Changes</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a user changes their subscription
                      </p>
                    </div>
                    <Switch id="subscription-change" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-failed">Failed Payments</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a payment fails
                      </p>
                    </div>
                    <Switch id="payment-failed" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast.success("Notification settings saved!")}>
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;

// Missing Badge, adding it here
import { Badge } from "@/components/ui/badge";
