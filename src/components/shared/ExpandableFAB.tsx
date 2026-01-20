/**
 * ExpandableFAB Component
 * Floating action button that expands into a circular menu
 * Shows: Education, Trackers, Q&A, Mindset, Notes options - matches Figma exactly
 */

import { useState } from "react";
import { Plus, X, BookOpen, BarChart3, MessageCircle, Brain, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Import images
import educationImg from "@/assets/education-icon.jpg";
import trackersImg from "@/assets/trackers-icon.jpg";
import mindsetImg from "@/assets/mindset-icon.jpg";
import emojiImg from "@/assets/emoji-icon.png";

interface FABMenuItem {
  id: string;
  label: string;
  image?: string;
  icon?: React.ElementType;
}

// Menu items arranged in a circular pattern matching Figma
const menuItems: FABMenuItem[] = [
  { id: "education", label: "Education", icon: BookOpen },
  { id: "trackers", label: "Trackers", icon: BarChart3 },
  { id: "qa", label: "Q&A", icon: MessageCircle },
  { id: "mindset", label: "Mindset", icon: Brain },
  { id: "notes", label: "Notes", icon: FileText },
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

  // Position items in a circular pattern around the FAB (matching Figma)
  const getItemPosition = (index: number) => {
    // Circular arrangement: top, top-right, top-left, bottom-right, bottom-left
    const positions = [
      { x: 0, y: -90 },     // top (12 o'clock)
      { x: 75, y: -55 },    // top-right
      { x: -75, y: -55 },   // top-left
      { x: 55, y: 25 },     // bottom-right
      { x: -55, y: 25 },    // bottom-left
    ];
    return positions[index] || { x: 0, y: 0 };
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/70 z-40 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
        {/* Menu items - Circular image buttons */}
        {menuItems.map((item, index) => {
          const pos = getItemPosition(index);
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "absolute flex flex-col items-center gap-1.5 transition-all duration-300",
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
              {/* Circular icon button - white background with orange icon */}
              <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                {item.icon && <item.icon className="w-5 h-5 text-primary" strokeWidth={2} />}
              </div>
              {/* Label */}
              <span className="text-white text-[10px] font-medium drop-shadow-lg">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Main FAB button - Orange gradient */}
        <button
          onClick={toggleMenu}
          className={cn(
            "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-10",
            isExpanded
              ? "bg-white/20 backdrop-blur-sm rotate-45"
              : "fab-button hover:scale-105 active:scale-95"
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
