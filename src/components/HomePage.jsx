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
  const randomRequest = () => {
    fetch('http://localhost:8000/random-games')
      .then(response => response.json())
      .then(data => console.log(data))
  }
  
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
      </div>
    </div>
  );
};
    
export default HomePage;