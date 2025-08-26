import React, { useState, useRef, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * SearchBar component for the hero section
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Function to call when search is submitted
 * @param {boolean} props.loading - Whether search is in progress
 * @param {string} [props.className] - Additional CSS classes
 */
const SearchBar = ({ onSearch, loading = false, className = '', ...props }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  
  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Call the search handler
    onSearch(query.trim());
  };
  
  const handleKeyDown = (e) => {
    // Submit on Enter key
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  
  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`} {...props}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for base information, housing, schools, healthcare..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            id="search-bar"
            name="search"
            error={error}
            aria-label="Search query"
            aria-describedby="search-help"
          />
          <p id="search-help" className="mt-1 text-sm text-gray-600 body-small">
            Try searching for "Fort Campbell housing", "school districts near Joint Base Lewis-McChord", or "healthcare for military families"
          </p>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={loading}
          className="whitespace-nowrap"
        >
          {loading ? (
            <>
              <LoadingSpinner className="w-4 h-4 mr-2" />
              Searching...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
