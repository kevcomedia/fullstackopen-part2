import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ location, countryCode }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://healthy-protest.glitch.me/weather?q=${location},${countryCode}`,
      )
      .then((response) => {
        setWeatherData({
          temperatureC: response.data.main.temp,
          windSpeedMps: response.data.wind.speed,
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
        });
      });
  }, [location, countryCode]);

  if (weatherData === null) {
    return <p>Loading weather info...</p>;
  }

  return (
    <div>
      <p>
        <b>Temperature:</b> {weatherData.temperatureC} &deg;C
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        alt={weatherData.description}
      />
      <p>
        <b>Wind:</b> {weatherData.windSpeedMps} mps
      </p>
    </div>
  );
};

export default WeatherInfo;
