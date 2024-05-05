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


    return (
        <div id='search-parent'>
            <div className="search-title">Search results for '{params.term}'</div>
            <div className="searchResults"> 
                {searchResults.map(game => (
                    <a key={game.id} href={game.url} className="search-card" target="_blank">
                    <div className="search-image">
                        {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
                    </div>
                    <h3 className="search-game-title">{game.name}</h3>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Search;
