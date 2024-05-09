import React, { useState, useEffect } from "react";
import { categories, wordPositions } from '../assets/data';
import { getAccessToken } from '../utility/auth.js';

const HomePage = () => {
  const [visibleWords, setVisibleWords] = useState({});
  const [randomGames, setRandomGames] = useState([]);

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
      const gamesWithCover = data.filter(game => game.cover);
      const randomGames = [];
      while (randomGames.length < 8 && gamesWithCover.length > 0) {
          const randomIndex = Math.floor(Math.random() * gamesWithCover.length);
          const game = gamesWithCover.splice(randomIndex, 1)[0];
          randomGames.push(game);
      }
      setRandomGames(randomGames);
    })
  }

  const handleFavoriteClick = async (game) => {
    try {
      const response = await fetch('http://localhost:8000/insert-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: game.name,
          url: game.url,
          coverUrl: game.cover.url,
          // Add other relevant fields as needed
        }),
      });
      if (response.ok) {
        console.log('Favorite game added successfully');
      } else {
        console.error('Failed to add favorite game');
      }
    } catch (error) {
      console.error('Error adding favorite game:', error);
    }
  };

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
