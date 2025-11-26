import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { 
  Eye, 
  Target, 
  MessageCircle, 
  FileText, 
  Loader2,
  ArrowRight,
  Zap
} from "lucide-react";

export default function Practice() {
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

  const tools = [
    {
      icon: Eye,
      title: "IOI/IOD Decoder",
      description: "Learn to read attraction signals and body language cues",
      href: "/practice/indicators",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Scenario Analyzer",
      description: "Get AI analysis of your interactions and interest levels",
      href: "/practice/analyzer",
      color: "text-green-500"
    },
    {
      icon: MessageCircle,
      title: "Conversation Simulator",
      description: "Practice conversations with AI-powered responses",
      href: "/practice/simulator",
      color: "text-purple-500"
    },
    {
      icon: FileText,
      title: "Field Reports",
      description: "Document your experiences and track what works",
      href: "/practice/field-reports",
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
            <h1 className="text-xl font-bold">Practice Tools</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Interactive Practice Tools</h1>
              <p className="text-muted-foreground text-lg">
                Sharpen your skills with hands-on exercises and simulations
              </p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
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
                    Start Practicing <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Practice Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">1</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Start with the IOI/IOD Decoder</strong> to build your foundation in reading social cues
              </p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">2</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Use the Scenario Analyzer</strong> after real interactions to get feedback and improve
              </p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">3</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Document everything</strong> in Field Reports to track patterns and progress over time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
