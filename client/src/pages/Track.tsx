import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award,
  Loader2,
  ArrowRight,
  Plus
} from "lucide-react";

export default function Track() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
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

  const trackingTools = [
    {
      icon: Calendar,
      title: "Approach Log",
      description: "Track every interaction and analyze your success patterns",
      href: "/track/approach-log",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Goals & Milestones",
      description: "Set targets and celebrate your achievements",
      href: "/track/goals",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Visualize your improvement with detailed statistics",
      href: "/track/analytics",
      color: "text-purple-500"
    },
    {
      icon: Award,
      title: "Badges & Achievements",
      description: "View all your earned badges and unlock new ones",
      href: "/track/badges",
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost">← Dashboard</Button>
            </Link>
            <h1 className="text-xl font-bold">Track Progress</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Track Your Progress</h1>
              <p className="text-muted-foreground text-lg">
                Monitor your journey and celebrate every milestone
              </p>
            </div>
          </div>
        </div>

        {/* Tracking Tools */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {trackingTools.map((tool, index) => (
            <Link key={index} href={tool.href}>
              <Card className="card-hover cursor-pointer h-full animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <tool.icon className={`h-10 w-10 ${tool.color} mb-2`} />
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="gap-2 w-full">
                    Open <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Log your activities and update your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/track/approach-log">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Log New Approach
              </Button>
            </Link>
            <Link href="/track/goals">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Goal
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Tracking Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tracking Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">1</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Be consistent</strong> - Log every approach, even rejections. Data patterns emerge from consistency
              </p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">2</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Review weekly</strong> - Check your analytics every week to identify what's working
              </p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">3</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Set realistic goals</strong> - Start small and build momentum with achievable milestones
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
