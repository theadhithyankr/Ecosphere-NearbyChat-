
"use client";

import { useState, useEffect, useRef } from 'react';
import type { Message, User } from '@/lib/types';
import MapView from '@/components/chat/MapView';
import ChatMessage from '@/components/chat/ChatMessage';
import MessageInput from '@/components/chat/MessageInput';
import { useAuth } from '@/hooks/useAuth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessagesSquare } from 'lucide-react';

// Mock Data
const MOCK_NEARBY_USERS: User[] = [
  { id: 'user2', username: 'Alice', latitude: 34.0522, longitude: -118.2437 },
  { id: 'user3', username: 'Bob', latitude: 34.0550, longitude: -118.2450 },
  { id: 'user4', username: 'Charlie', latitude: 34.0500, longitude: -118.2400 },
];

const INITIAL_MESSAGES: Message[] = [
  { id: 'msg1', userId: 'user2', username: 'Alice', text: 'Hey everyone! Anyone around?', timestamp: new Date(Date.now() - 1000 * 60 * 5), isSender: false },
  { id: 'msg2', userId: 'user3', username: 'Bob', text: "Hi Alice! I'm nearby.", timestamp: new Date(Date.now() - 1000 * 60 * 3), isSender: false },
];


export default function ChatPage() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [nearbyUsers, setNearbyUsers] = useState<User[]>(MOCK_NEARBY_USERS);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock fetching user location and nearby users
  useEffect(() => {
    if (currentUser) {
      // Simulate fetching location
      // navigator.geolocation.getCurrentPosition(position => { ... });
      
      // Add current user to nearby users list if not already there (for map display)
      setNearbyUsers(prevUsers => {
        if (!prevUsers.find(u => u.id === currentUser.id)) {
          return [...prevUsers, { ...currentUser, latitude: 34.0530, longitude: -118.2420 }]; // Mock coords for current user
        }
        return prevUsers;
      });
    }
  }, [currentUser]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);


  const handleSendMessage = (text: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      text,
      timestamp: new Date(),
      isSender: true,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-var(--header-height)-5rem)] md:h-[calc(100vh-var(--header-height)-3rem)]"> {/* Adjust for header and padding */}
      {/* Left Column: Map and User Info */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <MapView nearbyUsers={nearbyUsers} />
        <Card className="hidden lg:block shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-headline">About EchoSphere</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    EchoSphere connects you with people in your immediate vicinity (approx. 1km). Send messages into the sphere and see who responds!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    Currently showing <strong>{nearbyUsers.length}</strong> users nearby (including you).
                </p>
            </CardContent>
        </Card>
      </div>

      {/* Right Column: Chat Area */}
      <Card className="lg:col-span-2 flex flex-col h-full shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <MessagesSquare size={24} className="text-primary" />
            Local Chat Sphere
          </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />
            ))}
          </div>
        </ScrollArea>
        <MessageInput onSendMessage={handleSendMessage} />
      </Card>
    </div>
  );
}
