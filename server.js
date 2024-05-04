import express from 'express'
import cors from 'cors';
import { getAccessToken } from './src/utility/auth.js'; 
import fetch from 'node-fetch';

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
        body: 'fields name, url, cover.url; limit 500;'
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});

app.post('/search', async (req, res) => {
    const accessToken = await getAccessToken();
    const searchTerm = req.body.search;
    const response = await fetch('https://api.igdb.com/v4/search', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: searchTerm})
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});

app.post('/getgame', async (req, res) => {
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: 'fields name, url, cover.url; where id = 1942;'
    })
    .then(response => response.json())
    .then(data => {
        res.json(data);
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});