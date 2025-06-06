
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { MessageSquareText } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (username: string, password?: string) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    // In a real app, password would be used for actual authentication
    onSubmit(username, password);
  };

  const title = mode === 'login' ? 'Welcome Back!' : 'Create Account';
  const description = mode === 'login' ? 'Log in to connect with your local sphere.' : 'Sign up to discover EchoSphere.';
  const buttonText = mode === 'login' ? 'Login' : 'Sign Up';
  const linkText = mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Login';
  const linkHref = mode === 'login' ? '/signup' : '/login';

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 text-primary">
           <MessageSquareText size={48} />
        </div>
        <CardTitle className="font-headline text-3xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-base"
            />
          </div>
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base">
            {buttonText}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <Link href={linkHref} className="text-sm text-primary hover:underline">
          {linkText}
        </Link>
      </CardFooter>
    </Card>
  );
}
