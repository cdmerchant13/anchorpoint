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

          {/* Founder's Story Section */}
          <div className="mb-16 bg-[--white] p-8 rounded-lg shadow">
            <h2 className="text-3xl font-bold text-[--gray-900] mb-6">Our Story</h2>
            <p className="text-[--gray-700] mb-4 text-lg">
              My wife and I experienced firsthand how isolating PCS moves can be when we
              transferred from Kunsan Air Base in Korea to Moody AFB in Georgia. We had scoured
              Google, Facebook, and Reddit before we left, reassuring ourselves that Moody was a
              thriving, midsize college town with plenty to offer. But on arrival, the difference was
              stark.
            </p>
            <p className="text-[--gray-700] mb-4 text-lg">
              The amenities, restaurants, and job opportunities we expected were nowhere to be
              found. That wasn't just inconvenient, it was deeply isolating. We felt stuck in
              an unfamiliar place where finding anything beyond the basics required Herculean
              effort.
            </p>
            <p className="text-[--gray-700] mb-4 text-lg">
              Everything changed when we began connecting with local military spouses. The
              small tips, shared Facebook posts, and casual help navigating the neighborhood made
              all the difference. That's why I created AnchorPoint, it's the platform I wish we'd had
              when we got there.
            </p>
            <p className="text-[--gray-700] text-lg">
              AnchorPoint is born from our PCS story—rooted in empathy, real connection, and
              the belief that every military spouse deserves trusted local knowledge and a support
              network from day one.
            </p>
          </div>
          {/* End Founder's Story */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[--gray-900] mb-6">Our Mission</h2>
              <p className="text-[--gray-700] mb-6 text-lg">
                We're on a mission to help military spouses rebuild their communities after every
                move. Moving frequently is one of the biggest challenges military families face, and
                we believe that having a strong support network is essential for thriving in each new
                location.
              </p>
              <p className="text-[--gray-700] mb-6 text-lg">
                AnchorPoint connects you with other military spouses at your new base, provides
                access to local knowledge and resources, and helps you feel at home anywhere the
                military sends you.
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

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[--gray-900] mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[--primary-blue] text-[--primary-white] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[--gray-900] mb-4">Community First</h3>
                <p className="text-[--gray-700]">
                  We believe in the power of military spouses supporting each other. Every feature and 
                  connection is designed to strengthen our community bonds.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[--primary-blue] text-[--primary-white] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[--gray-900] mb-4">Trust & Safety</h3>
                <p className="text-[--gray-700]">
                  Your privacy and security are our top priorities. We create a safe environment where 
                  you can share and connect with confidence.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[--primary-blue] text-[--primary-white] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[--gray-900] mb-4">Empowerment</h3>
                <p className="text-[--gray-700]">
                  We empower you with the knowledge and connections you need to thrive in every new 
                  location, making each move an opportunity for growth.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[--primary-blue] text-[--primary-white] rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Community?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of military spouses who've found their support network through AnchorPoint
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register" className="btn-secondary inline-block">
                Create Your Account
              </Link>
              <Link href="/" className="bg-[--primary-white] text-[--primary-blue] hover:bg-[--gray-100] border border-[--primary-white] rounded-md px-8 py-4 text-lg transition-colors inline-block text-center">
                Learn More
              </Link>
            </div>
          </div>
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
