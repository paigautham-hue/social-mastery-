import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { 
  Users, 
  Trophy, 
  FileText,
  Loader2,
  ArrowRight,
  Heart,
  TrendingUp
} from "lucide-react";

export default function Discover() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const { data: successStories, isLoading: storiesLoading } = trpc.discover.getSuccessStories.useQuery(
    { limit: 6 },
    { enabled: isAuthenticated }
  );

  const { data: challenges, isLoading: challengesLoading } = trpc.discover.getActiveChallenges.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (authLoading) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost">← Dashboard</Button>
            </Link>
            <h1 className="text-xl font-bold">Discover</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Community & Inspiration</h1>
              <p className="text-muted-foreground text-lg">
                Learn from others and share your journey
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Success Stories</h2>
            <Link href="/discover/success-stories">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {storiesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : successStories && successStories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <Card key={story.id} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {story.story}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes} likes</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No success stories yet. Be the first to share!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Active Challenges */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Challenges</h2>
            <Link href="/discover/challenges">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {challengesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : challenges && challenges.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.slice(0, 4).map((challenge, index) => (
                <Card key={challenge.id} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-orange-500" />
                          {challenge.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {challenge.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Reward: {challenge.pointsReward} points
                      </span>
                      <Button size="sm" className="gap-2">
                        Join Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No active challenges at the moment. Check back soon!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Community Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Share Your Story</CardTitle>
              <CardDescription>
                Inspire others with your transformation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/discover/submit-story">
                <Button variant="outline" className="w-full gap-2">
                  Submit Story <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>Field Reports</CardTitle>
              <CardDescription>
                Read detailed interaction breakdowns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/practice/field-reports">
                <Button variant="outline" className="w-full gap-2">
                  Browse Reports <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Leaderboards</CardTitle>
              <CardDescription>
                See who's crushing it this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
