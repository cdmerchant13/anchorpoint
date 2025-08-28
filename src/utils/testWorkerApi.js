/**
 * Test function to verify the worker API is accessible
 */
export const testWorkerApi = async () => {
  try {
    const { apiUrl } = getApiConfig();
    
    console.log('Testing worker API at:', apiUrl);
    
    const testQuery = 'test';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: testQuery })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('Worker API test successful:', {
      hasMessage: !!data.message,
      hasSources: Array.isArray(data.sources),
      messageLength: data.message?.length || 0,
      sourcesCount: data.sources?.length || 0
    });
    
    return {
      success: true,
      data
    };
    
  } catch (error) {
    console.error('Worker API test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Import API config function
import { getApiConfig } from './api.js';
