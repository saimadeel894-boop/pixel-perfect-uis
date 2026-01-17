/**
 * ActivityPost Component
 * Displays a user's fitness activity with stats
 * Shows tonnage, time, kcal with high-five and comment actions
 */

import { MessageCircle } from "lucide-react";
import { Avatar } from "./Avatar";

interface ActivityPostProps {
  userInitials: string;
  userName: string;
  timestamp: string;
  category: string;
  tonnage: string;
  time: string;
  kcal: string;
  highFives: number;
  comments: number;
  onHighFive?: () => void;
  onComment?: () => void;
}

export function ActivityPost({
  userInitials,
  userName,
  timestamp,
  category,
  tonnage,
  time,
  kcal,
  highFives,
  comments,
  onHighFive,
  onComment,
}: ActivityPostProps) {
  return (
    <div className="stat-card animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar initials={userInitials} size="lg" />
        <div>
          <p className="font-semibold text-foreground">{userName}</p>
          <p className="text-sm text-muted-foreground">{timestamp}</p>
        </div>
      </div>
      
      {/* Category */}
      <p className="text-sm font-medium text-foreground mb-3">{category}</p>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Tonnage</p>
          <p className="text-lg font-bold text-foreground">{tonnage}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Time</p>
          <p className="text-lg font-bold text-foreground">{time}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Kcal</p>
          <p className="text-lg font-bold text-foreground">{kcal}</p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-6 pt-3 border-t border-border">
        <button 
          onClick={onHighFive}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <HighFiveIcon className="w-5 h-5" />
          <span className="text-sm">High Five</span>
          <span className="text-sm font-medium">{highFives}</span>
        </button>
        
        <button 
          onClick={onComment}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Comment</span>
          <span className="text-sm font-medium">{comments}</span>
        </button>
      </div>
    </div>
  );
}

// High Five icon (custom to match design)
function HighFiveIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}
