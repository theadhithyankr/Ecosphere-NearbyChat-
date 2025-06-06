
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { MessageSquareText, LogOut } from 'lucide-react';

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/chat" className="flex items-center gap-2 text-xl font-bold font-headline">
          <MessageSquareText size={28} />
          EchoSphere
        </Link>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline">Welcome, {currentUser.username}!</span>
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
              <LogOut size={20} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
