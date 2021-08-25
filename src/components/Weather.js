import axios from "axios";
import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import styled from "styled-components";
import "./Weather.css";
function Weather() {
  const [long, setLong] = React.useState(false);
  const [lati, setLati] = React.useState(false);
  const [result, setResult] = useState([]);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    setLati(position.coords.latitude);
    setLong(position.coords.longitude);
  }
  getLocation();
  console.log(lati);
  useEffect(() => {
    const getData = async () => {
      //   const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast?q=Timisoara&cnt=5&appid=e445f0e5f9af8f1cab20cecf9b955c63")
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&units=metric&appid=e445f0e5f9af8f1cab20cecf9b955c63`
      );
      //setWeather(res.data);
      setResult(res.data.list);
    };
    getData();
  }, [lati, long]);

  const forecastDays = result.filter((day, index) => index % 8 === 0);
  const fiveDayForecast = forecastDays.map((day, index) => {
    return (
      <WeatherCard
        result={result}
        lati={lati}
        long={long}
        feels_like={day.main.feels_like}
        pressure={day.main.pressure}
        humidity={day.main.humidity}
        temperature={day.main.temp}
        wind={day.wind.speed}
        temp_min={day.main.temp_min}
        temp_max={day.main.temp_max}
        date={day.dt_txt}
        icon={day.weather[0].icon}
        description={day.weather[0].main}
        key={index}
      />
    );
  });
  const hour = new Date().getHours();

  return (
    <div
      className={
        hour >= 19
          ? "WrapContainer night"
          : hour < 7
          ? "WrapContainer night"
          : "WrapContainer day"
      }
    >
      <Forecast> {fiveDayForecast}</Forecast>
    </div>
  );
}

export default Weather;

const Forecast = styled.div`
  display: flex;
  margin: auto auto;
  justify-content: space-around;
  width: 90%;
`;
