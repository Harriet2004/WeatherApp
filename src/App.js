import React, { useState } from 'react';

const api = {
  key: "dc7417a1eb91f0c952ddd6b3f70d02f3",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [q, setq] = useState('');
  const [weather, setweather] = useState ({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${q}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {setweather(result); setq(''); console.log(result); }); 
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <div className= {(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className = "search-box">
          <input type = "text" className = "search-bar" placeholder = "Hello" onChange = {e => setq(e.target.value)} value = {q} onKeyPress = {search}/>
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
            <div className = "location-box"> 
            <div className = "location"> {weather.name}, {weather.sys.country} </div>
            <div className = "date"> {dateBuilder(new Date())} </div>
          </div>
          <div className = "weather-box">
            <div className = "temp"> {Math.round(weather.main.temp)}°c </div>
            <div className = "climate"> {weather.weather[0].main} </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
