import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { 
  BookOpen, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Sparkles,
  Award,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  const modules = [
    {
      icon: BookOpen,
      title: "Learn",
      description: "Structured courses from beginner to advanced with interactive quizzes",
      href: "/learn",
      color: "text-blue-500"
    },
    {
      icon: MessageSquare,
      title: "Coach",
      description: "AI-powered guidance for any social situation in real-time",
      href: "/coach",
      color: "text-purple-500"
    },
    {
      icon: Target,
      title: "Practice",
      description: "Interactive tools and simulators to build your skills",
      href: "/practice",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      title: "Track",
      description: "Monitor your progress with detailed analytics and insights",
      href: "/track",
      color: "text-orange-500"
    },
    {
      icon: Users,
      title: "Discover",
      description: "Community success stories and challenges to inspire you",
      href: "/discover",
      color: "text-pink-500"
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Coaching",
      description: "Get personalized advice for any situation"
    },
    {
      icon: Award,
      title: "Gamified Learning",
      description: "Earn points, badges, and track your streaks"
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Practice with real-time analysis and suggestions"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />}
              <span className="text-xl font-bold">{APP_TITLE}</span>
            </div>
            
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="outline">
                      {user?.name || "Profile"}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()}>
                    <Button variant="ghost">Login</Button>
                  </a>
                  <a href={getLoginUrl()}>
                    <Button>Get Started</Button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Master Social Confidence
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your complete toolkit for developing authentic connections, mastering attraction dynamics, 
              and building unshakeable confidence in any social situation.
            </p>
            
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="lg" className="gap-2">
                  Start Your Journey <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Five Powerful Modules</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to transform your social skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link key={index} href={module.href}>
                <Card className="card-hover cursor-pointer h-full animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <module.icon className={`h-10 w-10 ${module.color} mb-2`} />
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription className="min-h-[48px]">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full gap-2">
                      Explore <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Social Life?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of men who have already started their journey
            </p>
            <a href={getLoginUrl()}>
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 {APP_TITLE}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
