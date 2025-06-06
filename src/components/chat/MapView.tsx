
"use client";

import type { User } from '@/lib/types';
import Image from 'next/image';
import UserMarker from './UserMarker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';


interface MapViewProps {
  nearbyUsers: User[];
}

export default function MapView({ nearbyUsers }: MapViewProps) {
  const [mapDimensions, setMapDimensions] = useState({ width: 300, height: 200 });

  // Mock positions for users on the placeholder map
  // These would be calculated based on real geo-coordinates and map projection
  const getMockPosition = (index: number) => {
    const positions = [
      { top: '30%', left: '25%' },
      { top: '50%', left: '60%' },
      { top: '70%', left: '40%' },
      { top: '40%', left: '80%' },
      { top: '60%', left: '15%' },
    ];
    return positions[index % positions.length];
  };
  
  // Randomize mount-time to avoid hydration mismatch for placeholder.
  const [placeholderUrl, setPlaceholderUrl] = useState('');
  useEffect(() => {
    setPlaceholderUrl(`https://placehold.co/${mapDimensions.width}x${mapDimensions.height}.png?time=${Date.now()}`);
  }, [mapDimensions]);

  const usersWithLocation = nearbyUsers.filter(user => user.latitude !== undefined && user.longitude !== undefined);

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-headline flex items-center gap-2">
          <Users size={24} className="text-primary" />
          Nearby Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden bg-muted">
          {placeholderUrl && (
            <Image
                src={placeholderUrl}
                alt="Map View Placeholder"
                layout="fill"
                objectFit="cover"
                data-ai-hint="abstract map"
                onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                    setMapDimensions({ width: naturalWidth, height: naturalHeight });
                }}
            />
           )}
          {usersWithLocation.map((user, index) => (
            <UserMarker key={user.id} user={user} style={getMockPosition(index)} />
          ))}
        </div>
        {usersWithLocation.length === 0 && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            No users with shared location on the map. Share yours to appear!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
