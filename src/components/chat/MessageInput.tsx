
"use client";

import { useState, type FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 border-t bg-card">
      <Textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow resize-none text-sm"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
        <Send size={20} />
        <span className="sr-only">Send Message</span>
      </Button>
    </form>
  );
}
