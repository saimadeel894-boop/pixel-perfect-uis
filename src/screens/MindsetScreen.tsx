/**
 * MindsetScreen Component
 * Mental wellness, meditation, and motivation content
 */

import { Brain, Play, Heart, Sparkles, Clock, ChevronRight } from "lucide-react";

interface MeditationSession {
  id: number;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  isNew?: boolean;
}

const dailyAffirmations = [
  "I am getting stronger every day",
  "My consistency defines my success",
  "Every workout brings me closer to my goals",
];

const meditationSessions: MeditationSession[] = [
  {
    id: 1,
    title: "Pre-Workout Focus",
    duration: "5 min",
    category: "Focus",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    title: "Post-Workout Recovery",
    duration: "10 min",
    category: "Recovery",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Evening Wind Down",
    duration: "15 min",
    category: "Sleep",
    thumbnail: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&h=300&fit=crop",
  },
];

const motivationalContent = [
  { id: 1, title: "Building Mental Toughness", type: "Article", duration: "5 min read" },
  { id: 2, title: "Goal Setting Masterclass", type: "Video", duration: "12 min" },
  { id: 3, title: "Overcoming Plateaus", type: "Article", duration: "4 min read" },
];

interface MindsetScreenProps {
  onClose: () => void;
}

export function MindsetScreen({ onClose }: MindsetScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-40 px-4 pt-8 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 rounded-xl">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-brand text-primary tracking-wide">Mindset</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Train your mind, transform your life</p>
      </header>

      <main className="px-4 py-6 space-y-6 pb-8">
        {/* Daily Affirmation */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6">
          <div className="absolute top-2 right-2">
            <Sparkles className="w-5 h-5 text-primary/40" />
          </div>
          <h2 className="text-xs uppercase tracking-wider text-primary/80 mb-2">Today's Affirmation</h2>
          <p className="text-lg font-medium text-foreground italic">
            "{dailyAffirmations[0]}"
          </p>
          <button className="mt-4 text-xs text-primary font-medium flex items-center gap-1">
            <Heart className="w-3 h-3" /> Save to favorites
          </button>
        </section>

        {/* Quick Meditations */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-foreground">Quick Meditations</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              See All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {meditationSessions.map((session) => (
              <MeditationCard key={session.id} session={session} />
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-3">
          <StatCard value="12" label="Sessions" icon="🧘" />
          <StatCard value="2.5h" label="Total Time" icon="⏱️" />
          <StatCard value="7" label="Day Streak" icon="🔥" />
        </section>

        {/* Motivational Content */}
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">Motivation & Growth</h2>
          <div className="space-y-2">
            {motivationalContent.map((content) => (
              <button
                key={content.id}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  {content.type === "Video" ? (
                    <Play className="w-4 h-4 text-primary" />
                  ) : (
                    <Brain className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{content.title}</p>
                  <p className="text-xs text-muted-foreground">{content.type} • {content.duration}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

interface MeditationCardProps {
  session: MeditationSession;
}

function MeditationCard({ session }: MeditationCardProps) {
  return (
    <button className="flex-shrink-0 w-40 rounded-xl overflow-hidden bg-card">
      <div className="relative h-24">
        <img 
          src={session.thumbnail} 
          alt={session.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>
        {session.isNew && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-[10px] text-white font-medium">
            NEW
          </span>
        )}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-[10px] text-white flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {session.duration}
        </span>
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-foreground line-clamp-1">{session.title}</p>
        <p className="text-[10px] text-muted-foreground">{session.category}</p>
      </div>
    </button>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  icon: string;
}

function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl bg-card text-center">
      <span className="text-xl mb-1 block">{icon}</span>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

export default MindsetScreen;
