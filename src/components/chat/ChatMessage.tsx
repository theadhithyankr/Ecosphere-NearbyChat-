
"use client";

import type { Message, User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  currentUser: User | null;
}

export default function ChatMessage({ message, currentUser }: ChatMessageProps) {
  const isSender = message.userId === currentUser?.id;

  return (
    <div className={cn('flex items-end gap-2 my-3', isSender ? 'justify-end' : 'justify-start')}>
      {!isSender && (
        <Avatar className="h-8 w-8">
          {/* In a real app, user.avatar would be set */}
          {/* <AvatarImage src={user.avatar} alt={message.username} /> */}
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <UserCircle2 size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-lg px-3 py-2 shadow-md',
          isSender
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none border'
        )}
      >
        {!isSender && (
          <p className="text-xs font-medium mb-0.5 text-muted-foreground">{message.username}</p>
        )}
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={cn(
            "text-xs mt-1",
            isSender ? "text-primary-foreground/70 text-right" : "text-muted-foreground/80 text-left"
          )}>
          {format(new Date(message.timestamp), 'p')}
        </p>
      </div>
      {isSender && (
         <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <UserCircle2 size={20} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
