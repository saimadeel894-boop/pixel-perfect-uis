/**
 * ActivityPost Component
 * Displays a user's fitness activity with stats and images - matches Figma
 */

import { useState } from "react";
import { MessageCircle, Heart, Bookmark, MoreVertical, CheckCircle2 } from "lucide-react";
import { Avatar } from "./Avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActivityPostProps {
  userInitials: string;
  userName: string;
  timestamp: string;
  content?: string;
  images?: string[];
  hashtags?: string[];
  category?: string;
  tonnage?: string;
  time?: string;
  kcal?: string;
  likes?: number;
  comments?: number;
  isVerified?: boolean;
  poll?: {
    question: string;
    options: { label: string; percentage: number; isSelected?: boolean }[];
  };
  onLike?: () => void;
  onComment?: () => void;
  onSave?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

export function ActivityPost({
  userInitials,
  userName,
  timestamp,
  content,
  images,
  hashtags,
  category,
  tonnage,
  time,
  kcal,
  likes = 0,
  comments = 0,
  isVerified = false,
  poll,
  onLike,
  onComment,
  onSave,
  onEdit,
  onDelete,
  isOwner = false,
}: ActivityPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <div className="stat-card animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar initials={userInitials} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-foreground text-sm">{userName}</p>
            {isVerified && (
              <CheckCircle2 className="w-4 h-4 text-primary fill-primary" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">Posted {timestamp}</p>
        </div>
        
        {/* More options dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-muted rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            {isOwner && (
              <>
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSave}>Save</DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </>
            )}
            {!isOwner && (
              <DropdownMenuItem onClick={handleSave}>Save</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content text */}
      {content && (
        <p className="text-sm text-foreground mb-3 leading-relaxed">
          {content}
        </p>
      )}

      {/* Hashtags */}
      {hashtags && hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {hashtags.map((tag) => (
            <span key={tag} className="text-primary text-sm font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {images && images.length > 0 && (
        <div className={cn(
          "mb-3 rounded-xl overflow-hidden",
          images.length === 1 && "aspect-video",
          images.length === 2 && "grid grid-cols-2 gap-1",
          images.length >= 3 && "grid grid-cols-2 gap-1"
        )}>
          {images.slice(0, 4).map((img, index) => (
            <div 
              key={index}
              className={cn(
                "bg-muted overflow-hidden",
                images.length === 1 && "aspect-video",
                images.length >= 2 && "aspect-square",
                images.length === 3 && index === 0 && "row-span-2 aspect-auto"
              )}
            >
              <img 
                src={img} 
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Poll */}
      {poll && (
        <div className="mb-3 space-y-2">
          <p className="text-sm font-medium text-foreground">{poll.question}</p>
          <div className="space-y-2">
            {poll.options.map((option, index) => (
              <div 
                key={index}
                className={cn(
                  "relative rounded-lg border overflow-hidden p-3",
                  option.isSelected 
                    ? "border-primary bg-primary/10" 
                    : "border-border"
                )}
              >
                {/* Progress bar background */}
                <div 
                  className="absolute inset-y-0 left-0 bg-primary/20"
                  style={{ width: `${option.percentage}%` }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="text-sm text-foreground">{option.label}</span>
                  <span className="text-sm font-medium text-foreground">
                    {option.percentage}%
                  </span>
                </div>
                {option.isSelected && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Category Badge (for workout posts) */}
      {category && (
        <div className="inline-flex px-3 py-1 bg-primary/20 rounded-full mb-3">
          <span className="text-xs font-medium text-primary">{category}</span>
        </div>
      )}
      
      {/* Stats Grid (for workout posts) */}
      {(tonnage || time || kcal) && (
        <div className="grid grid-cols-3 gap-4 mb-3">
          {tonnage && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Tonnage</p>
              <p className="text-base font-bold text-foreground">{tonnage}</p>
            </div>
          )}
          {time && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Time</p>
              <p className="text-base font-bold text-foreground">{time}</p>
            </div>
          )}
          {kcal && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Kcal</p>
              <p className="text-base font-bold text-foreground">{kcal}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{likes.toLocaleString()}</span>
          <button 
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
            <span className="text-sm">{likes}</span>
          </button>
          
          <button 
            onClick={onComment}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{comments}</span>
          </button>
        </div>

        <button 
          onClick={handleSave}
          className={cn(
            "flex items-center gap-1.5 transition-colors",
            isSaved ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
        >
          <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
          <span className="text-sm">Save</span>
        </button>
      </div>
    </div>
  );
}
