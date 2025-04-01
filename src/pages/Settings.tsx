
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";

const Settings = () => {
  const [notifications, setNotifications] = useLocalStorage("notifications", true);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [currency, setCurrency] = useLocalStorage("currency", "USD");
  
  const handleInstall = async () => {
    if ('serviceWorker' in navigator && window.matchMedia('(display-mode: browser)').matches) {
      try {
        // Check if the app is already installed
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration?.active) {
          // Get the BeforeInstallPromptEvent that was saved
          const deferredPrompt = (window as any).deferredPrompt;
          if (deferredPrompt) {
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
              toast.success("App installed successfully!");
            } else {
              toast.info("App installation declined");
            }
            // Clear the saved prompt
            (window as any).deferredPrompt = null;
          } else {
            toast.info("App installation not available right now");
          }
        } else {
          toast.error("Service worker registration required");
        }
      } catch (error) {
        console.error("Installation error:", error);
        toast.error("Could not install the app");
      }
    } else {
      toast.info("App is already installed or installation is not supported");
    }
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all app data? This action cannot be undone.")) {
      // Clear all local storage
      localStorage.clear();
      toast.success("All data cleared successfully. Refreshing...");
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="container max-w-4xl pt-4 pb-20 md:py-8 md:ml-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
            <CardDescription>Configure how the app works for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts about your budget and transactions
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="darkMode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch
                id="darkMode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Installation</CardTitle>
            <CardDescription>Install this app on your device</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Install FinTrack on your device for a better experience and offline access
            </p>
            <Button onClick={handleInstall}>Install App</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your app data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Clear all app data including transactions and settings
            </p>
            <Button variant="destructive" onClick={handleClearData}>
              Clear All Data
            </Button>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            This action cannot be undone
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
