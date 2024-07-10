import React, { useEffect, useState } from 'react';

import{ Button }from"antd";
import './Weather.css';




import search_icon from '../assets/search_icon.png';

import clear from '../assets/clear.png';
import cloudy from '../assets/cloudy.gif';
import drizzle from '../assets/storm.gif';
import Sunn from '../assets/Sun.gif';
import humidity_icon from '../assets/humidity.png';
import rain from '../assets/rain.gif';
import snow from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import low from '../assets/low.png';
import high from '../assets/high.png';
import Mist from '../assets/Mist.png';
import Shower from '../assets/light shower.gif';
import cloud from '../assets/cloud.png';
import twocloud from '../assets/Scatt.png';
//bg
import ClearBG from '../assets/ClearBG.jpg'; 
import CloudBG from '../assets/CloudBG.jpg';
import StromBG from '../assets/StromBG.jpg';
import LightBG from '../assets/LightBG.jpg';
import RainBG from '../assets/RainBG.jpeg';
import SnowBG from '../assets/SnowBG.jpg';
import MistBG from '../assets/MistBG.jpg';
import SunBG from '../assets/SunBG.jpg';
import Solo from '../assets/OneCloudBG.jpg';
import Location from '../assets/loc.png';
const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(ClearBG);

  const allIcons = {
    "01d": Sunn,
    "01n": Sunn,
    "02d": cloud,
    "02n": cloud,
    "03d": cloudy,
    "03n": cloudy,
    "04d": twocloud,
    "04n": twocloud,
    "09d": Shower,
    "09n": Shower,
    "10d": rain,
    "10n": rain,
    "11d": drizzle,
    "11n": drizzle,
    "13d": snow,
    "13n": snow,
    "50n": Mist,
    "50d": Mist,
  };

  const allBackgrounds = {
    "01d": SunBG,
    "01n": SunBG,
    "02d": Solo,
    "02n": Solo,
    "03d": CloudBG,
    "03n": CloudBG,
    "04d": ClearBG,
    "04n": ClearBG,
    "09d": LightBG,
    "09n": LightBG,
    "10d": RainBG,
    "10n": RainBG,
    "11d": StromBG,
    "11n": StromBG,
    "13d": SnowBG,
    "13n": SnowBG,
    "50n": MistBG,
    "50d": MistBG,
  };

  const search = async (location) => {
    let url;
    if (typeof location === 'string') {
      if (location === '') {
        alert('Please Enter a City');
        return;
      }
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_APP_ID}`;
    } else {
      const { latitude, longitude } = location;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_APP_ID}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert('Error! City not found');
        return;
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear;
      const background = allBackgrounds[data.weather[0].icon] || ClearBG;

      const extractedData = {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp - 273.15),
        location: data.name,
        feelsLike: Math.floor(data.main.feels_like - 273.15),
        tempMin: Math.floor(data.main.temp_min - 273.15),
        tempMax: Math.floor(data.main.temp_max - 273.15),
        condition: data.weather[0].main,
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
    alert('Please Enable Location for Better Experience');
    search('Islamabad');
  }, []);

  const handleSearch = () => {
    search(city);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        search({ latitude, longitude });
      }, (error) => {
        console.error(error);
        alert(' Please try again.');
      });
    } 
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
          placeholder="Search City"
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
      <Button onClick={handleCurrentLocation} className='black-button'>
        Location
        </Button>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather" style={{ width: '200px', height: 'auto' }} />
          <p className="Temperature">{weatherData.temperature}°C</p>
          <p className="Location"><b>{weatherData.location}</b></p>
          <p className="Location">{weatherData.condition}</p>
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
                <p>{weatherData.tempMin}%</p>
                <span>Min-Temperature</span>
              </div>
            </div>
            <div className="col">
              <img src={high} alt="maxtemp" style={{ width: '100px', height: 'auto' }} />
              <div>
                <p>{weatherData.tempMax}%</p>
                <span>Max-Temperature</span>
              </div>
            </div>
            <div className="col">
              <img src={clear} alt="feels" style={{ width: '100px', height: 'auto' }} />
              <div>
                <p>{weatherData.feelsLike}%</p>
                <span>Feels like</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
