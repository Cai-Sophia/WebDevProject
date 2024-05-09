import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    fetch('/favorite-games')
      .then(response => response.json())
      .then(data => setFavoriteGames(data))
      .catch(error => console.error('Error fetching favorite games:', error));
  }, []);

  const handleFavoriteClick = (game) => {
    // Handle favorite click logic
  };

  return (
    <div>
      <h1>Favorite Games</h1>
      <div className="random-games-container">
        {favoriteGames.map(game => (
          <div key={game._id} className="game-card">
            <a href={game.url} target="_blank" className="game-link">
              <div className="image-container">
                {game.coverUrl && <img src={`https:${game.coverUrl.replace("t_thumb", "t_cover_big_2x")}`} alt={game.name} />}
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
  );
};

export default Favorites;
