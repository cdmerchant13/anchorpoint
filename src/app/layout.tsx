import '../styles/globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth/nextauth';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AnchorPoint',
  description: 'Helping military spouses connect, share local knowledge, and rebuild community after PCS moves',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body>
        <header className="bg-[--primary-white] border-b border-[--gray-200]">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Home</Link></li>
                <li><Link href="/about" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">About</Link></li>
                {session ? (
                  <>
                    <li><Link href="/dashboard" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Dashboard</Link></li>
                    <li>
                      <form action="/api/auth/logout" method="POST">
                        <button type="submit" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">
                          Logout
                        </button>
                      </form>
                    </li>
                  </>
                ) : (
                  <li><Link href="/auth/login" className="btn-primary">Login</Link></li>
                )}
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}