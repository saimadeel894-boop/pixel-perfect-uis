/**
 * StoryInput Component
 * Input field for creating new posts with avatar and camera button
 * Styled as a rounded pill matching the Figma design
 */

import { Camera } from "lucide-react";
import { Avatar } from "./Avatar";

interface StoryInputProps {
  userInitials: string;
  placeholder?: string;
  onCameraClick?: () => void;
  onInputClick?: () => void;
}

export function StoryInput({ 
  userInitials, 
  placeholder = "Tell your story...",
  onCameraClick,
  onInputClick
}: StoryInputProps) {
  return (
    <div className="story-input flex items-center gap-3 px-4 py-3">
      <Avatar initials={userInitials} size="md" />
      
      <button 
        onClick={onInputClick}
        className="flex-1 text-left text-muted-foreground text-sm"
      >
        {placeholder}
      </button>
      
      <button 
        onClick={onCameraClick}
        className="p-2 hover:bg-muted rounded-full transition-colors"
        aria-label="Add photo"
      >
        <Camera className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}
