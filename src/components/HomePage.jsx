import React, { useState, useEffect } from "react";
import { getAccessToken } from './auth'; 

const HomePage = () => {
    const categories = ['ACTION', 'TACTICAL', 'BATTLE ROYALE', 'TURN-BASED', 'FANTASY', 'MYSTERY', 'ARCADE', 'SURVIVAL', 'FPS', 'ARCADE', 'SPORT', 'MULTIPLAYER']

    const homeContainerWidth = document.querySelector('.home-container').offsetWidth;
    const homeContainerHeight = document.querySelector('.home-container').offsetHeight;
    
    const wordPositions = categories.map(() => ({
        left: `${Math.random() * homeContainerWidth}px`,
        top: `${Math.random() * homeContainerHeight}px`,
    }));
    
    return (
        <div className="home">
            <div className = "home-container">
                {categories.map((category, index) => (
                    <div key={index} className="word" style={{ left: wordPositions[index].left, top: wordPositions[index].top }}>
                        {category}
                    </div>
                ))}
                <div className="title">DISCOVER NEW GAMES...</div>
            </div>
        </div>
    );
}
    
export default HomePage;