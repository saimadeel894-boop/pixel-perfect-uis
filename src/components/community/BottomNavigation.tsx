/**
 * BottomNavigation Component
 * Fixed bottom navigation bar with 5 items including center FAB
 * Icons: Overview, Community, FAB (+), Challenge, Profile
 */

import { Home, Users, Trophy, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = "overview" | "community" | "challenge" | "profile";

interface BottomNavigationProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  onFabClick?: () => void;
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
  onFabClick 
}: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
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
        
        {/* Floating Action Button */}
        <button 
          onClick={onFabClick}
          className="fab-button absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
          aria-label="Create new post"
        >
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </button>
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
        isActive ? "text-nav-active" : "text-muted-foreground"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
