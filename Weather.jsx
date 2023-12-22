import React, { useEffect, useState } from "react";
import SeacrchIcon from "./search.svg";
import SunIcon from "./sun1.svg";
import CloudIcon from "./cloudsunny.svg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    city: "Dubai",
    temprature: "26",
    humidity: "75",
    windSpeed: "4.5",
    condition: "Sunny",
  });
  const [searchInput, setSearchInput] = useState({
    search: "Dubai",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    setSearchInput({
      search: "",
    });
  };

  const apiKey = `6ac28a57bbacecfc8eda767ce60aa51b`;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.search}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetch(apiUrl)
      .then((respose) => respose.json())
      .then((data) => {
        console.log("API Response:", data);
        if (
          data.name &&
          data.main.temp &&
          data.main.humidity &&
          data.wind.speed &&
          data.weather[0].main
        ) {
          setWeatherData({
            city: data.name,
            temprature: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            condition: data.weather[0].main,
          });
        } else {
          {
            // Handle the case where the expected data is not available
            console.error("Invalid data format received:", data);
          }
        }
      })
      .catch((error) => {
        // Handle fetch errors
        console.error("Error fetching weather data:", error);
      });
  }, [searchInput, apiUrl]);

  return (
    <div className="Weather-container">
      <form onSubmit={submit} action="">
        <input
          type="search"
          placeholder="Search..."
          name="search"
          value={searchInput.search}
          onChange={handleChange}
        />
        <img src={SeacrchIcon} alt="" />
      </form>

      <div className="text-and-details">
        <h1>Weather in {weatherData.city}</h1>
        <h2>{weatherData.temprature}° C</h2>
        <div className="weather">
          <img
            src={
              weatherData.condition === "Sunny" ? `${SunIcon}` : ` ${CloudIcon}`
            }
            alt=""
          />
          <p>{weatherData.condition}</p>
        </div>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind Speed: {weatherData.windSpeed} km/hr</p>
      </div>
    </div>
  );
};

export default Weather;
