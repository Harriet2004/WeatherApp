import React, { useState } from 'react';

const api = {
  key: "dc7417a1eb91f0c952ddd6b3f70d02f3",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      setError(''); 
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Place not found');
          }
          return res.json();
        })
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        .catch(err => {
          setError('Place not found. Please try another location.');
          setWeather({});
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main?.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a place..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {(typeof weather.main != 'undefined') && !error && (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="climate">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
