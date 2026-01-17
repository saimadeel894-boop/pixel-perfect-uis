/**
 * ExpandableFAB Component
 * Floating action button that expands into a radial menu
 * Shows: Education, Trackers, Q&A, Mindset options
 */

import { useState } from "react";
import { Plus, X, BookOpen, Activity, MessageCircle, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

// Import images
import educationImg from "@/assets/education-icon.jpg";
import trackersImg from "@/assets/trackers-icon.jpg";
import mindsetImg from "@/assets/mindset-icon.jpg";

interface FABMenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  image?: string;
  onClick?: () => void;
}

const menuItems: FABMenuItem[] = [
  { id: "education", label: "Education", icon: BookOpen, image: educationImg },
  { id: "trackers", label: "Trackers", icon: Activity, image: trackersImg },
  { id: "qa", label: "Q&A", icon: MessageCircle },
  { id: "mindset", label: "Mindset", icon: Brain, image: mindsetImg },
];

interface ExpandableFABProps {
  onItemClick?: (id: string) => void;
}

export function ExpandableFAB({ onItemClick }: ExpandableFABProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => setIsExpanded(!isExpanded);

  const handleItemClick = (id: string) => {
    onItemClick?.(id);
    setIsExpanded(false);
  };

  // Position items in a circular pattern around the center
  const getItemPosition = (index: number, total: number) => {
    // Arrange in a cross pattern: top, right, bottom, left
    const positions = [
      { x: 0, y: -80 },    // top
      { x: 70, y: 0 },     // right
      { x: 0, y: 70 },     // bottom (adjusted for nav bar)
      { x: -70, y: 0 },    // left
    ];
    return positions[index] || { x: 0, y: 0 };
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
        {/* Menu items */}
        {menuItems.map((item, index) => {
          const pos = getItemPosition(index, menuItems.length);
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "absolute w-20 h-20 rounded-full overflow-hidden flex flex-col items-center justify-center transition-all duration-300",
                isExpanded
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0 pointer-events-none"
              )}
              style={{
                transform: isExpanded
                  ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`
                  : "translate(-50%, -50%)",
                transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
              }}
            >
              {item.image ? (
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs font-medium text-center px-1">
                      {item.label}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-secondary flex flex-col items-center justify-center gap-1">
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-white text-xs font-medium">
                    {item.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}

        {/* Main FAB button */}
        <button
          onClick={toggleMenu}
          className={cn(
            "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-10",
            isExpanded
              ? "bg-primary rotate-45 scale-110"
              : "fab-button hover:scale-105"
          )}
          aria-label={isExpanded ? "Close menu" : "Open menu"}
        >
          {isExpanded ? (
            <X className="w-7 h-7 text-white -rotate-45" strokeWidth={2.5} />
          ) : (
            <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
          )}
        </button>
      </div>
    </>
  );
}
