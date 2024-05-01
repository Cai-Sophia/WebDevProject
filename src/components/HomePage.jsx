import React, { useState, useEffect } from "react";
import { categories, wordPositions } from '../assets/data';

const HomePage = () => {
    const [visibleWords, setVisibleWords] = useState({});

    useEffect(() => {
      const interval = setInterval(() => {
        // Randomly select a word index to fade in or out
        const randomIndex = Math.floor(Math.random() * categories.length);
        setVisibleWords((prevVisibleWords) => {
          const updatedWords = { ...prevVisibleWords };
          // Toggle visibility for the selected word index
          updatedWords[randomIndex] = !updatedWords[randomIndex];
          return updatedWords;
        });
      }, 2000); // Set the interval duration (milliseconds)
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [categories]);
    
    return (
    <div className="home">
      <div className="home-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`word ${visibleWords[index] ? "fade-out" : ""}`}
            style={{
              left: wordPositions[index].left,
              top: wordPositions[index].top,
              fontSize: wordPositions[index].fontSize
            }}
          >
            {category}
          </div>
        ))}
        <div className="title">DISCOVER NEW GAMES...</div>
      </div>
    </div>
  );
};
    
export default HomePage;