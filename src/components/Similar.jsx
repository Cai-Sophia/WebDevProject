import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getAccessToken } from '../utility/auth.js';

const SimilarGames = () => {
    const location = useLocation();
    const game = location.state.game;
    const similarGames = game.similar_games.join(',');
    const [similarResponse, setSimilarResponse] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [gameFavorites, setGameFavorites] = useState({});

    useEffect(() => {
        const getSimilar = () => {
            fetch('http://localhost:8000/get-similar', {
            method: 'POST',
            headers: {
                'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ similarGames: similarGames })

            })
            .then(response => response.json())
            .then(data => {
                setSimilarResponse(data);
            })
        };
        getSimilar()
    }, [similarGames]);


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
        <div id='similar-games-parent'>
            <h1 id='similar-title'>Found {game.similar_games.length} games similar to {game.name}</h1>
            <div id='similar-games-container'>
                {similarResponse.map(game => (
                    <div key={game.id} className="similar-card">
                        <div className="similar-image">
                            {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
                        </div>
                        <a href={game.url} target="_blank" className="similar-game-title">{game.name}</a>
                        <button className={`favorite-button ${gameFavorites[game.id] ? 'favorited' : ''}`} onClick={() => handleFavoriteClick(game)}>
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarGames;
