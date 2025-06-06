
"use client";

import Header from '@/components/shared/Header';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace('/login');
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || !currentUser) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading EchoSphere...</p></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
