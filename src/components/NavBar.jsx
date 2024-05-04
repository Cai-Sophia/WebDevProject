import React, { useState } from "react";
import { getAccessToken } from '../utility/auth.js'; 
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search?term=${searchTerm}`);
        }
    };

    return (
        <div id='nav-parent'>
            <div id='nav-bar'>
                <div id='nav-buttons'>
                    <i className="fa-solid fa-bars" style={{fontSize:'25px'}}></i>
                    <Link to="/" className="home-link">
                        <i className="fa-solid fa-house" style={{fontSize:'23px'}}></i>
                    </Link>
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