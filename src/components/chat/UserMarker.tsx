
"use client";

import type { User } from '@/lib/types';
import { MapPin } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserMarkerProps {
  user: User;
  style: React.CSSProperties;
}

export default function UserMarker({ user, style }: UserMarkerProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={style}
            aria-label={`User ${user.username}`}
          >
            <MapPin className="text-accent" size={28} strokeWidth={2.5} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{user.username}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
