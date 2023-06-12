import React, { useEffect, useState } from "react";
import "./WeatherBox.css";

const WeatherBox = (props) => {
  const [image, setImage] = useState("");
  // returns weekday to a given Date value
  const getDay = (date) => {
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[new Date(date).getDay()];
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../images/${props.icon}.svg`);
        setImage(imageModule.default);
        return imageModule.default;
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    loadImage();
  }, []);

  return (
    <div className="weather-box">
      <h1>{props.date ? getDay(props.date) : ""}</h1>
      <img src={image} alt="image" />
      <span className="temp">{Math.round(props.temp - 273.15)}°C</span>
    </div>
  );
};

export default WeatherBox;
