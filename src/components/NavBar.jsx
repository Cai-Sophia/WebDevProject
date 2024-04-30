import React from "react";

const NavBar = () => {
    return (
        <div id='nav-parent'>
            <div id='nav-bar'>
                <div id='nav-buttons'>
                    <i class="fa-solid fa-bars" style={{fontSize:'35px'}}></i>
                    <i class="fa-solid fa-house" style={{fontSize:'32px'}}></i>
                </div>
                <div id='search-query'>
                    <div id='dropdown-menu'>
                        <button className="dropbtn">SEARCH BY</button>
                        <div className="dropdown-content">
                            <a>Name</a>
                            <a>Category</a>
                            <a>Platform</a> 
                        </div>
                    </div>
                    <input className="search-bar" type="text" placeholder="ENTER TEXT" />

                </div>
                <div>FAVORITES</div>
            </div>
            <div id='line'></div>
        </div>
    )
}

export default NavBar;