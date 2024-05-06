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

const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = path.dirname(__filename);

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src'), {
    setHeaders: (res, path) => {
      // Set Content-Type header for image files
      if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/jpeg');
      }
    }
  }));

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
        body: 'fields name, url, cover.url; limit 500;'
    })
    response.json()
        .then(data => {
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
        body: `fields name, url, cover.url, summary, aggregated_rating, similar_games, platforms; search "${searchTerm}"; limit 50;`
    });
    response.json()
        .then(async data => {
            // for (const game of data) {
            //     if (game.platforms) {
            //         const platformString = game.platforms.join(',');
            //         const platformDetailsResponse = await fetch(`https://api.igdb.com/v4/platforms`, {
            //             method: 'POST',
            //             headers: {
            //                 'Client-ID': clientId,
            //                 'Authorization': `Bearer ${accessToken}`, 
            //                 'Content-Type': 'application/json'
            //             },
            //             body: `fields name; where id = (${platformString});`
            //         });
            //         const platformDetails = await platformDetailsResponse.json();
            //         game.platforms = platformDetails;
            //     }
            // }
            res.json(data);
        });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});