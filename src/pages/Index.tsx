/**
 * Index Page
 * Entry point that renders the CommunityScreen
 * The community screen is mobile-first but responsive
 */

import CommunityScreen from "@/screens/CommunityScreen";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Container for mobile-first design, centered on larger screens */}
      <div className="max-w-lg mx-auto">
        <CommunityScreen />
      </div>
    </div>
  );
};

export default Index;
