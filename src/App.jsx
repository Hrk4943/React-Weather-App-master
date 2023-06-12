import React, { useState } from "react";
import "./App.css";
import MainWeatherWindow from "./components/MainWeatherWindow";
import CityInput from "./components/CityInput";
import WeatherBox from "./components/WeatherBox";

const App = () => {
  const [city, setCity] = useState(undefined);
  const [days, setDays] = useState(new Array(5));

  // creates the day objects and updates the state
  const updateState = (data) => {
    const city = data.city.name;
    const newDays = [];

    const getDayIndices = (data) => {
      let dayIndices = [];
      dayIndices.push(0);

      let index = 0;
      let tmp = data.list[index].dt_txt.slice(8, 10);

      for (let i = 0; i < 4; i++) {
        while (
          tmp === data.list[index].dt_txt.slice(8, 10) ||
          data.list[index].dt_txt.slice(11, 13) !== "15"
        ) {
          index++;
        }
        dayIndices.push(index);
        tmp = data.list[index].dt_txt.slice(8, 10);
      }
      return dayIndices;
    };

    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      newDays.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
      });
    }

    setCity(city);
    setDays(newDays);
  };

  // tries to make an API call with the given city name and triggers state update
  const makeApiCall = async (city) => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
    ).then((resp) => resp.json());

    if (api_data.cod === "200") {
      await updateState(api_data);
      return true;
    } else {
      return false;
    }
  };

  const WeatherBoxes = () => {
    const weatherBoxes = days.slice(1).map((day, index) => (
      <li key={index}>
        <WeatherBox {...day} />
      </li>
    ));

    return <ul className="weather-box-list">{weatherBoxes}</ul>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <MainWeatherWindow data={days[0]} city={city}>
          <CityInput city={city} makeApiCall={makeApiCall} />
          <WeatherBoxes />
        </MainWeatherWindow>
      </header>
    </div>
  );
};

export default App;
