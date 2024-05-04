import React, { useState, useEffect } from "react";
import { getAccessToken } from '../utility/auth.js'; 
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const params = useParams();

    useEffect(() => {
        const searchRequest = async (searchTerm) => {
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
            console.log(data)
            setSearchResults(data.ids);
        };
        searchRequest(searchTerm);
    }, [params.term]);

    const handleClick = (id) => {
        // Handle click event
    };

    return (
        <div id='search-parent'>
            <h1>Search results for {searchTerm}</h1>
        </div>
    );
}

export default Search;
