const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


app.get('/api/art-styles', async (req, res) => {
    try {
      const response = await axios.get('https://api.harvardartmuseums.org/object', {
        params: {
          apikey: process.env.HARVARD_API_KEY,
          classification: 'Paintings',
          name: 'Harry Annas',
          century: '20th century',
          division: 'Modern and Contemporary Art',
          size: 3 
        }
      });
      res.json(response.data.records); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/search-art-styles', async (req, res) => {
    const query = req.query.keyword;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required'});
    }
    try {
        const response = await axios.get('https://api.harvardartmuseums.org/object', {
            params: {
                apikey: process.env.HARVARD_API_KEY,
                keyword: query,
                size: 3,
            }
        });
        console.log(response.data)
        res.json(response.data.records || []); 
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
  })

  app.post('/generate-artwork', async (req, res) => {
    const { keywords, style } = req.body;

    try {
        console.log('Received request:', { keywords, style });
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            model: "dall-e-2",
            prompt: `${style} ${keywords}`,
            n: 1,
            size: '512x512'
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        console.log('OpenAI response:', response.data);
        res.json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.error('Error generating artwork:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error generating artwork' });
    }
});
  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
