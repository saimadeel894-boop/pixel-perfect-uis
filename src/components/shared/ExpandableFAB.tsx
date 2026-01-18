/**
 * ExpandableFAB Component
 * Floating action button that expands into a circular menu
 * Shows: Education, Trackers, Q&A, Mindset options - matches Figma exactly
 */

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Import images
import educationImg from "@/assets/education-icon.jpg";
import trackersImg from "@/assets/trackers-icon.jpg";
import mindsetImg from "@/assets/mindset-icon.jpg";
import emojiImg from "@/assets/emoji-icon.png";

interface FABMenuItem {
  id: string;
  label: string;
  image: string;
}

const menuItems: FABMenuItem[] = [
  { id: "education", label: "Education", image: educationImg },
  { id: "trackers", label: "Trackers", image: trackersImg },
  { id: "qa", label: "Q&A", image: emojiImg },
  { id: "mindset", label: "Mindset", image: mindsetImg },
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

  // Position items in a cross pattern around the FAB
  const getItemPosition = (index: number) => {
    const positions = [
      { x: 0, y: -85 },    // top
      { x: 75, y: -40 },   // top-right
      { x: -75, y: -40 },  // top-left
      { x: 0, y: 50 },     // bottom (slightly hidden by nav)
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
                "absolute flex flex-col items-center gap-1 transition-all duration-300",
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
              {/* Circular image */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Label */}
              <span className="text-white text-xs font-medium drop-shadow-lg">
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
