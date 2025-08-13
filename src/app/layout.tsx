import type { Metadata } from 'next';
import Link from 'next/link';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'AnchorPoint',
  description: 'Helping military spouses connect, share local knowledge, and rebuild community after PCS moves',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                <li><Link href="/blog" style={{ textDecoration: 'none', color: '#3C3B6E' }}>Blog</Link></li>
                <li><Link href="/auth/login" style={{ textDecoration: 'none', color: '#3C3B6E' }}>Login</Link></li>
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
