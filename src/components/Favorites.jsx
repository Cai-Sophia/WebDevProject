import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/test')
      .then(response => response.json())
      .then(data => setFavoriteGames(data))
      .catch(error => console.error('Error fetching favorite games:', error));
  }, []);

  const handleRemoveFavorite = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:8000/remove-favorite/${gameId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Favorite game removed successfully');
        // Remove the game from the state
        setFavoriteGames(prevFavoriteGames => prevFavoriteGames.filter(game => game._id !== gameId));
      } else {
        console.error('Failed to remove favorite game');
      }
    } catch (error) {
      console.error('Error removing favorite game:', error);
    }
  };

  return (
    <div className='favorite-page'>
      <div className='favorite-game-header'>My Favorites</div>
      <div className="favorite-games-container">
        {favoriteGames.map(game => (
          <div key={game._id} className="game-card">
            <a href={game.url} target="_blank" className="game-link">
              <div className="image-container">
                {game.coverUrl && <img src={`https:${game.coverUrl.replace("t_thumb", "t_cover_big_2x")}`} alt={game.name} />}
              </div>
              <h3 className="game-title">{game.name}</h3>
            </a>
            <button onClick={() => handleRemoveFavorite(game._id)}>
              <i className="fas fa-heart"></i> Remove Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
