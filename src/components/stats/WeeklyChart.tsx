/**
 * WeeklyChart Component
 * Bar chart showing weekly workout statistics
 * Matches the orange gradient bar chart from Figma exactly
 */

interface DayData {
  day: string;
  value: number;
}

interface WeeklyChartProps {
  data: DayData[];
  maxValue?: number;
  label?: string;
}

export function WeeklyChart({ data, maxValue, label }: WeeklyChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="stat-card">
      {label && (
        <h3 className="section-header">{label}</h3>
      )}
      
      <div className="flex items-end justify-between gap-3 h-28 pt-2">
        {data.map((item, index) => {
          const heightPercent = Math.max((item.value / max) * 100, 8); // Minimum 8% height for visibility
          
          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              {/* Bar container */}
              <div className="relative w-full h-20 flex items-end justify-center">
                <div
                  className="chart-bar w-full max-w-[28px] min-h-[6px]"
                  style={{ 
                    height: `${heightPercent}%`,
                    opacity: item.value > 0 ? 1 : 0.3,
                    animationDelay: `${index * 80}ms`,
                  }}
                />
              </div>
              
              {/* Day label */}
              <span className="text-[11px] text-muted-foreground font-medium">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
