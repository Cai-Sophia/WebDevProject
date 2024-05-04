import React, { useState, useEffect } from "react";
import { getAccessToken } from '../utility/auth.js'; 
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const searchRequest = async (searchTerm) => {
            try {
                const response = await fetch('http://localhost:8000/search', {
                    method: 'POST',
                    headers: {
                      'Client-ID': 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w',
                      'Authorization': `Bearer ${getAccessToken()}`, 
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ searchTerm })
                });
                const data = await response.json();
                setSearchResults(data.ids);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        searchRequest(searchTerm);
    }, [searchTerm]);

    const handleClick = (id) => {
        navigate(`/games/${id}`);
    };

    return (
        <div id='search-parent'>
            <h1>Search results for {searchTerm}</h1>
        </div>
    );
}

export default Search;
