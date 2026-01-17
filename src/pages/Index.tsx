/**
 * Index Page
 * Main app layout with navigation and screens
 */

import { useState } from "react";
import { BottomNavigation, NavItem } from "@/components/navigation/BottomNavigation";
import { ExpandableFAB } from "@/components/shared/ExpandableFAB";
import OverviewScreen from "@/screens/OverviewScreen";
import CommunityScreen from "@/screens/CommunityScreen";
import ChallengeScreen from "@/screens/ChallengeScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Index = () => {
  const [activeNav, setActiveNav] = useState<NavItem>("overview");

  const handleFABItemClick = (id: string) => {
    console.log("FAB item clicked:", id);
    // Handle navigation to different features
  };

  const renderScreen = () => {
    switch (activeNav) {
      case "overview":
        return <OverviewScreen />;
      case "community":
        return <CommunityScreen />;
      case "challenge":
        return <ChallengeScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Container for mobile-first design, centered on larger screens */}
      <div className="max-w-lg mx-auto relative">
        {renderScreen()}
        
        {/* Expandable FAB */}
        <ExpandableFAB onItemClick={handleFABItemClick} />
        
        {/* Bottom Navigation */}
        <BottomNavigation 
          activeItem={activeNav}
          onNavigate={setActiveNav}
        />
      </div>
    </div>
  );
};

export default Index;
