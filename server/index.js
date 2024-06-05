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
  

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
