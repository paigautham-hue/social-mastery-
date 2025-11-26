import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { Link } from "wouter";
import { Send, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

export default function Coach() {
  const { isAuthenticated, loading } = useAuth();
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);

  const startConversationMutation = trpc.coach.startConversation.useMutation({
    onSuccess: (data) => {
      setConversationId(data.conversationId);
      setMessages([
        { role: "user", content: message },
        { role: "assistant", content: data.message }
      ]);
      setMessage("");
    },
    onError: () => {
      toast.error("Failed to start conversation");
    }
  });

  const sendMessageMutation = trpc.coach.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      setMessage("");
    },
    onError: () => {
      toast.error("Failed to send message");
    }
  });

  const handleSend = () => {
    if (!message.trim()) return;

    if (conversationId) {
      setMessages(prev => [...prev, { role: "user", content: message }]);
      sendMessageMutation.mutate({
        conversationId,
        message
      });
    } else {
      startConversationMutation.mutate({
        initialMessage: message
      });
    }
  };

  const quickSituations = [
    { emoji: "🌆", text: "Approaching in a club/bar" },
    { emoji: "☕", text: "Day game approach" },
    { emoji: "📱", text: "Need help with texting" },
    { emoji: "👥", text: "Navigating group dynamics" },
    { emoji: "💬", text: "Conversation stalled, need topics" },
    { emoji: "🎯", text: "Handling a shit test" },
    { emoji: "💋", text: "Ready to escalate physically" },
    { emoji: "❤️", text: "Relationship advice" }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost">← Dashboard</Button>
            </Link>
            <h1 className="text-xl font-bold">AI Coach</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="container py-8 max-w-4xl">
        {messages.length === 0 ? (
          // Welcome Screen
          <div className="animate-fade-in">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Your AI Social Confidence Coach</CardTitle>
                <CardDescription className="text-lg">
                  Get personalized guidance for any social situation. I'm here to help you navigate 
                  approaches, conversations, texting, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Situations</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {quickSituations.map((situation, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-3 text-left"
                    onClick={() => setMessage(situation.text)}
                  >
                    <span className="text-2xl mr-3">{situation.emoji}</span>
                    <span>{situation.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Chat Interface
          <Card className="mb-4">
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-4">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <Streamdown>{msg.content}</Streamdown>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {(startConversationMutation.isPending || sendMessageMutation.isPending) && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Describe your situation or ask for advice..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={startConversationMutation.isPending || sendMessageMutation.isPending}
              />
              <Button
                onClick={handleSend}
                disabled={!message.trim() || startConversationMutation.isPending || sendMessageMutation.isPending}
                className="gap-2"
              >
                {startConversationMutation.isPending || sendMessageMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        {conversationId && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => {
                setConversationId(null);
                setMessages([]);
              }}
            >
              Start New Conversation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
