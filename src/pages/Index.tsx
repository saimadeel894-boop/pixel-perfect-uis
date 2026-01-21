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
import EducationScreen from "@/screens/EducationScreen";
import TrackersScreen from "@/screens/TrackersScreen";
import QAScreen from "@/screens/QAScreen";
import MindsetScreen from "@/screens/MindsetScreen";
import NotesScreen from "@/screens/NotesScreen";

type FABScreen = "education" | "trackers" | "qa" | "mindset" | "notes" | null;

const Index = () => {
  const [activeNav, setActiveNav] = useState<NavItem>("overview");
  const [activeFABScreen, setActiveFABScreen] = useState<FABScreen>(null);

  const handleFABItemClick = (id: string) => {
    setActiveFABScreen(id as FABScreen);
  };

  const closeFABScreen = () => {
    setActiveFABScreen(null);
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

  const renderFABScreen = () => {
    switch (activeFABScreen) {
      case "education":
        return <EducationScreen onClose={closeFABScreen} />;
      case "trackers":
        return <TrackersScreen onClose={closeFABScreen} />;
      case "qa":
        return <QAScreen onClose={closeFABScreen} />;
      case "mindset":
        return <MindsetScreen onClose={closeFABScreen} />;
      case "notes":
        return <NotesScreen onClose={closeFABScreen} />;
      default:
        return null;
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

      {/* FAB Screen Overlay */}
      {activeFABScreen && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in">
          <div className="max-w-lg mx-auto h-full overflow-y-auto">
            {renderFABScreen()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
