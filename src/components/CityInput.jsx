import React, { useState } from "react";
import "./CityInput.css";

const CityInput = (props) => {
  const [loading, setLoading] = useState(false);

  const onKeyPressHandler = async (e) => {
    e.persist();
    const eventKey = e.which ? e.which : e.keyCode;
    const city = e.target.value;

    // check if input contains only letters after Enter was pressed
    if (eventKey === 13) {
      if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
        setLoading(true);

        if (await props.makeApiCall(city)) {
          e.target.placeholder = "Enter a City...";
        } else {
          e.target.placeholder = "City was not found, try again...";
        }
      } else {
        e.target.placeholder = "Please enter a valid city name...";
      }

      setLoading(false);
      e.target.value = "";
    }
  };

  const style = {
    top: props.city ? "-380px" : "-20px",
    width: "600px",
    display: "inline-block",
    padding: "10px 0px 10px 30px",
    lineHeight: "120%",
    position: "relative",
    borderRadius: "20px",
    outline: "none",
    fontSize: "20px",
    transition: "all 0.5s ease-out",
  };

  return (
    <input
      className={`city-input ${loading ? "loading" : ""}`}
      style={style}
      type="text"
      placeholder="Enter a City..."
      onKeyPress={onKeyPressHandler}
    />
  );
};

export default CityInput;
