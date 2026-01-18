/**
 * Avatar Component
 * Displays user avatar with optional initials fallback
 * Consistent sizing and styling across the app
 */

import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  initials?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showRing?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-12 h-12 text-sm",
  xl: "w-16 h-16 text-base",
};

export function Avatar({ 
  src, 
  initials, 
  size = "md", 
  className,
  showRing = false 
}: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold overflow-hidden flex-shrink-0",
        "bg-gradient-to-br from-primary/30 to-primary/20 text-primary",
        sizeClasses[size],
        showRing && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt="User avatar" 
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold">{initials || "?"}</span>
      )}
    </div>
  );
}
