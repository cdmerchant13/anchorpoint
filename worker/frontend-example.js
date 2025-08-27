/**
 * Frontend Integration Example for Perplexica API Proxy
 * This file demonstrates how to update the frontend to use the Cloudflare Worker proxy
 */

// Example of how to update the usePerplexicaQuery hook to use the worker proxy
const usePerplexicaQueryWithWorker = (options = {}) => {
  const { initialQuery = '', config = {} } = options;
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Default configuration - simplified since worker handles most defaults
  const defaultConfig = {
    focusMode: 'webSearch',
    optimizationMode: 'speed',
    systemInstructions: 'Focus on providing helpful information for military spouses about PCS moves, local resources, community support, base-specific information, housing, schools, healthcare, and other relevant topics for military families.',
    stream: false,
    ...config
  };
  
  /**
   * Execute a search query using the worker proxy
   * @param {string} searchQuery - The search query to execute
   * @param {Object} overrideConfig - Optional config overrides
   */
  const executeQuery = async (searchQuery, overrideConfig = {}) => {
    const finalQuery = searchQuery || query;
    const finalConfig = { ...defaultConfig, ...overrideConfig };
    
    setLoading(true);
    setError(null);
    
    try {
      // Build request body for worker proxy
      const requestBody = {
        query: finalQuery,
        focusMode: finalConfig.focusMode,
        optimizationMode: finalConfig.optimizationMode,
        systemInstructions: finalConfig.systemInstructions,
        stream: finalConfig.stream
      };
      
      // Make request to worker proxy (no auth headers needed - handled by worker)
      const response = await fetch('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }
      
      // Parse response
      const data = await response.json();
      
      // Process and store results (same as before)
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

// Example of a simple search function
const searchPerplexica = async (query, options = {}) => {
  try {
    const response = await fetch('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        ...options
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Usage examples
const exampleUsage = async () => {
  try {
    // Example 1: Simple search
    const results1 = await searchPerplexica('What is military life like at Fort Campbell?');
    console.log('Simple search results:', results1);
    
    // Example 2: Search with custom focus mode
    const results2 = await searchPerplexica('School districts near Joint Base Lewis-McChord', {
      focusMode: 'webSearch',
      optimizationMode: 'balanced'
    });
    console.log('Focused search results:', results2);
    
    // Example 3: Search with custom instructions
    const results3 = await searchPerplexica('Housing options for military families', {
      systemInstructions: 'Focus on affordable housing options near military bases with good school districts.'
    });
    console.log('Custom instructions results:', results3);
    
  } catch (error) {
    console.error('Search failed:', error);
  }
};

// Export for use in other files
export { usePerplexicaQueryWithWorker, searchPerplexica, exampleUsage };
