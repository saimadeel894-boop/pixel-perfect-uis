/**
 * EducationScreen Component
 * Learning resources and educational content
 */

import { BookOpen, Play, FileText, ChevronRight, Clock, Star } from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  lessons: number;
  progress: number;
  thumbnail: string;
  rating: number;
}

const featuredCourses: Course[] = [
  {
    id: 1,
    title: "Fundamentals of Strength Training",
    category: "Strength",
    duration: "4h 30m",
    lessons: 12,
    progress: 60,
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Nutrition for Athletes",
    category: "Nutrition",
    duration: "3h 15m",
    lessons: 8,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Recovery & Rest",
    category: "Wellness",
    duration: "2h 45m",
    lessons: 6,
    progress: 25,
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    rating: 4.7,
  },
];

const categories = [
  { id: 1, name: "Strength", icon: "💪", count: 24 },
  { id: 2, name: "Cardio", icon: "🏃", count: 18 },
  { id: 3, name: "Nutrition", icon: "🥗", count: 15 },
  { id: 4, name: "Mindset", icon: "🧠", count: 12 },
];

interface EducationScreenProps {
  onClose: () => void;
}

export function EducationScreen({ onClose }: EducationScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-40 px-4 pt-8 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-brand text-primary tracking-wide">Education</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Learn from the best coaches</p>
      </header>

      <main className="px-4 py-6 space-y-6 pb-8">
        {/* Categories */}
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">Categories</h2>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="flex flex-col items-center p-3 rounded-xl bg-card hover:bg-muted transition-colors"
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground">{cat.name}</span>
                <span className="text-[10px] text-muted-foreground">{cat.count} courses</span>
              </button>
            ))}
          </div>
        </section>

        {/* Continue Learning */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-foreground">Continue Learning</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              See All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3">
            {featuredCourses.filter(c => c.progress > 0).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Featured Courses */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-foreground">Featured Courses</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              See All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">Quick Tips</h2>
          <div className="space-y-2">
            <QuickTipCard
              title="Proper Form: Deadlifts"
              duration="2 min read"
              icon={FileText}
            />
            <QuickTipCard
              title="Pre-Workout Nutrition"
              duration="3 min read"
              icon={FileText}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-card">
      <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <Play className="w-6 h-6 text-white fill-white" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground line-clamp-1">{course.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-primary font-medium">{course.category}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {course.duration}
          </span>
        </div>
        
        {course.progress > 0 && (
          <div className="mt-2">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">{course.progress}% complete</span>
          </div>
        )}
        
        {course.progress === 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-muted-foreground">{course.rating}</span>
            <span className="text-xs text-muted-foreground">• {course.lessons} lessons</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface QuickTipCardProps {
  title: string;
  duration: string;
  icon: React.ElementType;
}

function QuickTipCard({ title, duration, icon: Icon }: QuickTipCardProps) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted transition-colors">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{duration}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

export default EducationScreen;
