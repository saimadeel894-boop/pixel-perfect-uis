/**
 * OverviewScreen Component
 * Dashboard showing user's fitness statistics and weekly progress
 */

import { Flame, Timer, Zap, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stats/StatCard";
import { WeeklyChart } from "@/components/stats/WeeklyChart";
import { ProgressRing } from "@/components/stats/ProgressRing";

// Mock data
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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <p className="text-muted-foreground text-sm">Welcome back,</p>
        <h1 className="text-2xl font-brand text-primary">Christian</h1>
      </header>

      <main className="px-4 space-y-4">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Today's Calories"
            value="1,240"
            unit="kcal"
            icon={Flame}
            highlight
            trend="up"
          />
          <StatCard
            label="Workout Time"
            value="48"
            unit="min"
            icon={Timer}
          />
          <StatCard
            label="Active Days"
            value="5"
            unit="/ 7"
            icon={Zap}
            trend="up"
          />
          <StatCard
            label="Total Tonnage"
            value="2.4"
            unit="tonnes"
            icon={TrendingUp}
          />
        </div>

        {/* Weekly Progress */}
        <WeeklyChart
          data={weeklyData}
          label="Weekly Activity"
        />

        {/* Goals Section */}
        <div className="stat-card">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Weekly Goals
          </h3>
          
          <div className="flex justify-around">
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

        {/* Recent Activity */}
        <div className="stat-card">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Recent Activity
          </h3>
          
          <div className="space-y-3">
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
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-primary">{calories} kcal</p>
        <p className="text-xs text-muted-foreground">{duration}</p>
      </div>
    </div>
  );
}

export default OverviewScreen;
