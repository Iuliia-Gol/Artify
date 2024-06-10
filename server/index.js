require('dotenv').config();
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
      const response = await axios.get('https://api.artic.edu/api/v1/artworks', {
        params: {
          artist_title: "Ancient Roman",
          classification_titles: ["modern and contemporary art", "painting"],
          style_title: "Modernism",
          date_display: "1820",
          limit: 4 
        }
      });
      res.json(response.data.data); 
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
        const response = await axios.get('https://api.artic.edu/api/v1/artworks/search', {
            params: {
                q: query,
                fields: 'image_id, id',
                limit: 4,
            }
        });
        console.log(response.data.data)
        res.json(response.data.data || []); 
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
  
