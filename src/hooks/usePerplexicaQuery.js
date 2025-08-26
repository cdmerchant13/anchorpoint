import { useState } from 'react';

/**
 * Custom hook for querying the Perplexica API
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
  
  // Default configuration
  const defaultConfig = {
    focusMode: 'webSearch',
    optimizationMode: 'speed',
    systemInstructions: 'Focus on providing helpful information for military spouses about PCS moves, local resources, community support, base-specific information, housing, schools, healthcare, and other relevant topics for military families.',
    stream: false,
    chatModel: { provider: 'openai', name: 'gpt-4o-mini' },
    embeddingModel: { provider: 'openai', name: 'text-embedding-3-large' },
    ...config
  };
  
  /**
   * Execute a search query
   * @param {string} searchQuery - The search query to execute
   * @param {Object} overrideConfig - Optional config overrides
   */
  const executeQuery = async (searchQuery, overrideConfig = {}) => {
    const finalQuery = searchQuery || query;
    const finalConfig = { ...defaultConfig, ...overrideConfig };
    
    setLoading(true);
    setError(null);
    
    try {
      // Build request body
      const requestBody = {
        chatModel: finalConfig.chatModel,
        embeddingModel: finalConfig.embeddingModel,
        optimizationMode: finalConfig.optimizationMode,
        focusMode: finalConfig.focusMode,
        query: finalQuery,
        systemInstructions: finalConfig.systemInstructions,
        stream: finalConfig.stream
      };
      
      // Get API URL from environment
      const apiUrl = import.meta.env.VITE_PERPLEXICA_API_URL || 'http://localhost:3000/api/search';
      
      // Make API request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_PERPLEXICA_API_KEY || ''}`
        },
        body: JSON.stringify(requestBody)
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
      console.error('Perplexica API error:', err);
      
      // Implement retry logic for transient failures
      if (retryCount < 2 && (err.name === 'TypeError' || err.message.includes('Failed to fetch'))) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => executeQuery(searchQuery, overrideConfig), 1000 * (retryCount + 1));
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

export default usePerplexicaQuery;
