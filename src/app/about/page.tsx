import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-[--gray-50]">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[--gray-900] mb-6">
              Helping Military Spouses Thrive After Every Move
            </h1>
            <p className="text-xl text-[--gray-700] max-w-3xl mx-auto">
              AnchorPoint is a community platform designed specifically for military spouses who 
              understand the unique challenges of frequent Permanent Change of Station (PCS) moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[--gray-900] mb-6">Our Mission</h2>
              <p className="text-[--gray-700] mb-6 text-lg">
                We're on a mission to help military spouses rebuild their communities after every move. 
                Moving frequently is one of the biggest challenges military families face, and we believe 
                that having a strong support network is essential for thriving in each new location.
              </p>
              <p className="text-[--gray-700] mb-6 text-lg">
                AnchorPoint connects you with other military spouses at your new base, provides access 
                to local knowledge and resources, and helps you feel at home anywhere the military sends you.
              </p>
              <div className="mt-8">
                <Link href="/auth/register" className="btn-primary inline-block">
                  Join Our Community
                </Link>
              </div>
            </div>
            <div className="bg-[--gray-200] rounded-lg h-96 flex items-center justify-center">
              <span className="text-[--gray-500]">Community Image</span>
            </div>
          </div>

          <div className="card mb-16">
            <h2 className="text-3xl font-bold text-[--gray-900] mb-8 text-center">How AnchorPoint Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[--primary-blue] text-[--primary-white] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-[--gray-900] mb-4">Create Your Profile</h3>
                <p className="text-[--gray-700]">
                  Tell us about your family, current duty station, and what you're looking for in your new community.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[--primary-blue] text-[--primary-white] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-[--gray-900] mb-4">Connect & Discover</h3>
                <p className="text-[--gray-700]">
                  Find local resources, connect with other spouses, and get personalized recommendations.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[--primary-blue] text-[--primary-white] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-[--gray-900] mb-4">Thrive in Your New Home</h3>
                <p className="text-[--gray-700]">
                  Build your support network, feel confident about your move, and settle in faster.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[--primary-blue] text-[--primary-white] rounded-lg p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Feel at Home After Your Next Move?
              </h2>
              <p className="text-xl mb-8">
                Join thousands of military spouses who've found their community with AnchorPoint
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth/register" className="btn-secondary text-center px-8 py-4 text-lg">
                  Create Your Free Account
                </Link>
                <Link href="/" className="bg-[--primary-white] text-[--primary-blue] hover:bg-[--gray-100] border border-[--primary-white] rounded-md px-8 py-4 text-lg transition-colors text-center">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[--gray-100] border-t border-[--gray-200] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[--primary-blue] mb-4">AnchorPoint</h3>
              <p className="text-[--gray-700]">
                Helping military spouses connect, share local knowledge, and rebuild community after PCS moves.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[--gray-900] mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-[--gray-700] hover:text-[--primary-blue]">Home</Link></li>
                <li><Link href="/about" className="text-[--gray-700] hover:text-[--primary-blue]">About</Link></li>
                <li><Link href="/blog" className="text-[--gray-700] hover:text-[--primary-blue]">Blog</Link></li>
                <li><Link href="/auth/login" className="text-[--gray-700] hover:text-[--primary-blue]">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[--gray-900] mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-[--gray-700] hover:text-[--primary-blue]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[--gray-700] hover:text-[--primary-blue]">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[--gray-900] mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-[--gray-700] hover:text-[--primary-blue]">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[--gray-700] hover:text-[--primary-blue]">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[--gray-700] hover:text-[--primary-blue]">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-[--gray-200]">
            <p className="text-[--gray-600]">
              &copy; {new Date().getFullYear()} AnchorPoint. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
