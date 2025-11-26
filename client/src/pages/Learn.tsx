import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { BookOpen, CheckCircle2, Lock, Loader2, ArrowRight } from "lucide-react";

export default function Learn() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();

  const { data: paths, isLoading } = trpc.learn.getLearningPaths.useQuery();

  if (authLoading || isLoading) {
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

  const levelColors = {
    beginner: "bg-green-500",
    intermediate: "bg-blue-500",
    advanced: "bg-purple-500"
  };

  const levelLabels = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced"
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
            <h1 className="text-xl font-bold">Attraction Academy</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Learning Paths</h1>
          <p className="text-muted-foreground text-lg">
            Master social dynamics through structured, progressive courses
          </p>
        </div>

        {/* Learning Paths */}
        <div className="space-y-6">
          {paths?.map((path, index) => (
            <Card key={path.id} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl">{path.name}</CardTitle>
                      <Badge className={levelColors[path.level]}>
                        {levelLabels[path.level]}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {path.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/learn/${path.slug}`}>
                  <Button className="gap-2">
                    View Lessons <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Library</CardTitle>
              <CardDescription>
                Browse our comprehensive glossary of terms and concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/learn/glossary">
                <Button variant="outline" className="gap-2">
                  Explore Glossary <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Bookmarks</CardTitle>
              <CardDescription>
                Quick access to your saved lessons and articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/learn/bookmarks">
                <Button variant="outline" className="gap-2">
                  View Bookmarks <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
