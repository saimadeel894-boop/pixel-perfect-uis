import { ReactNode } from 'react';
import shreddedLogo from '@/assets/shredded-logo.png';

interface AuthLayoutProps {
  children: ReactNode;
  showLogo?: boolean;
}

export function AuthLayout({ children, showLogo = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Brand header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          {showLogo && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-24 h-24">
                <img 
                  src={shreddedLogo} 
                  alt="Shredded" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-brand text-4xl text-primary tracking-wide">
                  SHREDDED
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Your fitness journey starts here
                </p>
              </div>
            </div>
          )}
          
          {children}
        </div>
      </div>
      
      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-muted-foreground text-xs">
          © 2024 Shredded Fitness. All rights reserved.
        </p>
      </div>
    </div>
  );
}