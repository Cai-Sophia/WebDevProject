import React, { useState, useEffect } from "react";
import { getAccessToken } from '../utility/auth.js';
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [searchResults, setsearchResults] = useState([]);

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
                            <div className="gameKeywords">
                        </div>
                            {game.summary ? (
                                <p className={`search-game-summary ${game.summary.length > 200 ? 'scrollable' : ''}`}> {game.summary}
                                </p>
                            ):(
                                <p className="search-game-summary">No summary available</p>
                            )}
                            <a href={game.url} className="learn-more" target="_blank">LEARN MORE</a>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
