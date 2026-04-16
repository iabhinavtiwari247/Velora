export type SubscriptionTier = 'free' | 'basic' | 'prime' | 'ultimate';
export type UserRole = 'user' | 'admin';
export type Gender = 'male' | 'female';
export type PostType = 'post' | 'reel';

export interface User {
  uid: string;
  email: string;
  phone?: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  createdAt: any;
}

export interface Profile {
  uid: string;
  gender: Gender;
  matrimony: {
    age?: number;
    religion?: string;
    caste?: string;
    height?: string;
    salary?: string;
  };
  social: {
    bio?: string;
    interests: string[];
  };
  professional: {
    jobTitle?: string;
    company?: string;
    skills: string[];
  };
  isVerified: boolean;
  visibility: 'public' | 'restricted';
}

export interface Post {
  id: string;
  authorUid: string;
  authorName?: string;
  authorPhoto?: string;
  type: PostType;
  mediaUrl: string;
  caption: string;
  likesCount: number;
  createdAt: any;
}

export interface Message {
  id: string;
  senderUid: string;
  receiverUid: string;
  text: string;
  timestamp: any;
  read: boolean;
}
