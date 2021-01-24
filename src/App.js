
import { useState } from 'react';
import './App.css';


const api = {
  key:"b8575c5bcfac8ad918dc77895865ba34",
base:"https://api.openweathermap.org/data/2.5/"
}


function App() {
  
  const [temp,setTemp]= useState('');
  const [weather,setWeather]=useState({});
  
  const search =evt=>{
    if(evt.key === "Enter"){
    fetch(`${api.base}weather?q=${temp}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
      .then(result=>{
        setTemp('');
        setWeather(result);
      });
  } 
  }
 

  const dateBuilder =(date)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];
    let dat=date.getDate();
    let month =months[date.getMonth()];
    let year=date.getFullYear();
    return `${day} ${dat} ${month} ${year}`
  }
  return (
    
    <div className={(typeof weather.main!="undefined")
    ? ((weather.main.temp>16)

    ?'App warm '
    :'App' )
    :'App'}>
    <main>
    <div className="search-box">
      <input type="text" className="search" placeholder="search" onChange={e =>
        setTemp(e.target.value)}
          value={temp}
          onKeyPress ={search}
        />
    </div>
    {!weather.main?(
      <p> No  Data Found</p>):(
      <div>

        <div className="location-box">
       <div className="location">{weather.name},{weather.sys.country}</div>
      <div className="date">{dateBuilder(new Date())}</div>
    </div>

    <div className="weather-box">
      <div className="temp">
       {Math.round(weather.main.temp)}<sup>°C</sup></div>
       

      <div className="weather">{weather.weather[0].main}</div>
      <h3 className="temp_var">Min:{weather.main.temp_min}<sup>°C</sup> | Max:{weather.main.temp_max}<sup>°C</sup></h3>
    </div>
    </div>
    )}
  </main>
      
    </div>
      
      );}

export default App;
