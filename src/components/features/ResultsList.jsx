import React from 'react';
import Card from '../ui/Card';
import ResultItem from './ResultItem';

/**
 * ResultsList component for displaying search results
 * @param {Object} props - Component props
 * @param {Array} props.results - Array of search results
 * @param {boolean} props.loading - Whether results are loading
 * @param {string} [props.error] - Error message if any
 * @param {string} props.query - The search query
 * @param {Function} [props.onResultClick] - Handler for result item clicks
 * @param {string} [props.className] - Additional CSS classes
 */
const ResultsList = ({ 
  results = [], 
  loading = false, 
  error, 
  query, 
  onResultClick,
  className = '',
  ...props 
}) => {
  // Loading state
  if (loading) {
    return (
      <div className={`w-full ${className}`} {...props}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className={`w-full ${className}`} {...props}>
        <Card className="border-red-200">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="heading-3 text-gray-800 mb-2">Search Error</h3>
            <p className="text-gray-600 body-medium mb-4">
              {error}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
              <button 
                className="btn btn-tertiary"
                onClick={() => {
                  // Clear error and reset state
                  if (typeof onResultClick === 'function') {
                    onResultClick({ type: 'clear' });
                  }
                }}
              >
                Clear Search
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
  // Empty state (no results but no error)
  if (results.length === 0 && query) {
    return (
      <div className={`w-full ${className}`} {...props}>
        <Card>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="heading-3 text-gray-800 mb-2">No Results Found</h3>
            <p className="text-gray-600 body-medium mb-4">
              We couldn't find any results for "{query}". Try different keywords or check your spelling.
            </p>
            <div className="container max-w-md text-left bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Try searching for:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Housing near your new base</li>
                <li>• School districts in the area</li>
                <li>• Healthcare facilities for military families</li>
                <li>• Local support groups and resources</li>
                <li>• Base-specific information and contacts</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
  // Empty state (no query yet)
  if (results.length === 0 && !query) {
    return (
      <div className={`w-full ${className}`} {...props}>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="heading-3 text-gray-800 mb-2">Ready to search?</h3>
          <p className="text-gray-600 body-medium">
            Enter a query above to find information about military bases, housing, schools, healthcare, and more.
          </p>
        </div>
      </div>
    );
  }
  
  // Results found
  return (
    <div className={`w-full ${className}`} {...props}>
      <div className="mb-6">
        <h2 className="heading-2 text-gray-800 mb-2">
          Search Results
        </h2>
        <p className="text-gray-600 body-medium">
          Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>
      
      <div className="space-y-4">
        {results.map((result) => (
          <ResultItem
            key={result.id}
            result={result}
            onClick={() => onResultClick && onResultClick(result)}
          />
        ))}
      </div>
      
      {results.length > 0 && (
        <div className="mt-8 text-center">
          <button 
            className="btn btn-tertiary"
            onClick={() => {
              // Clear results
              if (typeof onResultClick === 'function') {
                onResultClick({ type: 'clear' });
              }
            }}
          >
            Clear Results
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsList;
