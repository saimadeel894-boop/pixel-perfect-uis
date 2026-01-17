/**
 * CommunityScreen Component
 * Main community feed page with two tabs: Overview and My Friends
 * 
 * Structure:
 * - Header with title and search icon
 * - Tab navigation (Overview / My Friends)
 * - Story input (Overview only)
 * - Suggestion cards (horizontal scroll)
 * - Activity feed or Follow lists
 * - Bottom navigation with FAB
 */

import { useState } from "react";
import { Search } from "lucide-react";
import { TabButton } from "@/components/community/TabButton";
import { StoryInput } from "@/components/community/StoryInput";
import { SuggestionCard } from "@/components/community/SuggestionCard";
import { ActivityPost } from "@/components/community/ActivityPost";
import { FollowListItem } from "@/components/community/FollowListItem";
import { BottomNavigation } from "@/components/community/BottomNavigation";

type Tab = "overview" | "friends";
type NavItem = "overview" | "community" | "challenge" | "profile";

// Mock data - replace with real data later
const suggestions = [
  { id: 1, initials: "V", username: "viCVtG2dpUHL..." },
  { id: 2, initials: "C", username: "CzVBkknDbBR..." },
  { id: 3, initials: "R", username: "Rru3tdTDpkua..." },
  { id: 4, initials: "2", username: "28SK8KVQurgi..." },
];

const activities = [
  {
    id: 1,
    userInitials: "CG",
    userName: "Christian Gadegaard",
    timestamp: "Feb 10, 19:49",
    category: "Fitness",
    tonnage: "11.2 tonnes",
    time: "21:06",
    kcal: "119",
    highFives: 0,
    comments: 0,
  },
  {
    id: 2,
    userInitials: "CG",
    userName: "Christian Gadegaard",
    timestamp: "Jan 28, 19:51",
    category: "Fitness",
    tonnage: "8.5 tonnes",
    time: "18:32",
    kcal: "95",
    highFives: 3,
    comments: 1,
  },
];

const followingList = [
  { id: 1, initials: "B", userName: "BslzewVc9ye1zYmJq8NP", buttonLabel: "Request" as const },
  { id: 2, initials: "CG", userName: "Charlotte Gammelgaard", buttonLabel: "Follow" as const },
  { id: 3, initials: "CG", userName: "Christian Gadegaard", buttonLabel: "Follow" as const },
  { id: 4, initials: "CD", userName: "Carsten Dyberg", buttonLabel: "Follow" as const },
  { id: 5, initials: "CG", userName: "Christian Gosvig", buttonLabel: "Follow" as const },
];

export function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [activeNav, setActiveNav] = useState<NavItem>("community");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background z-40 px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-brand text-secondary">Community</h1>
          <button 
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-6 h-6 text-secondary" />
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2">
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
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeItem={activeNav}
        onNavigate={setActiveNav}
        onFabClick={() => console.log("Create new post")}
      />
    </div>
  );
}

function OverviewTab() {
  return (
    <>
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
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
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
              onHighFive={() => console.log("High five", activity.id)}
              onComment={() => console.log("Comment", activity.id)}
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
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>
      
      {/* Following List */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-foreground mb-2">
          You follow these people:
        </h2>
        
        <div className="divide-y divide-border">
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
        <h2 className="text-sm font-medium text-foreground mb-2">
          These people follow you:
        </h2>
        <p className="text-center text-muted-foreground py-4">
          No followers yet
        </p>
      </section>
    </>
  );
}

export default CommunityScreen;
