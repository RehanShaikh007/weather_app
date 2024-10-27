import React from 'react';

function WeatherDetails({ weatherData, highlightedRow, deleteRow }) {
  return (
    <div className="weather-details">
      <h2>Details</h2>
      {weatherData.length === 0 ? (
        <p>No Data</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Description</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Data Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((data, index) => (
              <tr
                key={index}
                style={{
                  borderColor: '#000000',
                  backgroundColor: highlightedRow === index ? 'yellow' : 'transparent',
                }}
              >
                <td>{data.city}</td>
                <td><input type="text" value={data.description} /></td>
                <td>{data.temperature}</td>
                <td>{data.humidity}</td>
                <td>{data.dataAge}</td>
                <td>
                  <button
                    onClick={() => deleteRow(index)}
                    style={{ backgroundColor: '#4472C4', color: '#ffffff' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WeatherDetails;
