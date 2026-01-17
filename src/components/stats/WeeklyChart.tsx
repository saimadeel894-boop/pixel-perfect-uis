/**
 * WeeklyChart Component
 * Bar chart showing weekly workout statistics
 * Matches the orange bar chart from Figma
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
        <h3 className="text-sm font-medium text-foreground mb-4">{label}</h3>
      )}
      
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((item, index) => {
          const heightPercent = (item.value / max) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              {/* Bar */}
              <div className="relative w-full h-24 flex items-end justify-center">
                <div
                  className="chart-bar w-full max-w-[32px] transition-all duration-500"
                  style={{ 
                    height: `${heightPercent}%`,
                    animationDelay: `${index * 100}ms`,
                  }}
                />
              </div>
              
              {/* Day label */}
              <span className="text-xs text-muted-foreground">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
