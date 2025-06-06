
"use client";

import { useState, useEffect, useRef } from 'react';
import type { Message, User } from '@/lib/types';
import MapView from '@/components/chat/MapView';
import ChatMessage from '@/components/chat/ChatMessage';
import MessageInput from '@/components/chat/MessageInput';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessagesSquare } from 'lucide-react';

export default function ChatPage() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentUser) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userWithLocation: User = {
              ...currentUser,
              latitude,
              longitude,
            };
            setNearbyUsers([userWithLocation]);
            toast({
              title: "Location shared",
              description: "Your location is now visible on the map.",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              variant: "destructive",
              title: "Location Error",
              description: "Could not retrieve your location. Please ensure location services are enabled and permissions are granted.",
            });
            // Add current user without location to still show them in lists if needed, or handle differently
            setNearbyUsers([{ ...currentUser }]); 
          }
        );
      } else {
        toast({
          variant: "destructive",
          title: "Geolocation Not Supported",
          description: "Your browser does not support geolocation.",
        });
        setNearbyUsers([{ ...currentUser }]);
      }
    }
  }, [currentUser, toast]);

  useEffect(() => {
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

    // Simulate receiving a message back after a short delay for demo purposes
    setTimeout(() => {
      if (nearbyUsers.length > 1 || (nearbyUsers.length === 1 && nearbyUsers[0].id !== currentUser.id)) {
        const otherUser = nearbyUsers.find(u => u.id !== currentUser.id) || {id: "echo_bot", username: "EchoBot"};
         const botMessage: Message = {
          id: `msg_bot_${Date.now()}`,
          userId: otherUser.id,
          username: otherUser.username,
          text: `Echo: "${text}"`,
          timestamp: new Date(),
          isSender: false,
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else if (messages.length === 0 && nearbyUsers.length <=1 ) { // Only if it's the first message and no other users
         const botMessage: Message = {
          id: `msg_bot_welcome_${Date.now()}`,
          userId: "echo_bot_welcome",
          username: "EchoSphere Guide",
          text: "Welcome to the chat! It seems you're the first one here. Your messages will be seen by others as they join your sphere.",
          timestamp: new Date(),
          isSender: false,
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-var(--header-height)-5rem)] md:h-[calc(100vh-var(--header-height)-3rem)]"> {/* Adjust for header and padding */}
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
                    Currently showing <strong>{nearbyUsers.filter(u => u.latitude && u.longitude).length}</strong> user(s) with location on the map.
                </p>
            </CardContent>
        </Card>
      </div>

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
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <MessagesSquare size={48} className="mx-auto mb-2" />
                <p>No messages yet. Send a message to start chatting!</p>
                <p className="text-xs mt-1">Your location needs to be shared to see yourself on the map.</p>
              </div>
            )}
          </div>
        </ScrollArea>
        <MessageInput onSendMessage={handleSendMessage} />
      </Card>
    </div>
  );
}
