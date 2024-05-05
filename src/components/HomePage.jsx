import React, { useState, useEffect } from "react";
import { categories, wordPositions } from '../assets/data';
import { getAccessToken } from '../utility/auth.js'; 

const HomePage = () => {
  const [visibleWords, setVisibleWords] = useState({});
  const [randomGames, setRandomGames] = useState([]);

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
    fetch('http://localhost:8000/random-games', {
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
  
  return (
    <div className="home">
      <div className="word-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`word ${visibleWords[index] ? "fade-out" : ""}`}
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
             <a key={game.id} href={game.url} className="game-card" target="_blank">
              <div className="image-container">
                {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
              </div>
              <h3 className="game-title">{game.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
    
export default HomePage;