import React, { useState } from "react";
import { getAccessToken } from '../utility/auth.js';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleDropdownOptionClick = (option) => {
        // Handle option click, you can navigate or perform any other action here
        console.log("Clicked option:", option);
        // For example, if you want to navigate
        switch(option) {
            case "Puzzle Games":
                navigate("/puzzle");
                break;
            case "Racing Games":
                navigate("/racing");
                break;
            case "Platforming Games":
                navigate("/platform");
                break;
            case "FPS Games":
                navigate("/fps");
                break;
            default:
                // If the option selected is invalid, throw an error messaga and log it to the console
                const errorMessage = `Invalid option selected: ${option}`;
                console.error(errorMessage);
                throw new Error(errorMessage);
        }
        // After handling the click, hide the dropdown
        setDropdownVisible(false);
    };

    return (
        <div id='nav-bar'>
            <div id='nav-buttons'>
                <div className="dropdown">
                    <i className="fa-solid fa-bars"></i>
                    <div className='dropdown-menu'>
                        <div className="dropdown-option" onClick={() => handleDropdownOptionClick("Puzzle Games")}>Puzzle Games</div>
                        <div className="dropdown-option" onClick={() => handleDropdownOptionClick("Racing Games")}>Racing Games</div>
                        <div className="dropdown-option" onClick={() => handleDropdownOptionClick("Platforming Games")}>Platforming Games</div>
                        <div className="dropdown-option" onClick={() => handleDropdownOptionClick("FPS Games")}>FPS Games</div>
                    </div>
                </div>
                <Link to="/" className="home-link">
                    <i className="fa-solid fa-house" style={{fontSize: '.9em'}}></i>
                </Link>
                <Link to="/favorites"> {/* Link to favorites page */}
                    <i className="fa-solid fa-heart"></i>
                </Link>
            </div>
            <div id='search-query'>
                <i className="fa-solid fa-search"></i>
                <input
                    className="search-bar"
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
    </div>
    )
}

export default NavBar;
