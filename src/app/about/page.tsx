import Link from 'next/link';

export default function About() {
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[--gray-900] mb-6">About AnchorPoint</h1>
          
          <p className="text-[--gray-700] mb-6">
            AnchorPoint is a community platform designed specifically for military spouses who 
            understand the unique challenges of frequent Permanent Change of Station (PCS) moves.
          </p>
          
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Our Mission</h2>
            <p className="text-[--gray-700] mb-4">
              We're on a mission to help military spouses rebuild their communities after every move. 
              Moving frequently is one of the biggest challenges military families face, and we believe 
              that having a strong support network is essential for thriving in each new location.
            </p>
            <p className="text-[--gray-700] mb-4">
              AnchorPoint connects you with other military spouses at your new base, provides access 
              to local knowledge and resources, and helps you feel at home anywhere the military sends you.
            </p>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-[--gray-900] mb-4">How It Works</h2>
            <ul className="list-disc list-inside text-[--gray-700] mb-4">
              <li className="mb-2">Sign up and create your profile</li>
              <li className="mb-2">Connect with other spouses at your base</li>
              <li className="mb-2">Share and discover local resources</li>
              <li className="mb-2">Get personalized recommendations</li>
              <li>Build your support network</li>
            </ul>
          </div>
          
          <div className="text-center">
            <Link href="/signup" className="btn-primary inline-block">
              Join Our Community
            </Link>
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