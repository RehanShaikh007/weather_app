import React, { useState } from 'react';

function SearchBar({ weatherData, highlightRow }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const foundIndex = weatherData.findIndex(
      (data) => data.city.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundIndex !== -1) {
      highlightRow(foundIndex);
    } else {
      alert('City not found in details');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} style={{ backgroundColor: '#4472C4', color: '#ffffff' }}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
