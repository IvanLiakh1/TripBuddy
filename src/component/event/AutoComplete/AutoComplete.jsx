import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../server/axios/axiosInstance.js';
import './AutoComplete.css'
function Autocomplete({ placeholder, value, onChange, name }) {
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const fetchAutocompleteResults = async (input) => {
        try {
            const data = await axiosInstance.get(`/event/autocomplete`, { params: { input } });
            console.log(data.data.predictions);
            setSuggestions(data.data.predictions || []);

        } catch (error) {
            console.error('Помилка при отриманні даних:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange({ target: { name, value: newValue } });
        if (newValue.length > 2) {
            fetchAutocompleteResults(newValue);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onChange({ target: { name, value: suggestion } });
        setSuggestions([]);
        setIsFocused(false);
    };

    return (
        <div onBlur={() => setIsFocused(false)}>
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                placeholder={placeholder}
                className="search_input"
            />
            {isFocused && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onMouseDown={() => handleSuggestionClick(suggestion.description)}
                            className="suggestion-item"
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Autocomplete;
