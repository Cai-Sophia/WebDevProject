import React, { useState, useEffect } from "react";
import { getAccessToken } from '../utility/auth.js'; 

const PlatformPage = () => {
  const [randomGames, setRandomGames] = useState([]);

  useEffect(() => {
    randomRequest();
  }, []);

  const randomRequest = () => {
    fetch('http://localhost:8000/get-platform-games', { // corrected endpoint
      method: 'POST',
      headers: {
        'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
        'Authorization': `Bearer ${getAccessToken()}`, 
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Filter out games without a cover
      const gamesWithCover = data.filter(game => game.cover);
      // Select 50 random games with cover
      const randomGames = [];
      while (randomGames.length < 50 && gamesWithCover.length > 0) {
          const randomIndex = Math.floor(Math.random() * gamesWithCover.length);
          const game = gamesWithCover.splice(randomIndex, 1)[0];
          randomGames.push(game);
      }

      setRandomGames(randomGames); 
    })
    .catch(error => {
      console.error('Error fetching random games:', error);
    });
  }
  
  return (
    <div className="category-games">
      <div className="category-games-title">RANDOM PLATFORM GAMES</div>
      <div className="category-games-container-wrapper">
        <div className="category-games-container"> 
          {randomGames.map(game => (
             <a key={game.id} href={game.url} className="game-card" target="_blank" rel="noopener noreferrer">
              <div className="category-image-container">
                {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
              </div>
              <h3 className="category-game-title">{game.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
    
export default PlatformPage;
