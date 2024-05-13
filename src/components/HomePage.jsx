import React, { useState, useEffect } from "react";
import { categories, wordPositions } from '../assets/data';
import { getAccessToken } from '../utility/auth.js';

const HomePage = () => {
  const [visibleWords, setVisibleWords] = useState({});
  const [randomGames, setRandomGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [gameFavorites, setGameFavorites] = useState({});

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
  }, []);

  useEffect(() => {
    randomRequest();
  }, []);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage, successMessage]);

  const randomRequest = () => {
    fetch('http://localhost:8000/get-games', {
      method: 'POST',
      headers: {
        'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json'
      },
    })
    // .then(response => response.json())    //updated this line to throw an error if the fetch response is invalid
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('Received empty data from API');
      }
      const gamesWithCover = data.filter(game => game.cover);
      const randomGames = [];
      while (randomGames.length < 8 && gamesWithCover.length > 0) {
          const randomIndex = Math.floor(Math.random() * gamesWithCover.length);
          const game = gamesWithCover.splice(randomIndex, 1)[0];
          randomGames.push(game);
      }
      setRandomGames(randomGames);
    })
    .catch(error => console.error('Error fetching random games: ', error));
  }


  useEffect(() => {
    fetch('http://localhost:8000/test')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error fetching favorite games:', error));
  }, []);

  const handleFavoriteClick = async (game) => {
    try {
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
    } catch (error) {
      console.error('Error fetching favorite games:', error);
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
                <div className="image-container">
                  {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
                </div>
              <a href={game.url} target="_blank" className="game-title">{game.name}</a>
              <button className={`favorite-button ${gameFavorites[game.id] ? 'favorited' : ''}`} onClick={() => handleFavoriteClick(game)}>
                <i className="fas fa-heart"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
