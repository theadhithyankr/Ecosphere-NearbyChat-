
"use client";

import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { login, currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.push('/chat');
    }
  }, [currentUser, isLoading, router]);


  const handleLogin = (username: string, _password?: string) => {
    // Password would be used in a real backend authentication
    login(username);
  };
  
  if (isLoading || (!isLoading && currentUser)) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
