import React from 'react';
import Card from '../ui/Card';

/**
 * ResultItem component for displaying individual search results
 * @param {Object} props - Component props
 * @param {Object} props.result - The search result object
 * @param {Function} [props.onClick] - Handler for result click
 * @param {string} [props.className] - Additional CSS classes
 */
const ResultItem = ({ result, onClick, className = '', ...props }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(result);
    }
  };
  
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${className}`}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      {...props}
    >
      <div className="p-6">
        {/* Result Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="heading-3 text-gray-800 mb-1 truncate">
              {result.title}
            </h3>
            {result.url && result.url !== '#' && (
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary-blue hover:text-light-blue transition-colors duration-200 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {new URL(result.url).hostname}
              </a>
            )}
          </div>
          
          {/* Relevance Score */}
          {result.metadata?.relevanceScore && (
            <div className="ml-4 flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {Math.round(result.metadata.relevanceScore * 100)}% match
              </span>
            </div>
          )}
        </div>
        
        {/* Result Snippet */}
        <p className="text-gray-600 body-medium mb-4 line-clamp-3">
          {result.snippet}
        </p>
        
        {/* Result Content Preview */}
        {result.content && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 line-clamp-4">
              {result.content}
            </p>
          </div>
        )}
        
        {/* Result Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {result.metadata?.lastUpdated && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(result.metadata.lastUpdated).toLocaleDateString()}
            </div>
          )}
          
          {result.metadata?.source && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {result.metadata.source}
            </div>
          )}
          
          {result.metadata?.category && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {result.metadata.category}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button 
            className="text-sm text-primary-blue hover:text-light-blue transition-colors duration-200 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) {
                onClick({ ...result, action: 'view-full' });
              }
            }}
          >
            View Full Result
          </button>
          {result.url && result.url !== '#' && (
            <button 
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                window.open(result.url, '_blank', 'noopener,noreferrer');
              }}
            >
              Visit Source
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ResultItem;
