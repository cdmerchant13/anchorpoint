import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const HowItWorks = ({ className = '', ...props }) => {
  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-7xl">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-blue to-dark-blue text-white">
          <div className="container">
            <div className="text-center">
              <h1 className="heading-1 text-white mb-6">
                How AnchorPoint Works 
              </h1>
              <p className="body-large text-blue-100 max-w-2xl mx-auto mb-8">
                Your digital relocation sidekick - tapping into thousands of military spouse experiences to give you PCS-smart answers
              </p>
              <Button 
                variant="secondary" 
                size="large"
                as={Link}
                to="/"
                className="mr-4"
              >
                Try It Now
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-8">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 text-gray-800 mb-8">
                Your Knowledge Journey
              </h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Moving with the military doesn't mean starting from scratch. We unlock collective wisdom from spouses who've walked this path before you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="heading-3 text-gray-800 mb-2">1. Ask Like a Friend</h3>
                <p className="text-gray-600 body-small">
                  Type natural questions: "Best Fort Cavazos schools?" "Navy spouse jobs in San Diego?" No military jargon needed.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="heading-3 text-gray-800 mb-2">2. Military-Smart AI Digs In</h3>
                <p className="text-gray-600 body-small">
                  We scan spouse-approved sources: Reddit threads, base guides, housing reports, and verified community resources.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="heading-3 text-gray-800 mb-2">3. Get the Real Scoop</h3>
                <p className="text-gray-600 body-small">
                  Actionable intel with sources cited: "2024 spouse survey finds..." or "2023 housing office data shows..."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Differentiation */}
        <section className="py-8 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-gray-800 mb-6">
                Don't Just Ask An AI
              </h2>
              <p className="body-large text-gray-600 max-w-2xl mx-auto">
                AnchorPoint is built with military-family priorities at our core:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="heading-3 text-primary-blue mb-4">Military-Ready Filters</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary-red bg-opacity-10 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-gray-800">BAH-Smart</h4>
                      <p className="text-gray-600 body-small">Flags when housing prices exceed typical allowances</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-blue bg-opacity-10 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-gray-800">Freshness Checks</h4>
                      <p className="text-gray-600 body-small">Auto-flags pre-2020 data with warning banners</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="heading-3 text-primary-blue mb-4">Family-First Focus</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary-red bg-opacity-10 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-gray-800">Kid & Pet Priority</h4>
                      <p className="text-gray-600 body-small">Surfaces schools, vets, parks- the things important to you</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-blue bg-opacity-10 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-gray-800">Spouse Career Smart</h4>
                      <p className="text-gray-600 body-small">Highlights remote work hubs and license reciprocity</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Comparison */}
        <section className="py-8 bg-gradient-to-b from-primary-blue to-dark-blue">
          <div className="container">
            <div className="text-center mb-6">
              <h2 className="heading-2 text-white mb-6">
                Why Use Generic AI tools?
              </h2>
              <p className="body-large text-blue-100 max-w-2xl mx-auto">
                Seriously. Try it out- ask your favorite Chat AI to tell you about your local area or your base you know well- watch it get EVERYTHING wrong. AnchorPoint merges real military family experiences with specialized, trained AI systems to solve PCS challenges other tools just don't understand
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-8">
              <div>
                <h3 className="heading-3 bg-red-600 text-white py-2 px-4 rounded-full inline-block mb-8">
                  Generic AI Tools
                </h3>
                <ul className="space-y-3">
                  {[
                    "Broad web scraping, catching bad data",
                    "Outdated information- who cares what the base was like in 2015?",
                    "No military living context",
                    "FAQ-style answers",
                    "No BAH understanding"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <svg className="w-6 h-6 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="heading-3 bg-primary-blue text-white py-2 px-4 rounded-full inline-block mb-4">
                  AnchorPoint
                </h3>
                <ul className="space-y-3">
                  {[
                    "Military-only sources (Reddit, spouse forums, Military OneSource and more)",
                    "Prioritizes current PCS experiences (2020+)",
                    "Context-aware base-specific information",
                    "Actionable PCS pro-tips and insights",
                    "BAH-smart and base-aware housing analysis"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-800">
                      <svg className="w-6 h-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center">
              <h3 className="heading-3 text-white mt-8">
                Stop Stress-Searching
              </h3>
              <p className="body-large text-blue-100 mb-8">
                Get PCS answers from military spouses who've been there
              </p>
              <Button 
                variant="secondary" 
                size="large"
                as={Link}
                to="/"
              >
                Ask AnchorPoint Now
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Section 
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-gray-800 mb-6">
                Built With Military Family Values
              </h2>
              <p className="body-large text-gray-600 max-w-2xl mx-auto">
                Every answer comes filtered through our community standards
              </p>
            </div>
            
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-red font-bold">1</span>
                </div>
                <h3 className="heading-3 text-gray-800 mb-2">Military Relevance Check</h3>
                <p className="text-gray-600 body-small">
                  Does this actually help with PCS or relocation?
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-blue font-bold">2</span>
                </div>
                <h3 className="heading-3 text-gray-800 mb-2">Community Values Screen</h3>
                <p className="text-gray-600 body-small">
                  Does this advice respect military family values?
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-red font-bold">3</span>
                </div>
                <h3 className="heading-3 text-gray-800 mb-2">Timeliness Verification</h3>
                <p className="text-gray-600 body-small">
                  Source includes date verification for accuracy
                </p>
              </div>
            </div>
          </div>
        </section>
*/}
        {/* CTA Section */}
      </main>

    </div>
  );
};

export default HowItWorks;
