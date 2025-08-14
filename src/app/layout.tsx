import type { Metadata } from 'next';
import Link from 'next/link';
import SessionWrapper from '@/components/SessionWrapper';
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
        <SessionWrapper>
          <header className="bg-[--primary-white] border-b border-[--gray-200]">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint</h1>
              <nav>
                <ul className="flex space-x-6">
                  <li><Link href="/" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Home</Link></li>
                  <li><Link href="/about" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">About</Link></li>
                  <li><Link href="/blog" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Blog</Link></li>
                  <li><Link href="/auth/login" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Login</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <main>
            {children}
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
