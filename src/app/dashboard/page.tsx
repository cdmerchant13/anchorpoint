import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login');
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
              <li>
                <form action="/api/auth/logout" method="POST">
                  <button type="submit" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[--gray-900] mb-6">Welcome, {session.user?.name}!</h1>
          
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[--gray-600]">Name</p>
                <p className="text-[--gray-900]">{session.user?.name}</p>
              </div>
              <div>
                <p className="text-[--gray-600]">Email</p>
                <p className="text-[--gray-900]">{session.user?.email}</p>
              </div>
              <div>
                <p className="text-[--gray-600]">Duty Station</p>
                <p className="text-[--gray-900]">{session.user?.dutyStation || 'Not specified'}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-accent">
              <h3 className="text-xl font-bold text-[--gray-900] mb-2">Resources</h3>
              <p className="text-[--gray-700] mb-4">Browse and share local resources for your duty station.</p>
              <Link href="/resources" className="btn-primary inline-block">View Resources</Link>
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