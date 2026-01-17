/**
 * BottomNavigation Component (Updated for dark theme)
 * Fixed bottom navigation bar with 4 items and expandable FAB
 */

import { Home, Users, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = "overview" | "community" | "challenge" | "profile";

interface BottomNavigationProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
}

const navItems: { id: NavItem; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "OVERVIEW", icon: Home },
  { id: "community", label: "COMMUNITY", icon: Users },
  { id: "challenge", label: "CHALLENGE", icon: Trophy },
  { id: "profile", label: "PROFILE", icon: User },
];

export function BottomNavigation({ 
  activeItem, 
  onNavigate, 
}: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-bottom z-30">
      <div className="flex items-center justify-around px-4 py-2 max-w-lg mx-auto relative">
        {/* Left items */}
        {navItems.slice(0, 2).map((item) => (
          <NavButton 
            key={item.id}
            {...item}
            isActive={activeItem === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
        
        {/* Center FAB spacer */}
        <div className="w-14" />
        
        {/* Right items */}
        {navItems.slice(2).map((item) => (
          <NavButton 
            key={item.id}
            {...item}
            isActive={activeItem === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}

interface NavButtonProps {
  id: NavItem;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ label, icon: Icon, isActive, onClick }: NavButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-3 transition-colors",
        isActive ? "text-nav-active" : "text-nav-inactive hover:text-foreground"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
