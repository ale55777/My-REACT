import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png';
import clear from '../assets/clear.png';
import cloudy from '../assets/cloudy.gif';
import drizzle from '../assets/storm.gif';
import humidity_icon from '../assets/humidity.png';
import rain from '../assets/rain.gif';
import snow from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import low from '../assets/low.png';
import high from '../assets/high.png';

//bg
import ClearBG from '../assets/ClearBG.jpg'; 
import CloudBG from '../assets/CloudBG.jpg';
import StromBG from '../assets/StromBG.webp';
import RainBG from '../assets/RainBG.jpeg';
import SnowBG from '../assets/SnowBG.jpg';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(ClearBG); // Set initial background image

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

  const allBackgrounds = {
    "01d":ClearBG,
    "01n": ClearBG,
    "02d": CloudBG,
    "02n": CloudBG,
    "03d": CloudBG,
    "03n": CloudBG,
    "04d": StromBG,
    "04n": StromBG,
    "09d": RainBG,
    "09n": RainBG,
    "13d": SnowBG,
    "13n": SnowBG,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear;
      const background = allBackgrounds[data.weather[0].icon] ||ClearBG ;

      const extractedData = {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp - 273.15),
        location: data.name,
        feelsLike: Math.floor(data.main.feels_like - 273.15),
        tempMin: Math.floor(data.main.temp_min - 273.15),
        tempMax: Math.floor(data.main.temp_max - 273.15),
        icon: icon,
      };

      setWeatherData(extractedData);
      setBackgroundImage(background);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    search('Islamabad');
  }, []);

  const handleSearch = () => {
    search(city);
  };

  return (
    <div
      className="Weather"
      style={{
        height: '100%',
        
        padding: 100,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'black',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
          <img src={weatherData.icon} alt="weather" style={{ width: '200px', height: 'auto' }} />
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
           
            <div className="col">
              <img src={low} alt="mintemp" style={{ width: '100px', height: 'auto' }} />
              <div>
                <p>{weatherData.tempMin }%</p>
                <span>Min-Temperature</span>
              </div>
            </div>

            <div className="col">
              <img src={high} alt="maxtemp" style={{ width: '100px', height: 'auto' }} />
              <div>
                <p>{weatherData. tempMax}%</p>
                <span>Max-Temperature</span>
              </div>
            </div>

            <div className="col">
              <img src={clear} alt="feels" style={{ width: '100px', height: 'auto' }} />
              <div>
                <p>{weatherData.feelsLike}%</p>
                <span>Feels like </span>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
