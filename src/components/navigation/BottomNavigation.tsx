/**
 * BottomNavigation Component
 * Fixed bottom navigation bar with 4 items matching Figma design
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
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border safe-bottom z-30">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto relative">
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
        <div className="w-16" />
        
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
        "flex flex-col items-center gap-0.5 py-1.5 px-2 min-w-[60px] transition-all duration-200",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 transition-transform duration-200",
        isActive && "scale-110"
      )} />
      <span className={cn(
        "text-[9px] font-medium tracking-wider",
        isActive && "font-semibold"
      )}>
        {label}
      </span>
    </button>
  );
}
