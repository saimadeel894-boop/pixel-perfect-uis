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
    <div className={cn(
      "flex items-center justify-between py-3.5 px-4",
      className
    )}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Avatar 
          src={avatarSrc} 
          initials={initials} 
          size="lg" 
        />
        <span className="font-medium text-foreground text-sm truncate">
          {userName}
        </span>
      </div>
      
      <button
        onClick={onButtonClick}
        className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-150 ml-3 flex-shrink-0"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
