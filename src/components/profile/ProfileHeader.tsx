/**
 * ProfileHeader Component
 * User profile section with avatar and stats
 */

import { Avatar } from "@/components/community/Avatar";
import { Settings } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  username: string;
  initials: string;
  avatarSrc?: string;
  followers: number;
  following: number;
  workouts: number;
  onSettingsClick?: () => void;
}

export function ProfileHeader({
  name,
  username,
  initials,
  avatarSrc,
  followers,
  following,
  workouts,
  onSettingsClick,
}: ProfileHeaderProps) {
  return (
    <div className="stat-card">
      {/* Settings button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Avatar and name */}
      <div className="flex flex-col items-center mb-6">
        <Avatar
          src={avatarSrc}
          initials={initials}
          size="xl"
          className="mb-3"
        />
        <h2 className="text-xl font-bold text-foreground">{name}</h2>
        <p className="text-sm text-muted-foreground">@{username}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{workouts}</p>
          <p className="text-xs text-muted-foreground">Workouts</p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-xl font-bold text-foreground">{followers}</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{following}</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
      </div>
    </div>
  );
}
