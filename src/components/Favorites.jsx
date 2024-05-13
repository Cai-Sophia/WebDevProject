import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [gameFavorites, setGameFavorites] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [favorites, setFavorites] = useState([]);



  useEffect(() => {
    fetch('http://localhost:8000/test')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setFavoriteGames(data))
      .catch(error => console.error('Error fetching favorite games:', error));
  }, []);

  const handleFavoriteClick = async (game) => {
    const response = await fetch('http://localhost:8000/test');
    if (!response.ok) {
      throw new Error('Failed to fetch favorite games');
    }
    const newFavorites = await response.json();
    const matchingFavorite = newFavorites.find(favorite => favorite.name === game.name);
  
    if (matchingFavorite) {
      try {
        handleRemoveFavorite(matchingFavorite._id);
      } catch (error) {
        console.error('Error fetching favorite games:', error);
      }
      setGameFavorites(prevGameFavorites => ({
        ...prevGameFavorites,
        [game.id]: false // Update favorited status of this game to false
      }));
    } 
    else {
      try {
        const response = await fetch('http://localhost:8000/insert-favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: game.name,
            url: game.url,
            coverUrl: game.cover?.url,
          }),
        });
        if (response.ok) {
          setFavorites(prevFavorites => [...prevFavorites, game]);
          setSuccessMessage('Game added to favorites');
          console.log('Favorite game added successfully');
          setGameFavorites(prevGameFavorites => ({
            ...prevGameFavorites,
            [game.id]: true // Update favorited status of this game to false
          }));
        } else {
          console.error('Failed to add favorite game');
        }
      } catch (error) {
        console.error('Error adding favorite game:', error);
      }
    }
  };  
  
  const handleRemoveFavorite = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:8000/remove-favorite/${gameId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Favorite game removed successfully');
        // Remove the game from the state
        setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite._id !== gameId));
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
        {favorites.map(game => (
          <div key={game._id} className="game-card">
            <a href={game.url} target="_blank" className="game-link">
              <div className="image-container">
                {game.coverUrl && <img src={`https:${game.coverUrl.replace("t_thumb", "t_cover_big_2x")}`} alt={game.name} />}
              </div>
              <h3 className="game-title">{game.name}</h3>
            </a>
            <button className={`favorite-button ${gameFavorites[game.id] ? 'favorited' : ''}`} onClick={() => handleFavoriteClick(game)}>
                <i className="fas fa-heart"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
