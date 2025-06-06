
"use client";

import type { User } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_STORAGE_KEY = 'echosphere-user';

interface UseAuthReturn {
  currentUser: User | null;
  login: (username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export function useAuth(): UseAuthReturn {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string) => {
    const user: User = { id: `user_${Date.now()}`, username };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    setCurrentUser(user);
    router.push('/chat');
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setCurrentUser(null);
    router.push('/login');
  }, [router]);

  return { currentUser, login, logout, isLoading };
}
