import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png';
import clear from '../assets/clear.png'
import cloudy from '../assets/cloudy.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

  const[weatherData , setWeatherData]=useState(false)

  const search = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response = await fetch(url);
      const data= await response.json();
      console.log(data)
      return data;

      const extractedData: WeatherData = {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp - 273.15), 
        location: data.name,
      };


    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  useEffect(()=>{
    search("Delhi");
   
    
  },[]);


  return (
    <div className="Weather">
      <div className="searching">
        <input type="text" placeholder="Search" />
        <img src={search_icon} alt="search" className="search-image"  />
       
      </div>
     <img src={clear} alt="search" style={{ width: '350px', height: 'auto' }}   />
    <p className="Temperature">16°C</p>
    <p className="Location">London</p>
<div className="weather-data">

<div className='col'>
<img src={humidity} alt="humidity" style={{ width: '100px', height: 'auto' }} />
<div>
<p>91%</p>
<span>Humidity</span>
</div>
</div>

<div className='col'>
<img src={wind} alt="humidity" style={{ width: '100px', height: 'auto' }} />
<div>
<p>3.6km/h</p>
<span>Wind-Speed</span>
</div>
</div>





</div>



    </div>
  );
};

export default Weather;
