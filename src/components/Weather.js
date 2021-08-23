import axios from 'axios';
import React, { useState } from 'react'
import WeatherCard from './WeatherCard';
import styled from "styled-components";
function Weather() {
    const [result,setResult] = useState([])
    const getData = async () =>{
    //   const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast?q=Timisoara&cnt=5&appid=e445f0e5f9af8f1cab20cecf9b955c63")
    const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast?q=Timisoara&units=metric&appid=e445f0e5f9af8f1cab20cecf9b955c63")
      
    //setWeather(res.data);
      setResult(res.data.list)
    }
    
    const forecastDays = result.filter((day,index) => index%8===0);
    console.log(forecastDays)
    const fiveDayForecast = forecastDays.map((day,index)=>{
        return (
            <WeatherCard wind={day.wind.speed} temp_min={day.main.temp_min} temp_max={day.main.temp_max} date={day.dt_txt} icon={day.weather[0].icon} description={day.weather[0].description} key={index} />
        )
    })

    return (
        <div>
            <button onClick={getData} >Get weather</button>
            <Forecast> {fiveDayForecast}</Forecast>
           
        </div>
    )
}

export default Weather

const Forecast = styled.div`
    display: flex;
    margin: auto auto;
    justify-content: space-around;
    width: 90%;
`