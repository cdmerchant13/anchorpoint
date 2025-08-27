import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import SearchBar from '../features/SearchBar';

/**
 * HeroSection component for landing page introduction
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onSearch] - Function to call when search is submitted
 */
const HeroSection = ({ className = '', onSearch, ...props }) => {
  return (
    <section className={`py-20 xl:py-32 bg-gradient-to-br from-gray-50 to-gray-100 ${className}`} {...props}>
      <div className="container">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="heading-1 text-gray-800 mb-6">
            Because "we got orders" shouldn't mean "we're going in blind."
          </h1>
          
          {/* Subheadline */}
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">
            AnchorPoint helps military spouses find local knowledge, insights, and community after a PCS.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              onSearch={onSearch}
            />
          </div>
          
          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="large" 
              variant="tertiary"
              as={Link}
              to="/about"
            >
              Learn More
            </Button>
            <Button 
              size="large" 
              variant="secondary"
              as={Link}
              to="/community"
            >
              Join the Community
            </Button>
          </div>
          
          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="heading-3 text-gray-800 mb-2">Base-Specific Insights</h3>
              <p className="text-gray-600 body-small">
                Get real-world advice from military families who call your "new" base their "old stomping grounds"
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="heading-3 text-gray-800 mb-2">Trusted Resources</h3>
              <p className="text-gray-600 body-small">
                Vetted recommendations for healthcare, schools, housing, and more
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="heading-3 text-gray-800 mb-2">Shared Wisdom</h3>
              <p className="text-gray-600 body-small">
                Learn from families who've navigated the challenges of military life
              </p>
            </div>
          </div>
          
          {/* Welcome Message */}
          <div className="mt-16 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 body-medium italic">
              "How it works” in 3 steps: 1. Type your duty station and what you want to know → 2. Get insights → 3. Move smarter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
