// Mock authentication provider for GitHub Pages deployment
// This replaces the server-side NextAuth configuration

import { useState, useEffect } from 'react';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  dutyStation?: string;
}

export interface MockSession {
  user: MockUser;
  expires: string;
  accessToken?: string;
}

// Mock user database
const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    dutyStation: 'Fort Bragg, NC'
  },
  {
    id: '2', 
    name: 'Test User',
    email: 'test@example.com',
    dutyStation: 'Norfolk, VA'
  }
];

// Mock session storage (in-memory for demo purposes)
let mockSession: MockSession | null = null;

export const mockAuth = {
  // Simulates user login
  async signIn(credentials: { email: string; password: string }): Promise<{ success: boolean; error?: string; user?: MockUser }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple mock authentication - accept any non-empty credentials
    if (credentials.email && credentials.password) {
      const user = mockUsers[0]; // Always return the first user for demo
      mockSession = {
        user,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        accessToken: 'mock-access-token'
      };
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  // Simulates user registration
  async register(userData: { name: string; email: string; password: string }): Promise<{ success: boolean; error?: string; user?: MockUser }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email already exists
    if (mockUsers.some(user => user.email === userData.email)) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user
    const newUser: MockUser = {
      id: String(mockUsers.length + 1),
      name: userData.name,
      email: userData.email,
      dutyStation: 'Unknown'
    };
    
    mockUsers.push(newUser);
    mockSession = {
      user: newUser,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      accessToken: 'mock-access-token'
    };
    
    return { success: true, user: newUser };
  },

  // Simulates sign out
  async signOut(): Promise<void> {
    mockSession = null;
  },

  // Gets current session
  async getSession(): Promise<MockSession | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSession;
  },

  // Updates user profile
  async updateProfile(userId: string, updates: Partial<MockUser>): Promise<{ success: boolean; error?: string; user?: MockUser }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    
    if (mockSession && mockSession.user.id === userId) {
      mockSession.user = mockUsers[userIndex];
    }
    
    return { success: true, user: mockUsers[userIndex] };
  },

  // Gets all users (for admin purposes)
  async getUsers(): Promise<MockUser[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers;
  }
};

// Mock NextAuth-like functions for compatibility
export const useMockSession = () => {
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const loadSession = async () => {
      try {
        const currentSession = await mockAuth.getSession();
        setSession(currentSession);
        setStatus(currentSession ? 'authenticated' : 'unauthenticated');
      } catch (error) {
        setStatus('unauthenticated');
        console.error('Error loading session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  return { data: session, status, loading };
};

export const useMockSignOut = () => {
  const signOut = async () => {
    await mockAuth.signOut();
    window.location.href = '/';
  };

  return signOut;
};

// React hook for mock authentication
export function useMockAuth() {
  const { data: session, status, loading } = useMockSession();
  const signOut = useMockSignOut();

  return {
    data: session,
    status,
    loading,
    signIn: mockAuth.signIn,
    signOut,
    register: mockAuth.register,
    updateProfile: mockAuth.updateProfile
  };
}

// Mock NextAuthProvider for compatibility
interface MockSessionProviderProps {
  children: React.ReactNode;
}

export function MockSessionProvider({ children }: MockSessionProviderProps) {
  return children;
}
