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
              found. That wasn’t just inconvenient, it was deeply isolating. We felt stuck in
              an unfamiliar place where finding anything beyond the basics required Herculean
              effort.
            </p>
            <p className="text-[--gray-700] mb-4 text-lg">
              Everything changed when we began connecting with local military spouses. The
              small tips, shared Facebook posts, and casual help navigating the neighborhood made
              all the difference. That’s why I created AnchorPoint, it's the platform I wish we’d had
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

          {/* ...rest remains unchanged */}
