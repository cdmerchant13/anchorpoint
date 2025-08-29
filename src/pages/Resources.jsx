import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

/**
 * Resources page component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 */
const Resources = ({ className = '', ...props }) => {
  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-7xl">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-blue to-dark-blue text-white">
          <div className="container">
            <div className="text-center">
              <h1 className="heading-1 text-white mb-6">
                Resources & Support
              </h1>
              <p className="body-large text-blue-100 max-w-2xl mx-auto mb-8">
                Connect with communities and access official resources to support your military family journey.
              </p>
            </div>
          </div>
        </section>
        
        {/* Resources Grid Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 text-gray-800 mb-8">
                Connect, Support & Empower
              </h2>
              <p className="body-large text-gray-600 mb-12">
                Explore these valuable resources to help you navigate military life, connect with others, and find the support you need.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Military Subreddits */}
                <a 
                  href="https://reddit.com/r/army" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-primary-red transition-colors duration-200">
                    /r/army
                  </h3>
                  <p className="text-gray-600 body-small">
                    Connect with Army families and get insights on Army life
                  </p>
                </a>
                
                <a 
                  href="https://reddit.com/r/airforce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-primary-blue transition-colors duration-200">
                    /r/airforce
                  </h3>
                  <p className="text-gray-600 body-small">
                    Air Force community discussions and support
                  </p>
                </a>
                
                <a 
                  href="https://reddit.com/r/marines" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-primary-red transition-colors duration-200">
                    /r/marines
                  </h3>
                  <p className="text-gray-600 body-small">
                    Marine Corps spouse and family resources
                  </p>
                </a>
                
                <a 
                  href="https://reddit.com/r/navy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-primary-blue transition-colors duration-200">
                    /r/navy
                  </h3>
                  <p className="text-gray-600 body-small">
                    Navy family support and community discussions
                  </p>
                </a>
                
                <a 
                  href="https://reddit.com/r/militaryspouse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-primary-red transition-colors duration-200">
                    /r/militaryspouse
                  </h3>
                  <p className="text-gray-600 body-small">
                    Dedicated community for military spouses
                  </p>
                </a>
                
                {/* Official Resources */}
                <a 
                  href="https://www.militaryonesource.mil/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-primary-blue transition-colors duration-200">
                    Military OneSource
                  </h3>
                  <p className="text-gray-600 body-small">
                    Official DoD resource for military families
                  </p>
                </a>
                
                {/* Add more CTA squares here */}
                {/* Example format for additional resources:
                <a 
                  href="[YOUR_LINK_HERE]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-[COLOR] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="w-8 h-8 text-[COLOR]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="[SVG_PATH]" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-[COLOR] transition-colors duration-200">
                    Resource Name
                  </h3>
                  <p className="text-gray-600 body-small">
                    Brief description of the resource
                  </p>
                </a>
                */}
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Resources Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 text-gray-800 mb-8">
                Need More Help?
              </h2>
              <p className="body-large text-gray-600 mb-12">
                Can't find what you're looking for? Our community is here to help.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="heading-3 text-gray-800 mb-4">Join Our Community</h3>
                  <p className="text-gray-600 body-medium mb-4">
                    Connect with other military spouses who understand your journey.
                  </p>
                  <Link to="/" className="inline-flex items-center text-primary-blue hover:text-primary-blue-dark font-medium">
                    Visit AnchorPoint
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="heading-3 text-gray-800 mb-4">Contact Support</h3>
                  <p className="text-gray-600 body-medium mb-4">
                    Have questions? Our team is ready to assist you.
                  </p>
                  <a href="mailto:hello@anchorpoint.my" className="inline-flex items-center text-primary-blue hover:text-primary-blue-dark font-medium">
                    hello@anchorpoint.my
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="heading-3 text-gray-800 mb-4">Follow Us</h3>
                  <p className="text-gray-600 body-medium mb-4">
                    Stay updated with the latest resources and community news.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-primary-blue transition-colors duration-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary-blue transition-colors duration-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
