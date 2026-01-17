/**
 * FollowListItem Component
 * Row item showing a user with follow/request button
 * Used in "My Friends" tab for displaying following/followers
 */

import { Avatar } from "./Avatar";
import { cn } from "@/lib/utils";

interface FollowListItemProps {
  initials: string;
  userName: string;
  avatarSrc?: string;
  buttonLabel: "Follow" | "Request";
  onButtonClick?: () => void;
  className?: string;
}

export function FollowListItem({
  initials,
  userName,
  avatarSrc,
  buttonLabel,
  onButtonClick,
  className,
}: FollowListItemProps) {
  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
      <div className="flex items-center gap-3">
        <Avatar 
          src={avatarSrc} 
          initials={initials} 
          size="lg" 
        />
        <span className="font-medium text-foreground">{userName}</span>
      </div>
      
      <button
        onClick={onButtonClick}
        className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
