const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Perplexica API endpoint
const PERPLEXICA_API_URL = 'http://ap-perplexica:3000/api/search';

// Search endpoint
app.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    // Prepare the request for Perplexica API
    const perplexicaRequest = {
      chatModel: {
        provider: "custom_openai",
        name: "microsoft/mai-ds-r1:free"
      },
      embeddingModel: {
        provider: "gemini",
        name: "models/text-embedding-004"
      },
      optimizationMode: "speed",
      focusMode: "webSearch",
      query: query,
      stream: false
    };
    
    // Forward the request to Perplexica API
    const response = await axios.post(PERPLEXICA_API_URL, perplexicaRequest);
    
    // Send the response back to the frontend
    res.json(response.data);
    
  } catch (error) {
    console.error('Error searching with Perplexica:', error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Perplexica API error data:', error.response.data);
      console.error('Perplexica API status:', error.response.status);
      res.status(error.response.status).json({ 
        error: 'Perplexica API error',
        details: error.response.data 
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from Perplexica API:', error.request);
      res.status(503).json({ 
        error: 'Service unavailable',
        message: 'Could not connect to Perplexica API. Please ensure the service is running.'
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});
