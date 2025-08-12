import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[--gray-50]">
      <header className="bg-[--primary-white] border-b border-[--gray-200]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Home</Link></li>
              <li><Link href="/about" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">About</Link></li>
              <li><Link href="/resources" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Resources</Link></li>
              <li><Link href="/login" className="btn-primary">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[--gray-900] mb-6">
            Rebuild Your Community After Every Move
          </h1>
          <p className="text-xl text-[--gray-700] mb-10">
            AnchorPoint helps military spouses connect with others at their new base, 
            share local knowledge, and find the resources they need to feel at home anywhere.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="btn-primary text-center">
              Join the Community
            </Link>
            <Link href="/resources" className="btn-tertiary text-center">
              Explore Resources
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-accent">
            <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Base-Specific Knowledge</h2>
            <p className="text-[--gray-700]">
              Discover tips, recommendations, and insider knowledge specific to your new military base.
            </p>
          </div>
          <div className="card-accent">
            <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Peer Support</h2>
            <p className="text-[--gray-700]">
              Connect with other military spouses who understand the unique challenges of frequent moves.
            </p>
          </div>
          <div className="card-accent">
            <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Local Resources</h2>
            <p className="text-[--gray-700]">
              Find family-friendly activities, healthcare providers, schools, and essential services nearby.
            </p>
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