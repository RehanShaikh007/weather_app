import React from 'react';

function CityList({ cities, fetchWeatherData, fetchWeatherForCity, selectedCities }) {
  return (
    <div className="city-list">
      <h2>City List</h2>
      <button onClick={fetchWeatherData} style={{ backgroundColor: '#4472C4', color: '#ffffff' }}>Get Weather for All Cities</button>
      <table>
        <thead>
          <tr>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr
              key={index}
              onClick={() => fetchWeatherForCity(index)} // Fetch weather for individual city on click
              style={{
                borderColor: '#000000',
                backgroundColor: selectedCities.includes(city) ? 'green' : 'transparent', // Highlight selected city
                color: '#000000',
              }}
            >
              <td>{city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CityList;
