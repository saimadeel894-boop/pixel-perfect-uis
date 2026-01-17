/**
 * TabButton Component
 * Toggle button for switching between Overview and My Friends tabs
 * Matches Figma design with rounded pill style
 */

import { cn } from "@/lib/utils";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-tab-active text-white" 
          : "bg-transparent text-foreground hover:bg-muted"
      )}
    >
      {label}
    </button>
  );
}
