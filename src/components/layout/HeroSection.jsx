import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import SearchBar from '../features/SearchBar';
import marked from '../../utils/markedConfig';

/**
 * HeroSection component for landing page with search functionality
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onSearch] - Function to call when search is submitted
 * @param {Object} [props.results] - Search results from worker
 * @param {boolean} [props.loading] - Whether search is loading
 * @param {string} [props.error] - Error message if any
 */
const HeroSection = ({ className = '', onSearch, results, loading, error, ...props }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Hide welcome message when we have results
  React.useEffect(() => {
    if (results) {
      setShowWelcome(false);
    }
  }, [results]);
  
  // Handle search from the search bar
  const handleSearch = (query) => {
    setShowWelcome(false);
    if (onSearch) {
      onSearch(query);
    }
  };
  
  // Handle clear search
  const handleClearSearch = () => {
    setShowWelcome(true);
    if (onSearch) {
      onSearch('');
    }
  };
  
  return (
    <section className={`py-20 xl:py-32 bg-gradient-to-br from-gray-50 to-gray-100 ${className}`} {...props}>
      <div className="container">
        {/* Welcome Message (shown when no results) */}
        {showWelcome && (
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
                onSearch={handleSearch}
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
                "How it works" in 3 steps: 1. Type your duty station and what you want to know → 2. Get insights → 3. Move smarter.
              </p>
            </div>
          </div>
        )}
        
        {/* Search Results (shown when we have results) */}
        {results && (
          <div className="text-left">
            {/* Updated Search Bar */}
            <div className="mb-8 text-center">
              <SearchBar 
                onSearch={handleSearch}
                loading={loading}
                placeholder="Search again..."
              />
            </div>
            
            {/* Results Header */}
            <div className="mb-8 text-center">
              <h2 className="heading-2 text-gray-800 mb-2">
                Search Results
              </h2>
              <p className="text-gray-600 body-medium">
                Query: "{results.query}"
              </p>
            </div>
            
            {/* Loading State */}
            {loading && (
              <div className="mb-8 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching with Perplexica...
                </div>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="mb-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-3xl mx-auto">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-red-800">Search Error</h3>
                  </div>
                  <p className="text-red-700 mb-4">{error}</p>
                  <button 
                    onClick={handleClearSearch}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
            
            {/* Results Content */}
            {!loading && !error && results.message && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
                {/* Render markdown content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: marked.parse(results.message)
                  }}
                />
                
                {/* Sources Section */}
                {results.sources && results.sources.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sources</h3>
                    <div className="space-y-4">
                      {results.sources.map((source, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">
                            {source.metadata?.title || 'Source ' + (index + 1)}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {source.metadata?.url && (
                              <a 
                                href={source.metadata.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {source.metadata.url}
                              </a>
                            )}
                          </p>
                          {source.pageContent && (
                            <p className="text-sm text-gray-700 line-clamp-3">
                              {source.pageContent}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Clear Results Button */}
                <div className="mt-8 text-center">
                  <button 
                    onClick={handleClearSearch}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
