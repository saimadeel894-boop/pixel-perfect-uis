/**
 * OverviewScreen Component
 * Dashboard showing user's fitness statistics - matches Figma design exactly
 * Features: Stats grid, weekly chart, progress rings, recent activity
 */

import { Flame, Timer, Dumbbell, TrendingUp } from "lucide-react";
import { WeeklyChart } from "@/components/stats/WeeklyChart";
import { ProgressRing } from "@/components/stats/ProgressRing";

// Mock data - Weekly activity values
const weeklyData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 35 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 40 },
];

export function OverviewScreen() {
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header - Greeting with user name */}
      <header className="px-4 pt-10 pb-6 safe-top">
        <p className="text-muted-foreground text-base mb-0.5">Hey,</p>
        <h1 className="text-4xl font-brand text-primary tracking-wide">
          Christian
        </h1>
      </header>

      <main className="px-4 space-y-4">
        {/* Main Stats Grid - 2x2 layout */}
        <div className="grid grid-cols-2 gap-3">
          {/* Today's Calories - Highlighted card */}
          <div className="stat-card-highlight">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Today's Calories
              </span>
              <Flame className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-primary">1,240</span>
              <span className="text-sm text-muted-foreground">kcal</span>
            </div>
            <div className="text-xs mt-2.5 text-success font-medium">↑ Improving</div>
          </div>

          {/* Workout Time */}
          <div className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Workout Time
              </span>
              <Timer className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-foreground">48</span>
              <span className="text-sm text-muted-foreground">min</span>
            </div>
          </div>

          {/* Active Days */}
          <div className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Active Days
              </span>
              <Dumbbell className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-foreground">5</span>
              <span className="text-sm text-muted-foreground">/ 7</span>
            </div>
            <div className="text-xs mt-2.5 text-success font-medium">↑ Improving</div>
          </div>

          {/* Total Tonnage */}
          <div className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Total Tonnage
              </span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-foreground">2.4</span>
              <span className="text-sm text-muted-foreground">tonnes</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <WeeklyChart
          data={weeklyData}
          label="Weekly Activity"
        />

        {/* Weekly Goals - Circular Progress Indicators */}
        <div className="stat-card">
          <h3 className="section-header">Weekly Goals</h3>
          
          <div className="flex justify-around py-2">
            <ProgressRing
              value={5}
              max={7}
              size="md"
              label="Workout Days"
            />
            <ProgressRing
              value={8500}
              max={10000}
              size="md"
              label="Calories"
            />
            <ProgressRing
              value={180}
              max={300}
              size="md"
              label="Minutes"
            />
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="stat-card">
          <h3 className="section-header">Recent Activity</h3>
          
          <div className="space-y-1">
            <ActivityItem
              title="Upper Body Workout"
              time="Today, 2:30 PM"
              calories={420}
              duration="45 min"
            />
            <ActivityItem
              title="Morning Run"
              time="Yesterday, 7:00 AM"
              calories={280}
              duration="30 min"
            />
            <ActivityItem
              title="Leg Day"
              time="Jan 15, 4:00 PM"
              calories={510}
              duration="55 min"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  time: string;
  calories: number;
  duration: string;
}

function ActivityItem({ title, time, calories, duration }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-primary">{calories} kcal</p>
        <p className="text-xs text-muted-foreground mt-0.5">{duration}</p>
      </div>
    </div>
  );
}

export default OverviewScreen;
