/**
 * API utility functions for AnchorPoint
 */

/**
 * Build request body for Perplexica API
 * @param {string} query - The search query
 * @param {Object} options - Additional configuration options
 * @returns {Object} Formatted request body
 */
export const buildRequestBody = (query, options = {}) => {
  const defaultOptions = {
    focusMode: 'webSearch',
    optimizationMode: 'speed',
    systemInstructions: 'Focus on providing helpful information for military spouses about PCS moves, local resources, community support, base-specific information, housing, schools, healthcare, and other relevant topics for military families.',
    stream: false,
    chatModel: { provider: 'openai', name: 'gpt-4o-mini' },
    embeddingModel: { provider: 'openai', name: 'text-embedding-3-large' },
    ...options
  };
  
  return {
    chatModel: defaultOptions.chatModel,
    embeddingModel: defaultOptions.embeddingModel,
    optimizationMode: defaultOptions.optimizationMode,
    focusMode: defaultOptions.focusMode,
    query: query.trim(),
    systemInstructions: defaultOptions.systemInstructions,
    stream: defaultOptions.stream
  };
};

/**
 * Handle API errors consistently
 * @param {Response} response - Fetch API response
 * @returns {Promise} Rejected promise with error message
 */
export const handleApiError = (response) => {
  if (!response.ok) {
    const error = new Error(`API request failed with status ${response.status}`);
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  return response;
};

/**
 * Format sources for better display
 * @param {Array} sources - Raw sources from API
 * @returns {Array} Formatted sources with metadata
 */
export const formatSources = (sources = []) => {
  return sources.map((source, index) => ({
    id: index + 1,
    title: source.metadata?.title || source.metadata?.name || 'Source',
    url: source.metadata?.url || '#',
    snippet: source.pageContent?.substring(0, 200) + '...' || 'No content available',
    content: source.pageContent || '',
    metadata: {
      ...source.metadata,
      relevanceScore: source.metadata?.relevanceScore || 0,
      lastUpdated: source.metadata?.lastUpdated || new Date().toISOString()
    }
  }));
};

/**
 * Sanitize user input for API requests
 * @param {string} query - User input query
 * @returns {string} Sanitized query
 */
export const sanitizeQuery = (query) => {
  if (!query || typeof query !== 'string') return '';
  
  // Remove potentially harmful characters
  return query
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 500); // Limit length
};

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if API is available
 * @returns {Promise<boolean>} Whether API is available
 */
export const checkApiAvailability = async () => {
  try {
    const apiUrl = import.meta.env.VITE_PERPLEXICA_API_URL || 'http://localhost:3000/api/search';
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.ok;
  } catch (error) {
    console.warn('API availability check failed:', error);
    return false;
  }
};

/**
 * Get API configuration from environment
 * @returns {Object} API configuration
 */
export const getApiConfig = () => {
  return {
    apiUrl: import.meta.env.VITE_WORKER_API_URL || 'https://ap-tester.merchant-christopher.workers.dev/search',
    apiKey: import.meta.env.VITE_PERPLEXICA_API_KEY || '',
    timeout: import.meta.env.VITE_API_TIMEOUT || 30000
  };
};

/**
 * Create a standardized API error response
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {Object} details - Additional error details
 * @returns {Object} Standardized error response
 */
export const createErrorResponse = (message, code = 'UNKNOWN_ERROR', details = {}) => {
  return {
    success: false,
    error: {
      code,
      message,
      details,
      timestamp: new Date().toISOString()
    }
  };
};

/**
 * Create a standardized API success response
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Standardized success response
 */
export const createSuccessResponse = (data, message = 'Success') => {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  };
};
