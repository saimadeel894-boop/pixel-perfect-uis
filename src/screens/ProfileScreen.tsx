/**
 * ProfileScreen Component
 * User profile with stats and settings
 */

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SettingsItem } from "@/components/profile/SettingsItem";
import { WeeklyChart } from "@/components/stats/WeeklyChart";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Target,
  Award,
  Calendar
} from "lucide-react";

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
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-3xl font-brand text-primary">Profile</h1>
      </header>
      
      <main className="px-4 space-y-4">
        {/* Profile Header */}
        <ProfileHeader
          name="Christian Gadegaard"
          username="christian_g"
          initials="CG"
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

        {/* Workout Frequency */}
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
            onClick={() => console.log("Logout")}
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
    <div className="stat-card flex flex-col items-center py-4">
      <Icon className="w-5 h-5 text-primary mb-2" />
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default ProfileScreen;
