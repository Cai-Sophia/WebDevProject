import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getAccessToken } from '../utility/auth.js'; 

const SimilarGames = () => {
    const location = useLocation();
    const game = location.state.game;
    const similarGames = game.similar_games.join(',');
    const [similarResponse, setSimilarResponse] = useState([]);

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


    return (
        <div id='similar-games-parent'>
            <h1 id = 'similar-title'>Found {game.similar_games.length} games similar to {game.name}</h1>
            <div id='similar-games-container'>
                {similarResponse.map(game => (
                    <a key={game.id} href={game.url} className="similar-card" target="_blank">
                        <div className="similar-image">
                            
                            {game.cover.url && <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`} alt={game.title} />}
                        </div>
                        <h3 className="similar-game-title">{game.name}</h3>
                        
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SimilarGames;