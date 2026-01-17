/**
 * StatCard Component
 * Displays a single statistic with label and value
 * Used in Overview/Dashboard screen
 */

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  highlight?: boolean;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  highlight = false,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        highlight ? "stat-card-highlight" : "stat-card",
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        {Icon && (
          <Icon className={cn(
            "w-4 h-4",
            highlight ? "text-primary" : "text-muted-foreground"
          )} />
        )}
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className={cn(
          "text-2xl font-bold",
          highlight ? "text-primary" : "text-foreground"
        )}>
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground">{unit}</span>
        )}
      </div>
      
      {trend && (
        <div className={cn(
          "text-xs mt-2",
          trend === "up" && "text-success",
          trend === "down" && "text-destructive",
          trend === "neutral" && "text-muted-foreground"
        )}>
          {trend === "up" && "↑ Improving"}
          {trend === "down" && "↓ Decreasing"}
          {trend === "neutral" && "→ Stable"}
        </div>
      )}
    </div>
  );
}
