import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Brand header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center space-y-2">
            <h1 className="font-brand text-5xl text-primary tracking-wide">
              TRONEX
            </h1>
            <p className="text-muted-foreground text-sm">
              Your fitness journey starts here
            </p>
          </div>
          
          {children}
        </div>
      </div>
      
      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-muted-foreground text-xs">
          © 2024 Tronex Fitness. All rights reserved.
        </p>
      </div>
    </div>
  );
}