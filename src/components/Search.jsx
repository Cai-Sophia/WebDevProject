import React, { useState, useEffect } from "react";
import { getAccessToken } from '../utility/auth.js'; 
import { useParams } from "react-router-dom";

const Search = () => {
    const [searchResults, setsearchResults] = useState([]);
    const params = useParams();

    useEffect(() => {
        const ids = [];
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
    console.log(searchResults)

    return (
        <div id='search-parent'>
            <div className="search-title">Found {searchResults.length} results for '{params.term}'</div>
            <div className="search-line"/>
            <div className="search-results"> 
                {searchResults.map(game => (
                    <a key={game.id} href={game.url} className="search-card" target="_blank">
                        {game.cover?.url ? (
                            <img className="image" src={`https:${game.cover.url.replace("t_thumb", "t_cover_small_2x")}`} alt={game.title} />
                        ):(
                            <h1 className="image-alt"> No photo available </h1>
                        )}
                        <div className="search-text">
                            <h3 className="search-game-title">{game.name}</h3>
                            {game.summary ? (
                                <p className={`search-game-summary ${game.summary.length > 200 ? 'scrollable' : ''}`}> {game.summary}
                                </p>
                            ):(
                                <p className="search-game-summary">No summary available</p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Search;
