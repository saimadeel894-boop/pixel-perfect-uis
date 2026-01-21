/**
 * TrackersScreen Component
 * Track workouts, nutrition, weight, and other metrics
 */

import { useState } from "react";
import { BarChart3, Flame, Droplets, Moon, Weight, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { ProgressRing } from "@/components/stats/ProgressRing";

interface TrackerData {
  id: string;
  name: string;
  icon: React.ElementType;
  current: number;
  target: number;
  unit: string;
  color: string;
  trend?: "up" | "down" | "stable";
}

const dailyTrackers: TrackerData[] = [
  { id: "calories", name: "Calories", icon: Flame, current: 1850, target: 2200, unit: "kcal", color: "text-orange-500", trend: "up" },
  { id: "water", name: "Water", icon: Droplets, current: 6, target: 8, unit: "glasses", color: "text-blue-500", trend: "stable" },
  { id: "sleep", name: "Sleep", icon: Moon, current: 7.5, target: 8, unit: "hours", color: "text-purple-500", trend: "up" },
  { id: "weight", name: "Weight", icon: Weight, current: 78.5, target: 75, unit: "kg", color: "text-green-500", trend: "down" },
];

const recentLogs = [
  { id: 1, type: "Workout", name: "Upper Body", time: "2:30 PM", value: "45 min" },
  { id: 2, type: "Meal", name: "Lunch", time: "12:30 PM", value: "650 kcal" },
  { id: 3, type: "Water", name: "Hydration", time: "11:00 AM", value: "2 glasses" },
  { id: 4, type: "Meal", name: "Breakfast", time: "8:00 AM", value: "450 kcal" },
];

interface TrackersScreenProps {
  onClose: () => void;
}

export function TrackersScreen({ onClose }: TrackersScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-40 px-4 pt-8 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 rounded-xl">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-brand text-primary tracking-wide">Trackers</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-muted-foreground">{formatDate(selectedDate)}</p>
      </header>

      <main className="px-4 py-6 space-y-6 pb-8">
        {/* Daily Summary Ring */}
        <section className="flex justify-center">
          <div className="relative">
            <ProgressRing
              value={75}
              max={100}
              size="lg"
              label="Daily Progress"
            />
          </div>
        </section>

        {/* Quick Trackers Grid */}
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">Daily Trackers</h2>
          <div className="grid grid-cols-2 gap-3">
            {dailyTrackers.map((tracker) => (
              <TrackerCard key={tracker.id} tracker={tracker} />
            ))}
          </div>
        </section>

        {/* Quick Add */}
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">Quick Add</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <QuickAddButton label="Workout" emoji="🏋️" />
            <QuickAddButton label="Meal" emoji="🍽️" />
            <QuickAddButton label="Water" emoji="💧" />
            <QuickAddButton label="Weight" emoji="⚖️" />
            <QuickAddButton label="Sleep" emoji="😴" />
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">Today's Log</h2>
          <div className="space-y-2">
            {recentLogs.map((log) => (
              <div 
                key={log.id}
                className="flex items-center justify-between p-3 rounded-xl bg-card"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{log.name}</p>
                  <p className="text-xs text-muted-foreground">{log.type} • {log.time}</p>
                </div>
                <span className="text-sm font-semibold text-primary">{log.value}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

interface TrackerCardProps {
  tracker: TrackerData;
}

function TrackerCard({ tracker }: TrackerCardProps) {
  const Icon = tracker.icon;
  const percentage = Math.min((tracker.current / tracker.target) * 100, 100);
  
  return (
    <div className="p-4 rounded-xl bg-card">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-muted ${tracker.color}`}>
          <Icon className="w-4 h-4" />
        </div>
        {tracker.trend && (
          <div className={`flex items-center gap-0.5 ${
            tracker.trend === "up" ? "text-green-500" : 
            tracker.trend === "down" ? "text-red-500" : 
            "text-muted-foreground"
          }`}>
            {tracker.trend === "up" && <TrendingUp className="w-3 h-3" />}
            {tracker.trend === "down" && <TrendingDown className="w-3 h-3" />}
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground mb-1">{tracker.name}</p>
      <p className="text-lg font-bold text-foreground">
        {tracker.current}
        <span className="text-sm font-normal text-muted-foreground">/{tracker.target} {tracker.unit}</span>
      </p>
      
      <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface QuickAddButtonProps {
  label: string;
  emoji: string;
}

function QuickAddButton({ label, emoji }: QuickAddButtonProps) {
  return (
    <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-card hover:bg-muted transition-colors">
      <span>{emoji}</span>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Plus className="w-3 h-3 text-primary" />
    </button>
  );
}

export default TrackersScreen;
