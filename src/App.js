const api = {
  api: "dc7417a1eb91f0c952ddd6b3f70d02f3",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="App">
      <main>
        <div className = "search-box">
          <input type = "text" className = "search-bar" placeholder = "Hello" />
        </div>
        <div className = "location-box"> Dubai, UAE </div>
        <div className = "date"> {dateBuilder(new Date())} </div>
      </main>
    </div>
  );
}

export default App;
