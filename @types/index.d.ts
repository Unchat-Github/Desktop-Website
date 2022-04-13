export interface User {
  username: string;
  avatar: string;
  id: string;
}

export interface UserChannel {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  members: string[];
}

export interface ChannelMember {
  username: string;
  status: string;
  createdAt: string;
  id: string;
  avatar: string;
}

export interface Channel {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  members: ChannelMember[];
}

export interface Message {
  channel_id: string;
  author: ChannelMember;
  id: string;
  createdAt: string;
  attachments: [];
  content: string;
}

export interface Notification {
  author: User;
  value: string;
  type: string;
}
