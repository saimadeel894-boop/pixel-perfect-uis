/**
 * SuggestionCard Component
 * Card showing a user suggestion with avatar and follow/request button
 * Blue background with white text, horizontally scrollable
 */

import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

interface SuggestionCardProps {
  initials: string;
  username: string;
  buttonLabel?: "Follow" | "Request";
  onButtonClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SuggestionCard({ 
  initials, 
  username, 
  buttonLabel = "Follow",
  onButtonClick,
  className,
  style 
}: SuggestionCardProps) {
  return (
    <div 
      className={cn(
        "suggestion-card flex flex-col items-center justify-between p-4 rounded-2xl min-w-[140px] h-[180px]",
        className
      )}
      style={style}
    >
      {/* Avatar circle */}
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-lg mt-2">
        {initials}
      </div>
      
      {/* Username */}
      <p className="text-white text-sm font-medium truncate w-full text-center px-2">
        {username}
      </p>
      
      {/* Follow/Request button */}
      <button 
        onClick={onButtonClick}
        className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
