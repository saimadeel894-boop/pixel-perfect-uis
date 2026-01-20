/**
 * ProfileScreen Component
 * User profile with stats and settings - matches Figma
 */

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SettingsItem } from "@/components/profile/SettingsItem";
import { WeeklyChart } from "@/components/stats/WeeklyChart";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Target,
  Award,
  Calendar,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const weeklyWorkouts = [
  { day: "Mon", value: 1 },
  { day: "Tue", value: 1 },
  { day: "Wed", value: 0 },
  { day: "Thu", value: 1 },
  { day: "Fri", value: 1 },
  { day: "Sat", value: 1 },
  { day: "Sun", value: 0 },
];

export function ProfileScreen() {
  const navigate = useNavigate();
  const { signOut, user, profile } = useAuthContext();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || "User";
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-8 pb-6">
        <h1 className="text-4xl font-brand text-primary tracking-wide">Profile</h1>
      </header>
      
      <main className="px-4 space-y-4">
        {/* Profile Header */}
        <ProfileHeader
          name={displayName}
          username={user?.email?.split('@')[0] || "user"}
          initials={initials}
          followers={24}
          following={156}
          workouts={342}
          onSettingsClick={() => console.log("Settings")}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <QuickStatCard
            icon={Target}
            value="85%"
            label="Goals Hit"
          />
          <QuickStatCard
            icon={Award}
            value="12"
            label="Badges"
          />
          <QuickStatCard
            icon={Calendar}
            value="28"
            label="Day Streak"
          />
        </div>

        {/* Workout Frequency Chart */}
        <WeeklyChart
          data={weeklyWorkouts}
          maxValue={1}
          label="This Week's Activity"
        />

        {/* Settings Section */}
        <div className="stat-card p-0 overflow-hidden">
          <h3 className="text-sm font-medium text-foreground px-4 pt-4 pb-2">
            Settings
          </h3>
          
          <SettingsItem
            icon={User}
            label="Edit Profile"
            onClick={() => console.log("Edit profile")}
          />
          <SettingsItem
            icon={Bell}
            label="Notifications"
            value="On"
            onClick={() => console.log("Notifications")}
          />
          <SettingsItem
            icon={Shield}
            label="Privacy"
            onClick={() => console.log("Privacy")}
          />
          <SettingsItem
            icon={HelpCircle}
            label="Help & Support"
            onClick={() => console.log("Help")}
          />
          <SettingsItem
            icon={LogOut}
            label="Log Out"
            destructive
            onClick={handleLogout}
          />
        </div>
      </main>
    </div>
  );
}

interface QuickStatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

function QuickStatCard({ icon: Icon, value, label }: QuickStatCardProps) {
  return (
    <div className="stat-card flex flex-col items-center py-5">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default ProfileScreen;
