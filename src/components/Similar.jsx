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
        const isAlreadyFavorite = favorites.some(favorite => favorite.name === game.name);

        if (isAlreadyFavorite) {
            setErrorMessage('Game already added to favorites');
        } else {
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
                    setFavorites([...favorites, game]);
                    setSuccessMessage('Game added to favorites');
                    console.log('Favorite game added successfully');
                } else {
                    console.error('Failed to add favorite game');
                }
            } catch (error) {
                console.error('Error adding favorite game:', error);
            }
        }
    };


    return (
        <div id='similar-games-parent'>
            <h1 id='similar-title'>Found {game.similar_games.length} games similar to {game.name}</h1>
            <div id='similar-games-container'>
                {similarResponse.map(game => (
                    <div key={game.id} className="similar-card">
                        <a href={game.url} target="_blank">
                            <div className="similar-image">
                                {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
                            </div>
                            <h3 className="similar-game-title">{game.name}</h3>
                        </a>
                        <button onClick={() => handleFavoriteClick(game)}>
                            <i className="fas fa-heart"></i> Favorite
                        </button>
                    </div>
                ))}
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default SimilarGames;
