import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

/**
 * About page component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 */
const About = ({ className = '', ...props }) => {
  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-7xl">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-blue to-dark-blue text-white">
          <div className="container">
            <div className="text-center">
              <h1 className="heading-1 text-white mb-6">
                About AnchorPoint
              </h1>
              <p className="body-large text-blue-100 max-w-2xl mx-auto mb-8">
                We're working to build a community where military spouses can find the support and information they need to navigate PCS moves and build new connections.
              </p>
              <Button 
                variant="secondary" 
                size="large"
                as={Link}
                to="/"
                className="mr-4"
              >
                Start Searching
              </Button>
              <Button 
                variant="tertiary" 
                size="large"
                as={Link}
                to="/how-it-works"
                className="text-primary-blue border-primary-blue"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 text-gray-800 mb-8">
                Our Mission
              </h2>
              <p className="body-large text-gray-800 mb-12">
  AnchorPoint was born out of our own family’s journey. My wife Anna, an Air Force physician, and I moved from Scott AFB in Illinois, to Kunsan AB in Korea, to Valdosta, Georgia — a transition that left us with more questions than answers. Despite being raised in a military family myself, I realized how little information we had about where we were going: neighborhoods, local resources, basic information about the base, or even the best spots to grab a coffee.  
  <br /><br />
  There was plenty I could learn through a Google search, trawling through Reddit threads, keenly pouring over Zillow listings and Military OneSource pages... but nothing that did the critical job of translating the clinical, data-driven information I was taking in into the specifics of what it would be like to truly be on the ground day-to-day: where would it be most convenient to live? What's the vibe like on the base? Will we find events to take part in, how's the community, what IS this city?
  <br /><br />
  That experience opened my eyes to how often military spouses and families have to start from scratch with every PCS. AnchorPoint is our answer; a way to collate hard-earned knowledge, generate answers, and make sure no one feels unprepared or alone when arriving at a new duty station.
</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2">Connect</h3>
                  <p className="text-gray-600 body-small">
                    Build meaningful connections with other military spouses who understand your journey
                  </p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2">Support</h3>
                  <p className="text-gray-600 body-small">
                    Access trusted resources and support networks tailored to military family needs
                  </p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2">Empower</h3>
                  <p className="text-gray-600 body-small">
                    Gain the knowledge and confidence to thrive in new communities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Target Audience Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 text-gray-800 mb-8">
                Who We Serve
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="heading-3 text-gray-800 mb-4">Military Spouses</h3>
                  <p className="text-gray-600 body-medium mb-4">
                    Whether you're a new spouse or have been in the military community for years, AnchorPoint is here to support you through every PCS move.
                  </p>
                  <ul className="space-y-2 text-gray-600 body-small">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-blue mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Families navigating their first move
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-blue mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Experienced military families looking for new connections at a new home
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-blue mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Parents seeking family-friendly resources
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-blue mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Career-focused spouses finding professional opportunities
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="heading-3 text-gray-800 mb-4">Military Families</h3>
                  <p className="text-gray-600 body-medium mb-4">
                    We support the entire military family by providing comprehensive resources for every member of your household.
                  </p>
                  <ul className="space-y-2 text-gray-600 body-small">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-red mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Children and youth finding schools and activities
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-red mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Military members accessing support services
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-red mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Extended family members understanding military life
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-red mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Finding veterinary care and pet-friendly services
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Value Proposition Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 text-gray-800 mb-8">
                Why AnchorPoint?
              </h2>
              <p className="body-large text-gray-600 mb-12">
                We're more than just a search engine - we're a community built by military spouses, for military families.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="heading-3 text-gray-800 mb-4">Real-World Experience</h3>
                  <p className="text-gray-600 body-medium">
                    Our search results are AI-powered and trained on the collective wisdom of military families who've been through it all. Get practical, tested advice from people who have "been there"- literally.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="heading-3 text-gray-800 mb-4">Trusted Resources</h3>
                  <p className="text-gray-600 body-medium">
                    No more sifting through generic search results. We're relying on validated and verified data parsed through our specialized AI models to ensure relevance.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="heading-3 text-gray-800 mb-4">Base-Specific Insights</h3>
                  <p className="text-gray-600 body-medium">
                    Get information tailored to your specific duty station. From housing markets to school districts to local restaurants and events, we've got the inside scoop.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="heading-3 text-gray-800 mb-4">Always Evolving</h3>
                  <p className="text-gray-600 body-medium">
                    Our systems are continuously updating and expanding our knowledge base. The more people who contribute, the better we all become.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-primary-blue text-white">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 text-white mb-8">
                Get in Touch
              </h2>
              <p className="body-large text-blue-100 mb-12">
                Have questions, suggestions, or want to get involved? We'd love to hear from you!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div>
                  <h3 className="heading-3 text-white mb-2">Email</h3>
                  <p className="text-blue-100 body-medium">
                    hello@anchorpoint.my
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-3 text-white mb-2">Community</h3>
                  <p className="text-blue-100 body-medium">
                    Join our Facebook group!
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-3 text-white mb-2">Support</h3>
                  <p className="text-blue-100 body-medium">
                    Check us out on Twitter/X!
                  </p>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                size="large"
                as={Link}
                to="/"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default About;
