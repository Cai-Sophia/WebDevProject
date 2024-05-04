import React, { useState } from "react";
import { getAccessToken } from '../utility/auth.js'; 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchIDs, setsearchIDs] = useState([]);

    const searchRequest = (searchTerm) => {
        fetch('http://localhost:8000/search', {
            method: 'POST',
            headers: {
              'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
              'Authorization': `Bearer ${getAccessToken()}`, 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({searchTerm })
          })
        .then(response => response.json())
        .then(data => {
            setsearchIDs(data.ids);
        })
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchRequest(searchTerm);
        }
    };

    const gameRequest = (id) => {
        fetch('http://localhost:8000/getgame', {
            method: 'POST',
            headers: {
              'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
              'Authorization': `Bearer ${getAccessToken()}`, 
              'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }


    return (
        <div id='nav-parent'>
            <div id='nav-bar'>
                <div id='nav-buttons'>
                    <i className="fa-solid fa-bars" style={{fontSize:'25px'}}></i>
                    <i className="fa-solid fa-house" style={{fontSize:'23px'}}></i>
                    <i className="fa-solid fa-heart"></i>
                </div>
                <div id='search-query'>
                    <i className="fa-solid fa-search" style={{fontSize:'23px'}}></i>
                    <div className="search-container">
                        <input
                            className="search-bar"
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                </div>
            </div>
            <div id='line'></div>
        </div>
    )
}

export default NavBar;