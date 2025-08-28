import { useState } from 'react';

/**
 * Custom hook for querying the Perplexica Worker API
 * @param {Object} options - Configuration options
 * @param {string} [options.initialQuery=''] - Initial query to display
 * @param {Object} [options.config] - Additional API configuration
 * @returns {Object} Hook state and functions
 */
const usePerplexicaQuery = (options = {}) => {
  const { initialQuery = '', config = {} } = options;
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  /**
   * Execute a search query
   * @param {string} searchQuery - The search query to execute
   */
  const executeQuery = async (searchQuery) => {
    const finalQuery = searchQuery || query;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get API URL from environment
      const { apiUrl } = getApiConfig();
      
      // Make API request to worker
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: finalQuery })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      // Parse response
      const data = await response.json();
      
      // Process and store results
      setResults({
        message: data.message || 'No results found',
        sources: data.sources || [],
        query: finalQuery,
        timestamp: new Date().toISOString()
      });
      
      setQuery(finalQuery);
      setRetryCount(0);
      
    } catch (err) {
      console.error('Perplexica Worker API error:', err);
      
      // Implement retry logic for transient failures
      if (retryCount < 2 && (err.name === 'TypeError' || err.message.includes('Failed to fetch'))) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => executeQuery(searchQuery), 1000 * (retryCount + 1));
        return;
      }
      
      setError(err.message || 'Failed to fetch search results. Please try again.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Clear current results and reset state
   */
  const clearResults = () => {
    setResults(null);
    setError(null);
    setQuery('');
    setRetryCount(0);
  };
  
  return {
    query,
    setQuery,
    results,
    loading,
    error,
    retryCount,
    executeQuery,
    clearResults
  };
};

// Import API config function
import { getApiConfig } from '../utils/api.js';

export default usePerplexicaQuery;
