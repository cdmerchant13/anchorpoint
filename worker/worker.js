/**
 * Cloudflare Worker for Perplexica API Proxy
 * Acts as a proxy between Cloudflare Pages frontend and EC2-hosted Perplexica API
 */

// Default configuration
const DEFAULT_CONFIG = {
  focusMode: 'webSearch',
  optimizationMode: 'speed',
  systemInstructions: 'Focus on providing helpful information for military spouses about PCS moves, local resources, community support, base-specific information, housing, schools, healthcare, and other relevant topics for military families.',
  stream: false,
  chatModel: { provider: 'Custom OpenAI', name: 'deepseek/deepseek-r1-0528:free' },
  embeddingModel: { provider: 'Google Gemini', name: 'text-embedding-004' }
};

class PerplexicaProxy {
  constructor() {
    this.perplexicaApiUrl = null;
    this.perplexicaApiKey = null;
    this.corsOrigins = null;
  }

  /**
   * Initialize the proxy with environment variables
   */
  init(env) {
    this.perplexicaApiUrl = env.PERPLEXICA_API_URL;
    this.perplexicaApiKey = env.PERPLEXICA_API_KEY;
    this.corsOrigins = env.CORS_ORIGINS ? env.CORS_ORIGINS.split(',').map(o => o.trim()) : [];
    
    if (!this.perplexicaApiUrl) {
      throw new Error('PERPLEXICA_API_URL environment variable is required');
    }
    
    if (!this.perplexicaApiKey) {
      throw new Error('PERPLEXICA_API_KEY environment variable is required');
    }
  }

  /**
   * Handle CORS preflight requests
   */
  handleCORS(request) {
    const origin = request.headers.get('Origin');
    
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: this.getCORSHeaders(origin, {
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        })
      });
    }

    return null;
  }

  /**
   * Get CORS headers for a specific origin
   */
  getCORSHeaders(origin, additionalHeaders = {}) {
    const allowedOrigins = this.corsOrigins.length > 0 ? this.corsOrigins : ['*'];
    const isOriginAllowed = allowedOrigins.includes('*') || allowedOrigins.includes(origin);
    
    const headers = {
      'Access-Control-Allow-Origin': isOriginAllowed ? origin : '*',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
      ...additionalHeaders
    };

    return headers;
  }

  /**
   * Validate request body
   */
  validateRequestBody(body) {
    if (!body || typeof body !== 'object') {
      throw new Error('Request body must be a JSON object');
    }

    if (!body.query || typeof body.query !== 'string' || body.query.trim().length === 0) {
      throw new Error('Query parameter is required and must be a non-empty string');
    }

    // Sanitize query
    body.query = body.query.trim().substring(0, 500);

    return body;
  }

  /**
   * Build Perplexica API request body
   */
  buildPerplexicaRequestBody(requestBody) {
    return {
      chatModel: { ...DEFAULT_CONFIG.chatModel, ...requestBody.chatModel },
      embeddingModel: { ...DEFAULT_CONFIG.embeddingModel, ...requestBody.embeddingModel },
      optimizationMode: requestBody.optimizationMode || DEFAULT_CONFIG.optimizationMode,
      focusMode: requestBody.focusMode || DEFAULT_CONFIG.focusMode,
      query: requestBody.query,
      systemInstructions: requestBody.systemInstructions || DEFAULT_CONFIG.systemInstructions,
      stream: requestBody.stream !== undefined ? requestBody.stream : DEFAULT_CONFIG.stream,
      history: requestBody.history || [],
      ...requestBody // Include any additional fields
    };
  }

  /**
   * Create error response
   */
  createErrorResponse(error, statusCode = 500) {
    const errorResponse = {
      error: {
        code: error.name || 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      }
    };

    return new Response(JSON.stringify(errorResponse), {
      status: statusCode,
      headers: this.getCORSHeaders(null, {
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Forward request to Perplexica API
   */
  async forwardToPerplexica(requestBody) {
    try {
      const perplexicaUrl = `${this.perplexicaApiUrl}/api/search`;
      const perplexicaRequestBody = this.buildPerplexicaRequestBody(requestBody);

      const response = await fetch(perplexicaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.perplexicaApiKey}`
        },
        body: JSON.stringify(perplexicaRequestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Perplexica API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: this.getCORSHeaders(null, {
          'Content-Type': 'application/json'
        })
      });

    } catch (error) {
      console.error('Error forwarding to Perplexica API:', error);
      
      if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
        return this.createErrorResponse(new Error('Perplexica API is currently unavailable'), 503);
      }
      
      return this.createErrorResponse(error, 500);
    }
  }

  /**
   * Main request handler
   */
  async handleRequest(request) {
    try {
      // Handle CORS preflight
      const corsResponse = this.handleCORS(request);
      if (corsResponse) {
        return corsResponse;
      }

      // Only accept POST requests to /query
      if (request.method !== 'POST') {
        return this.createErrorResponse(new Error('Method not allowed'), 405);
      }

      const url = new URL(request.url);
      if (url.pathname !== '/query') {
        return this.createErrorResponse(new Error('Endpoint not found'), 404);
      }

      // Parse and validate request body
      const requestBody = await request.json();
      this.validateRequestBody(requestBody);

      // Forward to Perplexica API
      return await this.forwardToPerplexica(requestBody);

    } catch (error) {
      console.error('Worker error:', error);
      
      if (error.message.includes('JSON')) {
        return this.createErrorResponse(new Error('Invalid JSON in request body'), 400);
      }
      
      if (error.message.includes('required')) {
        return this.createErrorResponse(error, 400);
      }
      
      return this.createErrorResponse(error, 500);
    }
  }
}

// Create proxy instance
const proxy = new PerplexicaProxy();

// Add event listener for fetch events
addEventListener('fetch', event => {
  event.respondWith(
    proxy.handleRequest(event.request).catch(error => {
      console.error('Unhandled error in worker:', error);
      return proxy.createErrorResponse(new Error('Internal server error'), 500);
    })
  );
});
