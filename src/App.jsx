import React, { useState } from 'react';
import axios from 'axios';
import CityList from './component/cityList';
import WeatherDetails from './component/weatherDetails';
import SearchBar from './component/searchBar';


function App() {
  const [cities] = useState(['London', 'Paris', 'New York', 'Tokyo']);
  const [weatherData, setWeatherData] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`);
      const newData = {
        city,
        description: response.data.description,
        temperature: response.data.temp_in_celsius,
        humidity: response.data.humidity_in_percent,
        dataAge: calculateDataAge(response.data.date_and_time),
      };
      setWeatherData((prevData) => [...prevData, newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateDataAge = (dataTime) => {
    const dataDate = new Date(dataTime);
    const currentDate = new Date();
    const diff = Math.abs(currentDate - dataDate) / 36e5;
    return `${Math.floor(diff)} hours ago`;
  };

  const fetchWeatherForCity = async (index) => {
    const city = cities[index];
    setHighlightedRow(index);
    setSelectedCities((prevSelected) => [...prevSelected, city]);
    await fetchWeatherData(city);
    setHighlightedRow(null);
  };

  const fetchWeatherForAllCities = async () => {
    for (let i = 0; i < cities.length; i++) {
      setHighlightedRow(i);
      setSelectedCities((prevSelected) => [...prevSelected, cities[i]]);
      await fetchWeatherData(cities[i]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setHighlightedRow(null);
  };

  const deleteRow = (index) => {
    const cityToDelete = weatherData[index].city; // Get the city name of the row to delete
    setWeatherData((prevData) => prevData.filter((_, i) => i !== index));
    setSelectedCities((prevSelected) => prevSelected.filter((city) => city !== cityToDelete)); // Remove city highlight
  };

  return (
    <div className="App">
      <div className="layout">
        <CityList
          cities={cities}
          fetchWeatherData={fetchWeatherForAllCities}
          fetchWeatherForCity={fetchWeatherForCity}
          selectedCities={selectedCities}
        />
        <WeatherDetails weatherData={weatherData} highlightedRow={highlightedRow} deleteRow={deleteRow} />
      </div>
      <SearchBar weatherData={weatherData} highlightRow={setHighlightedRow} />
    </div>
  );
}

export default App;
