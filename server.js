import express from 'express'
import cors from 'cors';
import { getAccessToken } from './src/utility/auth.js'; 
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('ExpressJS server response OK!');
});

const clientId = 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w'; 

app.post('/get-games', async (req, res) => {
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: 'fields name, url, cover.url; limit 500; where themes != (42);'
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});

app.post('/search', async (req, res) => {
    const accessToken = await getAccessToken();
    const searchTerm = req.body.searchTerm;
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: `fields name, url, cover.url, summary, aggregated_rating, similar_games, keywords.name, platforms; search "${searchTerm}"; limit 50;`
    });
    response.json()
        .then(async data => {
            res.json(data);
        });
});

app.post('/get-similar', async (req, res) => {
    const accessToken = await getAccessToken();
    const similarGames = req.body.similarGames
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: `fields name, url, cover.url; where id = (${similarGames});`
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});

app.post('/get-shooter-games', async (req, res) => {
    const accessToken = await getAccessToken();
    const shooterID = 5
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: `fields name, url, cover.url; limit 50; where genres = (${shooterID});`
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});
app.post('/get-platform-games', async (req, res) => {
    const accessToken = await getAccessToken();
    const platformID = 8
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: `fields name, url, cover.url; limit 50; where genres = (${platformID});`
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});
app.post('/get-puzzle-games', async (req, res) => {
    const accessToken = await getAccessToken();
    const puzzleID = 9
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: `fields name, url, cover.url; limit 50; where genres = (${puzzleID});`
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});
app.post('/get-racing-games', async (req, res) => {
    const accessToken = await getAccessToken();
    const racingID = 10
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
        },
        body: `fields name, url, cover.url; limit 50; where genres = (${racingID});`
    })
    response.json()
        .then(data => {
            res.json(data);
        });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});