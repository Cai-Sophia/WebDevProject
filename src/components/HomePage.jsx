import React, { useState, useEffect } from "react";
import { categories, wordPositions } from '../assets/data';
import { getAccessToken } from '../utility/auth.js';
import { MongoClient } from 'mongodb';


const HomePage = () => {
  const [visibleWords, setVisibleWords] = useState({});
  const [randomGames, setRandomGames] = useState([]);

  const url = 'mongodb+srv://al0984528:DemoDataBase@cluster1.wzrcl0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
  const dbName = 'WebDevProject';
  const client = new MongoClient(url);

  const handleFavoriteClick = async (game) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('favorites');
      const insertResult = await collection.insertOne([JSON.stringify(game)]);
      console.log('Inserted game into MongoDB:', insertResult);
    } catch (error) {
      console.error('Error inserting game into MongoDB:', error);
    } finally {
      await client.close();
    }
  };



  /* implementing fade-in / fade-out effect on categoriees*/
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setVisibleWords((prevVisibleWords) => {
        const updatedWords = { ...prevVisibleWords };
        updatedWords[randomIndex] = !updatedWords[randomIndex];
        return updatedWords;
      });
    }, 2000);
    return () => clearInterval(interval);
  });

  /* fetching randomGames which returns 500 games */
  useEffect(() => {
    randomRequest();
  }, []);

  const randomRequest = () => {
    fetch('http://localhost:8000/get-games', {
      method: 'POST',
      headers: {
        'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      // Filter out games without a cover
      const gamesWithCover = data.filter(game => game.cover);
      // Select 6 random games with cover
      const randomGames = [];
      while (randomGames.length < 8 && gamesWithCover.length > 0) {
          const randomIndex = Math.floor(Math.random() * gamesWithCover.length);
          const game = gamesWithCover.splice(randomIndex, 1)[0];
          randomGames.push(game);
      }

      setRandomGames(randomGames);
    })
  }


  // // local storage method
  // const handleFavoriteClick = (game) => {
  //   console.log("Clicked game data:", game);
  //   // Save the game data locally
  //   localStorage.setItem(game.id, JSON.stringify(game));
  // };



  return (
    <div className="home">
      <div className="word-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`word ${visibleWords[index] ? "fade-in" : ""}`}
            style={{
              left: wordPositions[index].left,
              top: wordPositions[index].top,
              fontSize: wordPositions[index].fontSize
            }}>
            {category}
          </div>
          ))}
        <div className="title">DISCOVER NEW GAMES...</div>
      </div>
      <div className="random-games">
        <div className="random-games-title">RANDOM PICKS</div>
        <div className="random-games-container">
          {randomGames.map(game => (
            <div key={game.id} className="game-card">
              <a href={game.url} target="_blank" className="game-link">
                <div className="image-container">
                  {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
                </div>
                <h3 className="game-title">{game.name}</h3>
              </a>
              <button onClick={() => handleFavoriteClick(game)}>
                <i className="fas fa-heart"></i> Favorite
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
