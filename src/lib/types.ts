
export interface User {
  id: string;
  username: string;
  latitude?: number; // Optional for now
  longitude?: number; // Optional for now
  avatar?: string; // URL to avatar image or placeholder
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: Date;
  isSender: boolean; // To easily distinguish messages from the current user
}
