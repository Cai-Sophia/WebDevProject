import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search/${searchTerm}`);
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
            case "50 Random Puzzle Games":
                navigate("/puzzle");
                break;
            case "50 Random Racing Games":
                navigate("/racing");
                break;
            case "50 Random Platforming Games":
                navigate("/platform");
                break;
            case "50 Random FPS Games":
                navigate("/fps");
                break;
            default:
                break;
        }
        // After handling the click, hide the dropdown
        setDropdownVisible(false);
    };

    return (
        <div id='nav-bar'>
            <div id='nav-buttons'>
                <i className="fa-solid fa-bars" onClick={toggleDropdown}></i>
                <Link to="/" className="home-link">
                    <i className="fa-solid fa-house" style={{fontSize: '.9em'}}></i>
                </Link>
                <i className="fa-solid fa-heart"></i>
            </div>
            {dropdownVisible && ( // Render dropdown if visible
                <div id='dropdown-menu'>
                    <div className="dropdown-option" onClick={() => handleDropdownOptionClick("50 Random Puzzle Games")}>50 Random Puzzle Games</div>
                    <div className="dropdown-option" onClick={() => handleDropdownOptionClick("50 Random Racing Games")}>50 Random Racing Games</div>
                    <div className="dropdown-option" onClick={() => handleDropdownOptionClick("50 Random Platforming Games")}>50 Random Platforming Games</div>
                    <div className="dropdown-option" onClick={() => handleDropdownOptionClick("50 Random FPS Games")}>50 Random FPS Games</div>
                </div>
            )}
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
