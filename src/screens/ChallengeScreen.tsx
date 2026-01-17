/**
 * ChallengeScreen Component
 * Shows active and available fitness challenges
 */

import { useState } from "react";
import { TabButton } from "@/components/community/TabButton";
import { ChallengeCard } from "@/components/challenge/ChallengeCard";
import { Trophy } from "lucide-react";

type Tab = "active" | "discover";

// Mock data
const activeChallenges = [
  {
    id: 1,
    title: "30-Day Strength Challenge",
    description: "Build muscle with daily workouts",
    progress: 18,
    maxProgress: 30,
    participants: 1250,
    daysLeft: 12,
    isActive: true,
  },
  {
    id: 2,
    title: "10K Steps Daily",
    description: "Walk your way to fitness",
    progress: 7,
    maxProgress: 7,
    participants: 3400,
    daysLeft: 0,
    isActive: true,
  },
];

const discoverChallenges = [
  {
    id: 3,
    title: "HIIT Warrior",
    description: "20 HIIT sessions in a month",
    progress: 0,
    maxProgress: 20,
    participants: 890,
    daysLeft: 30,
  },
  {
    id: 4,
    title: "Flexibility Focus",
    description: "15 min stretching daily",
    progress: 0,
    maxProgress: 14,
    participants: 650,
    daysLeft: 14,
  },
  {
    id: 5,
    title: "Cardio King",
    description: "500 minutes of cardio",
    progress: 0,
    maxProgress: 500,
    participants: 2100,
    daysLeft: 21,
  },
];

export function ChallengeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("active");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-brand text-primary">Challenges</h1>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2">
          <TabButton 
            label="Active" 
            isActive={activeTab === "active"} 
            onClick={() => setActiveTab("active")} 
          />
          <TabButton 
            label="Discover" 
            isActive={activeTab === "discover"} 
            onClick={() => setActiveTab("discover")} 
          />
        </div>
      </header>
      
      <main className="px-4">
        {activeTab === "active" ? (
          <ActiveChallenges />
        ) : (
          <DiscoverChallenges />
        )}
      </main>
    </div>
  );
}

function ActiveChallenges() {
  return (
    <div className="space-y-4">
      {activeChallenges.length > 0 ? (
        activeChallenges.map((challenge, index) => (
          <div
            key={challenge.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ChallengeCard {...challenge} />
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No active challenges. Join one to get started!
          </p>
        </div>
      )}
    </div>
  );
}

function DiscoverChallenges() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Find new challenges to push your limits
      </p>
      
      {discoverChallenges.map((challenge, index) => (
        <div
          key={challenge.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ChallengeCard
            {...challenge}
            onJoin={() => console.log("Join challenge", challenge.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default ChallengeScreen;
