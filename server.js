import express from 'express';
import cors from 'cors';
import { getAccessToken } from './src/utility/auth.js';
import fetch from 'node-fetch';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const url = 'mongodb+srv://al0984528:DemoDataBase@cluster1.wzrcl0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'

mongoose.connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define Mongoose schema for favorite games
const favoriteGameSchema = new mongoose.Schema({
  name: String,
  url: String,
  coverUrl: String,
  // Add other relevant fields as needed
});

// Define Mongoose model for favorite games
const FavoriteGame = mongoose.model('FavoriteGame', favoriteGameSchema);

// Route handler to insert favorite game data into MongoDB
app.post('/insert-favorite', async (req, res) => {
  try {
    const { name, url, coverUrl } = req.body;
    const newFavoriteGame = new FavoriteGame({
      name,
      url,
      coverUrl,
    });
    await newFavoriteGame.save();
    // console.log(newFavoriteGame);
    res.status(201).json({ message: 'Favorite game added successfully' });
  } catch (error) {
    console.error('Error inserting favorite game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route handler to fetch all data from MongoDB
app.get('/test', async (req, res) => {
  try {
    const allData = await FavoriteGame.find();
    res.json(allData); // Sending JSON response
  } catch (error) {
    console.error('Error fetching all data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route handler to remove a favorite game from MongoDB
app.delete('/remove-favorite/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const deletedGame = await FavoriteGame.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json({ message: 'Favorite game removed successfully', deletedGame });
  } catch (error) {
    console.error('Error removing favorite game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




/*--------------------------------------------------------------------------------------------------*/

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
    });
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
    const similarGames = req.body.similarGames;
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: `fields name, url, cover.url; where id = (${similarGames});`
    });
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
