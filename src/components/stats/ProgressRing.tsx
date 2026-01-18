/**
 * ProgressRing Component
 * Circular progress indicator for goals
 * Matches Figma with smooth gradient and clean typography
 */

import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  showValue?: boolean;
  className?: string;
}

const sizes = {
  sm: { size: 56, stroke: 5, fontSize: "text-xs" },
  md: { size: 72, stroke: 6, fontSize: "text-sm" },
  lg: { size: 100, stroke: 8, fontSize: "text-lg" },
};

export function ProgressRing({
  value,
  max,
  size = "md",
  label,
  showValue = true,
  className,
}: ProgressRingProps) {
  const { size: diameter, stroke, fontSize } = sizes[size];
  const radius = (diameter - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min((value / max) * 100, 100);
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: diameter, height: diameter }}>
        <svg
          width={diameter}
          height={diameter}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={stroke}
          />
          
          {/* Progress circle with gradient effect */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
            style={{
              filter: "drop-shadow(0 0 4px hsl(var(--primary) / 0.4))"
            }}
          />
        </svg>
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn(
              "font-bold text-foreground",
              fontSize
            )}>
              {Math.round(percent)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <span className="text-[11px] text-muted-foreground text-center font-medium">
          {label}
        </span>
      )}
    </div>
  );
}
