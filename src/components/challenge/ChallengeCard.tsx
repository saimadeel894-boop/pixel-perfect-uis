/**
 * ChallengeCard Component
 * Shows a fitness challenge with progress
 */

import { cn } from "@/lib/utils";
import { Trophy, Users, Clock } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  participants?: number;
  daysLeft?: number;
  isActive?: boolean;
  onJoin?: () => void;
  className?: string;
}

export function ChallengeCard({
  title,
  description,
  progress,
  maxProgress,
  participants,
  daysLeft,
  isActive = false,
  onJoin,
  className,
}: ChallengeCardProps) {
  const progressPercent = (progress / maxProgress) * 100;

  return (
    <div className={cn("stat-card", className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-lg",
            isActive ? "bg-primary/20" : "bg-muted"
          )}>
            <Trophy className={cn(
              "w-4 h-4",
              isActive ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">
            {progress}/{maxProgress}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {participants !== undefined && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{participants}</span>
            </div>
          )}
          {daysLeft !== undefined && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{daysLeft}d left</span>
            </div>
          )}
        </div>

        {!isActive && onJoin && (
          <button
            onClick={onJoin}
            className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
}
