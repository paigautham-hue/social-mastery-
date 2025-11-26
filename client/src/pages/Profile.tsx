import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Loader2, User, Trophy, Flame, Award, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [experienceLevel, setExperienceLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  const { data: profile, isLoading: profileLoading } = trpc.profile.getProfile.useQuery(undefined, {
    enabled: isAuthenticated
  });

  // Set experience level when profile loads
  if (profile?.experienceLevel && experienceLevel !== profile.experienceLevel) {
    setExperienceLevel(profile.experienceLevel);
  }

  const updateLevelMutation = trpc.profile.updateExperienceLevel.useMutation({
    onSuccess: () => {
      toast.success("Experience level updated!");
    },
    onError: () => {
      toast.error("Failed to update experience level");
    }
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      logout();
      window.location.href = "/";
    }
  });

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const handleUpdateLevel = () => {
    updateLevelMutation.mutate({ level: experienceLevel });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost">← Dashboard</Button>
            </Link>
            <h1 className="text-xl font-bold">Profile</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="container py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl">{profile?.name || user?.name || "User"}</CardTitle>
                <CardDescription className="text-base">
                  {profile?.email || user?.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.totalPoints || 0}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.currentStreak || 0} days</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Experience Level</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{profile?.experienceLevel || "beginner"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your profile preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="experience-level">Experience Level</Label>
              <Select value={experienceLevel} onValueChange={(value: any) => setExperienceLevel(value)}>
                <SelectTrigger id="experience-level">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Experienced practitioner</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                This helps us tailor content to your skill level
              </p>
            </div>

            <Button 
              onClick={handleUpdateLevel} 
              disabled={updateLevelMutation.isPending}
              className="gap-2"
            >
              {updateLevelMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="gap-2"
            >
              {logoutMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
