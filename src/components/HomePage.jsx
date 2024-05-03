import React, { useState, useEffect } from "react";
import { categories, wordPositions } from '../assets/data';
import { getAccessToken } from "../utility/auth";

const HomePage = () => {

  /* implementing fade-in / fade-out effect on categoriees*/
  const [visibleWords, setVisibleWords] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setVisibleWords((prevVisibleWords) => {
        const updatedWords = { ...prevVisibleWords };
        updatedWords[randomIndex] = !updatedWords[randomIndex];
        return updatedWords;
      });
    }, 1000); 
    return () => clearInterval(interval); 
  }, [categories]);

  /* fetching randomGames */
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchRandomGames();
  }, []);

  const fetchRandomGames = async () => {
    try {
      const response = await fetch("http://localhost:8000/random-games");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <div className="home">
      <div className="word-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`word ${visibleWords[index] ? "fade-out" : ""}`}
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
      <div className="top-games">
        <div className="top-games-title">TOP GAMES</div>
          <ul>
          {games.map((game) => (
            <li key={game.id}>
              <div>{game.name}</div>
              <div>
                <img src={game.cover.url} alt={game.name} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
    
export default HomePage;