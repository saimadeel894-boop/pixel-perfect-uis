/**
 * CommunityScreen Component
 * Main community feed with Overview and My Friends tabs - matches Figma design
 */

import { useState } from "react";
import { Search } from "lucide-react";
import { TabButton } from "@/components/community/TabButton";
import { StoryInput } from "@/components/community/StoryInput";
import { SuggestionCard } from "@/components/community/SuggestionCard";
import { ActivityPost } from "@/components/community/ActivityPost";
import { FollowListItem } from "@/components/community/FollowListItem";

type Tab = "overview" | "friends";

// Mock data
const suggestions = [
  { id: 1, initials: "V", username: "viCVtG2dpUHL..." },
  { id: 2, initials: "C", username: "CzVBkknDbBR..." },
  { id: 3, initials: "R", username: "Rru3tdTDpkua..." },
  { id: 4, initials: "2", username: "28SK8KVQurgi..." },
];

const activities = [
  {
    id: 1,
    userInitials: "MK",
    userName: "Makise Kurisu",
    timestamp: "3m ago",
    content: "Hey Sandow Fam! 👋 Just crushed my morning workout - a killer HIIT session to kickstart the day! 🔥 Feeling the burn in the best way possible. 💪🔥",
    hashtags: ["HIITWorkout", "HealthyEating"],
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    ],
    likes: 5874,
    comments: 11,
    isVerified: true,
    isOwner: true,
  },
  {
    id: 2,
    userInitials: "MK",
    userName: "Makise Kurisu",
    timestamp: "3m ago",
    content: "Morning vibes! Just completed a refreshing yoga session to start the day on a positive note. 🧘 How do you like to kick off your mornings?",
    hashtags: ["YogaLove", "WellnessWednesday"],
    likes: 5874,
    comments: 11,
    isVerified: true,
  },
  {
    id: 3,
    userInitials: "MK",
    userName: "Makise Kurisu",
    timestamp: "3m ago",
    content: "Tried a new protein smoothie recipe post-workout, and it's a game-changer. What's your favorite protein-packed snack? 🍌",
    hashtags: ["HealthySnacking", "ProteinPower"],
    poll: {
      question: "Favorite Fitness Snacks?",
      options: [
        { label: "Protein Smoothie", percentage: 3 },
        { label: "Greek Yogurt", percentage: 10 },
        { label: "Almond Butter", percentage: 84, isSelected: true },
      ],
    },
    likes: 5874,
    comments: 11,
    isVerified: true,
  },
];

const followingList = [
  { id: 1, initials: "B", userName: "BslzewVc9ye1zYmJq8NP", buttonLabel: "Request" as const },
  { id: 2, initials: "CG", userName: "Charlotte Gammelgaard", buttonLabel: "Follow" as const },
  { id: 3, initials: "CG", userName: "Christian Gadegaard", buttonLabel: "Follow" as const },
  { id: 4, initials: "CD", userName: "Carsten Dyberg", buttonLabel: "Follow" as const },
];

export function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-40 px-4 pt-8 pb-4">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-4xl font-brand text-primary tracking-wide">Community</h1>
          <button 
            className="p-2.5 hover:bg-muted rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-6 h-6 text-primary" />
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-3">
          <TabButton 
            label="Overview" 
            isActive={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <TabButton 
            label="My Friends" 
            isActive={activeTab === "friends"} 
            onClick={() => setActiveTab("friends")} 
          />
        </div>
      </header>
      
      <main className="px-4">
        {activeTab === "overview" ? (
          <OverviewTab />
        ) : (
          <FriendsTab />
        )}
      </main>
    </div>
  );
}

function OverviewTab() {
  const [filter, setFilter] = useState<"all" | "posts" | "videos">("all");
  
  return (
    <>
      {/* Content Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <FilterTab label="All" isActive={filter === "all"} onClick={() => setFilter("all")} />
        <FilterTab label="Posts" isActive={filter === "posts"} onClick={() => setFilter("posts")} />
        <FilterTab label="Videos" isActive={filter === "videos"} onClick={() => setFilter("videos")} />
      </div>

      {/* Story Input */}
      <div className="mb-6">
        <StoryInput 
          userInitials="S" 
          onCameraClick={() => console.log("Camera clicked")}
          onInputClick={() => console.log("Input clicked")}
        />
      </div>
      
      {/* Suggestions Section */}
      <section className="mb-6">
        <h2 className="text-sm text-foreground mb-4">
          Here's some suggestions for people you can follow:
        </h2>
        
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard
              key={suggestion.id}
              initials={suggestion.initials}
              username={suggestion.username}
              buttonLabel="Follow"
              className="animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </section>
      
      {/* Activity Feed */}
      <section className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityPost
              key={activity.id}
              {...activity}
              onLike={() => console.log("Like", activity.id)}
              onComment={() => console.log("Comment", activity.id)}
              onEdit={() => console.log("Edit", activity.id)}
              onDelete={() => console.log("Delete", activity.id)}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No more activities in your feed
          </p>
        )}
      </section>
    </>
  );
}

interface FilterTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterTab({ label, isActive, onClick }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        isActive 
          ? "bg-foreground text-background" 
          : "bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function FriendsTab() {
  return (
    <>
      {/* Suggestions Section */}
      <section className="mb-6">
        <h2 className="text-sm text-foreground mb-4">
          Here's some suggestions for people you can follow:
        </h2>
        
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <SuggestionCard
              key={suggestion.id}
              initials={suggestion.initials}
              username={suggestion.username}
              buttonLabel="Request"
              className="animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </section>
      
      {/* Following List */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-foreground mb-3">
          You follow these people:
        </h2>
        
        <div className="divide-y divide-border rounded-xl overflow-hidden bg-background-card">
          {followingList.map((user) => (
            <FollowListItem
              key={user.id}
              initials={user.initials}
              userName={user.userName}
              buttonLabel={user.buttonLabel}
              onButtonClick={() => console.log("Button clicked", user.id)}
            />
          ))}
        </div>
      </section>
      
      {/* Followers Section */}
      <section>
        <h2 className="text-sm font-medium text-foreground mb-3">
          These people follow you:
        </h2>
        <div className="rounded-xl bg-background-card p-6">
          <p className="text-center text-muted-foreground">
            No followers yet
          </p>
        </div>
      </section>
    </>
  );
}

export default CommunityScreen;
