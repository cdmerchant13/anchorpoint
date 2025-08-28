# Perplexica Test Worker

A simple Node.js/JavaScript frontend and backend worker that provides an interface to query the Perplexica search engine.

## Features

- Simple web interface with search input and results display
- Backend proxy that forwards queries to Perplexica API
- Displays both the search results and source information
- Error handling for API connection issues

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Access to a running Perplexica instance at `http://ap-perplexica:3000/api/search`

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:3001
   ```

3. Enter a search query in the input field and click "Search"

4. The results from Perplexica will be displayed below the search form

## API Endpoint

The backend exposes a single endpoint:

- `POST /search` - Accepts a JSON payload with a `query` field and forwards it to the Perplexica API

Example request:
```json
{
  "query": "What is artificial intelligence?"
}
```

## Configuration

The server is configured to connect to Perplexica at `http://ap-perplexica:3000/api/search`. If your Perplexica instance is running on a different host or port, update the `PERPLEXICA_API_URL` constant in `server.js`.

## Troubleshooting

- **Connection errors**: Ensure your Perplexica instance is running and accessible at the configured URL
- **CORS issues**: The server includes CORS middleware, but if you encounter issues, ensure your Perplexica instance is configured to accept requests from this worker
- **Port conflicts**: If port 3001 is already in use, you can change it by setting the `PORT` environment variable:
  ```bash
  PORT=3002 npm start
  ```

## File Structure

```
perplexica-testworker/
├── server.js          # Node.js backend server
├── public/
│   └── index.html     # Frontend HTML page
├── package.json       # Node.js dependencies
└── README.md          # This file
```

## License

MIT
