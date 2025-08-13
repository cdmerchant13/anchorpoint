import Link from 'next/link';

export default function Blog() {
  return (
    <div className="min-h-screen bg-[--gray-50]">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[--gray-900] mb-6">
            Military Family Insights
          </h1>
          <p className="text-xl text-[--gray-700]">
            Stories, tips, and resources for military spouses navigating PCS moves and building community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card">
            <div className="bg-[--gray-200] h-48 rounded-t-lg mb-4 flex items-center justify-center">
              <span className="text-[--gray-500]">Blog Image</span>
            </div>
            <h2 className="text-2xl font-bold text-[--gray-900] mb-2">Top 10 Tips for Your First PCS</h2>
            <p className="text-[--gray-700] mb-4">
              Essential advice for military spouses preparing for their first Permanent Change of Station move.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[--gray-600]">June 15, 2025</span>
              <Link href="/blog/first-pcs-tips" className="text-[--primary-blue] hover:text-[--secondary-blue-light] font-medium">
                Read More
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="bg-[--gray-200] h-48 rounded-t-lg mb-4 flex items-center justify-center">
              <span className="text-[--gray-500]">Blog Image</span>
            </div>
            <h2 className="text-2xl font-bold text-[--gray-900] mb-2">Building Community at Your New Base</h2>
            <p className="text-[--gray-700] mb-4">
              How to quickly find your tribe and establish connections after arriving at a new duty station.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[--gray-600]">May 28, 2025</span>
              <Link href="/blog/building-community" className="text-[--primary-blue] hover:text-[--secondary-blue-light] font-medium">
                Read More
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="bg-[--gray-200] h-48 rounded-t-lg mb-4 flex items-center justify-center">
              <span className="text-[--gray-500]">Blog Image</span>
            </div>
            <h2 className="text-2xl font-bold text-[--gray-900] mb-2">Navigating Military Spouse Employment</h2>
            <p className="text-[--gray-700] mb-4">
              Practical strategies for finding fulfilling work despite the challenges of frequent relocations.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[--gray-600]">May 12, 2025</span>
              <Link href="/blog/spouse-employment" className="text-[--primary-blue] hover:text-[--secondary-blue-light] font-medium">
                Read More
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/auth/register" className="btn-primary inline-block">
            Join Our Community for More Insights
          </Link>
        </div>
      </main>

      <footer className="bg-[--gray-100] border-t border-[--gray-200] py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[--gray-600]">
            &copy; {new Date().getFullYear()} AnchorPoint. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
