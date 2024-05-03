const express = require('express');
const cors = require('cors');
const { getAccessToken } = require('./src/utility/auth'); 

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('ExpressJS server response OK!');
});

const clientId = 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w'; 

app.post('/random-games', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json'
            },
            body: 'fields *;'
        });
    
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching random games:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

fetch(
    "https://api.igdb.com/v4/age_ratings",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
        'Authorization': 'Bearer ${accessToken}',
      },
      body: "fields category,checksum,content_descriptions,rating,rating_cover_url,synopsis;"
  })
    .then(response => {
        console.log(response.json());
    })
    .catch(err => {
        console.error(err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});