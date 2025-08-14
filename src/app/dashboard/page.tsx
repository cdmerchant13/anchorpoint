'use client';

import { useMockAuth } from '@/lib/mock/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status, loading } = useMockAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if not authenticated
  if (!mounted || loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-[--gray-50] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--primary-blue] mx-auto"></div>
          <p className="mt-4 text-[--gray-600]">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    window.location.href = '/auth/login';
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[--gray-900] mb-2">Welcome, {session?.user?.name}!</h1>
        <p className="text-lg text-[--gray-700]">Here's what's happening in your AnchorPoint community</p>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[--gray-600]">Name</p>
            <p className="text-[--gray-900]">{session?.user?.name}</p>
          </div>
          <div>
            <p className="text-[--gray-600]">Email</p>
            <p className="text-[--gray-900]">{session?.user?.email}</p>
          </div>
          <div>
            <p className="text-[--gray-600]">Duty Station</p>
            <p className="text-[--gray-900]">{session?.user?.dutyStation || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-accent">
          <h3 className="text-xl font-bold text-[--gray-900] mb-2">Resource Library</h3>
          <p className="text-[--gray-700] mb-4">Browse and share insights about military bases.</p>
          <Link href="/resources" className="btn-primary inline-block">View Library</Link>
        </div>
        
        <div className="card-accent">
          <h3 className="text-xl font-bold text-[--gray-900] mb-2">Community</h3>
          <p className="text-[--gray-700] mb-4">Connect with other military spouses at your base.</p>
          <Link href="/community" className="btn-primary inline-block">Join Discussions</Link>
        </div>
        
        <div className="card-accent">
          <h3 className="text-xl font-bold text-[--gray-900] mb-2">Events</h3>
          <p className="text-[--gray-700] mb-4">Find local events and activities for families.</p>
          <Link href="/events" className="btn-primary inline-block">Browse Events</Link>
        </div>
      </div>
    </div>
  );
}
