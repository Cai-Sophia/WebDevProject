import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/test') // Fetching all games from the test endpoint
      .then(response => response.json())
      .then(data => setFavoriteGames(data))
      .catch(error => console.error('Error fetching favorite games:', error));
  }, []);

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
          coverUrl: game.coverUrl,
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
    <div>
      <h1>All Games</h1>
      <div className="games-container">
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
