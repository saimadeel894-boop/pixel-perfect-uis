/**
 * SuggestionCard Component
 * Card showing a user suggestion with avatar and follow/request button
 * Orange/coral gradient background matching Figma
 */

import { cn } from "@/lib/utils";

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
        "flex flex-col items-center justify-between p-4 rounded-2xl min-w-[130px] h-[170px]",
        "bg-gradient-to-br from-primary via-primary to-primary/80",
        "shadow-lg",
        className
      )}
      style={style}
    >
      {/* Avatar circle */}
      <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-base mt-1">
        {initials}
      </div>
      
      {/* Username */}
      <p className="text-white/90 text-xs font-medium truncate w-full text-center px-1">
        {username}
      </p>
      
      {/* Follow/Request button */}
      <button 
        onClick={onButtonClick}
        className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-all duration-200 backdrop-blur-sm"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
