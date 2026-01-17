/**
 * SettingsItem Component
 * List item for settings menu
 */

import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsItemProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  onClick?: () => void;
  destructive?: boolean;
  className?: string;
}

export function SettingsItem({
  icon: Icon,
  label,
  value,
  onClick,
  destructive = false,
  className,
}: SettingsItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between py-3 px-4 hover:bg-muted/50 transition-colors",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn(
          "w-5 h-5",
          destructive ? "text-destructive" : "text-muted-foreground"
        )} />
        <span className={cn(
          "text-sm font-medium",
          destructive ? "text-destructive" : "text-foreground"
        )}>
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {value && (
          <span className="text-sm text-muted-foreground">{value}</span>
        )}
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </button>
  );
}
