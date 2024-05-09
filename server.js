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
const url = 'mongodb+srv://al0984528:DemoDataBase@cluster1.wzrcl0j.mongodb.net/WebDevProject?retryWrites=true&w=majority&appName=Cluster1';

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
      // Assign other fields as needed
    });
    await newFavoriteGame.save();
    res.status(201).json({ message: 'Favorite game added successfully' });
  } catch (error) {
    console.error('Error inserting favorite game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
    });
    const data = await response.json();
    res.json(data);
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
    const data = await response.json();
    res.json(data);
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
    const data = await response.json();
    res.json(data);
});

app.get('/favorites', async (req, res) => {
    try {
      // Retrieve favorite games from MongoDB
      const favoriteGames = await FavoriteGame.find();
      res.json(favoriteGames);
    } catch (error) {
      console.error('Error retrieving favorite games:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
