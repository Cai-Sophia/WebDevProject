const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); 
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
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: 'fields *;'
    })
    response.json()
        .then(data => {
            console.log(data); // Log the data received from the API
            res.json(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});