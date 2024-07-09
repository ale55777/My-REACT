import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png';
import clear from '../assets/clear.png';
import cloudy from '../assets/cloudy.png';
import drizzle from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind_icon from '../assets/wind.png'; 

const Weather = () => {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null); 

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear;

      const extractedData = {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp - 273.15),
        location: data.name,
        icon: icon,
      };

      setWeatherData(extractedData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    search('Delhi'); 
  }, []);

  const handleSearch = () => {
    search(city);
  };

  return (
    <div className="Weather">
      <div className="searching">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={search_icon}
          alt="search"
          className="search-image"
          onClick={handleSearch}
        />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather" style={{ width: '300px', height: 'auto' }} />
          <p className="Temperature">{weatherData.temperature}°C</p>
          <p className="Location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" style={{ width: '100px', height: 'auto' }} />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" style={{ width: '100px', height: 'auto' }} />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind-Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
