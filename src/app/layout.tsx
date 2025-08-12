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
        <header>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>AnchorPoint</h1>
            <nav>
              <ul style={{ display: 'flex', gap: '1.5rem' }}>
                <li><Link href="/" style={{ textDecoration: 'none', color: '#3C3B6E' }}>Home</Link></li>
                <li><Link href="/about" style={{ textDecoration: 'none', color: '#3C3B6E' }}>About</Link></li>
                {session ? (
                  <>
                    <li><Link href="/dashboard" style={{ textDecoration: 'none', color: '#3C3B6E' }}>Dashboard</Link></li>
                    <li>
                      <form action="/api/auth/logout" method="POST">
                        <button type="submit" style={{ backgroundColor: 'transparent', border: 'none', color: '#3C3B6E', cursor: 'pointer' }}>
                          Logout
                        </button>
                      </form>
                    </li>
                  </>
                ) : (
                  <li><Link href="/auth/login" style={{ textDecoration: 'none', color: '#3C3B6E' }}>Login</Link></li>
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