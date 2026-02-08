'use client';

import React from 'react';
import TopNav from './TopNav';

interface AppShellProps {
  children: React.ReactNode;
  showNav?: boolean;
  navProps?: {
    showBack?: boolean;
    showClose?: boolean;
    onBack?: () => void;
    onClose?: () => void;
    title?: string;
    subtitle?: string;
  };
}

export default function AppShell({ children, showNav = true, navProps }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F5F5' }}>
      {showNav && <TopNav {...navProps} />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

