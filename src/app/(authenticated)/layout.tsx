'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing out:', error);
      // Fallback to redirect
      window.location.href = '/';
    }
  };

  // Show loading state on server, render on client
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[--gray-50]">
        <header className="bg-[--primary-white] border-b border-[--gray-200]">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><div className="h-6 w-16 bg-[--gray-200] rounded animate-pulse"></div></li>
                <li><div className="h-6 w-20 bg-[--gray-200] rounded animate-pulse"></div></li>
                <li><div className="h-6 w-20 bg-[--gray-200] rounded animate-pulse"></div></li>
                <li><div className="h-6 w-16 bg-[--gray-200] rounded animate-pulse"></div></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-[--gray-100] border-t border-[--gray-200] py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-[--gray-600]">
                &copy; {new Date().getFullYear()} AnchorPoint. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--gray-50]">
      <header className="bg-[--primary-white] border-b border-[--gray-200]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Home</Link></li>
              <li><Link href="/dashboard" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Dashboard</Link></li>
              <li><Link href="/resources" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Resources</Link></li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="text-[--primary-blue] hover:text-[--secondary-blue-light]"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-[--gray-100] border-t border-[--gray-200] py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[--gray-600]">
              &copy; {new Date().getFullYear()} AnchorPoint. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
