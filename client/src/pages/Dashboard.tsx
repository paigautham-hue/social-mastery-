import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { 
  BookOpen, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Users,
  Award,
  Flame,
  Trophy,
  ArrowRight
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: dashboardData, isLoading } = trpc.track.getDashboard.useQuery(undefined, {
    enabled: isAuthenticated
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const quickActions = [
    {
      icon: MessageSquare,
      title: "AI Coach",
      description: "Get instant guidance",
      href: "/coach",
      color: "text-purple-500"
    },
    {
      icon: BookOpen,
      title: "Continue Learning",
      description: "Resume your lessons",
      href: "/learn",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Practice Tools",
      description: "Sharpen your skills",
      href: "/practice",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "See success stories",
      href: "/discover",
      color: "text-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost">← Home</Button>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Button variant="outline">{user?.name || "Profile"}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your progress overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.user.totalPoints || 0}</div>
              <p className="text-xs text-muted-foreground">Keep earning!</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.user.currentStreak || 0} days</div>
              <p className="text-xs text-muted-foreground">
                Longest: {dashboardData?.user.longestStreak || 0} days
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData?.learning.completedLessons || 0}/{dashboardData?.learning.totalLessons || 0}
              </div>
              <Progress value={dashboardData?.learning.percentage || 0} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.badges || 0}</div>
              <p className="text-xs text-muted-foreground">Achievements unlocked</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="card-hover cursor-pointer h-full">
                  <CardHeader>
                    <action.icon className={`h-8 w-8 ${action.color} mb-2`} />
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="gap-2 w-full">
                      Open <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Goals */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Approaches (Last 30 Days)</span>
                  <span className="font-bold">{dashboardData?.approaches.last30Days || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Goals</span>
                  <span className="font-bold">{dashboardData?.goals.active || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed Goals</span>
                  <span className="font-bold">{dashboardData?.goals.completed || 0}</span>
                </div>
              </div>
              <Link href="/track">
                <Button variant="outline" className="w-full mt-4 gap-2">
                  View Full Stats <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Learning Progress</span>
                    <span className="font-bold">{dashboardData?.learning.percentage || 0}%</span>
                  </div>
                  <Progress value={dashboardData?.learning.percentage || 0} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Experience Level</span>
                    <span className="font-bold capitalize">{dashboardData?.user.experienceLevel || 'beginner'}</span>
                  </div>
                </div>
              </div>
              <Link href="/learn">
                <Button variant="outline" className="w-full mt-4 gap-2">
                  Continue Learning <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
