import React, { useState, useEffect } from "react";
import { getAccessToken } from '../utility/auth.js';
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [searchResults, setsearchResults] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const searchRequest = async () => {
            const response = await fetch('http://localhost:8000/search', {
                method: 'POST',
                headers: {
                    'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm: params.term })
            });
            const data = await response.json();
            setsearchResults(data)
        };
        searchRequest();
    }, [params.term]);

    const handleGameClick = (game) => {
        navigate(`/similar-games/${game.id}`, { state: { game } });
    };

    console.log(searchResults)


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
        <div id='search-parent'>
            <div className="search-title"> 
                <div>Found {searchResults.length} results for '{params.term}'</div>
                <div className="instructions">CLICK ANY GAME TO DISCOVER NEW ONES</div>
            </div>
            <div className="search-line"/>
            <div className="search-results">
                {searchResults.map(game => (
                    <div key={game.id} className="search-card">
                        {game.cover?.url ? (
                            <img className="image" src={`https:${game.cover.url.replace("t_thumb", "t_cover_small_2x")}`} alt={game.title} />
                        ):(
                            <h1 className="image-alt"> No photo available </h1>
                        )}
                        <div className="search-text">
                            <div className="title-container">
                                <div
                                    className="search-game-title"
                                    onClick={() => handleGameClick(game)}
                                > {game.name}
                                </div>
                                {game.aggregated_rating? (
                                    <h3 className="game-rating">RATING: {Math.round(game.aggregated_rating)}</h3>
                                ):(
                                    <h3 className="game-rating">RATING: N/A</h3>
                                )}
                                <div className="gameKeywords"></div>
                            </div>
                            {game.summary ? (
                                <p className={`search-game-summary ${game.summary.length > 200 ? 'scrollable' : ''}`}> {game.summary}
                                </p>
                            ):(
                                <p className="search-game-summary">No summary available</p>
                            )}
                            <a href={game.url} className="learn-more" target="_blank">LEARN MORE</a>
                        </div>
                        <button onClick={() => handleFavoriteClick(game)}>
                            <i className="fas fa-heart"></i> Favorite
                        </button>
                    </div>
                ))}
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    )
}

export default Search;