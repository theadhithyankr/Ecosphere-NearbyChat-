
"use client";

import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
  const { login, currentUser, isLoading } = useAuth(); // Using login as a generic way to set user for mock
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.push('/chat');
    }
  }, [currentUser, isLoading, router]);

  const handleSignup = (username: string, _password?: string) => {
    // Password would be used in a real backend authentication
    login(username); // Mock: sets user and redirects
  };

  if (isLoading || (!isLoading && currentUser)) {
     return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  return <AuthForm mode="signup" onSubmit={handleSignup} />;
}
