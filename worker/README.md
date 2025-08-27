# AnchorPoint Perplexica API Proxy

A Cloudflare Worker that acts as a proxy between the Cloudflare Pages frontend and the EC2-hosted Perplexica API.

## Features

- **CORS Handling**: Properly configured CORS headers for cross-origin requests
- **Request Validation**: Validates incoming requests and sanitizes input
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Environment Configuration**: Support for development, staging, and production environments
- **Security**: Secure API key handling and request forwarding

## Setup

### Prerequisites

- Node.js (v16 or higher)
- Wrangler CLI installed globally: `npm install -g wrangler`
- Cloudflare account with access to Workers and Pages

### Installation

1. Navigate to the worker directory:
   ```bash
   cd worker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables in `wrangler.toml`:
   ```toml
   [env.production]
   vars = { 
     PERPLEXICA_API_URL = "https://your-ec2-instance.com:3000",
     PERPLEXICA_API_KEY = "your-perplexica-api-key-here",
     CORS_ORIGINS = "https://your-frontend.pages.dev,https://your-frontend-domain.com"
   }
   ```

### Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The worker will be available at `http://localhost:8787`

### Deployment

Deploy to different environments:

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PERPLEXICA_API_URL` | URL to your EC2-hosted Perplexica API | Yes | `https://api.example.com:3000` |
| `PERPLEXICA_API_KEY` | API key for Perplexica API authentication | Yes | `sk-1234567890abcdef` |
| `CORS_ORIGINS` | Comma-separated list of allowed origins | No | `https://app.example.com,http://localhost:3000` |

### Routes

The worker is configured to handle requests at the `*/query*` route. Update the `zone_name` in `wrangler.toml` to match your domain.

## API Usage

### Endpoint

```
POST /query
```

### Request Format

```json
{
  "query": "What is military life like at Fort Campbell?",
  "focusMode": "webSearch",
  "optimizationMode": "speed",
  "systemInstructions": "Focus on providing helpful information for military spouses about PCS moves, local resources, community support, base-specific information, housing, schools, healthcare, and other relevant topics for military families.",
  "stream": false,
  "chatModel": {
    "provider": "openai",
    "name": "gpt-4o-mini"
  },
  "embeddingModel": {
    "provider": "openai",
    "name": "text-embedding-3-large"
  }
}
```

### Response Format

Success response:
```json
{
  "message": "Perplexica is an innovative, open-source AI-powered search engine...",
  "sources": [
    {
      "pageContent": "Perplexica is an innovative, open-source AI-powered search engine...",
      "metadata": {
        "title": "What is Perplexica?",
        "url": "https://example.com"
      }
    }
  ]
}
```

Error response:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Query parameter is required and must be a non-empty string",
    "timestamp": "2025-01-26T23:42:00.000Z"
  }
}
```

## Frontend Integration

### Example Fetch Request

```javascript
// Example using the worker proxy
const searchPerplexica = async (query) => {
  try {
    const response = await fetch('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        focusMode: 'webSearch',
        optimizationMode: 'speed'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Usage
searchPerplexica('What is military life like at Fort Campbell?')
  .then(results => {
    console.log('Search results:', results);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });
```

### Environment Variables for Frontend

Update your frontend environment variables to use the worker proxy:

```javascript
// In your frontend code
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/query';
```

## Error Handling

The worker returns appropriate HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid input or malformed JSON
- `404 Not Found`: Endpoint not found
- `405 Method Not Allowed`: Invalid HTTP method
- `503 Service Unavailable`: Perplexica API unavailable
- `500 Internal Server Error`: Worker execution error

## Monitoring and Logging

### Viewing Logs

```bash
# View development logs
npm run tail

# View production logs
npm run tail:production
```

### Error Tracking

The worker includes comprehensive error logging. Check the Cloudflare Workers dashboard for detailed logs and metrics.

## Security Considerations

1. **API Key Security**: Never commit API keys to version control
2. **CORS Configuration**: Only allow trusted origins in production
3. **Input Validation**: All requests are validated and sanitized
4. **Rate Limiting**: Consider implementing rate limiting for production use

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CORS_ORIGINS` includes your frontend domain
2. **Authentication Errors**: Verify `PERPLEXICA_API_KEY` is correct
3. **Connection Errors**: Check `PERPLEXICA_API_URL` is accessible
4. **Deployment Issues**: Ensure your Cloudflare account has the correct permissions

### Debug Mode

Enable debug logging by setting the `LOG_LEVEL` environment variable:

```bash
wrangler dev --env development --log-level debug
```

## Contributing

1. Make your changes in the `worker.js` file
2. Test locally with `npm run dev`
3. Deploy to staging with `npm run deploy:staging`
4. Test staging environment thoroughly
5. Deploy to production with `npm run deploy:production`

## License

MIT License - see LICENSE file for details.
